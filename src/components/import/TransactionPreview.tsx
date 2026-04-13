import type { ParsedImportRow } from "../../types/import.types";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { categorizeTransaction } from "../../utils/categorizeTransaction";
import Badge from "../common/Badge";

interface TransactionPreviewProps {
  rows: ParsedImportRow[];
}

const TransactionPreview = ({ rows }: TransactionPreviewProps) => {
  const preview = rows.slice(0, 10);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-surface-500 dark:text-surface-400">
        Showing first {preview.length} of {rows.length} transactions
      </p>

      <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800">
        <table className="w-full text-xs">
          <thead className="bg-surface-50 dark:bg-surface-800">
            <tr>
              <th className="px-3 py-2 text-left text-surface-500 font-medium">
                Date
              </th>
              <th className="px-3 py-2 text-left text-surface-500 font-medium">
                Description
              </th>
              <th className="px-3 py-2 text-left text-surface-500 font-medium">
                Category
              </th>
              <th className="px-3 py-2 text-left text-surface-500 font-medium">
                Type
              </th>
              <th className="px-3 py-2 text-right text-surface-500 font-medium">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-surface-900 divide-y divide-surface-100 dark:divide-surface-800">
            {preview.map((row, i) => (
              <tr key={i}>
                <td className="px-3 py-2 text-surface-600 dark:text-surface-400 whitespace-nowrap">
                  {formatDate(row.date)}
                </td>
                <td className="px-3 py-2 text-surface-800 dark:text-surface-100 max-w-[160px] truncate">
                  {row.description}
                </td>
                <td className="px-3 py-2">
                  <Badge label={categorizeTransaction(row.description)} />
                </td>
                <td className="px-3 py-2">
                  <Badge
                    label={row.type}
                    type="transaction"
                    transactionType={row.type}
                  />
                </td>
                <td className="px-3 py-2 text-right font-semibold whitespace-nowrap">
                  <span
                    className={
                      row.type === "income" ? "text-green-600" : "text-red-500"
                    }
                  >
                    {row.type === "income" ? "+" : "-"}
                    {formatCurrency(
                      row.type === "income" ? row.credit : row.debit,
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionPreview;
