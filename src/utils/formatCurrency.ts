// src/utils/formatCurrency.ts
export const formatCurrency = (
  amount: number,
  currency: string = 'INR',
  locale: string = 'en-IN'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatCurrencyShort = (amount: number): string => {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(1)}Cr`
  if (amount >= 1_00_000)    return `₹${(amount / 1_00_000).toFixed(1)}L`
  if (amount >= 1_000)       return `₹${(amount / 1_000).toFixed(1)}k`
  return `₹${amount.toFixed(2)}`
}


// Just the sign + amount for transaction rows
export const formatTransactionAmount = (
  amount: number,
  type: "income" | "expense",
): string => {
  const formatted = formatCurrency(amount);
  return type === "income" ? `+${formatted}` : `-${formatted}`;
};
