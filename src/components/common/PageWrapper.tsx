import { motion } from "motion/react";
import { cubicBezier } from "motion/react";

const ease = cubicBezier(0.25, 0.46, 0.45, 0.94);

const PageWrapper = ({ children }: { children: React.ReactNode }) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease }}
      className="flex flex-col gap-6"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
