import Card from "../common/Card";
import type { CategoryInsight } from "../../types/insight.types";
import { formatCurrency } from "../../utils/formatCurrency";
import { CATEGORY_COLORS } from "../../constants/chartColors";

interface TopSpendingCategoryProps {
  data: CategoryInsight[];
}

const TopSpendingCategory = ({ data }: TopSpendingCategoryProps) => {
  if (data.length === 0) {
    return (
      <Card>
        <p className="text-sm text-gray-400 text-center py-6">
          No expense data available
        </p>
      </Card>
    );
  }

  const max = data[0].total;

  return (
    <Card>
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-6">
        Spending by Category
      </h2>

      <div className="flex flex-col gap-4">
        {data.map((item) => {
          const color = CATEGORY_COLORS[item.category] ?? "#94a3b8";
          const barWidth = max > 0 ? (item.total / max) * 100 : 0;

          return (
            <div key={item.category}>
              {/* Label Row */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({item.count} txn{item.count !== 1 ? "s" : ""})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {item.percentage}%
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {formatCurrency(item.total)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TopSpendingCategory;
