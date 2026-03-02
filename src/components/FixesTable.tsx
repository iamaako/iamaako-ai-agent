import { motion } from "framer-motion";
import type { Fix } from "@/types/agent";

const FixesTable = ({ fixes }: { fixes: Fix[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="cyber-panel-light"
    >
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <h3 className="font-heading text-2xl font-bold text-panel-light-fg">FIX DB</h3>
        <span className="cyber-badge border-panel-light-fg/20 text-panel-light-fg/60">LNK/01</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-panel-light-fg/10 bg-panel-light-fg/5">
              <th className="text-left px-6 py-3 cyber-label text-panel-light-fg/60">FILE</th>
              <th className="text-left px-4 py-3 cyber-label text-panel-light-fg/60">BUG TYPE</th>
              <th className="text-center px-4 py-3 cyber-label text-panel-light-fg/60">LINE</th>
              <th className="text-left px-4 py-3 cyber-label text-panel-light-fg/60">COMMIT MESSAGE</th>
              <th className="text-center px-4 py-3 cyber-label text-panel-light-fg/60">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {fixes.map((fix, i) => (
              <tr
                key={i}
                className="border-b border-panel-light-fg/5 hover:bg-panel-light-fg/5 transition-colors"
              >
                <td className="px-6 py-3 font-tech text-xs text-panel-light-fg">{fix.file}</td>
                <td className="px-4 py-3">
                  <span className="cyber-badge bg-panel-light-fg/10 text-panel-light-fg border-panel-light-fg/20 text-[10px]">
                    {fix.bugType}
                  </span>
                </td>
                <td className="px-4 py-3 text-center font-tech text-xs text-panel-light-fg/70">L{fix.line}</td>
                <td className="px-4 py-3 font-tech text-xs text-panel-light-fg/70 max-w-[300px] truncate">
                  {fix.commitMessage}
                </td>
                <td className="px-4 py-3 text-center">
                  {fix.status === "fixed" ? (
                    <span className="text-success text-xs font-bold">✓ Fixed</span>
                  ) : (
                    <span className="text-destructive text-xs font-bold">✗ Failed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default FixesTable;
