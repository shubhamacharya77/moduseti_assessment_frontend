import React from 'react';
import { BarChart3, FileSpreadsheet, FileText, Zap, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-8 my-6 shadow-2xl">
      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Autonomous AI Strategy Analyst</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Turn Enterprise Data into <span className="text-gradient">Evidence-Backed Strategic Plays</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
          Synthesize company PDFs, HR policies, sales records, and customer churn data into deterministic analytics and explainable transformation recommendations powered by Groq & LangGraph.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Real-time Strategy Playbook Active</span>
          </div>

          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-indigo-400" /> PDF RAG</span>
            <span className="flex items-center gap-1.5"><FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Pandas Analytics</span>
            <span className="flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-purple-400" /> Groq Reasoning</span>
          </div>
        </div>
      </div>
    </div>
  );
};
