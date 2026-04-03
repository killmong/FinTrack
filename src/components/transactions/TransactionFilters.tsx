import { useFilterStore } from "../../store/useFilterStore";
import { CATEGORIES } from "../../constants/categories";
import type { Category, TransactionType } from "../../types/transaction.types";

const TransactionFilters = () => {
  const {
    category,
    type,
    sortBy,
    sortOrder,
    setCategory,
    setType,
    setSortBy,
    setSortOrder,
    resetFilters,
  } = useFilterStore();

  const selectClass =
    "text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category | "All")}
        className={selectClass}
      >
        <option value="All">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Type Filter */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType | "All")}
        className={selectClass}
      >
        <option value="All">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Sort By */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
        className={selectClass}
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>

      {/* Sort Order */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        className={selectClass}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 font-medium px-2 py-2 hover:underline"
      >
        Reset
      </button>
    </div>
  );
};

export default TransactionFilters;
