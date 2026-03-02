import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const GuideSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-panel neon-border p-0 overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/30 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <span className="font-heading text-3xl font-bold text-muted-foreground/20 select-none">02</span>
          <div>
            <span className="font-heading text-xs tracking-[0.2em] text-success block">
              HOW IT WORKS & GITHUB TOKEN GUIDE
            </span>
            <span className="text-[10px] text-muted-foreground/40 font-tech tracking-wider">
              {open ? "CLICK TO COLLAPSE" : "CLICK TO EXPAND"}
            </span>
          </div>
        </div>
        <motion.span 
          className="text-muted-foreground/40 text-sm"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6 border-t border-border">
              {/* How it works */}
              <div className="pt-5">
                <h3 className="font-heading text-[10px] tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                  <span className="w-5 h-px bg-primary/40" />
                  HOW THIS WEBSITE WORKS
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed font-tech">
                  {[
                    { num: "01", text: <>You paste your <strong className="text-foreground">GitHub repository URL</strong>, team name, and leader name.</> },
                    { num: "02", text: <>The AI agent <strong className="text-foreground">clones your repo</strong> and reads the source code files.</> },
                    { num: "03", text: <>It <strong className="text-foreground">analyzes the code</strong> using AI to detect bugs — linting errors, syntax issues, logic bugs, type errors, import problems, and indentation issues.</> },
                    { num: "04", text: <>For each bug found, it <strong className="text-foreground">generates a fix</strong> and applies it directly to the source files in a new branch.</> },
                    { num: "05", text: <>A <strong className="text-foreground">Pull Request</strong> is created on the original repo with all the fixes, ready for review.</> },
                    { num: "06", text: <>You get a full report — fixes applied, CI/CD status, score breakdown, and downloadable results.</> },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-3 items-start group/step">
                      <span className="text-success/70 shrink-0 font-heading text-[11px] mt-0.5 w-5">{item.num}</span>
                      <span className="group-hover/step:text-foreground/80 transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Token Guide */}
              <div className="border-t border-border pt-5">
                <h3 className="font-heading text-[10px] tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                  <span className="w-5 h-px bg-primary/40" />
                  HOW TO GET A GITHUB TOKEN
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed font-tech">
                  {[
                    { num: "01", text: <>Go to <strong className="text-foreground">github.com → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)</strong></> },
                    { num: "02", text: <>Click <strong className="text-foreground">"Generate new token (classic)"</strong></> },
                    { num: "03", text: <>Give it a name like <strong className="text-foreground">"Self-Healing Agent"</strong></> },
                    { num: "04", text: <>Select the <strong className="text-foreground">"repo"</strong> scope (full control of private repositories)</> },
                    { num: "05", text: <>Click <strong className="text-foreground">"Generate token"</strong> and <strong className="text-destructive">copy it immediately</strong> — you won't see it again!</> },
                    { num: "06", text: <>Paste it in the <strong className="text-foreground">GITHUB TOKEN</strong> field above.</> },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-3 items-start group/step">
                      <span className="text-warning/70 shrink-0 font-heading text-[11px] mt-0.5 w-5">{item.num}</span>
                      <span className="group-hover/step:text-foreground/80 transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3.5 border border-warning/15 bg-warning/5 text-xs text-muted-foreground font-tech rounded-sm">
                  <strong className="text-warning">⚠ NOTE:</strong> Your token is sent directly to the backend and is <strong className="text-foreground">never stored</strong>. It's only used for the current session to fork repos and create PRs on your behalf.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GuideSection;
