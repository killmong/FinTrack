import type { ImportPreview } from "../../types/import.types";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { TrendingUp, TrendingDown, Calendar, FileText } from "lucide-react";

interface ImportSummaryProps {
  preview: ImportPreview;
}

const ImportSummary = ({ preview }: ImportSummaryProps) => {
  const stats = [
    {
      label: "Total Transactions",
      value: preview.totalRows.toString(),
      icon: FileText,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950",
    },
    {
      label: "Total Income",
      value: formatCurrency(preview.totalIncome),
      icon: TrendingUp,
      color: "text-green-600 bg-green-50 dark:bg-green-950",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(preview.totalExpense),
      icon: TrendingDown,
      color: "text-red-500 bg-red-50 dark:bg-red-950",
    },
    {
      label: "Date Range",
      value: `${formatDate(preview.dateRange.from)} — ${formatDate(preview.dateRange.to)}`,
      icon: Calendar,
      color: "text-orange-600 bg-orange-50 dark:bg-orange-950",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 bg-surface-50 dark:bg-surface-800 rounded-xl p-3 border border-surface-200 dark:border-surface-700"
        >
          <div className={`p-2 rounded-lg ${stat.color}`}>
            <stat.icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-surface-500 dark:text-surface-400">
              {stat.label}
            </p>
            <p className="text-xs font-semibold text-surface-800 dark:text-surface-100 truncate">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImportSummary;
