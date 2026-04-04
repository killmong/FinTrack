import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Transaction, NewTransaction } from "../../types/transaction.types";
// import  { CATEGORIES } from "../../constants/categories";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../constants/categories";
import Button from "../common/Button";

interface TransactionFormProps {
  onSubmit: (data: NewTransaction) => void;
  onCancel: () => void;
  editingTransaction?: Transaction | null;
}

const TransactionForm = ({
  onSubmit,
  onCancel,
  editingTransaction,
}: TransactionFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewTransaction>({
    defaultValues: editingTransaction ?? {
      title: "",
      amount: 0,
      type: "expense",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
      note: "",
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    if (editingTransaction) {
      reset(editingTransaction);
    }
  }, [editingTransaction]);

  const inputClass =
    "w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass =
    "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1";

  const errorClass = "text-xs text-red-500 mt-1";

  const availableCategories =
    selectedType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Title */}
      <div>
        <label className={labelClass}>Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="e.g. Monthly Salary"
          className={inputClass}
        />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      {/* Amount */}
      <div>
        <label className={labelClass}>Amount</label>
        <input
          type="number"
          step="0.01"
          min="0"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 0.01, message: "Amount must be greater than 0" },
            valueAsNumber: true,
          })}
          placeholder="0.00"
          className={inputClass}
        />
        {errors.amount && <p className={errorClass}>{errors.amount.message}</p>}
      </div>

      {/* Type */}
      <div>
        <label className={labelClass}>Type</label>
        <select {...register("type")} className={inputClass}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className={labelClass}>Category</label>
        <select {...register("category")} className={inputClass}>
          {availableCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className={labelClass}>Date</label>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className={inputClass}
        />
        {errors.date && <p className={errorClass}>{errors.date.message}</p>}
      </div>

      {/* Note */}
      <div>
        <label className={labelClass}>Note (optional)</label>
        <input
          {...register("note")}
          placeholder="Add a note..."
          className={inputClass}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" fullWidth>
          {editingTransaction ? "Update Transaction" : "Add Transaction"}
        </Button>
        <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
