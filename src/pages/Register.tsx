import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { cubicBezier } from "motion/react";
import { Wallet, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const ease = cubicBezier(0.25, 0.46, 0.45, 0.94);

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError, token } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    await register(form);
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl border border-surface-200
    dark:border-surface-700 bg-white dark:bg-surface-800
    text-surface-800 dark:text-gray-50
    placeholder-surface-400 focus:outline-none
    focus:ring-2 focus:ring-orange-500 text-sm
  `;

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-pink-50 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-linear-to-br from-orange-500 to-pink-500 p-3 rounded-2xl shadow-lg shadow-orange-200 dark:shadow-orange-950 mb-3">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            FinTrack
          </h1>
          <p className="text-sm text-surface-500 dark:text-gray-50 mt-1">
            Create your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-surface-700 dark:text-gray-50 mb-1.5 block">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Arjun Singh"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-surface-700 dark:text-gray-50 mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                placeholder="arjun@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-surface-700 dark:text-gray-50 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2"
            >
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-surface-500 dark:text-gray-50 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
