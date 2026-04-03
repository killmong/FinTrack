import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "../common/Card";
import { getSpendingBreakdown } from "../../services/insightService";
import type { Transaction } from "../../types/transaction.types";
import { formatCurrency } from "../../utils/formatCurrency";

interface SpendingBreakdownChartProps {
  transactions: Transaction[];
}

const SpendingBreakdownChart = ({
  transactions,
}: SpendingBreakdownChartProps) => {
  const data = getSpendingBreakdown(transactions);

  return (
    <Card>
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-6">
        Spending Breakdown
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">
          No expense data available
        </p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="amount"
                nameKey="category"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  value != null ? formatCurrency(Number(value)) : ""
                }
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#f9fafb",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>

          {/* Category List */}
          <div className="mt-4 flex flex-col gap-2">
            {data.slice(0, 4).map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.category}
                  </span>
                </div>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default SpendingBreakdownChart;
