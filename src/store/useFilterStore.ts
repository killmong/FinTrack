import { create } from "zustand";
import type { Category, TransactionType } from "../types/transaction.types";

interface FilterStore {
  search: string;
  category: Category | "All";
  type: TransactionType | "All";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
  setSearch: (search: string) => void;
  setCategory: (category: Category | "All") => void;
  setType: (type: TransactionType | "All") => void;
  setSortBy: (sortBy: "date" | "amount") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  resetFilters: () => void;
}

const defaultFilters = {
  search: "",
  category: "All" as const,
  type: "All" as const,
  sortBy: "date" as const,
  sortOrder: "desc" as const,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...defaultFilters,
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setType: (type) => set({ type }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  resetFilters: () => set(defaultFilters),
}));
