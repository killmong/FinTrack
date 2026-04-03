import type { Transaction } from "../types/transaction.types";
import { format } from "date-fns";

// Total income from all transactions
export const getTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
};

// Total expenses from all transactions
export const getTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
};

// Current balance
export const getBalance = (transactions: Transaction[]): number => {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
};

// Balance trend month by month for line chart
export const getBalanceTrend = (transactions: Transaction[]) => {
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

  let runningBalance = 0;

  return Object.entries(grouped)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([month, { income, expenses }]) => {
      runningBalance += income - expenses;
      return {
        month,
        income,
        expenses,
        balance: runningBalance,
      };
    });
};

// Top spending category
export const getTopSpendingCategory = (transactions: Transaction[]): string => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const grouped: Record<string, number> = {};

  expenses.forEach((t) => {
    grouped[t.category] = (grouped[t.category] ?? 0) + t.amount;
  });

  return Object.entries(grouped).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";
};

// Month over month expense change
export const getMonthOverMonthChange = (
  transactions: Transaction[],
): { current: number; previous: number; changePercent: number } => {
  const now = new Date();
  const currentMonth = format(now, "MMM yyyy");
  const previousMonth = format(
    new Date(now.getFullYear(), now.getMonth() - 1),
    "MMM yyyy",
  );

  const getMonthTotal = (month: string) =>
    transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          format(new Date(t.date), "MMM yyyy") === month,
      )
      .reduce((sum, t) => sum + t.amount, 0);

  const current = getMonthTotal(currentMonth);
  const previous = getMonthTotal(previousMonth);

  const changePercent =
    previous > 0
      ? parseFloat((((current - previous) / previous) * 100).toFixed(1))
      : 0;

  return { current, previous, changePercent };
};

// Summary for dashboard cards
export const getDashboardSummary = (transactions: Transaction[]) => {
  return {
    balance: getBalance(transactions),
    totalIncome: getTotalIncome(transactions),
    totalExpenses: getTotalExpenses(transactions),
    topCategory: getTopSpendingCategory(transactions),
  };
};
