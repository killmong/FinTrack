import { ArrowUpDown } from "lucide-react";
import TransactionRow from "./TransactionRow";
import EmptyState from "../common/EmptyState";
import type { Transaction } from "../../types/transaction.types";
import { useFilterStore } from "../../store/useFilterStore";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionTable = ({
  transactions,
  onEdit,
  onDelete,
}: TransactionTableProps) => {
  const { sortBy, setSortBy, sortOrder, setSortOrder } = useFilterStore();

  const handleSort = (field: "date" | "amount") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="Try adjusting your filters or search query."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
      <table className="w-full">
        {/* Header */}
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Type
            </th>
            <th
              className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => handleSort("date")}
            >
              <span className="flex items-center gap-1">
                Date <ArrowUpDown className="w-3 h-3" />
              </span>
            </th>
            <th
              className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => handleSort("amount")}
            >
              <span className="flex items-center justify-end gap-1">
                Amount <ArrowUpDown className="w-3 h-3" />
              </span>
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
          {transactions.map((t) => (
            <TransactionRow
              key={t.id}
              transaction={t}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
