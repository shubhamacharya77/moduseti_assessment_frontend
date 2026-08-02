import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bot, RefreshCw, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onRefresh?: () => void;
  isBackendConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRefresh,
  isBackendConnected = true,
}) => {
  const router = useRouter();
  const isChatPage = router.pathname === '/chat';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              MODUS <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Enterprise AI</span>
            </span>
            <span className="block text-xs text-slate-400">Transformation Strategy Intelligence Platform</span>
          </div>
        </Link>

        {/* Status Badge & Navigation Links */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <ShieldCheck className={`w-4 h-4 ${isBackendConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className="text-slate-300">
              Backend: <strong className={isBackendConnected ? 'text-emerald-400' : 'text-amber-400'}>{isBackendConnected ? 'Operational (FastAPI)' : 'Connecting...'}</strong>
            </span>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Refresh Metrics"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          {isChatPage ? (
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors border border-slate-700 shadow-md"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              <span>Executive Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/chat"
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold hover:opacity-95 transition-opacity shadow-lg shadow-indigo-600/20"
            >
              <Bot className="w-4 h-4" />
              <span>Executive AI Chat</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
