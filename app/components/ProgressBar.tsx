"use client";
import {motion} from "framer-motion";

interface ProgressBarProps {
  completed: number;
  total: number;
}

const ProgressBar = ({ completed, total }: ProgressBarProps) => {
  const pct = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
