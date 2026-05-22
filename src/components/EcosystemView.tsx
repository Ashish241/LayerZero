import React, { useState, useEffect, useRef } from 'react';
import { TelemetryLog } from '../types';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Cpu, Wifi, Activity, Terminal, CheckCircle2, ChevronRight, RefreshCw, Send, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EcosystemViewProps {
  theme: 'dark' | 'light';
  isCoreInitialized: boolean;
  onInitializeCore: () => void;
  openGetStarted: () => void;
}

const INITIAL_LOGS: TelemetryLog[] = [
  { type: 'SYS', message: 'Endpoint platform container up and routing core requests.', timestamp: '15:10:02' },
  { type: 'OK', message: 'WASM validation Engine active. Security profiles loaded.', timestamp: '15:10:05' },
  { type: 'NET', message: 'Tunnel initiated connecting Alpha and Beta clusters.', timestamp: '15:10:09' },
  { type: 'INFO', message: 'Listening for cross-chain message envelopes...', timestamp: '15:11:12' },
  { type: 'WARN', message: 'High gas thresholds detected on Arbitrum Node. Retrying route...', timestamp: '15:12:15' },
  { type: 'ALERT', message: 'Latency spike detected on Alpha Relayer network pool.', timestamp: '15:13:00' },
];

export default function EcosystemView({
  theme,
  isCoreInitialized,
  onInitializeCore,
  openGetStarted
}: EcosystemViewProps) {
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_LOGS);
  const [logFilter, setLogFilter] = useState<'ALL' | 'SYS' | 'NET' | 'WARN' | 'OK' | 'ALERT'>('ALL');
  const [customMsg, setCustomMsg] = useState('');
  const [customType, setCustomType] = useState<TelemetryLog['type']>('SYS');
  
  // Realtime metric states
  const [routerStatus, setRouterStatus] = useState<'HEALTHY' | 'STRESSED' | 'REFRESHING'>('HEALTHY');
  const [avgLatency, setAvgLatency] = useState(48);
  const [syncProgress, setSyncProgress] = useState(99.4);
  const [activeChannels, setActiveChannels] = useState(12);

  // Initialize Core simulated process logs
  const [initStage, setInitStage] = useState<number>(0);
  const [initLogs, setInitLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCoreInitialized && initStage === 0) {
      runCoreInitializationSequence();
    }
  }, [isCoreInitialized]);

  const runCoreInitializationSequence = () => {
    setInitStage(1);
    const steps = [
      { msg: '» Establishing decentralized consensus routing context...', dur: 600 },
      { msg: '» Verifying LayerZero protocol secure contract standards...', dur: 1200 },
      { msg: '» Activating real-time packet telemetry scanners...', dur: 1800 },
      { msg: '» Spinning up lightweight diagnostic log client daemon...', dur: 2400 },
      { msg: '✔ Core DevOps engine initialized: All systems green!', dur: 3000 }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setInitLogs(prev => [...prev, step.msg]);
        if (idx === steps.length - 1) {
          setInitStage(3); // Completed status
          // Inject an official success system log to telemetry stream
          injectTelemetry('OK', 'Consensus verification engine fully linked to main cluster.');
        }
      }, step.dur);
    });
  };

  const handleManualRefresh = () => {
    setRouterStatus('REFRESHING');
    setTimeout(() => {
      setRouterStatus(Math.random() > 0.3 ? 'HEALTHY' : 'STRESSED');
      setAvgLatency(Math.floor(Math.random() * 30) + 30);
      setSyncProgress(parseFloat((98.5 + Math.random() * 1.4).toFixed(1)));
      setActiveChannels(Math.floor(Math.random() * 6) + 10);
      injectTelemetry('INFO', 'Manual telemetry diagnostics sweep complete.');
    }, 1500);
  };

  const injectTelemetry = (type: TelemetryLog['type'], message: string) => {
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setLogs(prev => [
      { type, message, timestamp: ts },
      ...prev
    ]);
  };

  const handleInjectCustomLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    injectTelemetry(customType, customMsg.trim());
    setCustomMsg('');
  };

  const clearLogsList = () => {
    setLogs([]);
  };

  const filteredLogs = logs.filter(log => logFilter === 'ALL' || log.type === logFilter);

  // Styling selectors
  const textColor = theme === 'dark' ? 'text-white' : 'text-zinc-950';
  const subtextColor = theme === 'dark' ? 'text-gray-400' : 'text-zinc-600';
  const sectionBg = theme === 'dark' ? 'bg-dark-surface' : 'bg-white';
  const borderCol = theme === 'dark' ? 'border-dark-surface-highest' : 'border-light-surface-lowest';
  const innerBg = theme === 'dark' ? 'bg-dark-surface-lowest' : 'bg-[#fbfaf7]';
  const innerBorder = theme === 'dark' ? 'border-dark-surface-highest/40' : 'border-light-surface-lowest';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Hero Platform Intro */}
      <div className={`p-8 rounded-xl border flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden relative ${sectionBg} ${borderCol}`}>
        {/* Subtle grid elements inside cards */}
        <div className="absolute inset-0 scanline-bg opacity-[0.3]" />
        
        <div className="space-y-4 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 animate-spin" /> OMNICHAIN TELEMETRY ACTIVE
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold font-headline tracking-tight ${textColor}`}>
            Unified Node Operations & Message Telemetry
          </h2>
          <p className={`text-sm leading-relaxed ${subtextColor}`}>
            Deploy, observe, and secure your LayerZero cross-chain architectures. Track endpoints, debug network latency instantly, and streamline multi-chain deployment pipelines with automated telemetry scanning.
          </p>
          <div className="flex gap-4">
            <button
              onClick={openGetStarted}
              className="bg-brand-primary hover:bg-brand-primary/95 text-black text-xs font-mono font-extrabold uppercase tracking-wider px-5 py-3 rounded-full btn-neon-primary transition-all cursor-pointer"
            >
              Get Started Now
            </button>
            <button
              onClick={handleManualRefresh}
              disabled={routerStatus === 'REFRESHING'}
              className={`text-xs font-mono font-semibold px-5 py-3 rounded-full border border-zinc-500/20 flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer ${textColor}`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${routerStatus === 'REFRESHING' ? 'animate-spin' : ''}`} /> Run Diagnostic Sweep
            </button>
          </div>
        </div>

        {/* Dynamic Status Grid Visualizer */}
        <div className="w-full lg:w-96 grid grid-cols-2 gap-4 z-10">
          <div onClick={handleManualRefresh} className={`p-4 rounded-lg border transition-all cursor-pointer select-none relative overflow-hidden group ${
            theme === 'dark' ? 'bg-dark-surface-lowest/60 border-dark-surface-highest hover:border-brand-secondary/50' : 'bg-[#fbfaf7] border-light-surface-lowest hover:border-brand-secondary'
          }`}>
            <span className="text-[10px] font-mono text-gray-400 block uppercase mb-1">CONTRACT ROUTER</span>
            <span className={`text-base font-extrabold font-headline tracking-wide flex items-center gap-1.5 ${
              routerStatus === 'HEALTHY' ? 'text-brand-secondary neon-glow-secondary' : routerStatus === 'STRESSED' ? 'text-brand-tertiary neon-glow-tertiary' : 'text-gray-400'
            }`}>
              {routerStatus}
            </span>
            <div className="absolute right-2 bottom-2 text-gray-500/10 group-hover:text-brand-secondary/15 transition-all">
              <ShieldCheck className="w-10 h-10" />
            </div>
          </div>

          <div onClick={handleManualRefresh} className={`p-4 rounded-lg border transition-all cursor-pointer select-none relative overflow-hidden group ${
            theme === 'dark' ? 'bg-dark-surface-lowest/60 border-dark-surface-highest hover:border-brand-primary/50' : 'bg-[#fbfaf7] border-light-surface-lowest hover:border-brand-primary'
          }`}>
            <span className="text-[10px] font-mono text-gray-400 block uppercase mb-1">AVG ROUTE LATENCY</span>
            <span className="text-base font-extrabold font-headline tracking-wide text-brand-primary neon-glow-primary">
              {avgLatency}ms
            </span>
            <div className="absolute right-2 bottom-2 text-gray-500/10 group-hover:text-brand-primary/15 transition-all">
              <Wifi className="w-10 h-10" />
            </div>
          </div>

          <div onClick={handleManualRefresh} className={`p-4 rounded-lg border transition-all cursor-pointer select-none relative overflow-hidden group ${
            theme === 'dark' ? 'bg-dark-surface-lowest/60 border-dark-surface-highest hover:border-brand-tertiary/50' : 'bg-[#fbfaf7] border-light-surface-lowest hover:border-brand-tertiary'
          }`}>
            <span className="text-[10px] font-mono text-gray-400 block uppercase mb-1">SYNC STATUS</span>
            <span className="text-base font-extrabold font-headline tracking-wide text-brand-tertiary neon-glow-tertiary">
              {syncProgress}%
            </span>
            <div className="absolute right-2 bottom-2 text-gray-500/10 group-hover:text-brand-tertiary/15 transition-all">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          </div>

          <div onClick={handleManualRefresh} className={`p-4 rounded-lg border transition-all cursor-pointer select-none relative overflow-hidden group ${
            theme === 'dark' ? 'bg-dark-surface-lowest/60 border-dark-surface-highest hover:border-brand-primary/50' : 'bg-[#fbfaf7] border-light-surface-lowest hover:border-brand-primary'
          }`}>
            <span className="text-[10px] font-mono text-gray-400 block uppercase mb-1">ACTIVE CHANNELS</span>
            <span className={`text-base font-extrabold font-headline tracking-wide ${textColor}`}>
              {activeChannels} / 16
            </span>
            <div className="absolute right-2 bottom-2 text-gray-500/10 group-hover:text-white/10 transition-all">
              <Activity className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Section: Left - Telemetry Logs + Manual Injection Form, Right - Core Setup Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core Control Panel Console */}
        <div className={`p-6 rounded-xl border flex flex-col justify-between h-auto min-h-110 lg:col-span-1 relative overflow-hidden ${sectionBg} ${borderCol}`}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="text-brand-primary w-5 h-5" />
              <h3 className={`font-bold font-headline text-md ${textColor}`}>Console Control Panel</h3>
            </div>
            
            <p className={`text-xs leading-relaxed mb-6 ${subtextColor}`}>
              Before using other telemetry modules, you should initialize the orchestration environment locally. This sets up consensus caches and initializes remote testing pipes.
            </p>

            <div className={`rounded-lg border p-4 font-mono text-xs h-48 overflow-y-auto mb-4 flex flex-col gap-2 ${innerBg} ${innerBorder} ${theme === 'dark' ? 'text-brand-secondary/90' : 'text-zinc-800'}`}>
              <p className="text-gray-500 font-bold">// LOCAL CONSOLE SHELL</p>
              {initLogs.length === 0 ? (
                <p className="text-zinc-400 italic">No node initialized yet. Activate using the button below.</p>
              ) : (
                initLogs.map((log, index) => (
                  <p key={index} className={log.startsWith('✔') ? 'text-brand-primary font-bold neon-glow-primary' : 'text-zinc-805 dark:text-gray-350'}>
                    {log}
                  </p>
                ))
              )}
              {initStage === 1 && (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-brand-primary animate-ping" />
                  <span>Configuring clusters...</span>
                </div>
              )}
              <div ref={logsEndRef} />
            </div>
          </div>

          <div>
            {initStage === 0 ? (
              <button
                onClick={onInitializeCore}
                className="w-full bg-brand-primary hover:bg-brand-primary/95 text-black py-3 px-4 rounded-full text-xs font-mono font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" /> Initialize Orchestrator Core
              </button>
            ) : initStage === 1 ? (
              <button
                disabled
                className="w-full bg-zinc-900 text-zinc-500 py-3 px-4 rounded-full text-xs font-mono font-bold uppercase tracking-wide flex items-center justify-center gap-2 cursor-not-allowed border border-zinc-800"
              >
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-t-transparent border-gray-500" /> Building Environment...
              </button>
            ) : (
              <div className="space-y-2">
                <div className="p-3 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-mono text-xs flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" /> Core DevOps Core Node Linked
                </div>
                <button
                  onClick={() => {
                    setInitLogs([]);
                    setInitStage(0);
                    onInitializeCore(); // Directly restart sequence
                  }}
                  className={`w-full py-2.5 px-4 rounded-full text-xs font-mono font-semibold flex items-center justify-center gap-1.5 border border-zinc-500/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer ${textColor}`}
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reconnect Agent Core
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Telemetry Log Stream */}
        <div className={`p-6 rounded-xl border lg:col-span-2 h-auto flex flex-col justify-between ${sectionBg} ${borderCol}`}>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="text-brand-secondary w-5 h-5 animate-pulse" />
                <h3 className={`font-bold font-headline text-md ${textColor}`}>Telemetry Log Capture Stream</h3>
              </div>
              <button
                onClick={clearLogsList}
                className="text-[11px] font-mono flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Stream
              </button>
            </div>
            
            {/* Logs filter buttons */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(['ALL', 'SYS', 'NET', 'WARN', 'OK', 'ALERT'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setLogFilter(type)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wide border transition-all cursor-pointer ${
                    logFilter === type
                      ? 'bg-brand-primary border-brand-primary text-black font-extrabold shadow-sm'
                      : theme === 'dark'
                        ? 'border-dark-surface-highest text-gray-400 hover:text-white hover:bg-white/5'
                        : 'border-light-surface-lowest text-zinc-650 hover:text-zinc-950 hover:bg-black/5'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Logger list output */}
            <div className={`rounded-lg border p-4 font-mono text-xs space-y-2 max-h-64 overflow-y-auto no-scrollbar mb-6 shadow-inner ${innerBg} ${innerBorder}`}>
              <AnimatePresence mode="popLayout">
                {filteredLogs.length === 0 ? (
                  <p className="text-gray-500 italic py-4 text-center">No logs matching selected filters.</p>
                ) : (
                  filteredLogs.map((log, idx) => {
                    let typeBadge = '';
                    let colorClass = theme === 'dark' ? 'text-gray-300' : 'text-zinc-800';
                    switch (log.type) {
                      case 'SYS':
                        typeBadge = '[SYS]';
                        colorClass = theme === 'dark' ? 'text-zinc-350' : 'text-zinc-600';
                        break;
                      case 'NET':
                        typeBadge = '[NET]';
                        colorClass = theme === 'dark' ? 'text-amber-250' : 'text-amber-800';
                        break;
                      case 'WARN':
                        typeBadge = '[WARN]';
                        colorClass = 'text-brand-secondary font-semibold';
                        break;
                      case 'OK':
                        typeBadge = '[ OK ]';
                        colorClass = 'text-brand-primary font-semibold';
                        break;
                      case 'ALERT':
                        typeBadge = '[🚨]';
                        colorClass = 'text-brand-secondary font-bold animate-pulse';
                        break;
                      default:
                        typeBadge = '[INFO]';
                        colorClass = theme === 'dark' ? 'text-gray-300' : 'text-zinc-800';
                    }

                    return (
                      <motion.div
                        key={idx}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`flex items-start gap-2 border-b pb-1.5 ${theme === 'dark' ? 'border-dark-surface-highest/30' : 'border-light-surface-lowest/35'}`}
                      >
                        <span className="text-gray-505 font-medium whitespace-nowrap">{log.timestamp}</span>
                        <span className={`font-bold whitespace-nowrap ${
                          log.type === 'ALERT' ? 'text-brand-secondary' : log.type === 'OK' ? 'text-brand-primary' : 'text-gray-500'
                        }`}>{typeBadge}</span>
                        <span className={colorClass}>{log.message}</span>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Form to manual inject diagnostic warnings/events */}
          <form onSubmit={handleInjectCustomLog} className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-end">
            <div className="flex-1">
              <label className="block text-[10px] font-mono tracking-wider uppercase mb-1.5 text-gray-400">Inject Telemetry Event</label>
              <div className="flex gap-2">
                <select
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value as TelemetryLog['type'])}
                  className={`px-3 py-2 rounded-lg text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-brand-primary border ${
                    theme === 'dark' ? 'bg-dark-surface-lowest border-dark-surface-highest text-white' : 'bg-white border-light-surface-lowest text-zinc-900'
                  }`}
                >
                  <option value="SYS">SYS</option>
                  <option value="NET">NET</option>
                  <option value="OK">OK</option>
                  <option value="WARN">WARN</option>
                  <option value="ALERT">ALERT</option>
                </select>
                <input
                  type="text"
                  placeholder="Simulate test payload routing or state triggers..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className={`flex-1 px-4 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary border ${
                    theme === 'dark' ? 'bg-dark-surface-lowest border-dark-surface-highest text-white' : 'bg-white border-light-surface-lowest text-zinc-900'
                  }`}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!customMsg.trim()}
              className="px-4 py-2 bg-brand-primary hover:bg-brand-primary/95 text-black font-semibold rounded-lg text-xs cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1 shrink-0 h-9.5 sm:h-auto font-mono"
            >
              <Send className="w-3.5 h-3.5" /> Inject
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
