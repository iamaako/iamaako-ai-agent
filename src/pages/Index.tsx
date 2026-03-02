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
            <button
              onClick={() => useAgentStore.getState().reset()}
              className="cyber-badge border-foreground/20 text-foreground/50 px-3 py-1.5 text-[10px] hover:bg-foreground/5 hover:border-primary/30 hover:text-primary transition-all tracking-[0.15em]"
            >
              REBOOT
            </button>
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
