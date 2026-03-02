import { motion } from "framer-motion";

interface LiveStatusProps {
  iteration: string;
  failures: number;
  fixes: number;
  runtime: string;
  step: string;
  log: string;
  status: string;
}

const LiveStatus = ({ iteration, failures, fixes, runtime, step, log, status }: LiveStatusProps) => {
  const stats = [
    { label: "ITERATION", value: iteration },
    { label: "FAILURES", value: failures.toString() },
    { label: "FIXES", value: fixes.toString() },
    { label: "RUNTIME", value: runtime },
  ];

  const isRunning = status === "RUNNING";
  const isPassed = status === "PASSED";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="cyber-panel-light p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            className={`w-2.5 h-2.5 rounded-full ${isPassed ? 'bg-success' : 'bg-destructive'}`}
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: isRunning ? 0.8 : 1.5 }}
          />
          <span className="font-heading text-lg font-bold text-panel-light-fg tracking-wider">LIVE STATUS</span>
        </div>
        <span className={`cyber-badge ${
          isPassed ? 'border-success/50 text-success bg-success/10' :
          isRunning ? 'border-warning/50 text-warning bg-warning/10' :
          'border-panel-light-fg/20 text-panel-light-fg/80 bg-panel-light-fg/5'
        }`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {stats.map(s => (
          <div key={s.label} className="border border-panel-light-fg/10 p-3 text-center hover:bg-panel-light-fg/5 transition-colors">
            <div className="font-heading text-2xl font-bold text-panel-light-fg">{s.value}</div>
            <div className="cyber-label text-[9px] text-panel-light-fg/50 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="text-xs flex items-center gap-2">
        <span className="text-primary font-bold font-heading">STEP &gt;</span>
        <span className="text-panel-light-fg/60 font-tech tracking-wider">{step}</span>
      </div>
      <div className="mt-1 text-[11px] text-panel-light-fg/40 font-tech">{log}</div>
    </motion.div>
  );
};

export default LiveStatus;
