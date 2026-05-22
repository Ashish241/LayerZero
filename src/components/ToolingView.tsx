import React, { useState } from 'react';
import { ToolCard } from '../types';
import { Search, Star, Code, ArrowUpRight, CheckCircle2, ShieldAlert, Cpu, Heart, AlertCircle, PlusCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToolingViewProps {
  theme: 'dark' | 'light';
  openGetStarted: () => void;
}

const INITIAL_TOOLS: ToolCard[] = [
  {
    id: 'lz-cli',
    name: 'LayerZero Endpoint CLI',
    description: 'DevOps command line kit to initialize contract state, run sandboxes, and configure validation engines locally.',
    stars: 384,
    starred: false,
    languages: ['Rust', 'TypeScript'],
    category: 'CLI',
    official: true
  },
  {
    id: 'lz-sdk',
    name: 'Solidity Omnichain SDK v2',
    description: 'Out-of-the-box contract abstractions to inherit secure cross-chain routing models, endpoint validation, and gas models.',
    stars: 712,
    starred: true,
    languages: ['Solidity', 'Go'],
    category: 'SDK',
    official: true
  },
  {
    id: 'ultra-node',
    name: 'UltraLight Node Validator',
    description: 'Cryptographic block-header validator supporting dynamic validation models (DVMs) and multi-signature checkpoints.',
    stars: 1042,
    starred: false,
    languages: ['Rust', 'C++'],
    category: 'Security',
    official: true
  },
  {
    id: 'gas-daemon',
    name: 'Relayer Gas Oracle Daemon',
    description: 'Automated telemetry tracker looking up optimal gas thresholds and routing routes over 16+ destination networks.',
    stars: 254,
    starred: false,
    languages: ['Go', 'TypeScript'],
    category: 'Infrastructure',
    official: false
  },
  {
    id: 'web-vis',
    name: 'Packet Path Web Visualizer',
    description: 'Interactive browser-based telemetry portal to view live queue packets traveling between smart contracts.',
    stars: 491,
    starred: false,
    languages: ['TypeScript', 'Tailwind'],
    category: 'UI',
    official: false
  },
  {
    id: 'sec-audit',
    name: 'LZ Security Sentinel',
    description: 'Incremental static analyzer to audit inherited contracts for non-reentrant cross-chain loops and validation gaps.',
    stars: 319,
    starred: false,
    languages: ['Rust', 'Python'],
    category: 'Security',
    official: true
  }
];

export default function ToolingView({ theme, openGetStarted }: ToolingViewProps) {
  const [tools, setTools] = useState<ToolCard[]>(INITIAL_TOOLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'CLI' | 'SDK' | 'Infrastructure' | 'Security' | 'UI'>('ALL');
  
  // Custom tool requests state
  const [requestName, setRequestName] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [requestCategory, setRequestCategory] = useState<'CLI' | 'SDK' | 'Infrastructure' | 'Security' | 'UI'>('CLI');
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestSubmitting, setRequestSubmitting] = useState(false);

  // Filter tools index
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleStar = (toolId: string) => {
    setTools(prev => prev.map(tool => {
      if (tool.id === toolId) {
        return {
          ...tool,
          starred: !tool.starred,
          stars: tool.starred ? tool.stars - 1 : tool.stars + 1
        };
      }
      return tool;
    }));
  };

  const handleRequestTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestName.trim() || !requestDescription.trim()) return;

    setRequestSubmitting(true);
    setTimeout(() => {
      setRequestSubmitting(false);
      setRequestSuccess(true);
      
      const newCustomId = `custom-${Math.random().toString(36).substring(2, 6)}`;
      const proposedTool: ToolCard = {
        id: newCustomId,
        name: `${requestName.trim()} (Proposed)`,
        description: `${requestDescription.trim()} (Pending review inside community Governance RFC)`,
        stars: 1,
        starred: true,
        languages: ['DevSpec'],
        category: requestCategory,
        official: false
      };

      setTools(prev => [proposedTool, ...prev]);

      // Automatically reset modal form after timer
      setTimeout(() => {
        handleResetRequest();
      }, 3500);

    }, 1500);
  };

  const handleResetRequest = () => {
    setRequestSuccess(false);
    setRequestName('');
    setRequestDescription('');
    setRequestCategory('CLI');
  };

  // Styling helpers
  const textColor = theme === 'dark' ? 'text-white' : 'text-zinc-950';
  const subtextColor = theme === 'dark' ? 'text-gray-400' : 'text-zinc-650';
  const sectionBg = theme === 'dark' ? 'bg-dark-surface' : 'bg-white';
  const borderCol = theme === 'dark' ? 'border-dark-surface-highest' : 'border-light-surface-lowest';
  const cardBgClass = theme === 'dark' ? 'bg-dark-surface-lowest/50 hover:bg-dark-surface-lowest/80' : 'bg-[#fbfaf7]/60 hover:bg-[#fbfaf7]/90';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-extrabold font-headline tracking-tight ${textColor} flex items-center gap-2`}>
            Orchestration Catalog <span className="text-brand-secondary text-xs font-mono tracking-wider bg-brand-primary/10 px-2.5 py-0.5 rounded-full border border-brand-primary/20">STABLE CORE v2</span>
          </h2>
          <p className={`text-sm ${subtextColor}`}>
            Discover and integrate libraries, secure plugins, and command utilities maintained by Core Foundation and open-source contributors.
          </p>
        </div>

        {/* Dynamic Search Box */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search tools, SDKs, CLIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary border ${
              theme === 'dark' ? 'bg-dark-surface-lowest border-dark-surface-highest text-white' : 'bg-white border-light-surface-lowest'
            }`}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Categories Grid and Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Filter Rules & Fast Creation Form */}
        <div className="space-y-6 lg:col-span-1">
          {/* Categories Tab selector */}
          <div className={`p-4 rounded-xl border space-y-1.5 ${sectionBg} ${borderCol}`}>
            <span className="block text-[10px] font-bold font-mono tracking-wider text-gray-400 uppercase mb-2 px-1">Filter Categories</span>
            {(['ALL', 'CLI', 'SDK', 'Infrastructure', 'Security', 'UI'] as const).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3.5 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-between ${
                  selectedCategory === category
                    ? 'bg-brand-primary text-black font-extrabold shadow-sm'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-zinc-650 hover:text-zinc-950 hover:bg-black/5'
                }`}
              >
                <span>{category}</span>
                {category !== 'ALL' && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${selectedCategory === category ? 'bg-black/20 text-black' : 'bg-zinc-200 dark:bg-black/40 text-zinc-900 dark:text-gray-300'}`}>
                    {tools.filter(t => t.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Request Custom Tool Form */}
          <div className={`p-5 rounded-xl border relative overflow-hidden ${sectionBg} ${borderCol}`}>
            <span className="p-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-mono tracking-wider px-2 mx-auto mb-2 inline-block">GOVERNANCE DEV</span>
            <h4 className={`font-bold font-headline text-sm mb-2 ${textColor}`}>Request Utility Node</h4>
            <p className={`text-xs leading-relaxed mb-4 ${subtextColor}`}>
              Is there an endpoint plugin or pipeline customizer missing? Request support or pitch tool specs to core engineers.
            </p>

            {!requestSuccess ? (
              <form onSubmit={handleRequestTool} className="space-y-3">
                <div>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Tendermint Consensus bridge"
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary border ${
                      theme === 'dark' ? 'bg-dark-surface-lowest border-dark-surface-highest text-white' : 'bg-[#fbfaf7] border-light-surface-lowest text-zinc-900'
                    }`}
                  />
                </div>
                <div>
                  <select
                    value={requestCategory}
                    onChange={(e) => setRequestCategory(e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-mono border focus:outline-none focus:ring-1 focus:ring-brand-primary ${
                      theme === 'dark' ? 'bg-dark-surface-lowest border-dark-surface-highest text-white' : 'bg-[#fbfaf7] border-light-surface-lowest text-zinc-900'
                    }`}
                  >
                    <option value="CLI">CLI Utility</option>
                    <option value="SDK">Contract SDK</option>
                    <option value="Infrastructure">Infrastructure node</option>
                    <option value="Security">Security Analyzer</option>
                    <option value="UI">Explorer UI</option>
                  </select>
                </div>
                <div>
                  <textarea
                    required
                    rows={2}
                    placeholder="Provide quick description/architecture details..."
                    value={requestDescription}
                    onChange={(e) => setRequestDescription(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary border ${
                      theme === 'dark' ? 'bg-dark-surface-lowest border-dark-surface-highest text-white' : 'bg-[#fbfaf7] border-light-surface-lowest text-zinc-900'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={requestSubmitting}
                  className="w-full bg-brand-primary hover:bg-brand-primary/95 text-black font-extrabold py-2.5 px-4 rounded-full text-xs font-mono uppercase tracking-widest cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                >
                  {requestSubmitting ? 'Transmitting Specs...' : 'Request Proposal'}
                </button>
              </form>
            ) : (
              <div className="p-3 bg-brand-secondary/10 border border-brand-secondary/30 rounded-lg text-center animate-scale-up">
                <CheckCircle2 className="w-8 h-8 text-brand-secondary mx-auto mb-2 animate-bounce" />
                <p className="text-xs font-bold text-brand-secondary uppercase font-mono">SPEC PROPOSAL LODGED</p>
                <p className={`text-[10px] mt-1 ${subtextColor}`}>Your requested tool was inserted at the top of the local tooling view as an in-review proposal!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Tools Grid List (Interactive Filtering) */}
        <div className="lg:col-span-3">
          {filteredTools.length === 0 ? (
            <div className={`p-12 text-center rounded-xl border ${sectionBg} ${borderCol}`}>
              <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4 animate-shake" />
              <h4 className={`text-lg font-bold font-headline mb-1 ${textColor}`}>No matching utilities found</h4>
              <p className={`text-xs ${subtextColor} max-w-md mx-auto`}>
                Try adjusting your search terms or selecting a different category. Alternatively, build or request your own deployment target above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredTools.map(tool => (
                  <motion.div
                    key={tool.id}
                    layoutId={`tool-${tool.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`p-6 rounded-xl border flex flex-col justify-between transition-all group duration-300 ${sectionBg} ${borderCol} ${cardBgClass} ${
                      tool.starred 
                        ? 'border-brand-primary/40 shadow-sm' 
                        : theme === 'dark' ? 'border-dark-surface-highest/60' : 'border-light-surface-lowest'
                    }`}
                  >
                    <div>
                      {/* Badge / Official Core indicators */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono tracking-wider font-bold text-gray-400 bg-black/25 px-2.5 py-0.5 rounded-full border border-gray-500/10 uppercase">
                          {tool.category}
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          {tool.official && (
                            <span className="text-[9px] font-mono font-extrabold tracking-wider bg-brand-secondary/15 text-brand-secondary border border-brand-secondary/35 px-2 py-0.5 rounded-full">
                              OFFICIAL
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                            {tool.languages.join(' • ')}
                          </span>
                        </div>
                      </div>

                      {/* Tool name & description specs */}
                      <h3 className={`font-bold font-headline text-md tracking-tight mb-2 group-hover:text-brand-primary transition-colors flex items-center justify-between ${textColor}`}>
                        {tool.name}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-brand-primary transition-all duration-300 transform translate-y-1 group-hover:translate-y-0" />
                      </h3>

                      <p className={`text-xs leading-relaxed mb-6 h-12 overflow-hidden text-ellipsis ${subtextColor}`}>
                        {tool.description}
                      </p>
                    </div>

                    {/* Bottom stats & action triggers */}
                    <div className="flex items-center justify-between border-t border-gray-500/10 pt-4 mt-2">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleToggleStar(tool.id)}
                          className={`flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer ${
                            tool.starred ? 'text-brand-primary font-bold neon-glow-primary' : 'text-gray-400 hover:text-brand-primary'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${tool.starred ? 'fill-current text-brand-primary' : ''}`} />
                          {tool.stars}
                        </button>
                      </div>

                      <button
                        onClick={openGetStarted}
                        className={`text-xs font-mono font-bold tracking-wide flex items-center gap-1.5 transition-all text-gray-400 hover:text-white capitalize cursor-pointer`}
                      >
                        Launch Setup <Code className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
