import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import TopNavBar from './components/TopNavBar';
import EcosystemView from './components/EcosystemView';
import ToolingView from './components/ToolingView';
import DocsView from './components/DocsView';
import CommunityView from './components/CommunityView';
import { GetStartedModal, ApplyFundingModal, DeployModal } from './components/Modals';
import { Globe2, Heart, ExternalLink, Moon, Sun, Terminal } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentView, setView] = useState<ViewType>('ecosystem');
  
  // Modals status
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isGrantOpen, setIsGrantOpen] = useState(false);
  const [isDeployOpen, setIsDeployOpen] = useState(false);

  // Core status
  const [isCoreInitialized, setIsCoreInitialized] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme with DOM root class to styled background smoothly
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#090b11';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f8f6f0';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    showNotification(`Switched interface theme to ${theme === 'dark' ? 'Light' : 'Cyber Dark'}`);
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleInitializeCore = () => {
    setIsCoreInitialized(true);
    showNotification('DevOps Orchestrator core launched! Sequence in flight.');
  };

  const openGetStartedFlow = () => {
    setIsGetStartedOpen(true);
  };

  // Grid background classes matching visual theme toggle
  const gridClass = theme === 'dark' ? 'dark-grid-bg text-white' : 'light-grid-bg text-gray-900';

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-x-hidden max-w-full ${gridClass}`} id="app-root">
      
      {/* Background ambient lighting accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none select-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none select-none z-0" />

      {/* Main Layout wrapper (Z index above lights) */}
      <div className="z-10 flex flex-col flex-1">
        
        {/* Navigation Bar */}
        <TopNavBar
          currentView={currentView}
          setView={setView}
          theme={theme}
          toggleTheme={toggleTheme}
          openGetStarted={openGetStartedFlow}
          isCoreInitialized={isCoreInitialized}
          onInitializeCore={handleInitializeCore}
        />

        {/* Dynamic Content Views */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {currentView === 'ecosystem' && (
            <EcosystemView
              theme={theme}
              isCoreInitialized={isCoreInitialized}
              onInitializeCore={handleInitializeCore}
              openGetStarted={openGetStartedFlow}
            />
          )}

          {currentView === 'tooling' && (
            <ToolingView
              theme={theme}
              openGetStarted={openGetStartedFlow}
            />
          )}

          {currentView === 'docs' && (
            <DocsView
              theme={theme}
              openDeployConsole={() => setIsDeployOpen(true)}
            />
          )}

          {currentView === 'community' && (
            <CommunityView
              theme={theme}
              openGrantModal={() => setIsGrantOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Footer (No tech-larp, humble and clean labels) */}
      <footer className={`border-t py-6 text-xs text-gray-400 text-center transition-all z-10 ${
        theme === 'dark' ? 'bg-[#080808] border-[#1a1a1a]' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
            <span>LayerZero DevOps Dashboard Framework • Stable Production Release</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openGetStartedFlow}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              Get Started
            </button>
            <a 
              href="https://layerzero.network" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-brand-secondary transition-colors flex items-center gap-1"
            >
              LayerZero Protocol <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Global Modals */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        theme={theme}
      />

      <ApplyFundingModal
        isOpen={isGrantOpen}
        onClose={() => setIsGrantOpen(false)}
        theme={theme}
      />

      <DeployModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
        theme={theme}
      />

      {/* Dynamic Toast feedback panel */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-3 rounded bg-dark-surface border border-brand-secondary/40 text-brand-secondary font-mono text-xs shadow-lg animate-slide-up flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-ping" />
          {toastMessage}
        </div>
      )}

    </div>
  );
}
