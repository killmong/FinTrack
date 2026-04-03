import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Wallet,
} from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  defaultTransition,
} from "../../utils/animations";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Transactions", path: "/transactions", icon: ArrowLeftRight },
  { label: "Insights", path: "/insights", icon: Lightbulb },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 flex flex-col">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={defaultTransition}
        className="flex items-center gap-3 px-6 py-5 border-b border-surface-200 dark:border-surface-800"
      >
        <div className="bg-linear-to-br from-orange-500 to-pink-500 p-2 rounded-xl shadow-lg shadow-orange-200 dark:shadow-orange-950">
          <Wallet className="text-white w-5 h-5" />
        </div>
        <span className="text-lg font-bold bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          FinTrack
        </span>
      </motion.div>

      {/* Nav Links */}
      <motion.nav
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex-1 px-4 py-6 flex flex-col gap-1"
      >
        {navItems.map(({ label, path, icon: Icon }) => (
          <motion.div
            key={path}
            variants={staggerItem}
            transition={defaultTransition}
          >
            <NavLink
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md shadow-orange-200 dark:shadow-orange-950"
                    : "text-surface-600 hover:bg-orange-50 dark:text-surface-400 dark:hover:bg-surface-800 hover:text-orange-500"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          </motion.div>
        ))}
      </motion.nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-800">
        <p className="text-xs text-surface-400 dark:text-surface-600">
          Finance Dashboard v1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
