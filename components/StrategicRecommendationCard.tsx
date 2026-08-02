import React, { useState } from 'react';
import { PriorityBadge } from './PriorityBadge';
import {
  Target,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  HelpCircle,
  CheckCircle2,
  DollarSign,
  Users,
  FileText,
  Globe,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface StrategicRecommendationCardProps {
  strategicIssues: string[];
  recommendation: string;
  businessImpact: string;
  priority: string;
  expectedOutcome: string;
  citations?: any[];
  onSelectCitation?: (citation: any) => void;
  masterPrompt?: string;
}

export const StrategicRecommendationCard: React.FC<StrategicRecommendationCardProps> = ({
  strategicIssues,
  recommendation,
  businessImpact,
  priority,
  expectedOutcome,
  citations = [],
  masterPrompt = 'What high-priority strategic transformation recommendations should we execute?',
}) => {
  const [showEvidence, setShowEvidence] = useState(true);

  const formatValue = (key: string, val: any) => {
    if (val === null || val === undefined) return 'N/A';
    if (typeof val === 'number') {
      if (
        key.toLowerCase().includes('revenue') ||
        key.toLowerCase().includes('profit') ||
        key.toLowerCase().includes('spend') ||
        key.toLowerCase().includes('size')
      ) {
        return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
      }
      if (
        key.toLowerCase().includes('pct') ||
        key.toLowerCase().includes('margin') ||
        key.toLowerCase().includes('rate')
      ) {
        return `${val}%`;
      }
      return val.toLocaleString('en-IN');
    }
    return String(val);
  };

  const formatKeyName = (key: string) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const getSourceIcon = (category: string, source: string) => {
    const catLower = (category || '').toLowerCase();
    const srcLower = (source || '').toLowerCase();
    if (srcLower.includes('sales') || catLower.includes('sales'))
      return <DollarSign className="w-3.5 h-3.5 text-indigo-400" />;
    if (srcLower.includes('customer') || catLower.includes('customer'))
      return <Users className="w-3.5 h-3.5 text-emerald-400" />;
    if (srcLower.includes('knowledge') || srcLower.includes('pdf') || catLower.includes('document'))
      return <FileText className="w-3.5 h-3.5 text-purple-400" />;
    return <Globe className="w-3.5 h-3.5 text-blue-400" />;
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl space-y-6">
      {/* Master Assessment Prompt Banner */}
      <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 mt-0.5">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 block">
            Master Assessment Prompt
          </span>
          <p className="text-xs text-indigo-100 font-medium italic mt-0.5">"{masterPrompt}"</p>
        </div>
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Strategic Transformation Recommendations</h3>
        </div>
        <PriorityBadge priority={priority} />
      </div>

      {/* Strategic Issues */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Key Issues & Opportunities Identified
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
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">
          Recommended Action Steps
        </h4>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
          {recommendation}
        </p>
      </div>

      {/* Business Impact & Expected Outcome */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400 block mb-1">Business Impact</span>
          <p className="text-xs text-slate-300 leading-normal">{businessImpact}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mb-1">
            <TrendingUp className="w-3.5 h-3.5" /> Expected Outcome & Goals
          </span>
          <p className="text-xs text-emerald-200 leading-normal">{expectedOutcome}</p>
        </div>
      </div>

      {/* STRUCTURED EVIDENCE PACKAGE EMBEDDED INSIDE PLAYBOOK CARD */}
      {citations.length > 0 && (
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-indigo-400" /> Supporting Evidence & Fact Grounding ({citations.length})
            </span>
            <button
              onClick={() => setShowEvidence(!showEvidence)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>{showEvidence ? 'Hide Evidence' : 'Show Evidence'}</span>
              {showEvidence ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showEvidence && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {citations.map((item, idx) => {
                const isDocChunk =
                  typeof item.details === 'object' && item.details !== null && 'text_chunk' in item.details;
                const isDict = typeof item.details === 'object' && item.details !== null && !isDocChunk;

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2.5 text-xs"
                  >
                    {/* Source & Confidence Header */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300">
                        {getSourceIcon(item.category, item.source)}
                        <span>{item.source}</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Grounded
                      </span>
                    </div>

                    <h5 className="font-bold text-white text-xs">{item.title}</h5>

                    {/* Structured Content Details (No Raw JSON) */}
                    <div>
                      {isDocChunk ? (
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-200 leading-relaxed font-sans italic">
                          <span className="text-[10px] text-purple-400 font-semibold block not-italic mb-1">
                            📄 Page {item.details.page || 1} Excerpt:
                          </span>
                          "{item.details.text_chunk}"
                        </div>
                      ) : isDict ? (
                        <div className="grid grid-cols-2 gap-1.5">
                          {Object.entries(item.details).map(([k, v], i) => {
                            if (typeof v === 'object' && v !== null && !Array.isArray(v)) return null;
                            return (
                              <div key={i} className="p-1.5 rounded-md bg-slate-900 border border-slate-800/80">
                                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block truncate">
                                  {formatKeyName(k)}
                                </span>
                                <span className="text-xs font-bold text-slate-100 block truncate">
                                  {formatValue(k, v)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg bg-slate-900 text-slate-200 text-xs">
                          {String(item.details)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
