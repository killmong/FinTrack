import api from "./api";
import type { Transaction, NewTransaction } from "../types/transaction.types";

export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get("/transactions");
  return res.data;
};

export const addTransaction = async (
  data: NewTransaction,
): Promise<Transaction> => {
  const res = await api.post("/transactions", data);
  return res.data;
};

export const updateTransaction = async (
  id: string,
  data: Partial<Transaction>,
): Promise<Transaction> => {
  const res = await api.put(`/transactions/${id}`, data);
  return res.data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};

export const getTransactionSummary = async () => {
  const res = await api.get("/transactions/summary");
  return res.data;
};
