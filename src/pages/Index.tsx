import { motion } from "framer-motion";
import HeroControlPanel from "@/components/HeroControlPanel";
import RunSummaryCard from "@/components/RunSummaryCard";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import FixesTable from "@/components/FixesTable";
import PatchDeployment from "@/components/PatchDeployment";
import CICDTimeline from "@/components/CICDTimeline";
import LiveStatus from "@/components/LiveStatus";
import ActivityLogs from "@/components/ActivityLogs";
import ErrorPanel from "@/components/ErrorPanel";
import GuideSection from "@/components/GuideSection";
import { useAgentStore } from "@/store/agentStore";

const Index = () => {
  const { phase, result, logs, error, downloadResults } = useAgentStore();
  const showResults = phase === "complete" && result;
  const isRunning = phase !== "idle" && phase !== "complete" && phase !== "error";
  const isError = phase === "error";

  return (
    <div className="min-h-screen bg-background grid-lines relative">
      <div className="scanline-overlay" />

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-primary/40 flex items-center justify-center bg-primary/5">
              <span className="text-primary text-lg">⚡</span>
            </div>
            <div>
              <h1 className="font-heading text-lg md:text-xl font-bold text-primary tracking-wider">
                SELF-HEALING <span className="text-foreground">NODE</span>
              </h1>
              <p className="text-[9px] text-muted-foreground/30 tracking-[0.25em] font-tech">
                SYS_VER 2.4.0 // STATUS: ONLINE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[9px] text-muted-foreground/25 font-tech">
              <span className="w-1.5 h-1.5 rounded-full bg-success/60" />
              <span>UPLINK ACTIVE</span>
            </div>
            <a
              href="https://github.com/iamaako/iamaako-ai-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-badge border-foreground/20 text-foreground/50 px-3 py-1.5 text-[10px] hover:bg-foreground/5 hover:border-primary/30 hover:text-primary transition-all tracking-[0.15em] flex items-center gap-2"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              OPEN SOURCE
            </a>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-px bg-primary/50" />
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16 space-y-6">
        {/* Hero Control Panel */}
        <HeroControlPanel />

        {/* Guide Section */}
        <GuideSection />

        {/* Awaiting state */}
        {!showResults && !isRunning && !isError && (
          <ActivityLogs logs={[]} />
        )}

        {/* Error state */}
        {isError && (
          <>
            <ErrorPanel error={error || "Unknown system error"} logs={logs} />
            {logs.length > 0 && (
              <ActivityLogs logs={logs} />
            )}
          </>
        )}

        {/* Running state */}
        {isRunning && (
          <LiveStatus
            iteration="—/5"
            failures={0}
            fixes={0}
            runtime="..."
            step={phase.toUpperCase()}
            log="Agent processing..."
            status="RUNNING"
          />
        )}

        {/* Running logs */}
        {isRunning && logs.length > 0 && (
          <ActivityLogs logs={logs} />
        )}

        {/* Results */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Live Status - completed */}
            <LiveStatus
              iteration={`${result.pipelineRuns.length}/5`}
              failures={result.failuresDetected}
              fixes={result.fixesApplied}
              runtime={`${result.totalTime.toFixed(1)}s`}
              step="COMPLETE"
              log="All tests passed. Mission accomplished."
              status={result.cicdStatus}
            />

            {/* Summary + Score side by side */}
            <div className="grid md:grid-cols-2 gap-6">
              <RunSummaryCard result={result} />
              <ScoreBreakdown result={result} />
            </div>

            {/* Fix DB Table */}
            <FixesTable fixes={result.fixes} />

            {/* Iteration Matrix / Patch Deployment */}
            <PatchDeployment fixes={result.fixes} />

            {/* CI/CD Pipeline */}
            <CICDTimeline runs={result.pipelineRuns} />

            {/* Activity Logs */}
            <ActivityLogs logs={logs} />

            {/* Download Results */}
            <div className="flex justify-center">
              <motion.button
                onClick={downloadResults}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cyber-panel neon-border px-8 py-4 font-heading text-sm tracking-[0.2em] text-success border-success/40 hover:bg-success/10 transition-all flex items-center gap-3 glow-green"
              >
                ⬇ DOWNLOAD RESULTS.JSON
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer line */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-success/20 to-transparent z-50" />
    </div>
  );
};

export default Index;
