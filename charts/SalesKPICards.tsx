import React from 'react';
import { DollarSign, TrendingUp, Percent, ShoppingBag } from 'lucide-react';

interface SalesKPICardsProps {
  salesSummary?: any;
}

export const SalesKPICards: React.FC<SalesKPICardsProps> = ({ salesSummary = {} }) => {
  const formatCurrency = (val?: number) => {
    if (!val) return '₹0.00';
    return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  const totalRevenue = salesSummary?.total_revenue || 0;
  const totalProfit = salesSummary?.total_profit || 0;
  const profitMarginPct = salesSummary?.profit_margin_pct || 0;
  const avgDealSize = salesSummary?.average_deal_size || 0;
  const totalUnits = salesSummary?.total_units || 0;
  const topCategory = salesSummary?.top_category || 'N/A';
  const topRegion = salesSummary?.top_region || 'N/A';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
      {/* Total Revenue Card */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/40 transition-all shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</span>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-white mb-1">{formatCurrency(totalRevenue)}</div>
        <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Top Region: <strong className="text-slate-200">{topRegion}</strong>
        </span>
      </div>

      {/* Gross Profit & Margin Card */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/40 transition-all shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gross Profit (Margin)</span>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-white mb-1">{formatCurrency(totalProfit)}</div>
        <span className="text-[11px] text-emerald-400 font-medium">
          Profit Margin: <strong className="text-white">{profitMarginPct}%</strong>
        </span>
      </div>

      {/* Average Deal Size Card */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/40 transition-all shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Deal Size</span>
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-white mb-1">{formatCurrency(avgDealSize)}</div>
        <span className="text-[11px] text-slate-400">
          Total Units Sold: <strong className="text-slate-200">{totalUnits.toLocaleString('en-IN')}</strong>
        </span>
      </div>

      {/* Top Product Category Card */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/40 transition-all shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Performing Category</span>
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl font-extrabold text-white truncate mb-1" title={topCategory}>{topCategory}</div>
        <span className="text-[11px] text-purple-400 font-medium">
          Primary Revenue Driver
        </span>
      </div>
    </div>
  );
};
