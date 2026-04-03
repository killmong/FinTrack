import { useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  BarChart2,
  Calendar,
  Award,
} from "lucide-react";
import { useTransactionStore } from "../store/useTransactionStore";

import { formatCurrency } from "../utils/formatCurrency";
import InsightCard from "../components/insights/InsightCard";
import TopSpendingCategory from "../components/insights/TopSpendingCategory";
import MonthlyComparison from "../components/insights/MonthlyComparison";
import { useInsights } from "../hooks/useInsights";
import PageWrapper from "../components/common/PageWrapper";
const Insights = () => {
  const { transactions, fetchTransactions, loading } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const {
    categoryInsights,
    monthlyInsights,
    summary,
    monthOverMonth: monthChange,
  } = useInsights(transactions);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Insights
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Understanding your spending patterns
          </p>
        </div>

        {/* Insight Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InsightCard
            title="Total Savings"
            value={formatCurrency(summary.totalSavings)}
            subtitle="Income minus all expenses"
            icon={PiggyBank}
            trend={summary.totalSavings >= 0 ? "up" : "down"}
            trendLabel={summary.totalSavings >= 0 ? "Positive" : "Negative"}
          />

          <InsightCard
            title="Highest Spending Category"
            value={summary.highestSpendingCategory?.category ?? "N/A"}
            subtitle={
              summary.highestSpendingCategory
                ? `${formatCurrency(summary.highestSpendingCategory.total)} total spent`
                : undefined
            }
            icon={TrendingDown}
            trend="down"
            trendLabel={`${summary.highestSpendingCategory?.percentage ?? 0}% of expenses`}
          />

          <InsightCard
            title="Lowest Spending Category"
            value={summary.lowestSpendingCategory?.category ?? "N/A"}
            subtitle={
              summary.lowestSpendingCategory
                ? `${formatCurrency(summary.lowestSpendingCategory.total)} total spent`
                : undefined
            }
            icon={Award}
            trend="up"
            trendLabel={`${summary.lowestSpendingCategory?.percentage ?? 0}% of expenses`}
          />

          <InsightCard
            title="Avg Monthly Income"
            value={formatCurrency(summary.averageMonthlyIncome)}
            subtitle="Across all recorded months"
            icon={TrendingUp}
            trend="up"
          />

          <InsightCard
            title="Avg Monthly Expenses"
            value={formatCurrency(summary.averageMonthlyExpense)}
            subtitle="Across all recorded months"
            icon={BarChart2}
            trend="neutral"
          />

          <InsightCard
            title="Month over Month"
            value={`${monthChange.changePercent > 0 ? "+" : ""}${monthChange.changePercent}%`}
            subtitle="Change in expenses vs last month"
            icon={Calendar}
            trend={monthChange.changePercent <= 0 ? "up" : "down"}
            trendLabel={
              monthChange.changePercent <= 0
                ? "Spending decreased"
                : "Spending increased"
            }
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <MonthlyComparison data={monthlyInsights} />
          <TopSpendingCategory data={categoryInsights} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Insights;
