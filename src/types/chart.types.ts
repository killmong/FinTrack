export interface BalanceTrendDataPoint {
  month: string;
  balance: number;
  income: number;
  expenses: number;
}

export interface SpendingBreakdownDataPoint {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyComparisonDataPoint {
  month: string;
  current: number;
  previous: number;
}
