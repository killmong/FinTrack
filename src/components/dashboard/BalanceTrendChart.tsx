import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "../common/Card";
import { getBalanceTrend } from "../../utils/calculateInsights";
import type { Transaction } from "../../types/transaction.types";
import { CHART_COLORS } from "../../constants/chartColors";
import { formatCurrencyShort } from "../../utils/formatCurrency";

interface BalanceTrendChartProps {
  transactions: Transaction[];
}

const BalanceTrendChart = ({ transactions }: BalanceTrendChartProps) => {
  const data = getBalanceTrend(transactions);

  return (
    <Card className="col-span-2">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-6">
        Balance Trend
      </h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">
          No data available
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={CHART_COLORS.income}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={CHART_COLORS.income}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={CHART_COLORS.expense}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={CHART_COLORS.expense}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={CHART_COLORS.balance}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={CHART_COLORS.balance}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

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
            <Area
              type="monotone"
              dataKey="income"
              stroke={CHART_COLORS.income}
              fill="url(#incomeGrad)"
              strokeWidth={2}
              name="Income"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={CHART_COLORS.expense}
              fill="url(#expenseGrad)"
              strokeWidth={2}
              name="Expenses"
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke={CHART_COLORS.balance}
              fill="url(#balanceGrad)"
              strokeWidth={2}
              name="Balance"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default BalanceTrendChart;
