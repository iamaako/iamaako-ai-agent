import { motion } from "framer-motion";
import type { PipelineRun } from "@/types/agent";

const CICDTimeline = ({ runs, retryLimit = 5 }: { runs: PipelineRun[]; retryLimit?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="cyber-panel-light"
    >
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <h3 className="font-heading text-xl font-bold text-panel-light-fg">CI/CD PIPELINE</h3>
        <span className="cyber-badge border-panel-light-fg/20 text-panel-light-fg/60">
          {runs.length}/{retryLimit} RUNS
        </span>
      </div>

      <div className="px-6 pb-6 space-y-3">
        {runs.map((run, i) => (
          <motion.div
            key={run.iteration}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center gap-4 border border-panel-light-fg/10 p-3"
          >
            {/* Status indicator */}
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
              run.status === "passed" ? "bg-success" : "bg-destructive"
            }`} />

            <div className="flex-1 flex items-center justify-between">
              <div>
                <span className="font-heading text-sm font-bold text-panel-light-fg">
                  RUN #{run.iteration}
                </span>
                <span className={`ml-3 cyber-badge text-[9px] ${
                  run.status === "passed"
                    ? "bg-success/10 text-success border-success/20"
                    : "bg-destructive/10 text-destructive border-destructive/20"
                }`}>
                  {run.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-panel-light-fg/50 font-tech">
                <span>{run.duration}s</span>
                <span>{new Date(run.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CICDTimeline;
