import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useRoleStore } from "../../store/useRoleStore";
import { ROLE_OPTIONS, ROLES } from "../../constants/roles";
import type { Role } from "../../types/role.types";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Navbar = () => {
  const { role, setRole } = useRoleStore();
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-16 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between px-6"
    >
      {/* Left */}
      <h1 className="text-base font-semibold text-surface-800 dark:text-surface-100">
        Welcome back 👋
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-surface-500 dark:text-surface-400">
            Role:
          </span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="text-sm border border-surface-200 dark:border-surface-700 rounded-lg px-3 py-1.5 bg-white dark:bg-surface-800 text-surface-800 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {ROLES[r].label}
              </option>
            ))}
          </select>
        </div>

        {/* Role Badge */}
        <motion.span
          key={role}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            role === "admin"
              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
              : "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400"
          }`}
        >
          {role === "admin" ? "⚡ Admin" : "👁 Viewer"}
        </motion.span>

        {/* Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-surface-500 hover:bg-orange-50 dark:hover:bg-surface-800 dark:text-surface-400 transition-colors"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-orange-500" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Navbar;
