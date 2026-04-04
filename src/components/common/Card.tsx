import { motion } from "motion/react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = ({ children, className = "", onClick }: CardProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white dark:bg-surface-900
        rounded-2xl border border-surface-200 dark:border-surface-800
        shadow-sm p-6
        transition-transform duration-200 ease-out
        hover:-translate-y-0.5
        hover:shadow-md
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;
