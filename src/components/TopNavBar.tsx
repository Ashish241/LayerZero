import React, { useState } from 'react';
import { ViewType } from '../types';
import { Sun, Moon, Link, Globe2, Sparkles, Terminal, Activity, Layers } from 'lucide-react';

interface TopNavBarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  openGetStarted: () => void;
  isCoreInitialized: boolean;
  onInitializeCore: () => void;
}

// LayerZero logo SVG drawing matching the official eye-shaped glyph layout
function LayerZeroLogo({ theme, className = "w-11 h-11" }: { theme: 'dark' | 'light', className?: string }) {
  const isDark = theme === 'dark';
  return (
    <svg 
      viewBox="0 0 100 80" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sleek metallic slate blue gradient of official branding */}
        <linearGradient id="lz-metallic-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>

        {/* Cohesive steel-silver gradient */}
        <linearGradient id="lz-metallic-right" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* Isometric double-rhombus offset vectors */}
      <g>
        {/* Left Side Loop - Outer segment */}
        <path 
          d="M 42 15 L 80 39 L 42 63 L 4 39 Z" 
          stroke="url(#lz-metallic-left)" 
          strokeWidth="3.5" 
          strokeLinejoin="round" 
        />
        {/* Left Side Loop - Inner concentric segment */}
        <path 
          d="M 42 21 L 71 39 L 42 57 L 13 39 Z" 
          stroke="url(#lz-metallic-left)" 
          strokeWidth="2.2" 
          strokeLinejoin="round" 
          strokeOpacity="0.7"
        />

        {/* Right Side Loop - Outer segment */}
        <path 
          d="M 58 15 L 96 39 L 58 63 L 20 39 Z" 
          stroke="url(#lz-metallic-right)" 
          strokeWidth="3.5" 
          strokeLinejoin="round" 
        />
        {/* Right Side Loop - Inner concentric segment */}
        <path 
          d="M 58 21 L 87 39 L 58 57 L 29 39 Z" 
          stroke="url(#lz-metallic-right)" 
          strokeWidth="2.2" 
          strokeLinejoin="round" 
          strokeOpacity="0.7"
        />

        {/* Central Core Circle (Masked overlapping center) */}
        <circle 
          cx="50" 
          cy="39" 
          r="9.5" 
          fill={isDark ? "#10141f" : "#f8f6f0"} 
          stroke={isDark ? "#ffffff" : "#0f172a"}
          strokeWidth="4" 
        />
      </g>
    </svg>
  );
}

export default function TopNavBar({
  currentView,
  setView,
  theme,
  toggleTheme,
  openGetStarted,
  isCoreInitialized,
  onInitializeCore
}: TopNavBarProps) {
  const [nodeConnected, setNodeConnected] = useState(false);

  const navItems = [
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'tooling', label: 'Tooling Catalog' },
    { id: 'docs', label: 'Docs & Architecture' },
    { id: 'community', label: 'Community Hub' }
  ];

  const handleConnectNode = () => {
    setNodeConnected(prev => !prev);
  };

  const navBg = theme === 'dark' ? 'bg-dark-surface/90 border-dark-surface-highest' : 'bg-light-bg/90 border-light-surface-lowest';
  const logoText = theme === 'dark' ? 'text-white' : 'text-zinc-900';

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-sm transition-all ${navBg}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 min-h-14 md:h-14 flex flex-wrap md:flex-nowrap items-center justify-between gap-x-2 gap-y-1.5 py-1.5 md:py-0">
        {/* Logo and App Title */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 hover:scale-105 transition-transform duration-300">
            <LayerZeroLogo theme={theme} className="w-7 h-7" />
          </div>
          <div>
            <h1 className={`text-xs sm:text-sm font-extrabold font-headline tracking-tight ${logoText} flex items-center gap-1`}>
              LayerZero <span className="text-brand-primary italic">DevOps</span>
            </h1>
            <p className="text-[8px] font-mono text-gray-400 tracking-wider">ENDPOINT v2.4</p>
          </div>
        </div>

        {/* Global Navigation Tabs - Always visible, but beautifully optimized */}
        <nav className="flex space-x-0.5 bg-black/5 dark:bg-dark-surface-lowest p-0.5 rounded-full border border-zinc-200 dark:border-dark-surface-highest">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewType)}
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold font-mono tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-primary text-black font-extrabold shadow-sm'
                    : theme === 'dark' 
                      ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5'
                }`}
              >
                {item.id === 'ecosystem' ? 'Ecosystem' :
                 item.id === 'tooling' ? 'Tooling' :
                 item.id === 'docs' ? 'Docs' :
                 'Community'}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Node Router Switch */}
          <button
            onClick={handleConnectNode}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono border tracking-wide transition-all cursor-pointer whitespace-nowrap ${
              nodeConnected
                ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/30'
                : 'bg-red-500/10 text-red-500 border-red-500/20'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${nodeConnected ? 'bg-brand-primary animate-pulse' : 'bg-red-500'}`} />
            <span className="hidden sm:inline">{nodeConnected ? 'ROUTER: CONNECTED' : 'ROUTER: STANDBY'}</span>
            <span className="inline sm:hidden">{nodeConnected ? 'ROUTER' : 'STANDBY'}</span>
          </button>

          {/* Core Initialization shortcut */}
          {!isCoreInitialized ? (
            <button
              onClick={onInitializeCore}
              className="text-[9px] sm:text-xs font-bold font-mono px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/30 hover:bg-brand-primary/20 cursor-pointer flex items-center gap-1 transition-all whitespace-nowrap"
            >
              <Terminal className="w-3 h-3" /> <span>Init</span>
            </button>
          ) : (
            <div className="text-[9px] sm:text-xs font-mono px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 flex items-center gap-1 whitespace-nowrap">
              <Activity className="w-3 h-3 animate-spin" /> <span className="hidden sm:inline">ACTIVE NODE</span><span className="inline sm:hidden">ACTIVE</span>
            </div>
          )}

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-full bg-black/10 dark:bg-white/5 hover:bg-brand-primary/10 transition-colors cursor-pointer shrink-0 ${
              theme === 'dark' ? 'text-brand-primary' : 'text-gray-600'
            }`}
            title="Toggle Visual Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Primary Action */}
          <button
            onClick={openGetStarted}
            className="inline-flex items-center gap-1 bg-brand-primary hover:bg-brand-primary/95 text-black font-extrabold font-headline text-[9px] sm:text-xs px-2.5 py-1 rounded-full shadow-md hover:shadow-brand-primary/20 transition-all cursor-pointer uppercase tracking-wider whitespace-nowrap"
          >
            <Globe2 className="w-3 h-3" /> <span className="hidden sm:inline">Get Started</span><span className="inline sm:hidden">Start</span>
          </button>
        </div>
      </div>
    </header>
  );
}
