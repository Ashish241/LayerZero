import React, { useState, useEffect } from 'react';
import { ArrowRight, HelpCircle, Network, Layers, RefreshCw, Smartphone, Play, Zap, Info, ShieldCheck, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DocsViewProps {
  theme: 'dark' | 'light';
  openDeployConsole: () => void;
}

export default function DocsView({ theme, openDeployConsole }: DocsViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoint' | 'relaying' | 'gas'>('overview');
  
  // Interactive network simulator states
  const [gasCap, setGasCap] = useState<'Standard' | 'Premium' | 'Extreme'>('Premium');
  const [proofModel, setProofModel] = useState<'MultiSig' | 'ZK-Proof' | 'Optimistic'>('ZK-Proof');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [currentPacketPosition, setCurrentPacketPosition] = useState<number>(-1); // -1: idle, 0: A, 1: Relayer, 2: B
  
  const handleRunSimulation = () => {
    if (simulationRunning) return;
    setSimulationRunning(true);
    setCurrentPacketPosition(0);
    setSimulationLogs(['[Alpha] Payload prepared and cryptographic hash locked.']);

    // Progress coordinates & logs
    setTimeout(() => {
      setCurrentPacketPosition(1);
      setSimulationLogs(prev => [
        ...prev,
        `[Relayer Hub] Proof system configured for ${proofModel} validation.`,
        `[Relayer Hub] Evaluating gas budget limit set to ${gasCap === 'Standard' ? '50 Gwei' : gasCap === 'Premium' ? '120 Gwei' : '300 Gwei'}.`
      ]);
    }, 1200);

    setTimeout(() => {
      setCurrentPacketPosition(2);
      const deliverySectors = proofModel === 'ZK-Proof' ? 'ZK-circuit proof confirmed' : 'consensus signatures matched';
      setSimulationLogs(prev => [
        ...prev,
        `[Beta] Unpacket proof unpacked: ${deliverySectors}.`,
        `[Beta] Core state updated. Target contract execution succeeded!`
      ]);
    }, 2400);

    setTimeout(() => {
      setSimulationRunning(false);
      setCurrentPacketPosition(-1);
    }, 3600);
  };

  const getEstdLatency = () => {
    let base = 60;
    if (proofModel === 'MultiSig') base -= 20;
    if (proofModel === 'Optimistic') base += 10;
    if (gasCap === 'Extreme') base -= 15;
    if (gasCap === 'Standard') base += 25;
    return `${base}ms`;
  };

  const getEstdGasCost = () => {
    if (gasCap === 'Standard') return '0.0004 ETH';
    if (gasCap === 'Premium') return '0.0012 ETH';
    return '0.0035 ETH';
  };

  // Styling
  const textColor = theme === 'dark' ? 'text-white' : 'text-zinc-950';
  const subtextColor = theme === 'dark' ? 'text-gray-400' : 'text-zinc-650';
  const sectionBg = theme === 'dark' ? 'bg-dark-surface' : 'bg-white';
  const borderCol = theme === 'dark' ? 'border-dark-surface-highest' : 'border-light-surface-lowest';
  const innerBg = theme === 'dark' ? 'bg-dark-surface-lowest' : 'bg-[#fbfaf7]';
  const innerBorder = theme === 'dark' ? 'border-dark-surface-highest/40' : 'border-light-surface-lowest';

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Upper Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left 3 cols: Detailed DevOps Documentation */}
        <div className={`p-6 sm:p-8 rounded-xl border lg:col-span-3 ${sectionBg} ${borderCol}`}>
          <div className={`flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b pb-4 mb-6 ${theme === 'dark' ? 'border-dark-surface-highest/50' : 'border-light-surface-lowest'}`}>
            <div>
              <h2 className={`text-xl font-extrabold font-headline tracking-tight ${textColor}`}>
                Developer Integration Guides
              </h2>
              <p className="text-xs text-gray-400 mt-1">Understanding LayerZero Endpoint routing protocols</p>
            </div>
            
            {/* Documentation Tab controls */}
            <div className={`flex rounded-full p-1 border overflow-x-auto whitespace-nowrap scrollbar-none max-w-full xl:max-w-sm shrink-0 ${innerBg} ${innerBorder}`}>
              {(['overview', 'endpoint', 'relaying', 'gas'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all uppercase cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-brand-primary text-black font-extrabold shadow-sm' 
                      : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-zinc-650 hover:text-zinc-950'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4 text-xs font-mono"
                >
                  <p className={`text-sm tracking-wide leading-relaxed ${subtextColor}`}>
                    LayerZero is an omnichain interoperability protocol designed for lightweight message passing across blockchains. By running localized end-user contracts communicating with modular relayer pools and validation structures, LayerZero completely bypasses traditional asset bridging risks.
                  </p>
                  
                  <div className={`p-4 rounded-lg border space-y-2 ${innerBg} ${innerBorder}`}>
                    <p className="text-brand-primary font-bold">// ARCHITECTURE PRINCIPLES</p>
                    <p className="text-zinc-700 dark:text-gray-400"><strong className="text-brand-secondary font-extrabold">End-to-End Security:</strong> Block confirmation handles validation without relying on trusted intermediaries.</p>
                    <p className="text-zinc-700 dark:text-gray-400"><strong className="text-brand-secondary font-extrabold">Unified State:</strong> Synchronize token supplies, contract instructions, and user identity across 40+ connected chains.</p>
                  </div>

                  <p className={`text-sm leading-relaxed ${textColor}`}>
                    By combining decentralized Validators with ultra-light Node Clients, LayerZero provides instant settlement guarantees with custom proof thresholds.
                  </p>
                </motion.div>
              )}

              {activeTab === 'endpoint' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4 text-xs font-mono"
                >
                  <p className={`text-sm leading-relaxed ${subtextColor}`}>
                    Smart contracts inherit the standard <code className="text-brand-primary bg-brand-primary/5 px-1 py-0.5 rounded">OApp</code> or <code className="text-brand-primary bg-brand-primary/5 px-1 py-0.5 rounded">ONFT</code> interface to link up with LayerZero's protocol core contracts deployed on destination chains.
                  </p>

                  <div className={`p-4 rounded-lg border overflow-x-auto text-brand-secondary ${innerBg} ${innerBorder}`}>
                    <p className="text-gray-500 font-bold mb-1">// SOLIDITY INTEGRATION INSTANCE</p>
                    <p>contract LambdaRouter is OApp {'{'}</p>
                    <p className="pl-4">constructor(address _endpoint) OApp(_endpoint) {'{}'}</p>
                    <p className="pl-4">function routeCrossChainMessage(</p>
                    <p className="pl-8">uint32 _dstEid, bytes calldata _payload</p>
                    <p className="pl-4">) external payable {'{'}</p>
                    <p className="pl-8 text-brand-primary">_lzSend(_dstEid, _payload, ...);</p>
                    <p className="pl-4">{'}'}</p>
                    <p>{'}'}</p>
                  </div>

                  <p className="text-zinc-700 dark:text-gray-400 leading-relaxed">
                    Instantly deploys standardized contracts supporting direct cross-chain payload broadcasting, multi-sig parameter checks, and gas lookup feeds.
                  </p>
                </motion.div>
              )}

              {activeTab === 'relaying' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4 text-xs font-mono"
                >
                  <p className={`text-sm leading-relaxed ${subtextColor}`}>
                    Relayers provide off-chain validation mechanisms that cryptographically grab receipts, gas logs, and bundle state payloads from the source transaction to the destination pool.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg border ${innerBg} ${innerBorder}`}>
                      <p className="text-brand-secondary font-bold mb-1">UltraLight clients</p>
                      <p className="text-[11px] text-zinc-650 dark:text-gray-400">Lightweight validating structures operating on the target host chains to verify transaction hashes.</p>
                    </div>
                    <div className={`p-3 rounded-lg border ${innerBg} ${innerBorder}`}>
                      <p className="text-brand-primary font-bold mb-1">Decentralized Oracles</p>
                      <p className="text-[11px] text-zinc-650 dark:text-gray-400">Feeds that broadcast block headers independent of payload packets, preventing collusion vectors.</p>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed">
                    This dual validation model ensures that unless the packet relayer and headers oracle compromise simultaneously, routing remains cryptographically secure.
                  </p>
                </motion.div>
              )}

              {activeTab === 'gas' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4 text-xs font-mono"
                >
                  <p className={`text-sm leading-relaxed ${subtextColor}`}>
                    Optimizing transaction overhead is critical in cross-chain environments. LayerZero allows automated on-chain quotes so users pay exact destination gas sums directly at source.
                  </p>

                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      <span>Configure dynamic GAS LIMIT values depending on block loads.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      <span>Use static headers to decrease serialization overhead inside transaction envelopes.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      <span>Route via destination testnets to verify exact proof computational thresholds beforehand.</span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={openDeployConsole}
              className="mt-4 bg-brand-primary hover:bg-brand-primary/95 text-black text-xs font-extrabold font-mono uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer transition-all duration-300"
            >
              <Cpu className="w-4 h-4 animate-spin" /> Proceed to Cloud Deployment Console
            </button>
          </div>
        </div>

        {/* Right 2 cols: Interactive Network Simulator */}
        <div className={`p-6 rounded-xl border flex flex-col justify-between lg:col-span-2 relative overflow-hidden ${sectionBg} ${borderCol}`}>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Network className="text-brand-secondary w-5 h-5 animate-pulse" />
              <h3 className={`font-bold font-headline text-md ${textColor}`}>Dynamic Routing Map Optimizer</h3>
            </div>

            {/* Simulated Nodes with active pipeline animations */}
            <div className={`relative border p-6 rounded-lg flex items-center justify-between gap-2 overflow-hidden mb-6 min-h-36 ${innerBg} ${innerBorder}`}>
              
              {/* Connection links glowing representing routing channels */}
              <div className={`absolute inset-x-8 top-1/2 -translate-y-1/2 h-1 rounded ${theme === 'dark' ? 'bg-dark-surface' : 'bg-zinc-200'}`}>
                <div 
                  className={`h-full bg-brand-primary shadow-[0_0_8px_rgba(0,209,193,0.5)] transition-all duration-300 ${
                    currentPacketPosition === 1 ? 'w-1/2' : currentPacketPosition === 2 ? 'w-full' : 'w-0'
                  }`}
                />
              </div>

              {/* Endpoint Alpha Node */}
              <div className="relative flex flex-col items-center gap-2 z-10">
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                  currentPacketPosition === 0 
                    ? 'border-brand-primary bg-brand-primary/25 text-brand-primary animate-pulse shadow-[0_0_12px_rgba(0,209,193,0.4)]' 
                    : theme === 'dark' ? 'border-dark-surface-highest bg-dark-surface text-gray-450' : 'border-light-surface-lowest bg-white text-zinc-650'
                }`}>
                  <span className="font-bold font-mono text-sm">α</span>
                </div>
                <span className="text-[10px] font-mono whitespace-nowrap text-gray-400 font-semibold uppercase">Endpoint Alpha</span>
              </div>

              {/* Relaying Tunnel */}
              <div className="relative flex flex-col items-center gap-2 z-10">
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                  currentPacketPosition === 1 
                    ? 'border-brand-secondary bg-brand-secondary/25 text-brand-secondary animate-pulse shadow-[0_0_12px_rgba(255,94,66,0.4)]' 
                    : theme === 'dark' ? 'border-dark-surface-highest bg-dark-surface text-gray-450' : 'border-light-surface-lowest bg-white text-zinc-650'
                }`}>
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono whitespace-nowrap text-gray-400 font-semibold uppercase">Relay Portal</span>
              </div>

              {/* Endpoint Beta Node */}
              <div className="relative flex flex-col items-center gap-2 z-10">
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                  currentPacketPosition === 2 
                    ? 'border-brand-tertiary bg-brand-tertiary/25 text-brand-tertiary animate-pulse shadow-[0_0_12px_rgba(245,194,73,0.3)]' 
                    : theme === 'dark' ? 'border-dark-surface-highest bg-dark-surface text-gray-450' : 'border-light-surface-lowest bg-white text-zinc-650'
                }`}>
                  <span className="font-bold font-mono text-sm">β</span>
                </div>
                <span className="text-[10px] font-mono whitespace-nowrap text-gray-400 font-semibold uppercase">Endpoint Beta</span>
              </div>

            </div>

            {/* Configure inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1.5 font-bold">Gas Threshold</label>
                <div className="flex gap-1.5">
                  {(['Standard', 'Premium', 'Extreme'] as const).map(level => (
                    <button
                      key={level}
                      onClick={() => setGasCap(level)}
                      className={`flex-1 text-[10px] font-mono py-1 rounded-full border transition-all cursor-pointer font-bold ${
                        gasCap === level
                          ? 'bg-brand-primary border-brand-primary text-black font-extrabold shadow-sm'
                          : theme === 'dark' ? 'border-dark-surface-highest text-gray-405 hover:text-white' : 'border-light-surface-lowest text-zinc-650 hover:text-zinc-950'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400 mb-1.5 font-bold">Proof Engine</label>
                <div className="flex gap-1.5">
                  {(['MultiSig', 'ZK-Proof', 'Optimistic'] as const).map(model => (
                    <button
                      key={model}
                      onClick={() => setProofModel(model)}
                      className={`flex-1 text-[10px] font-mono py-1 rounded-full border transition-all cursor-pointer font-bold ${
                        proofModel === model
                          ? 'bg-brand-secondary border-brand-secondary text-black font-extrabold shadow-sm'
                          : theme === 'dark' ? 'border-dark-surface-highest text-gray-405 hover:text-white' : 'border-light-surface-lowest text-zinc-650 hover:text-zinc-950'
                      }`}
                    >
                      {model.slice(0, 6)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimated metrics lookup */}
            <div className={`grid grid-cols-2 gap-4 border-t pt-4 mb-6 text-xs font-mono ${theme === 'dark' ? 'border-dark-surface-highest' : 'border-light-surface-lowest'}`}>
              <div className={`p-3 rounded-lg border ${innerBg} ${innerBorder}`}>
                <span className="text-gray-500 block text-[10px] uppercase">Est. Latency Profile</span>
                <span className="text-brand-primary font-bold neon-glow-primary tracking-wide">{getEstdLatency()}</span>
              </div>
              <div className={`p-3 rounded-lg border ${innerBg} ${innerBorder}`}>
                <span className="text-gray-500 block text-[10px] uppercase">Est. Proof Gas Cap</span>
                <span className="text-brand-secondary font-bold neon-glow-secondary tracking-wide">{getEstdGasCost()}</span>
              </div>
            </div>
          </div>

          <div>
            {!simulationRunning ? (
              <button
                onClick={handleRunSimulation}
                className="w-full bg-brand-secondary text-black font-extrabold font-mono py-2.5 px-4 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-brand-secondary/90 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Fire Simulation packet
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 p-2 bg-brand-primary/10 rounded-full border border-brand-primary/30 text-xs font-mono text-brand-primary font-bold animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Packet In Flight...
                </div>
                <div className={`p-3 rounded-lg border font-mono text-[10px] text-brand-primary space-y-1 shadow-inner h-24 overflow-y-auto ${innerBg} ${innerBorder}`}>
                  {simulationLogs.map((log, idx) => (
                    <p key={idx} className="animate-fade-in">{log}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
