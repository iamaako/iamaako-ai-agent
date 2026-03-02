import { create } from "zustand";
import { AgentPhase, AgentResult, MOCK_RESULT } from "@/types/agent";
import { supabase } from "@/integrations/supabase/client";

interface AgentState {
  phase: AgentPhase;
  repoUrl: string;
  githubToken: string;
  result: AgentResult | null;
  logs: string[];
  error: string | null;
  setInput: (field: "repoUrl" | "githubToken", value: string) => void;
  runAgent: () => Promise<void>;
  reset: () => void;
  downloadResults: () => void;
}

const PHASES: AgentPhase[] = ["cloning", "analyzing", "fixing", "testing", "pushing", "validating"];
const PHASE_LABELS_SHORT = ["Cloning repo...", "Analyzing code...", "Generating fixes...", "Running tests...", "Pushing branch...", "Validating CI/CD..."];

export const useAgentStore = create<AgentState>((set, get) => ({
  phase: "idle",
  repoUrl: "",
  githubToken: "",
  result: null,
  logs: [],
  error: null,

  setInput: (field, value) => set({ [field]: value }),

  runAgent: async () => {
    const { repoUrl, githubToken } = get();
    if (!repoUrl) return;
    
    const teamName = "iamaako";
    const leaderName = "iamaako";

    set({ logs: [], result: null, error: null });

    // Phase progression with simulated timing while API runs
    const phaseInterval = setInterval(() => {
      const currentPhase = get().phase;
      const idx = PHASES.indexOf(currentPhase as any);
      if (idx >= 0 && idx < PHASES.length - 1) {
        const nextPhase = PHASES[idx + 1];
        set({ phase: nextPhase });
        set(s => ({ logs: [...s.logs, `[SYSTEM] ${PHASE_LABELS_SHORT[idx + 1]}`] }));
      }
    }, 3000);

    set({ phase: "cloning" });
    set(s => ({ logs: [...s.logs, `[SYSTEM] ${PHASE_LABELS_SHORT[0]}`] }));

    try {
      const envToken = import.meta.env.VITE_GITHUB_TOKEN;
      const finalToken = githubToken || envToken;
      
      const { data, error } = await supabase.functions.invoke('trigger-agent', {
        body: { repoUrl, githubToken: finalToken || undefined },
      });

      clearInterval(phaseInterval);

      if (error) {
        console.error("Edge function error:", error);
        set({ phase: "error", error: error.message });
        set(s => ({ logs: [...s.logs, `[ERROR] ${error.message}`] }));
        return;
      }

      if (data?.error) {
        set({ phase: "error", error: data.error });
        set(s => ({ logs: [...s.logs, `[ERROR] ${data.error}`] }));
        return;
      }

      // Merge API logs with phase logs
      const apiLogs = data.logs || [];
      
      set({
        phase: "complete",
        result: data as AgentResult,
        logs: [...get().logs, ...apiLogs],
      });
    } catch (err: any) {
      clearInterval(phaseInterval);
      console.error("Agent error:", err);
      set({ 
        phase: "error", 
        error: err.message || "Unknown error",
      });
      set(s => ({ logs: [...s.logs, `[ERROR] ${err.message || "Unknown error"}`] }));
    }
  },

  downloadResults: () => {
    const { result } = get();
    if (!result) return;
    
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `results_${result.teamName.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  reset: () => set({ phase: "idle", result: null, logs: [], error: null, repoUrl: "", githubToken: "" }),
}));
