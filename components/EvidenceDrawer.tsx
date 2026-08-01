import React from 'react';
import { X, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export interface EvidenceDrawerItem {
  source: string;
  category: string;
  title: string;
  details: any;
  confidence: string;
}

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: EvidenceDrawerItem | null;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  isOpen,
  onClose,
  evidence,
}) => {
  if (!isOpen || !evidence) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center space-x-2 text-indigo-400">
              <FileText className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wide uppercase">Evidence Fact Inspector</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Evidence Content */}
          <div className="space-y-6">
            <div>
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 mb-2">
                {evidence.category}
              </span>
              <h3 className="text-xl font-bold text-white mb-1">{evidence.title}</h3>
              <p className="text-xs text-slate-400">Source: <strong className="text-slate-200">{evidence.source}</strong></p>
            </div>

            {/* Confidence Badge */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Confidence Metric: <strong className="text-emerald-400">{evidence.confidence}</strong></span>
            </div>

            {/* Details Inspector */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Extracted Fact Details</h4>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                {typeof evidence.details === 'object' ? (
                  <pre className="whitespace-pre-wrap">{JSON.stringify(evidence.details, null, 2)}</pre>
                ) : (
                  <p className="whitespace-pre-wrap">{String(evidence.details)}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-indigo-400" /> 100% Deterministic Fact Citation</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
