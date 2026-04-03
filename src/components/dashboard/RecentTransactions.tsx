import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";
import type { Transaction } from "../../types/transaction.types";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatRelativeDate } from "../../utils/formatDate";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const navigate = useNavigate();
  const recent = transactions.slice(0, 5);

  return (
    <Card className="col-span-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Recent Transactions
        </h2>
        <button
          onClick={() => navigate("/transactions")}
          className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          View all <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* List */}
      {recent.length === 0 ? (
        <EmptyState
          title="No transactions yet"
          description="Your recent transactions will appear here."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {recent.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              {/* Left */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {t.title}
                </span>
                <div className="flex items-center gap-2">
                  <Badge label={t.category} />
                  <span className="text-xs text-gray-400">
                    {formatRelativeDate(t.date)}
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-sm font-semibold ${
                    t.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </span>
                <Badge
                  label={t.type}
                  type="transaction"
                  transactionType={t.type}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentTransactions;
