import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Terminal, HelpCircle, ArrowRight, Shield, Globe, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export function GetStartedModal({ isOpen, onClose, theme }: ModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const nextStep = () => {
    if (step === 1) {
      if (!name) return;
      setStep(2);
    } else if (step === 2) {
      if (!email) return;
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  };

  const handleResetClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setDone(false);
      setName('');
      setEmail('');
    }, 300);
  };

  if (!isOpen) return null;

  const bgClass = theme === 'dark' ? 'bg-[#080808] border-[#1a1a1a] text-white' : 'bg-white border-outline-variant/80 text-gray-900';
  const inputClass = theme === 'dark'
    ? 'bg-[#0d0d0d] border-zinc-800 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-white'
    : 'bg-light-surface-high border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleResetClose} />

      <AnimatePresence mode="wait">
        <motion.div
          key="get-started-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-lg p-8 rounded-xl border shadow-xl z-10 overflow-hidden ${bgClass}`}
        >
          {/* Neon gradient background accent */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-primary/10 blur-3xl rounded-full" />

          {/* Close button */}
          <button
            onClick={handleResetClose}
            className="absolute top-4 right-4 p-1 hover:text-brand-primary transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!done ? (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 rounded bg-brand-primary/10 text-brand-primary">
                  <Shield className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold font-headline select-none">Begin Your LayerZero Integration</h3>
                  <p className="text-xs text-gray-400">Step {step} of 2</p>
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase mb-2">Team or Project Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Lambda Labs"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg text-sm focus:outline-none transition-all ${inputClass}`}
                    />
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Setting up a workspace initializes dedicated endpoints, telemetry relay keys, and generates an optimized developer credentials kit.
                  </p>
                  <button
                    onClick={nextStep}
                    disabled={!name}
                    className="w-full mt-4 bg-brand-primary text-black py-3 px-6 rounded-full font-extrabold flex items-center justify-center gap-2 hover:bg-brand-primary/95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {!loading ? (
                    <>
                      <div>
                        <label className="block text-xs font-mono tracking-wider uppercase mb-2">Developer Email Address</label>
                        <input
                          type="email"
                          placeholder="developer@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg text-sm focus:outline-none transition-all ${inputClass}`}
                        />
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        We will securely generate your deployment key file and email you instructions to complete configuration CLI authorization.
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setStep(1)}
                          className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all ${
                            theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800 text-white' : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          Back
                        </button>
                        <button
                          onClick={nextStep}
                          disabled={!email || !email.includes('@')}
                          className="flex-1 bg-brand-primary text-black py-3 px-6 rounded-full font-extrabold flex items-center justify-center gap-2 hover:bg-brand-primary/95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          Initialize Endpoint
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent border-brand-primary mb-4" />
                      <p className="text-sm font-mono text-brand-secondary neon-glow-secondary">CRAFTING SECURE INSTANCE...</p>
                      <p className="text-xs text-gray-400 mt-2">Provisioning cryptographically verified routing keys</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-brand-secondary neon-glow-secondary animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-3 text-brand-secondary">Core Configuration Initialized</h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-sm mx-auto mb-6">
                Welcome to the future of decentralized operations, <strong className="text-white">{name}</strong>. Your developer keys have been provisioned. Welcome package sent to <strong className="text-brand-secondary">{email}</strong>.
              </p>
              <div className="p-4 rounded-xl bg-[#050505] border border-[#1a1a1a] font-mono text-left text-xs text-brand-secondary/80 max-w-md mx-auto mb-6">
                <p className="text-gray-500 font-bold mb-1">// SECURE ROOT ACCESS KEY</p>
                <p className="overflow-ellipsis overflow-hidden select-all whitespace-nowrap">lz-auth_token_{Math.random().toString(36).substring(2, 10)}_dev_node_secure</p>
              </div>
              <button
                onClick={handleResetClose}
                className="bg-brand-primary text-black font-extrabold py-3 px-8 rounded-full hover:bg-brand-primary/90 transition-all cursor-pointer"
              >
                Launch Dashboard
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ApplyFundingModal({ isOpen, onClose, theme }: ModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'infrastructure',
    budget: '',
    description: '',
    github: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  const handleResetClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        category: 'infrastructure',
        budget: '',
        description: '',
        github: ''
      });
    }, 300);
  };

  if (!isOpen) return null;

  const bgClass = theme === 'dark' ? 'bg-[#080808] border-[#1a1a1a] text-white' : 'bg-white border-outline-variant/80 text-gray-900';
  const inputClass = theme === 'dark'
    ? 'bg-[#0d0d0d] border-zinc-800 focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary text-white'
    : 'bg-light-surface-high border-gray-300 focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleResetClose} />

      <AnimatePresence mode="wait">
        <motion.div
          key="funding-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-xl p-8 rounded-xl border shadow-xl z-10 overflow-hidden ${bgClass}`}
        >
          {/* Neon glow */}
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-brand-secondary/10 blur-3xl rounded-full" />

          {/* Close button */}
          <button onClick={handleResetClose} className="absolute top-4 right-4 p-1 hover:text-brand-secondary transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 rounded bg-brand-secondary/10 text-brand-secondary">
                  <Award className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold font-headline">Apply for LayerZero Foundation Grant</h3>
                  <p className="text-xs text-gray-400">Accelerator and development program funding</p>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent border-brand-secondary mb-4" />
                  <p className="text-sm font-mono text-brand-secondary animate-pulse uppercase">TRANSMITTING PROTOCOL PROPOSAL...</p>
                  <p className="text-xs text-gray-400 mt-2">Uploading cryptographically-stamped RFC dossier to Gov nodes</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase mb-1">Project Name</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. CrossChain Oracle Relayer"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all ${inputClass}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase mb-1">Program Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all ${inputClass}`}
                      >
                        <option value="infrastructure">Core Infrastructure</option>
                        <option value="tooling">Developer Tooling</option>
                        <option value="analytics">Real-time Telemetry</option>
                        <option value="dapp">Multi-chain dApp</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase mb-1">Requested Funding (USD)</label>
                      <input
                        required
                        type="number"
                        placeholder="e.g. 25000"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={`w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all ${inputClass}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-wider uppercase mb-1">GitHub Org or Hub Repository</label>
                      <input
                        required
                        type="text"
                        placeholder="github.com/org/repo"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        className={`w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all ${inputClass}`}
                      />
                    </div>
                  </div>

                  <div>
                     <label className="block text-xs font-mono tracking-wider uppercase mb-1">Technical Architecture Abstract</label>
                     <textarea
                       required
                       rows={3}
                       placeholder="Explain how your project improves or utilizes LayerZero omnichain routing topology..."
                       value={formData.description}
                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                       className={`w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all ${inputClass}`}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-brand-secondary text-black font-extrabold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-brand-secondary/95 transition-all cursor-pointer"
                    >
                      Submit Grant proposal <Sparkles className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </>
              )}
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="flex justify-center mb-6">
                <Sparkles className="w-16 h-16 text-brand-secondary neon-glow-secondary animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold font-headline mb-3 text-brand-secondary font-extrabold animate-pulse">Proposal Lodged</h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto mb-6">
                Excellent work! Your proposal for <strong className="text-white">"{formData.title}"</strong> has been cryptographically signed and registered on the LayerZero Decentralized Governance system. Your review queue index is <strong className="text-brand-secondary font-extrabold select-all">#LZ-PRO-{(Math.floor(Math.random() * 8000) + 1000)}</strong>.
              </p>
              <button
                onClick={handleResetClose}
                className="bg-brand-secondary text-black font-extrabold py-3.5 px-8 rounded-full hover:bg-brand-secondary/90 transition-all cursor-pointer"
              >
                Proceed to Gov Hub
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function DeployModal({ isOpen, onClose, theme }: ModalProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (isOpen && !running && !complete) {
      startDeploy();
    }
  }, [isOpen]);

  const startDeploy = () => {
    setRunning(true);
    setProgress(0);
    setComplete(false);
    setLogs(['[SYS] Launching LayerZero standard pipeline orchestration...']);

    const steps = [
      { prg: 10, log: '[SYS] Reading cluster deployment manifests...' },
      { prg: 20, log: '[NET] Initializing encrypted tunnels to Node Alpha...' },
      { prg: 30, log: '[SYS] Compiling Rust endpoints to WebAssembly target...' },
      { prg: 45, log: '[SYS] Executing tests on local LayerZero sandbox... OK (42 tests passed)' },
      { prg: 60, log: '[NET] Deploying secure Router smart contracts to destination chain...' },
      { prg: 75, log: '[AUTH] Confirming multi-signature validation anchors...' },
      { prg: 90, log: '[SYS] Syncing local endpoints and starting telemetry log capture...' },
      { prg: 100, log: '[SUCCESS] Deployment complete! Platform router is healthy and listening on v2.4.0-stable.' }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step.log]);
        setProgress(step.prg);
        if (step.prg === 100) {
          setComplete(true);
          setRunning(false);
        }
      }, (index + 1) * 800);
    });
  };

  const handleResetClose = () => {
    onClose();
    setTimeout(() => {
      setLogs([]);
      setProgress(0);
      setRunning(false);
      setComplete(false);
    }, 300);
  };

  if (!isOpen) return null;

  const bgClass = theme === 'dark' ? 'bg-dark-surface border-brand-primary/40 text-white' : 'bg-white border-outline-variant/80 text-gray-900';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <AnimatePresence mode="wait">
        <motion.div
          key="deploy-modal"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-lg p-6 rounded-xl border shadow-2xl z-10 overflow-hidden ${bgClass}`}
        >
          {/* Close button */}
          <button onClick={handleResetClose} className="absolute top-4 right-4 p-1 hover:text-brand-primary transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <Terminal className="text-brand-primary w-6 h-6 animate-pulse" />
            <h3 className="font-bold font-headline text-lg">Cluster Orchestrator Node</h3>
          </div>

          <div className="w-full bg-[#050505] rounded-xl border border-[#1a1a1a] p-4 font-mono text-xs text-brand-secondary h-64 overflow-y-auto mb-4 flex flex-col gap-1 shadow-inner">
            {logs.map((log, index) => (
              <p
                key={index}
                className={
                  log.includes('[SUCCESS]')
                    ? 'text-brand-secondary font-bold'
                    : log.includes('[SYS]')
                    ? 'text-brand-primary font-bold'
                    : log.includes('[NET]')
                    ? 'text-sky-400'
                    : 'text-gray-300'
                }
              >
                {log}
              </p>
            ))}
            {running && (
              <div className="flex items-center gap-1 mt-1 text-gray-500 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
                <span>Running operations...</span>
              </div>
            )}
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gray-400 font-semibold uppercase">Deployment Progress</span>
              <span className="text-brand-primary font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-[#0d0d0d] h-2 rounded overflow-hidden border border-zinc-950">
              <div
                className="bg-brand-primary h-full shadow-[0_0_8px_#ff2d78] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            {!complete ? (
              <button
                onClick={handleResetClose}
                className={`py-2.5 px-4 rounded-full text-xs font-bold font-mono transition-all duration-300 ${
                  theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Abort Deployment
              </button>
            ) : (
              <button
                onClick={handleResetClose}
                className="bg-brand-primary text-black font-extrabold py-2.5 px-6 rounded-full text-xs font-mono hover:bg-brand-primary/95 transition-all cursor-pointer"
              >
                Finalize & Close
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
