import { motion } from "framer-motion";
import type { Fix } from "@/types/agent";

const PatchDeployment = ({ fixes }: { fixes: Fix[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="cyber-panel-light"
    >
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <div>
          <h3 className="font-heading text-xl font-bold text-panel-light-fg">ITERATION MATRIX</h3>
          <div className="w-full h-0.5 bg-success mt-1" />
        </div>
        <span className="cyber-badge border-panel-light-fg/20 text-panel-light-fg/60">
          <span className="inline-flex gap-0.5 mr-1">
            {[1,2,3,4,5].map(i => (
              <span key={i} className={`w-1.5 h-3 ${i <= 3 ? 'bg-panel-light-fg' : 'bg-panel-light-fg/20'}`} />
            ))}
          </span>
          0 / 5 iterations
        </span>
      </div>

      <div className="px-6 pb-2">
        <h4 className="font-heading text-lg font-bold text-panel-light-fg mb-4">PATCH DEPLOYMENT</h4>
      </div>

      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {fixes.map((fix, i) => (
          <div
            key={i}
            className={`border border-panel-light-fg/15 p-4 relative ${
              i === 0 ? 'bg-panel-light-fg/5' : ''
            }`}
          >
            {/* Error header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-panel-light-fg flex items-center gap-1">
                <span className="text-destructive">&gt;</span> ERROR:
              </span>
              <span className="cyber-badge bg-panel-light-fg text-panel-light border-panel-light-fg text-[9px]">
                L{fix.line}
              </span>
            </div>

            {/* Description */}
            <p className="text-[11px] text-panel-light-fg/70 mb-3 line-clamp-2 font-tech">
              {fix.explanation || fix.commitMessage}
            </p>

            {/* Divider */}
            <div className="border-t border-panel-light-fg/10 pt-2">
              <span className="text-[10px] text-panel-light-fg/50 flex items-center gap-1">
                <span className="text-success">+</span>
                FIX APPLIED
                <span className="font-bold text-panel-light-fg ml-1">{fix.bugType}</span>
              </span>
            </div>

            {/* Cursor blink on first */}
            {i === 0 && (
              <span className="absolute bottom-4 left-[105px] w-0.5 h-3 bg-panel-light-fg blink" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PatchDeployment;
