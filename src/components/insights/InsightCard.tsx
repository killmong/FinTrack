import type { LucideIcon } from "lucide-react";
import Card from "../common/Card";

interface InsightCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
}

const trendStyles = {
  up: "text-green-600 dark:text-green-400",
  down: "text-red-600 dark:text-red-400",
  neutral: "text-gray-500 dark:text-gray-400",
};

const trendIcons = {
  up: "▲",
  down: "▼",
  neutral: "●",
};

const InsightCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = "neutral",
  trendLabel,
}: InsightCardProps) => {
  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div className="bg-blue-50 dark:bg-blue-950 p-2.5 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        {trendLabel && (
          <span className={`text-xs font-medium ${trendStyles[trend]}`}>
            {trendIcons[trend]} {trendLabel}
          </span>
        )}
      </div>

      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
        {title}
      </p>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {subtitle}
        </p>
      )}
    </Card>
  );
};

export default InsightCard;
