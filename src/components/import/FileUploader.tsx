import { useRef, useState } from "react";
import { Upload, FileSpreadsheet, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  loading: boolean;
}

const ACCEPTED = [".xls", ".xlsx", ".csv"];

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState<File | null>(null);

  const handleFile = (file: File) => {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED.includes(ext)) {
      alert("Please upload an XLS, XLSX, or CSV file");
      return;
    }
    setSelected(file);
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Drop Zone */}
      <motion.div
        animate={{ borderColor: dragOver ? "#f97316" : "#e4e4e7" }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xls,.xlsx,.csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <div className="flex flex-col items-center gap-3">
          <div className="bg-orange-100 dark:bg-orange-950 p-4 rounded-full">
            <Upload className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-surface-800 dark:text-surface-100">
              Drop your SBI statement here
            </p>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
              Supports XLS, XLSX, CSV — download from YONO or Net Banking
            </p>
          </div>
          <span className="text-xs bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full">
            Browse file
          </span>
        </div>
      </motion.div>

      {/* Selected File */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-center gap-3 bg-surface-50 dark:bg-surface-800 rounded-xl px-4 py-3 border border-surface-200 dark:border-surface-700"
          >
            <FileSpreadsheet className="w-5 h-5 text-green-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-800 dark:text-surface-100 truncate">
                {selected.name}
              </p>
              <p className="text-xs text-surface-400">
                {(selected.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
              }}
              className="p-1 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-400"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-900">
        <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">
          How to download your SBI statement
        </p>
        <ol className="text-xs text-blue-600 dark:text-blue-400 space-y-1 list-decimal list-inside">
          <li>Login to YONO SBI or OnlineSBI</li>
          <li>Go to My Accounts → Account Statement</li>
          <li>Select date range and click Download</li>
          <li>Choose XLS or CSV format</li>
          <li>Upload the downloaded file here</li>
        </ol>
      </div>
    </div>
  );
};

export default FileUploader;
