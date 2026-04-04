import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";

// Inner component — has access to router context
const AppContent = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-surface-50 dark:bg-surface-950 overflow-hidden">
       
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        <Navbar />

        
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontSize: "14px" },
        }}
      />
    </div>
  );
};

// Outer component — provides router context
const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
