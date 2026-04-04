import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useTransactionStore } from "../store/useTransactionStore";

import { useRoleStore } from "../store/useRoleStore";
import { ROLES } from "../constants/roles";
import type { Transaction, NewTransaction } from "../types/transaction.types";
import TransactionSearch from "../components/transactions/TransactionSearch";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionForm from "../components/transactions/TransactionForm";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import { useTransactions } from "../hooks/useTransactions";
import { exportToCSV, exportToJSON } from "../utils/exportData";
import { Download } from "lucide-react";
import PageWrapper from "../components/common/PageWrapper";
const Transactions = () => {
  useTransactionStore();
  const { role } = useRoleStore();
  const permissions = ROLES[role];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  // Filter + Sort

  const {
    filtered,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();
  const handleAdd = async (data: NewTransaction) => {
    await addTransaction(data);
    toast.success("Transaction added");
    setIsModalOpen(false);
  };

  const handleUpdate = async (data: NewTransaction) => {
    if (!editingTransaction) return;
    await updateTransaction(editingTransaction.id, data);
    toast.success("Transaction updated");
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
    toast.success("Transaction deleted");
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Transactions
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                exportToCSV(filtered);
                toast.success("Exported as CSV");
              }}
            >
              <Download className="w-4 h-4" />
              CSV
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                exportToJSON(filtered);
                toast.success("Exported as JSON");
              }}
            >
              <Download className="w-4 h-4" />
              JSON
            </Button>

            {permissions.canAdd && (
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4" />
                Add Transaction
              </Button>
            )}
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <TransactionSearch />
          <TransactionFilters />
        </div>

        {/* Table */}
        <TransactionTable
          transactions={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
        >
          <TransactionForm
            onSubmit={editingTransaction ? handleUpdate : handleAdd}
            onCancel={handleCloseModal}
            editingTransaction={editingTransaction}
          />
        </Modal>
      </div>
    </PageWrapper>
  );
};

export default Transactions;
