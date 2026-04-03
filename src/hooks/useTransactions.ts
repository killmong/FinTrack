import { useEffect, useMemo } from "react";
import { useTransactionStore } from "../store/useTransactionStore";
import { useFilterStore } from "../store/useFilterStore";

export const useTransactions = () => {
  const {
    transactions,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactionStore();

  const { search, category, type, sortBy, sortOrder } = useFilterStore();

  useEffect(() => {
    if (transactions.length === 0) {
      fetchTransactions();
    }
  }, []);

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchSearch =
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "All" || t.category === category;
        const matchType = type === "All" || t.type === type;
        return matchSearch && matchCategory && matchType;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return sortOrder === "asc"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      });
  }, [transactions, search, category, type, sortBy, sortOrder]);

  return {
    transactions,
    filtered,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
