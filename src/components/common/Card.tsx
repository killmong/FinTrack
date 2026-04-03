import { motion } from "motion/react";
import { scaleIn, defaultTransition } from "../../utils/animations";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

const Card = ({
  children,
  className = "",
  onClick,
  animate = true,
  delay = 0,
}: CardProps) => {
  return (
    <motion.div
      variants={scaleIn}
      initial={animate ? "hidden" : false}
      animate={animate ? "visible" : false}
      transition={{ ...defaultTransition, delay }}
      whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(249,115,22,0.12)" }}
      onClick={onClick}
      className={`bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-sm p-6 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
