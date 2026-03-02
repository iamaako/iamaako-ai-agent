import { motion } from "framer-motion";

interface ErrorPanelProps {
  error: string;
  logs: string[];
}

const ERROR_CATEGORIES: Record<string, { icon: string; label: string; hint: string }> = {
  fork: { icon: "⑂", label: "FORK FAILURE", hint: "Token may lack 'repo' scope or the repository is restricted." },
  clone: { icon: "⬇", label: "CLONE FAILURE", hint: "Repository may be private or the URL is incorrect." },
  pull: { icon: "⤴", label: "PR CREATION FAILED", hint: "Ensure your token has write access to the repository." },
  auth: { icon: "🔒", label: "AUTHENTICATION ERROR", hint: "Your GitHub token is invalid or expired. Generate a new Classic Token with 'repo' scope." },
  token: { icon: "🔑", label: "TOKEN MISSING", hint: "Please provide a GitHub Personal Access Token in the form above." },
  branch: { icon: "⎇", label: "BRANCH ERROR", hint: "Could not create or access the target branch." },
  network: { icon: "⚡", label: "NETWORK ERROR", hint: "Connection to GitHub API failed. Check your internet and try again." },
  default: { icon: "✕", label: "SYSTEM ERROR", hint: "An unexpected error occurred. Check the logs below for details." },
};

function categorizeError(error: string): { icon: string; label: string; hint: string } {
  const lower = error.toLowerCase();
  if (lower.includes("fork")) return ERROR_CATEGORIES.fork;
  if (lower.includes("clone")) return ERROR_CATEGORIES.clone;
  if (lower.includes("pull request") || lower.includes("pr ")) return ERROR_CATEGORIES.pull;
  if (lower.includes("auth") || lower.includes("401") || lower.includes("403")) return ERROR_CATEGORIES.auth;
  if (lower.includes("token") || lower.includes("no github")) return ERROR_CATEGORIES.token;
  if (lower.includes("branch") || lower.includes("ref")) return ERROR_CATEGORIES.branch;
  if (lower.includes("fetch") || lower.includes("network") || lower.includes("timeout")) return ERROR_CATEGORIES.network;
  return ERROR_CATEGORIES.default;
}

const ErrorPanel = ({ error, logs }: ErrorPanelProps) => {
  const category = categorizeError(error);
  const errorLogs = logs.filter(l => l.includes("ERROR") || l.includes("⚠") || l.includes("FAILED") || l.includes("error"));
  const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="cyber-panel p-0 overflow-hidden border-destructive/30"
    >
      {/* Red top accent */}
      <div className="h-1 bg-gradient-to-r from-destructive/60 via-destructive to-destructive/60" />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-destructive/15 bg-destructive/[0.04]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-destructive/30 bg-destructive/10 flex items-center justify-center">
            <motion.span
              className="text-destructive font-heading text-lg"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {category.icon}
            </motion.span>
          </div>
          <div>
            <span className="font-heading text-xs tracking-[0.3em] text-destructive block">
              {category.label}
            </span>
            <span className="text-[9px] font-tech text-muted-foreground/30 tracking-wider">
              EXCEPTION AT {timestamp}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-destructive/70"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span className="text-[9px] font-tech text-destructive/50 tracking-widest">CRITICAL</span>
        </div>
      </div>

      {/* Error body */}
      <div className="px-5 py-4 space-y-4">
        {/* Main error message */}
        <div className="p-4 border border-destructive/15 bg-destructive/[0.03] rounded-sm">
          <div className="text-[9px] font-tech text-destructive/40 tracking-widest mb-2">ERROR_MESSAGE</div>
          <p className="text-sm text-foreground/80 font-tech leading-relaxed">{error}</p>
        </div>

        {/* Hint / suggestion */}
        <div className="p-3 border border-warning/15 bg-warning/[0.03] rounded-sm flex items-start gap-3">
          <span className="text-warning text-sm mt-0.5 shrink-0">💡</span>
          <div>
            <div className="text-[9px] font-tech text-warning/50 tracking-widest mb-1">SUGGESTED_ACTION</div>
            <p className="text-xs text-muted-foreground/70 font-tech leading-relaxed">{category.hint}</p>
          </div>
        </div>

        {/* Error trace from logs */}
        {errorLogs.length > 0 && (
          <div>
            <div className="text-[9px] font-tech text-destructive/40 tracking-widest mb-2 flex items-center gap-2">
              <span className="w-4 h-px bg-destructive/20" />
              STACK_TRACE ({errorLogs.length} entries)
            </div>
            <div className="border border-destructive/10 bg-black/30 rounded-sm p-3 max-h-[200px] overflow-y-auto space-y-1">
              {errorLogs.map((log, i) => (
                <div key={i} className="text-[11px] font-tech leading-relaxed flex items-start gap-2">
                  <span className="text-destructive/30 shrink-0 text-[9px] mt-0.5 w-4 text-right">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`${
                    log.includes("ERROR") || log.includes("FAILED") 
                      ? "text-destructive/70" 
                      : "text-warning/60"
                  }`}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System diagnostics */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "EXIT CODE", value: "1", color: "text-destructive/60" },
            { label: "PROCESS", value: "TERMINATED", color: "text-destructive/60" },
            { label: "RECOVERY", value: "MANUAL", color: "text-warning/60" },
          ].map((item) => (
            <div key={item.label} className="border border-border bg-muted/30 p-2.5 rounded-sm">
              <div className="text-[8px] font-tech text-muted-foreground/30 tracking-widest mb-1">{item.label}</div>
              <div className={`text-[11px] font-heading tracking-wider ${item.color}`}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-5 py-2 border-t border-destructive/10 bg-destructive/[0.02] flex items-center justify-between">
        <span className="text-[8px] font-tech text-destructive/25 tracking-wider">
          SIG:ABORT │ PID:4827 │ ERRNO:0x{Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0')}
        </span>
        <span className="text-[8px] font-tech text-muted-foreground/20 tracking-wider">
          RETRY WITH VALID CREDENTIALS
        </span>
      </div>
    </motion.div>
  );
};

export default ErrorPanel;
