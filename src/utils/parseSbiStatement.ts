import * as XLSX from 'xlsx'
import { parse, isValid, format } from 'date-fns'
import type {  ParsedImportRow, ImportPreview, ImportError } from '../types/import.types'
import { categorizeTransaction } from './categorizeTransaction'

// Parse amount — SBI uses strings like "1,000.00" or empty string
const parseAmount = (value: string | number | undefined): number => {
  if (!value || value === '' || value === '-') return 0
  const cleaned = String(value).replace(/,/g, '').trim()
  const parsed  = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

// Parse SBI date formats — "01 Jan 2024" or "01/01/2024"
const parseSBIDate = (dateStr: string): string => {
  const formats = [
    'dd MMM yyyy',
    'dd/MM/yyyy',
    'dd-MM-yyyy',
    'MM/dd/yyyy',
    'd MMM yyyy',
  ]

  for (const fmt of formats) {
    const parsed = parse(dateStr.trim(), fmt, new Date())
    if (isValid(parsed)) {
      return format(parsed, 'yyyy-MM-dd')
    }
  }

  // Fallback — try native Date
  const fallback = new Date(dateStr)
  if (isValid(fallback)) {
    return format(fallback, 'yyyy-MM-dd')
  }

  return new Date().toISOString().split('T')[0]
}

// Find the header row — SBI statements have metadata rows at top
const findHeaderRow = (rows: string[][]): number => {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].map((c) => String(c).trim().toUpperCase())
    if (
      row.some((c) => c.includes('TXN DATE') || c.includes('TRANSACTION DATE') || c.includes('DATE')) &&
      row.some((c) => c.includes('DEBIT')) &&
      row.some((c) => c.includes('CREDIT'))
    ) {
      return i
    }
  }
  return 0
}

export const parseSBIStatement = (
  file: File
): Promise<{ preview: ImportPreview; errors: ImportError[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data    = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        // Get first sheet
        const sheetName = workbook.SheetNames[0]
        const sheet     = workbook.Sheets[sheetName]

        // Convert to array of arrays
        const rawRows: string[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          raw:    false,
          defval: '',
        })

        // Find where actual data starts
        const headerIndex = findHeaderRow(rawRows)
        const headers     = rawRows[headerIndex].map((h) => String(h).trim())
        const dataRows    = rawRows.slice(headerIndex + 1)

        const parsed:  ParsedImportRow[] = []
        const errors:  ImportError[]     = []

        dataRows.forEach((row, index) => {
          // Skip empty rows
          if (!row || row.every((cell) => !cell)) return

          // Map row to object using headers
          const obj: Record<string, string> = {}
          headers.forEach((header, i) => {
            obj[header] = String(row[i] ?? '').trim()
          })

          // Find column values flexibly
          const dateKey  = headers.find((h) => h.toUpperCase().includes('TXN DATE') || h.toUpperCase() === 'DATE')
          const descKey  = headers.find((h) => h.toUpperCase().includes('DESCRIPTION') || h.toUpperCase().includes('NARRATION') || h.toUpperCase().includes('PARTICULARS'))
          const refKey   = headers.find((h) => h.toUpperCase().includes('REF') || h.toUpperCase().includes('CHEQUE'))
          const debitKey = headers.find((h) => h.toUpperCase().includes('DEBIT') || h.toUpperCase().includes('WITHDRAWAL'))
          const creditKey = headers.find((h) => h.toUpperCase().includes('CREDIT') || h.toUpperCase().includes('DEPOSIT'))
          const balKey   = headers.find((h) => h.toUpperCase().includes('BALANCE'))

          const dateStr = dateKey ? obj[dateKey] : ''
          const desc    = descKey ? obj[descKey] : ''
          const debit   = parseAmount(debitKey ? obj[debitKey] : '')
          const credit  = parseAmount(creditKey ? obj[creditKey] : '')
          const balance = parseAmount(balKey ? obj[balKey] : '')
          const refNo   = refKey ? obj[refKey] : ''

          // Skip rows with no transaction data
          if (debit === 0 && credit === 0) return

          // Skip rows that look like summary rows
          if (desc.toUpperCase().includes('OPENING BALANCE') ||
              desc.toUpperCase().includes('CLOSING BALANCE') ||
              desc.toUpperCase().includes('TOTAL')) return

          if (!dateStr) {
            errors.push({ row: headerIndex + index + 2, message: 'Missing date' })
            return
          }

          parsed.push({
            date:        parseSBIDate(dateStr),
            description: desc,
            refNo,
            debit,
            credit,
            balance,
            type: credit > 0 ? 'income' : 'expense',
          })
        })

        // Sort by date
        parsed.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        const totalIncome  = parsed.reduce((sum, r) => sum + r.credit, 0)
        const totalExpense = parsed.reduce((sum, r) => sum + r.debit,  0)

        resolve({
          preview: {
            rows:        parsed,
            totalIncome,
            totalExpense,
            totalRows:   parsed.length,
            dateRange: {
              from: parsed[0]?.date ?? '',
              to:   parsed[parsed.length - 1]?.date ?? '',
            },
          },
          errors,
        })
      } catch (err) {
        console.error('Error parsing SBI statement:', err)
        reject(new Error('Failed to parse statement. Make sure it is a valid SBI XLS/CSV file.'))
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}

// Convert parsed rows to NewTransaction format for your store
export const convertToTransactions = (rows: ParsedImportRow[]) => {
  return rows.map((row) => ({
    title:    row.description.slice(0, 60) || 'SBI Transaction',
    amount:   row.type === 'income' ? row.credit : row.debit,
    type:     row.type,
    category: categorizeTransaction(row.description),
    date:     row.date,
    note:     row.refNo ? `Ref: ${row.refNo}` : '',
  }))
}