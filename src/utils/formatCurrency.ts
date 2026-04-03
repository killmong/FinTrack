export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Short version — $1.2k, $3.4M
export const formatCurrencyShort = (amount: number): string => {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(1)}k`;
  }
  return `$${amount.toFixed(2)}`;
};

// Just the sign + amount for transaction rows
export const formatTransactionAmount = (
  amount: number,
  type: "income" | "expense",
): string => {
  const formatted = formatCurrency(amount);
  return type === "income" ? `+${formatted}` : `-${formatted}`;
};
