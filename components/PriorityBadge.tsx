import React from 'react';

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const pLower = priority.toLowerCase();

  let colorClasses = 'bg-slate-800 text-slate-300 border-slate-700';

  if (pLower.includes('high') || pLower.includes('immediate') || pLower.includes('risk')) {
    colorClasses = 'bg-red-500/10 text-red-400 border-red-500/30';
  } else if (pLower.includes('medium') || pLower.includes('moderate')) {
    colorClasses = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  } else if (pLower.includes('low') || pLower.includes('win') || pLower.includes('positive') || pLower.includes('quick')) {
    colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colorClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {priority}
    </span>
  );
};
