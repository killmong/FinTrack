import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

// Full date — March 15, 2024
export const formatDate = (date: string): string => {
  return format(new Date(date), "MMMM dd, yyyy");
};

// Short date — Mar 15
export const formatDateShort = (date: string): string => {
  return format(new Date(date), "MMM dd");
};

// Month year — March 2024
export const formatMonthYear = (date: string): string => {
  return format(new Date(date), "MMM yyyy");
};

// Relative — Today, Yesterday, 3 days ago
export const formatRelativeDate = (date: string): string => {
  const d = new Date(date);
  if (isToday(d)) return "Today";
  if (isYesterday(d)) return "Yesterday";
  return formatDistanceToNow(d, { addSuffix: true });
};

// For input fields — 2024-03-15
export const formatDateInput = (date: string): string => {
  return format(new Date(date), "yyyy-MM-dd");
};
