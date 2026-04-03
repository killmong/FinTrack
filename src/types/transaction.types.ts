export type TransactionType = "income" | "expense";

export type Category =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Health"
  | "Housing"
  | "Salary"
  | "Freelance"
  | "Other";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
  note?: string;
}

export type NewTransaction = Omit<Transaction, "id">;