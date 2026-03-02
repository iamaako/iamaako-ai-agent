import { motion } from "framer-motion";
import { useAgentStore } from "@/store/agentStore";
import { PHASE_LABELS } from "@/types/agent";

const HeroControlPanel = () => {
  const { phase, repoUrl, githubToken, setInput, runAgent } = useAgentStore();
  const isRunning = phase !== "idle" && phase !== "complete" && phase !== "error";
  const isComplete = phase === "complete";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="cyber-panel-coral p-0 overflow-hidden"
    >
      {/* Section Number & Tag */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <span className="font-heading text-4xl font-bold text-black/20 select-none">01</span>
        <span className="cyber-badge border-black/20 bg-black/10 text-black/60 backdrop-blur-sm">AUTONOMOUS AGENT v2.4</span>
      </div>

      <div className="flex flex-col md:flex-row gap-0">
        {/* CRT Screen */}
        <div className="w-full md:w-[260px] p-5 flex-shrink-0">
          <div className="crt-screen aspect-square flex flex-col items-center justify-center rounded-sm">
            <motion.span
              className="text-success font-heading text-xl tracking-widest"
              animate={isRunning ? { opacity: [1, 0.4, 1] } : { opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: isRunning ? 0.8 : 3 }}
            >
              {isRunning ? "ACTIVE" : isComplete ? "DONE" : "READY"}
            </motion.span>
            <span className="text-success/40 text-[10px] mt-1.5 tracking-[0.25em] font-tech">
              {isRunning ? PHASE_LABELS[phase].toUpperCase() : isComplete ? "ALL CLEAR" : "STANDBY"}
            </span>
            
            {/* Matrix rain dots */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-success/10 text-[8px] font-tech"
                  style={{ left: `${15 + i * 15}%` }}
                  animate={{ 
                    y: ['-20px', '200px'],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3 + Math.random() * 3,
                    delay: i * 0.5 
                  }}
                >
                  {['01', '10', '11', '00', '1F', 'A0'][i]}
                </motion.div>
              ))}
            </div>

            {/* Japanese-style decorative text */}
            <div className="absolute bottom-3 left-3 text-success/10 text-4xl font-bold select-none" style={{ writingMode: 'vertical-rl' }}>
              独創
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 p-5 pt-2 md:pt-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-10 bg-black/70 rounded-full" />
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold tracking-wider text-black leading-tight">INITIATE</h2>
              <h2 className="font-heading text-xl md:text-2xl font-bold tracking-wider text-black leading-tight">LINK SEQUENCE</h2>
            </div>
          </div>

          <div className="space-y-5">
            {/* Repo URL */}
            <div>
              <label className="cyber-label text-black/80 mb-1.5 block text-[10px]">TARGET REPOSITORY</label>
              <div className="flex items-center border border-black/25 bg-black/10 rounded-sm overflow-hidden transition-all focus-within:border-black/50 focus-within:bg-black/15">
                <span className="px-3 py-2.5 text-[10px] font-bold bg-black/15 border-r border-black/15 text-black/70 font-heading select-none">URL</span>
                <input
                  type="url"
                  placeholder="https://github.com/user/repo"
                  value={repoUrl}
                  onChange={e => setInput("repoUrl", e.target.value)}
                  disabled={isRunning}
                  className="flex-1 px-3 py-2.5 bg-transparent text-black text-sm tracking-wide placeholder:text-black/40 focus:outline-none disabled:opacity-50 font-tech"
                />
              </div>
            </div>

            {/* GitHub Token */}
            <div>
              <label className="cyber-label text-black/80 mb-1.5 block text-[10px]">GITHUB TOKEN <span className="text-black/45">(OPTIONAL — FOR FORK & PR)</span></label>
              <div className="flex items-center border border-black/25 bg-black/10 rounded-sm overflow-hidden transition-all focus-within:border-black/50 focus-within:bg-black/15">
                <span className="px-3 py-2.5 text-xs bg-black/15 border-r border-black/15 text-black/70 select-none">🔑</span>
                <input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxx"
                  value={githubToken}
                  onChange={e => setInput("githubToken", e.target.value)}
                  disabled={isRunning}
                  className="flex-1 px-3 py-2.5 bg-transparent text-black text-sm tracking-wider placeholder:text-black/40 focus:outline-none disabled:opacity-50 font-tech"
                />
              </div>
            </div>

            {/* Button */}
            <motion.button
              onClick={runAgent}
              disabled={isRunning || !repoUrl}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              className="w-full py-4 bg-black/85 text-white/90 font-heading text-sm tracking-[0.3em] uppercase rounded-sm transition-all hover:bg-black/95 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            >
              {isRunning ? (
                <>
                  ESTABLISHING LINK...
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    ▶
                  </motion.span>
                </>
              ) : (
                <>DEPLOY AGENT ▶</>
              )}
            </motion.button>
          </div>

          {/* Progress dashes */}
          {isRunning && (
            <div className="flex justify-center gap-2 mt-5">
              {["cloning", "analyzing", "fixing", "testing", "pushing", "validating"].map((p, i) => (
                <motion.div
                  key={p}
                  className={`w-8 h-1 rounded-full ${
                    ["cloning", "analyzing", "fixing", "testing", "pushing", "validating"].indexOf(phase) >= i
                      ? "bg-background/90"
                      : "bg-background/15"
                  }`}
                  animate={phase === p ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroControlPanel;
