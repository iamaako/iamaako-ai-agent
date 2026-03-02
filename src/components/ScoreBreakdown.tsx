import { motion } from "framer-motion";
import type { AgentResult } from "@/types/agent";

const ScoreBreakdown = ({ result }: { result: AgentResult }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="cyber-panel-olive p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-heading text-2xl font-bold opacity-70">DPM SYSTM</span>
        <span className="cyber-badge border-current/30">©2023</span>
      </div>

      <div className="text-[10px] uppercase tracking-wider opacity-60 mb-2">
        SORT<br />BEFORE<br />SENDING
      </div>
      <span className="cyber-badge border-current/40 mb-4">● SCORE</span>

      {/* Evaluation score */}
      <div className="bg-background text-foreground p-4 mt-4 mb-3">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm tracking-wider">EVALUATION</span>
          <motion.span
            className="font-heading text-5xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {result.finalScore}
          </motion.span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="text-[10px] flex justify-between mb-1 opacity-50">
        <span>0</span>
        <span>{result.finalScore} / {result.finalScore}</span>
      </div>
      <div className="w-full h-3 bg-background/30 mb-4">
        <motion.div
          className="h-full bg-success"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </div>

      {/* Score grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "BASE", value: result.baseScore },
          { label: "SPEED BONUS", value: result.speedBonus },
          { label: "CMT PENALTY", value: result.efficiencyPenalty },
          { label: "COMMITS", value: 1 },
        ].map(item => (
          <div key={item.label} className="border border-current/20 p-3 relative">
            <span className="cyber-label text-[10px] opacity-60">{item.label}</span>
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-current opacity-40" />
            <div className="font-heading text-2xl font-bold mt-1">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 text-[10px] opacity-50">
        <span className="font-heading">TS26</span>
        <div className="flex items-center gap-2">
          <span className="font-mono tracking-[0.5em]">▌▌▐▌▌</span>
          <span>CORP. INC ●</span>
          <span>● ◐ ◑</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreBreakdown;
