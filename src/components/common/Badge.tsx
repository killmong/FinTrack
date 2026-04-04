import type { TransactionType } from '../../types/transaction.types'
import { CATEGORY_COLORS } from '../../constants/chartColors'

interface BadgeProps {
  label: string
  type?: 'category' | 'transaction'
  transactionType?: TransactionType
  className?: string
}

const Badge = ({
  label,
  type = 'category',
  transactionType,
  className = '',
}: BadgeProps) => {

  // Transaction type badge — income/expense
  if (type === 'transaction' && transactionType) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          transactionType === 'income'
            ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
            : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
        } ${className}`}
      >
        {transactionType === 'income' ? '↑' : '↓'} {label}
      </span>
    )
  }

  // Category badge — colored dot
  const color = CATEGORY_COLORS[label] ?? '#94a3b8'

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ${className}`}
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  )
}

export default Badge