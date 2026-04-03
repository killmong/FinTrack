import { Pencil, Trash2 } from "lucide-react";
import Badge from "../common/Badge";
import type { Transaction } from "../../types/transaction.types";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { useRoleStore } from "../../store/useRoleStore";
import { ROLES } from "../../constants/roles";

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}
import { motion } from "motion/react";
const TransactionRow = ({
  transaction,
  onEdit,
  onDelete,
}: TransactionRowProps) => {
  const { role } = useRoleStore();
  const permissions = ROLES[role];

  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ backgroundColor: "rgba(249,115,22,0.04)" }}
      transition={{ duration: 0.2 }}
      className="border-b border-surface-100 dark:border-surface-800 transition-colors"
    >
      {/* Title */}
      <td className="px-4 py-3">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
          {transaction.title}
        </span>
        {transaction.note && (
          <p className="text-xs text-gray-400 mt-0.5">{transaction.note}</p>
        )}
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        <Badge label={transaction.category} />
      </td>

      {/* Type */}
      <td className="px-4 py-3">
        <Badge
          label={transaction.type}
          type="transaction"
          transactionType={transaction.type}
        />
      </td>

      {/* Date */}
      <td className="px-4 py-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(transaction.date)}
        </span>
      </td>

      {/* Amount */}
      <td className="px-4 py-3 text-right">
        <span
          className={`text-sm font-semibold ${
            transaction.type === "income"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </span>
      </td>

      {/* Actions — Admin Only */}
      <td className="px-4 py-3 text-right">
        {permissions.canEdit && (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => onEdit(transaction)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(transaction.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </td>
    </motion.tr>
  );
};

export default TransactionRow;
