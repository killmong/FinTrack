import { useMemo } from "react";
import type { Transaction } from "../types/transaction.types";
import {
  getCategoryInsights,
  getMonthlyInsights,
  getInsightSummary,
  getSpendingBreakdown,
} from "../services/insightService";
import { getMonthOverMonthChange } from "../utils/calculateInsights";

export const useInsights = (transactions: Transaction[]) => {
  const categoryInsights = useMemo(
    () => getCategoryInsights(transactions),
    [transactions],
  );

  const monthlyInsights = useMemo(
    () => getMonthlyInsights(transactions),
    [transactions],
  );

  const summary = useMemo(
    () => getInsightSummary(transactions),
    [transactions],
  );

  const spendingBreakdown = useMemo(
    () => getSpendingBreakdown(transactions),
    [transactions],
  );

  const monthOverMonth = useMemo(
    () => getMonthOverMonthChange(transactions),
    [transactions],
  );

  return {
    categoryInsights,
    monthlyInsights,
    summary,
    spendingBreakdown,
    monthOverMonth,
  };
};
