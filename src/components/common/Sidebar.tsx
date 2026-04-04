import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Wallet,
  Menu,
  X,
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
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button - Visible only on small screens */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-lg shadow-sm text-surface-600 dark:text-surface-400 focus:outline-none"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay / Backdrop */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo & Mobile Close Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={defaultTransition}
          className="flex items-center justify-between md:justify-start gap-3 px-6 py-5 border-b border-surface-200 dark:border-surface-800"
        >
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-orange-500 to-pink-500 p-2 rounded-xl shadow-lg shadow-orange-200 dark:shadow-orange-950">
              <Wallet className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              FinTrack
            </span>
          </div>

          {/* Close Button for Mobile */}
          <button
            onClick={closeSidebar}
            className="md:hidden p-1 rounded-md text-surface-500 hover:text-surface-700 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-200 dark:hover:bg-surface-800"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Nav Links */}
        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto"
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
                onClick={closeSidebar} // Auto-close menu on mobile after selection
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-linear-to-r from-orange-500 to-pink-500 text-white shadow-md shadow-orange-200 dark:shadow-orange-950"
                      : "text-surface-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-surface-800 hover:text-orange-500"
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
    </>
  );
};

export default Sidebar;
