import { create } from "zustand";
import type { Transaction, NewTransaction } from "../types/transaction.types";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService";

interface TransactionStore {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  addTransaction: (data: NewTransaction) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>()((set, get) => ({
  transactions: [],
  loading: false,
  error: null,

  fetchTransactions: async () => {
    if (get().transactions.length > 0) return;
    set({ loading: true, error: null });
    try {
      const data = await getTransactions();
      set({ transactions: data, loading: false });
    } catch {
      set({ error: "Failed to fetch transactions", loading: false });
    }
  },

  addTransaction: async (data) => {
    try {
      const newTransaction = await addTransaction(data);
      set((state) => ({
        transactions: [newTransaction, ...state.transactions],
      }));
    } catch {
      set({ error: "Failed to add transaction" });
    }
  },

  updateTransaction: async (id, data) => {
    try {
      const updated = await updateTransaction(id, data);
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id || (t as any)._id === id ? updated : t,
        ),
      }));
    } catch {
      set({ error: "Failed to update transaction" });
    }
  },

  deleteTransaction: async (id) => {
    try {
      await deleteTransaction(id);
      set((state) => ({
        transactions: state.transactions.filter(
          (t) => t.id !== id && (t as any)._id !== id,
        ),
      }));
    } catch {
      set({ error: "Failed to delete transaction" });
    }
  },
}));
