import { motion } from "framer-motion";
import type { AgentResult } from "@/types/agent";

const RunSummaryCard = ({ result }: { result: AgentResult }) => {
  const items = [
    { label: "REPO", value: result.repoUrl.replace("https://github.com/", ""), link: result.repoUrl },
    { label: "TEAM", value: result.teamName },
    { label: "LEADER", value: result.leaderName },
    { label: "BRANCH", value: result.branchName },
    { label: "FORK", value: result.forkUrl ? result.forkUrl.replace("https://github.com/", "") : "—", link: result.forkUrl },
    { label: "PR", value: result.prUrl ? "VIEW PR ↗" : "—", link: result.prUrl },
    { label: "BUGS", value: `${result.failuresDetected} / ${result.fixesApplied}` },
    { label: "TIME", value: `${result.totalTime.toFixed(2)}s` },
    { label: "CI", value: result.cicdStatus },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="cyber-panel-coral p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-heading text-3xl font-bold opacity-60">CBRPNK</span>
        <span className="cyber-badge border-current/30 bg-background/10">#E0A15E</span>
      </div>

      {/* ADSR bars decorative */}
      <div className="flex items-end gap-2 mb-4">
        {[60, 80, 40, 70].map((h, i) => (
          <div key={i} className="w-4 bg-current/60" style={{ height: `${h}px` }} />
        ))}
        <div className="ml-3 text-[10px] leading-tight opacity-70 uppercase tracking-wider max-w-[200px]">
          THE LEGACY OF AUTONOMOUS SYSTEMS REMAINS STRONG IN CONTEMPORARY INFRA, INSPIRING NEW GENERATION.
        </div>
      </div>

      <div className="border border-current/20 divide-y divide-current/20">
        {items.map(item => (
          <div key={item.label} className="flex items-center justify-between px-4 py-2.5">
            <span className="cyber-label text-xs">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-current/40">▶</span>
              {item.label === "CI" ? (
                <span className={`cyber-badge text-[10px] ${
                  item.value === "PASSED" 
                    ? "bg-success text-success-foreground border-success" 
                    : "bg-destructive text-destructive-foreground border-destructive"
                }`}>
                  {item.value}
                </span>
              ) : item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-tech text-xs border border-primary/40 px-2 py-0.5 bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                  {item.value}
                </a>
              ) : (
                <span className="font-tech text-xs border border-current/20 px-2 py-0.5 bg-background/10">
                  {item.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 text-[10px] opacity-50">
        <span className="font-heading">UA 570-B</span>
        <div className="flex items-center gap-2">
          <span className="font-mono tracking-[0.5em]">▌▌▐▌▌▌</span>
          <span>CORP. INC ●</span>
          <span>● ◐ ◑</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RunSummaryCard;
