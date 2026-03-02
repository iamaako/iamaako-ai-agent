export interface Fix {
  file: string;
  bugType: "LINTING" | "SYNTAX" | "LOGIC" | "TYPE_ERROR" | "IMPORT" | "INDENTATION";
  line: number;
  commitMessage: string;
  status: "fixed" | "failed";
  explanation?: string;
}

export interface PipelineRun {
  iteration: number;
  status: "passed" | "failed";
  timestamp: string;
  duration: number;
}

export interface AgentResult {
  repoUrl: string;
  teamName: string;
  leaderName: string;
  branchName: string;
  forkUrl?: string;
  prUrl?: string;
  failuresDetected: number;
  fixesApplied: number;
  cicdStatus: "PASSED" | "FAILED" | "RUNNING";
  totalTime: number;
  baseScore: number;
  speedBonus: number;
  efficiencyPenalty: number;
  finalScore: number;
  fixes: Fix[];
  pipelineRuns: PipelineRun[];
  logs: string[];
}

export type AgentPhase = "idle" | "cloning" | "analyzing" | "fixing" | "testing" | "pushing" | "validating" | "complete" | "error";

export const PHASE_LABELS: Record<AgentPhase, string> = {
  idle: "Awaiting Input",
  cloning: "Cloning Repository",
  analyzing: "Analyzing Codebase",
  fixing: "Generating AI Fixes",
  testing: "Running Tests",
  pushing: "Pushing to Branch",
  validating: "Validating CI/CD",
  complete: "Mission Complete",
  error: "Error Detected",
};

export const MOCK_RESULT: AgentResult = {
  repoUrl: "https://github.com/rift-org/sample-project",
  teamName: "RIFT ORGANISERS",
  leaderName: "Saiyam Kumar",
  branchName: "RIFT_ORGANISERS_SAIYAM_KUMAR_AI_Fix",
  forkUrl: "https://github.com/ai-agent/sample-project",
  prUrl: "https://github.com/rift-org/sample-project/pull/1",
  failuresDetected: 8,
  fixesApplied: 7,
  cicdStatus: "PASSED",
  totalTime: 247,
  baseScore: 100,
  speedBonus: 10,
  efficiencyPenalty: 0,
  finalScore: 110,
  fixes: [
    { file: "src/utils.py", bugType: "LINTING", line: 15, commitMessage: "[AI-AGENT] Remove unused import 'os'", status: "fixed", explanation: "Detected unused import statement for 'os' module. Removed to satisfy linting rules." },
    { file: "src/validator.py", bugType: "SYNTAX", line: 8, commitMessage: "[AI-AGENT] Fix missing colon in if statement", status: "fixed", explanation: "Added missing colon after conditional expression." },
    { file: "src/calculator.py", bugType: "LOGIC", line: 23, commitMessage: "[AI-AGENT] Fix off-by-one error in loop", status: "fixed", explanation: "Changed range(n) to range(n+1) to include boundary value." },
    { file: "src/api/handler.ts", bugType: "TYPE_ERROR", line: 45, commitMessage: "[AI-AGENT] Fix type mismatch in response handler", status: "fixed", explanation: "Cast response.data to correct ApiResponse type." },
    { file: "src/config.py", bugType: "IMPORT", line: 3, commitMessage: "[AI-AGENT] Fix circular import in config module", status: "failed", explanation: "Attempted to resolve circular dependency but module structure requires manual refactor." },
    { file: "src/models/user.py", bugType: "INDENTATION", line: 12, commitMessage: "[AI-AGENT] Fix indentation in class method", status: "fixed", explanation: "Corrected 3-space indent to 4-space PEP8 standard." },
    { file: "src/tests/test_auth.py", bugType: "LOGIC", line: 34, commitMessage: "[AI-AGENT] Fix assertion order in auth test", status: "fixed", explanation: "Swapped expected and actual values in assertEqual." },
    { file: "src/middleware.py", bugType: "SYNTAX", line: 19, commitMessage: "[AI-AGENT] Fix unclosed parenthesis", status: "fixed", explanation: "Added closing parenthesis to function call." },
  ],
  pipelineRuns: [
    { iteration: 1, status: "failed", timestamp: "2026-02-22T10:00:12Z", duration: 45 },
    { iteration: 2, status: "failed", timestamp: "2026-02-22T10:01:30Z", duration: 52 },
    { iteration: 3, status: "passed", timestamp: "2026-02-22T10:03:05Z", duration: 38 },
  ],
  logs: [
    "[10:00:00] Agent initialized — scanning repository structure",
    "[10:00:02] Found 14 source files, 6 test files",
    "[10:00:05] Running initial test suite...",
    "[10:00:12] 8 failures detected across 5 files",
    "[10:00:14] Generating AI fix for src/utils.py:15 (LINTING)",
    "[10:00:16] Generating AI fix for src/validator.py:8 (SYNTAX)",
    "[10:00:19] Generating AI fix for src/calculator.py:23 (LOGIC)",
    "[10:00:22] Generating AI fix for src/api/handler.ts:45 (TYPE_ERROR)",
    "[10:00:25] Generating AI fix for src/config.py:3 (IMPORT)",
    "[10:00:28] ⚠ Fix for src/config.py:3 failed — circular dependency",
    "[10:00:30] Generating AI fix for src/models/user.py:12 (INDENTATION)",
    "[10:00:33] Generating AI fix for src/tests/test_auth.py:34 (LOGIC)",
    "[10:00:35] Generating AI fix for src/middleware.py:19 (SYNTAX)",
    "[10:00:38] Committing 7 fixes to branch RIFT_ORGANISERS_SAIYAM_KUMAR_AI_Fix",
    "[10:00:45] CI/CD Run #1 — FAILED (2 tests still failing)",
    "[10:01:30] CI/CD Run #2 — FAILED (1 test still failing)",
    "[10:03:05] CI/CD Run #3 — PASSED ✓ All tests green",
    "[10:03:10] Mission complete — generating results.json",
  ],
};
