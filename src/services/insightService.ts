import type { Transaction } from "../types/transaction.types";
import type {
  CategoryInsight,
  MonthlyInsight,
  InsightSummary,
} from "../types/insight.types";
import { CATEGORY_COLORS } from "../constants/chartColors";
import { format } from "date-fns";

// --- Category Breakdown ---
export const getCategoryInsights = (
  transactions: Transaction[],
): CategoryInsight[] => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

  const grouped: Record<string, { total: number; count: number }> = {};

  expenses.forEach((t) => {
    if (!grouped[t.category]) {
      grouped[t.category] = { total: 0, count: 0 };
    }
    grouped[t.category].total += t.amount;
    grouped[t.category].count += 1;
  });

  return Object.entries(grouped)
    .map(([category, { total, count }]) => ({
      category,
      total,
      count,
      percentage:
        totalExpenses > 0
          ? parseFloat(((total / totalExpenses) * 100).toFixed(1))
          : 0,
    }))
    .sort((a, b) => b.total - a.total);
};

// --- Monthly Breakdown ---
export const getMonthlyInsights = (
  transactions: Transaction[],
): MonthlyInsight[] => {
  const grouped: Record<string, { income: number; expenses: number }> = {};

  transactions.forEach((t) => {
    const month = format(new Date(t.date), "MMM yyyy");
    if (!grouped[month]) {
      grouped[month] = { income: 0, expenses: 0 };
    }
    if (t.type === "income") {
      grouped[month].income += t.amount;
    } else {
      grouped[month].expenses += t.amount;
    }
  });

  return Object.entries(grouped)
    .map(([month, { income, expenses }]) => ({
      month,
      income,
      expenses,
      net: income - expenses,
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
};

// --- Full Insight Summary ---
export const getInsightSummary = (
  transactions: Transaction[],
): InsightSummary => {
  const categoryInsights = getCategoryInsights(transactions);
  const monthlyInsights = getMonthlyInsights(transactions);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const mostActiveMonth = monthlyInsights.reduce(
    (prev, curr) =>
      curr.income + curr.expenses > prev.income + prev.expenses ? curr : prev,
    monthlyInsights[0],
  );

  return {
    highestSpendingCategory: categoryInsights[0],
    lowestSpendingCategory: categoryInsights[categoryInsights.length - 1],
    mostActiveMonth: mostActiveMonth?.month ?? "N/A",
    averageMonthlyExpense:
      monthlyInsights.length > 0 ? totalExpenses / monthlyInsights.length : 0,
    averageMonthlyIncome:
      monthlyInsights.length > 0 ? totalIncome / monthlyInsights.length : 0,
    totalSavings: totalIncome - totalExpenses,
  };
};

// --- Chart Ready Spending Breakdown ---
export const getSpendingBreakdown = (transactions: Transaction[]) => {
  return getCategoryInsights(transactions).map((insight) => ({
    category: insight.category,
    amount: insight.total,
    percentage: insight.percentage,
    color: CATEGORY_COLORS[insight.category] ?? "#94a3b8",
  }));
};
