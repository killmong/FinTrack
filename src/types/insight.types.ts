export interface CategoryInsight {
  category: string
  total: number
  percentage: number
  count: number
}

export interface MonthlyInsight {
  month: string
  income: number
  expenses: number
  net: number
}

export interface InsightSummary {
  highestSpendingCategory: CategoryInsight
  lowestSpendingCategory: CategoryInsight
  mostActiveMonth: string
  averageMonthlyExpense: number
  averageMonthlyIncome: number
  totalSavings: number
}