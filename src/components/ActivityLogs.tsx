import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTerminalSound } from "@/hooks/useTerminalSound";

const SYSTEM_BOOT_LINES = [
  "╔══════════════════════════════════════════════════════╗",
  "║  SELF-HEALING NODE — AUTONOMOUS REPAIR SYSTEM v2.4  ║",
  "║  ████████████████████████████████████████████████    ║",
  "╚══════════════════════════════════════════════════════╝",
];

const ActivityLogs = ({ logs }: { logs: string[] }) => {
  const { playLogBeep, playSuccessBeep, playErrorBeep } = useTerminalSound();
  const prevLengthRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (logs.length > prevLengthRef.current) {
      const newLogs = logs.slice(prevLengthRef.current);
      newLogs.forEach((log, i) => {
        setTimeout(() => {
          if (log.includes("✓") || log.includes("PASSED")) {
            playSuccessBeep();
          } else if (log.includes("ERROR") || log.includes("FAILED")) {
            playErrorBeep();
          } else {
            playLogBeep();
          }
        }, i * 50);
      });
    }
    prevLengthRef.current = logs.length;

    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, playLogBeep, playSuccessBeep, playErrorBeep]);

  const timeStr = currentTime.toLocaleTimeString("en-US", { hour12: false });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-panel neon-border p-0 relative overflow-hidden"
    >
      {/* Terminal header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-success/20 bg-success/[0.03]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/70 border border-destructive/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning/70 border border-warning/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-success/70 border border-success/30" />
          </div>
          <span className="font-heading text-[10px] tracking-[0.3em] text-success/80">
            root@self-healing-node
          </span>
          <span className="text-success/25 text-[10px] font-tech">~</span>
          <span className="text-success/40 text-[10px] font-tech">/var/log/agent</span>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-tech tracking-wider">
          <span className="text-muted-foreground/20">PID:4827</span>
          <span className="text-muted-foreground/20">MEM:128MB</span>
          <span className="text-muted-foreground/20">CPU:2.4%</span>
          <span className="text-success/50 font-heading">{timeStr}</span>
          <span className="text-success/50 flex items-center gap-1">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-success/70 inline-block"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            LIVE
          </span>
        </div>
      </div>

      {/* Sub-header with system info */}
      <div className="px-4 py-1.5 border-b border-success/10 bg-success/[0.01] flex items-center justify-between">
        <div className="flex items-center gap-4 text-[8px] font-tech text-success/25 tracking-widest">
          <span>SSH:AES-256-GCM</span>
          <span>│</span>
          <span>PROTO:TLS1.3</span>
          <span>│</span>
          <span>UPTIME:4d 12h 33m</span>
          <span>│</span>
          <span>KERNEL:6.1.0-SHN</span>
        </div>
        <div className="text-[8px] font-tech text-success/20 tracking-wider">
          {logs.length} ENTRIES
        </div>
      </div>

      <div className="py-3">
        {logs.length === 0 ? (
          <div className="px-5 py-6">
            {/* ASCII boot screen */}
            <div className="mb-6">
              {SYSTEM_BOOT_LINES.map((line, i) => (
                <div key={i} className="text-[11px] font-tech text-success/20 leading-relaxed whitespace-pre select-none">
                  {line}
                </div>
              ))}
            </div>

            {/* System status grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "NEURAL ENGINE", status: "IDLE", color: "text-success/30" },
                { label: "CODE PARSER", status: "STANDBY", color: "text-success/30" },
                { label: "PATCH ENGINE", status: "READY", color: "text-success/40" },
              ].map((item) => (
                <div key={item.label} className="border border-success/8 p-2.5 bg-success/[0.02]">
                  <div className="text-[8px] font-tech text-success/20 tracking-widest mb-1">{item.label}</div>
                  <div className={`text-[11px] font-heading tracking-wider ${item.color}`}>{item.status}</div>
                </div>
              ))}
            </div>

            {/* Prompt */}
            <div className="flex items-center gap-2 text-success/25 text-[12px] font-tech">
              <span className="text-success/40">root@shn:~#</span>
              <span>awaiting deployment command...</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                className="text-success/50"
              >
                █
              </motion.span>
            </div>

            {/* Bottom decoration */}
            <div className="flex items-center gap-2 mt-5">
              <div className="flex-1 h-px bg-gradient-to-r from-success/10 to-transparent" />
              <span className="text-[7px] font-tech text-success/15 tracking-[0.4em]">END_OF_BUFFER</span>
              <div className="flex-1 h-px bg-gradient-to-l from-success/10 to-transparent" />
            </div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="text-left px-5 py-2 max-h-[450px] overflow-y-auto space-y-0.5 terminal-screen"
          >
            {/* Session header */}
            <div className="text-[10px] font-tech text-success/15 mb-3 pb-2 border-b border-success/8 select-none">
              ── SESSION STARTED {currentTime.toLocaleDateString()} ── ENCRYPTION: ACTIVE ──
            </div>

            {logs.map((log, i) => {
              const isWarning = log.includes("⚠");
              const isSuccess = log.includes("✓") || log.includes("PASSED");
              const isFail = log.includes("FAILED") || log.includes("ERROR");
              const isHighlight = log.includes("Authenticated") || log.includes("Mission");

              return (
                <div
                  key={i}
                  className={`text-[12px] font-tech leading-relaxed tracking-wide flex items-start gap-2 py-0.5 group ${
                    isWarning ? "text-warning" :
                    isSuccess ? "text-success" :
                    isFail ? "text-destructive" :
                    isHighlight ? "text-primary" :
                    "text-success/50"
                  }`}
                >
                  {/* Line number */}
                  <span className="text-success/15 select-none shrink-0 w-6 text-right text-[10px] mt-px">
                    {String(i + 1).padStart(3, '0')}
                  </span>
                  <span className="text-success/20 select-none shrink-0">
                    {isFail ? "✗" : isSuccess ? "✓" : isWarning ? "!" : "$"}
                  </span>
                  <span className="group-hover:brightness-125 transition-all">{log}</span>
                  {/* Timestamp */}
                  <span className="text-[8px] text-muted-foreground/15 shrink-0 ml-auto mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-tech">
                    {timeStr}
                  </span>
                </div>
              );
            })}

            {/* Blinking cursor */}
            <div className="text-[12px] font-tech text-success/35 flex items-center gap-2 py-1 mt-1">
              <span className="text-success/15 w-6 text-right text-[10px]">
                {String(logs.length + 1).padStart(3, '0')}
              </span>
              <span className="text-success/20">$</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                className="text-success/60"
              >
                █
              </motion.span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div className="px-4 py-1.5 border-t border-success/10 bg-success/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3 text-[8px] font-tech text-success/20 tracking-wider">
          <span>UTF-8</span>
          <span>│</span>
          <span>LF</span>
          <span>│</span>
          <span>BASH 5.2</span>
        </div>
        <div className="flex items-center gap-3 text-[8px] font-tech text-success/20 tracking-wider">
          <span>Ln {logs.length + 1}</span>
          <span>│</span>
          <span>Col 1</span>
          <span>│</span>
          <span>NORMAL</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityLogs;
