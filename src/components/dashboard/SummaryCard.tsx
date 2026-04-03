import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Card from "../common/Card";

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  type: "balance" | "income" | "expense";
  percentageChange?: number;
  delay?: number;
}

const typeStyles = {
  balance: {
    icon: "from-orange-500 to-pink-500",
    shadow: "shadow-orange-200 dark:shadow-orange-950",
    amount: "text-surface-900 dark:text-white",
    background:
      "from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30",
  },
  income: {
    icon: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-200 dark:shadow-emerald-950",
    amount: "text-emerald-600 dark:text-emerald-400",
    background:
      "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
  },
  expense: {
    icon: "from-rose-400 to-red-500",
    shadow: "shadow-rose-200 dark:shadow-rose-950",
    amount: "text-rose-600 dark:text-rose-400",
    background:
      "from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30",
  },
};

// Animated number counter
const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = ref.current;
    const end = value;
    const duration = 1000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(start + (end - start) * ease));
      if (progress < 1) requestAnimationFrame(tick);
      else ref.current = end;
    };

    requestAnimationFrame(tick);
  }, [value]);

  return <span>${display.toLocaleString()}</span>;
};

const SummaryCard = ({
  title,
  amount,
  icon: Icon,
  type,
  percentageChange,
  delay = 0,
}: SummaryCardProps) => {
  const styles = typeStyles[type];

  return (
    <Card delay={delay}>
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${styles.background} opacity-60`}
      />
      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-surface-500 dark:text-surface-400">
            {title}
          </span>
          <span className={`text-2xl font-bold ${styles.amount}`}>
            <AnimatedNumber value={amount} />
          </span>
          {percentageChange !== undefined && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.3 }}
              className={`text-xs font-medium ${
                percentageChange >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {percentageChange >= 0 ? "▲" : "▼"} {Math.abs(percentageChange)}%
              vs last month
            </motion.span>
          )}
        </div>

        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className={`bg-gradient-to-br ${styles.icon} p-3 rounded-xl shadow-lg ${styles.shadow}`}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
      </div>
    </Card>
  );
};

export default SummaryCard;
