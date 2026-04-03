interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}
import { motion } from "motion/react";
const variants = {
  primary:
    "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-md shadow-orange-200 dark:shadow-orange-950",
  secondary:
    "bg-surface-100 hover:bg-surface-200 text-surface-800 dark:bg-surface-800 dark:hover:bg-surface-700 dark:text-surface-100",
  danger:
    "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white",
  ghost:
    "bg-transparent hover:bg-orange-50 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  fullWidth = false,
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
      inline-flex items-center justify-center gap-2 font-medium rounded-xl
      transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]}
      ${sizes[size]}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `}
    >
      {children}
    </motion.button>
  );
};

export default Button;
