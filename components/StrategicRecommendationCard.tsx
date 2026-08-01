import React from 'react';
import { PriorityBadge } from './PriorityBadge';
import { Target, TrendingUp, AlertTriangle, FileCheck } from 'lucide-react';

interface StrategicRecommendationCardProps {
  strategicIssues: string[];
  recommendation: string;
  businessImpact: string;
  priority: string;
  expectedOutcome: string;
  citations?: any[];
  onSelectCitation?: (citation: any) => void;
}

export const StrategicRecommendationCard: React.FC<StrategicRecommendationCardProps> = ({
  strategicIssues,
  recommendation,
  businessImpact,
  priority,
  expectedOutcome,
  citations = [],
  onSelectCitation,
}) => {
  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Strategic Transformation Recommendation</h3>
        </div>
        <PriorityBadge priority={priority} />
      </div>

      {/* Strategic Issues */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Identified Operational Vulnerabilities
        </h4>
        <ul className="space-y-1.5 pl-2">
          {strategicIssues.map((issue, idx) => (
            <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
              <span className="text-indigo-400 font-bold">•</span>
              <span>{issue}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Strategic Play */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">Phased Transformation Play</h4>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
          {recommendation}
        </p>
      </div>

      {/* Business Impact & Expected Outcome */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Financial & Operational Risk Impact</span>
          <p className="text-xs text-slate-300">{businessImpact}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mb-1">
            <TrendingUp className="w-3.5 h-3.5" /> Projected ROI & Outcome
          </span>
          <p className="text-xs text-emerald-200">{expectedOutcome}</p>
        </div>
      </div>

      {/* Citations Footer */}
      {citations.length > 0 && (
        <div className="pt-4 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-400 block mb-2 flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5 text-indigo-400" /> Grounded Evidence Citations ({citations.length}):
          </span>
          <div className="flex flex-wrap gap-2">
            {citations.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onSelectCitation && onSelectCitation(item)}
                className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors"
              >
                [{item.source}: {item.title}]
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
