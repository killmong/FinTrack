import { useEffect } from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { useRoleStore } from "../../store/useRoleStore";
import { ROLE_OPTIONS, ROLES } from "../../constants/roles";
import type { Role } from "../../types/role.types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const { role, setRole } = useRoleStore();
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);
  const { user, logout } = useAuthStore();

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
      // Added pl-16 on mobile to avoid overlapping with the Sidebar's fixed hamburger menu
      className="h-16 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between pr-4 pl-16 md:px-6"
    >
      {/* Left */}
      <h1 className="text-sm sm:text-base font-semibold text-surface-800 dark:text-gray-50 truncate pr-2">
        Welcome back
      </h1>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          {/* Hide "Role:" label on small screens */}
          <span className="hidden sm:inline text-sm text-orange-500">
            Role:
          </span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="text-xs sm:text-sm border border-surface-200 dark:border-surface-700 rounded-lg px-2 py-1.5 sm:px-3 bg-white dark:bg-surface-800 text-surface-800 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {ROLES[r].label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-100 dark:bg-surface-800">
          <div className="w-6 h-6 rounded-full bg-linear-to-br from-orange-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-surface-700 dark:text-gray-50 hidden sm:block">
            {user?.name}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={logout}
          className="p-2 rounded-xl text-gray-50 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950 transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>

        {/* Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-surface-500 hover:bg-orange-50 dark:hover:bg-surface-800 dark:text-gray-50 transition-colors shrink-0"
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
