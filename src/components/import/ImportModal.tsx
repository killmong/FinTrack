import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cubicBezier } from "motion/react";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import Button from "../common/Button";
import FileUploader from "./FileUpLoader";
import TransactionPreview from "./TransactionPreview";
import ImportSummary from "./ImportSummary";
import  {
  parseSBIStatement,
  convertToTransactions,
} from "../../utils/parseSbiStatement";
import { useTransactionStore } from "../../store/useTransactionStore";
import type { ImportPreview } from "../../types/import.types";
import { AlertCircle } from "lucide-react";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "upload" | "preview" | "success";

const ease = cubicBezier(0.25, 0.46, 0.45, 0.94);

const ImportModal = ({ isOpen, onClose }: ImportModalProps) => {
  const { addTransaction } = useTransactionStore();

  const [step, setStep] = useState<Step>("upload");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [errors, setErrors] = useState<{ row: number; message: string }[]>([]);
  const [imported, setImported] = useState(0);

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    try {
      const { preview, errors } = await parseSBIStatement(file);
      setPreview(preview);
      setErrors(errors);
      setStep("preview");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to parse file");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!preview) return;
    setLoading(true);
    try {
      const transactions = convertToTransactions(preview.rows);
      let count = 0;
      for (const t of transactions) {
        await addTransaction(t);
        count++;
      }
      setImported(count);
      setStep("success");
      toast.success(`${count} transactions imported successfully`);
    } catch (err) {
        console.error("Error importing transactions:", err);
      toast.error("Import failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("upload");
    setPreview(null);
    setErrors([]);
    setImported(0);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        step === "upload"
          ? "Import SBI Statement"
          : step === "preview"
            ? "Preview Transactions"
            : "Import Complete"
      }
      size="lg"
    >
      <AnimatePresence mode="wait">
        {/* Step 1 — Upload */}
        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease }}
          >
            <FileUploader onFileSelect={handleFileSelect} loading={loading} />
            {loading && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                <p className="text-sm text-surface-500">Parsing statement...</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2 — Preview */}
        {step === "preview" && preview && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease }}
            className="flex flex-col gap-4"
          >
            {/* Summary Stats */}
            <ImportSummary preview={preview} />

            {/* Errors Warning */}
            {errors.length > 0 && (
              <div className="flex items-start gap-2 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-3 border border-yellow-200 dark:border-yellow-900">
                <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  {errors.length} rows could not be parsed and will be skipped.
                </p>
              </div>
            )}

            {/* Transaction Preview Table */}
            <TransactionPreview rows={preview.rows} />

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="secondary"
                onClick={() => setStep("upload")}
                fullWidth
              >
                Back
              </Button>
              <Button
                onClick={handleImport}
                disabled={loading || preview.rows.length === 0}
                fullWidth
              >
                {loading
                  ? "Importing..."
                  : `Import ${preview.totalRows} Transactions`}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3 — Success */}
        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease }}
            className="flex flex-col items-center gap-4 py-6 text-center"
          >
            <div className="bg-green-100 dark:bg-green-950 p-5 rounded-full">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="text-4xl"
              >
                ✅
              </motion.div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-surface-900 dark:text-white">
                Import Successful
              </h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                {imported} transactions have been added to your dashboard
              </p>
            </div>
            <Button onClick={handleClose} fullWidth>
              View Dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default ImportModal;
