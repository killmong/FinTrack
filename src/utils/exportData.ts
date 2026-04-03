import Papa from 'papaparse'
import type { Transaction } from '../types/transaction.types'
import { formatDate } from './formatDate'

// Export as CSV
export const exportToCSV = (
  transactions: Transaction[],
  filename: string = 'transactions'
): void => {
  const data = transactions.map((t) => ({
    Title:    t.title,
    Amount:   t.amount,
    Type:     t.type,
    Category: t.category,
    Date:     formatDate(t.date),
    Note:     t.note ?? '',
  }))

  const csv = Papa.unparse(data)
  downloadFile(csv, `${filename}.csv`, 'text/csv')
}

// Export as JSON
export const exportToJSON = (
  transactions: Transaction[],
  filename: string = 'transactions'
): void => {
  const json = JSON.stringify(transactions, null, 2)
  downloadFile(json, `${filename}.json`, 'application/json')
}

// Helper — trigger browser download
const downloadFile = (
  content: string,
  filename: string,
  mimeType: string
): void => {
  const blob = new Blob([content], { type: mimeType })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href     = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}