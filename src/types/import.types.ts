export interface RawSBIRow {
  "Txn Date": string;
  "Value Date": string;
  Description: string;
  "Ref No./Cheque No.": string;
  Debit: string | number;
  Credit: string | number;
  Balance: string | number;
}

export interface ParsedImportRow {
  date: string;
  description: string;
  refNo: string;
  debit: number;
  credit: number;
  balance: number;
  type: "income" | "expense";
}

export interface ImportPreview {
  rows: ParsedImportRow[];
  totalIncome: number;
  totalExpense: number;
  totalRows: number;
  dateRange: {
    from: string;
    to: string;
  };
}

export interface ImportError {
  row: number;
  message: string;
}
