import React from 'react';
import { FileCheck, CheckCircle2, DollarSign, Users, FileText, Globe } from 'lucide-react';

export interface EvidenceItemData {
  source: string;
  category: string;
  title: string;
  details: any;
  confidence: string;
}

interface EvidenceSectionProps {
  evidenceItems?: EvidenceItemData[];
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({
  evidenceItems = [],
}) => {
  if (!evidenceItems || evidenceItems.length === 0) {
    return null;
  }

  const formatValue = (key: string, val: any) => {
    if (val === null || val === undefined) return 'N/A';
    if (typeof val === 'number') {
      if (key.toLowerCase().includes('revenue') || key.toLowerCase().includes('profit') || key.toLowerCase().includes('spend') || key.toLowerCase().includes('size')) {
        return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
      }
      if (key.toLowerCase().includes('pct') || key.toLowerCase().includes('margin') || key.toLowerCase().includes('rate')) {
        return `${val}%`;
      }
      return val.toLocaleString('en-IN');
    }
    if (typeof val === 'object') {
      return Object.entries(val)
        .slice(0, 4)
        .map(([k, v]) => `${k}: ${v}`)
        .join(' | ');
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
    if (srcLower.includes('sales') || catLower.includes('sales')) return <DollarSign className="w-4 h-4 text-indigo-400" />;
    if (srcLower.includes('customer') || catLower.includes('customer')) return <Users className="w-4 h-4 text-emerald-400" />;
    if (srcLower.includes('knowledge') || srcLower.includes('pdf') || catLower.includes('document')) return <FileText className="w-4 h-4 text-purple-400" />;
    return <Globe className="w-4 h-4 text-blue-400" />;
  };

  return (
    <section className="space-y-4 pt-4 border-t border-slate-800/80">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileCheck className="w-5 h-5" />
            </div>
            Supporting Evidence & Fact Grounding ({evidenceItems.length})
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Verifiable source facts and pre-computed metrics gathered by autonomous tools to support AI recommendations.
          </p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> 100% Grounded
        </span>
      </div>

      {/* Structured Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evidenceItems.map((item, index) => {
          const isDocChunk = typeof item.details === 'object' && item.details !== null && 'text_chunk' in item.details;
          const isDict = typeof item.details === 'object' && item.details !== null && !isDocChunk;

          return (
            <div
              key={index}
              className="glass-card p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              {/* Card Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200">
                    {getSourceIcon(item.category, item.source)}
                    <span>{item.source}</span>
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {item.confidence}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
              </div>

              {/* Card Details Rendered as Structured UI */}
              <div className="flex-1">
                {isDocChunk ? (
                  /* Formatted Document Quote Card */
                  <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-purple-400 font-medium pb-2 border-b border-slate-800/80">
                      <span>📄 Document: {item.details.doc_name || 'Uploaded PDF'}</span>
                      <span>Page {item.details.page || 1}</span>
                    </div>
                    <p className="italic text-slate-200">"{item.details.text_chunk}"</p>
                  </div>
                ) : isDict ? (
                  /* Formatted Key-Value Stat Pills */
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(item.details).map(([key, val], idx) => {
                      // Filter out complex nested dicts for clean pill layout
                      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                        return null;
                      }
                      return (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                            {formatKeyName(key)}
                          </span>
                          <span className="text-xs font-bold text-slate-100 mt-1 truncate">
                            {formatValue(key, val)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Simple Text Quote Card */
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                    <p>{String(item.details)}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
