import React from 'react';
import { FileText } from 'lucide-react';

interface CitationBadgeProps {
  citation: any;
  onClick: (citation: any) => void;
}

export const CitationBadge: React.FC<CitationBadgeProps> = ({ citation, onClick }) => {
  const sourceName = citation?.source || 'Evidence Source';
  const title = citation?.title || 'Fact Citation';

  return (
    <button
      onClick={() => onClick(citation)}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 my-1 mr-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-all cursor-pointer shadow-sm"
      title={`Inspect fact details from ${sourceName}`}
    >
      <FileText className="w-3 h-3 text-indigo-400" />
      <span>[{sourceName}: {title}]</span>
    </button>
  );
};
