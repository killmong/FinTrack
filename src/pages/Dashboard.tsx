import { useEffect } from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "motion/react";
import { cubicBezier } from "motion/react";
import { useTransactionStore } from "../store/useTransactionStore";
import {
  getDashboardSummary,
  getMonthOverMonthChange,
} from "../utils/calculateInsights";
import SummaryCard from "../components/dashboard/SummaryCard";
import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import SpendingBreakdownChart from "../components/dashboard/SpendingBreakdownChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import PageWrapper from "../components/common/PageWrapper";
import { useMemo } from "react";
const ease = cubicBezier(0.25, 0.46, 0.45, 0.94);

const Dashboard = () => {
  const { transactions, fetchTransactions, loading } = useTransactionStore();

  useEffect(() => {
    if (transactions.length === 0) {
      console.log("Fetching transactions for dashboard...");
      fetchTransactions();
    }
  }, [transactions.length, fetchTransactions]);

  const summary = useMemo(
    () => getDashboardSummary(transactions),
    [transactions],
  );
  const monthChange = useMemo(
    () => getMonthOverMonthChange(transactions),
    [transactions],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
          <p className=" text-surface-500 dark:text-surface-400 text-sm">
            Loading...
          </p>
        </div>
      </div>
    );
  }
  return (
    <PageWrapper>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease, delay: 0 }}
      >
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-white dark:text-surface-400 mt-0.5">
          Your financial overview at a glance
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.1 }}
        >
          <SummaryCard
            title="Total Balance"
            amount={summary.balance}
            icon={Wallet}
            type="balance"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.2 }}
        >
          <SummaryCard
            title="Total Income"
            amount={summary.totalIncome}
            icon={TrendingUp}
            type="income"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.3 }}
        >
          <SummaryCard
            title="Total Expenses"
            amount={summary.totalExpenses}
            icon={TrendingDown}
            type="expense"
            percentageChange={monthChange.changePercent}
          />
        </motion.div>
      </div>

      {/* Charts Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <BalanceTrendChart transactions={transactions} />
        <SpendingBreakdownChart transactions={transactions} />
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease, delay: 0.5 }}
      >
        <RecentTransactions transactions={transactions} />
      </motion.div>
    </PageWrapper>
  );
};

export default Dashboard;
