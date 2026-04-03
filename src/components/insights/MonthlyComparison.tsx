import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "../common/Card";
import type { MonthlyInsight } from "../../types/insight.types";
import { formatCurrencyShort } from "../../utils/formatCurrency";
import { CHART_COLORS } from "../../constants/chartColors";

interface MonthlyComparisonProps {
  data: MonthlyInsight[];
}

const MonthlyComparison = ({ data }: MonthlyComparisonProps) => {
  return (
    <Card className="col-span-2">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-6">
        Monthly Income vs Expenses
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">
          No data available
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCurrencyShort}
            />
            <Tooltip
              formatter={(value) =>
                value != null ? formatCurrencyShort(Number(value)) : ""
              }
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#f9fafb",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }} />
            <Bar
              dataKey="income"
              name="Income"
              fill={CHART_COLORS.income}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill={CHART_COLORS.expense}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Net Row */}
      {data.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {data.map((item) => (
            <div
              key={item.month}
              className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 min-w-[80px]"
            >
              <span className="text-xs text-gray-400 mb-0.5">{item.month}</span>
              <span
                className={`text-xs font-semibold ${
                  item.net >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {item.net >= 0 ? "+" : ""}
                {formatCurrencyShort(item.net)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default MonthlyComparison;
