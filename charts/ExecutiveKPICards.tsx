import React from 'react';
import { DollarSign, Users, UserX, Star, TrendingUp, AlertTriangle } from 'lucide-react';

interface ExecutiveKPICardsProps {
  salesSummary?: any;
  customerSummary?: any;
}

export const ExecutiveKPICards: React.FC<ExecutiveKPICardsProps> = ({
  salesSummary,
  customerSummary,
}) => {
  const formatCurrency = (val?: number) => {
    if (!val) return '₹0.00';
    return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  const totalRevenue = salesSummary?.total_revenue || 0;
  const churnRatePct = customerSummary?.churn_rate_pct || 0;
  const avgSpend = customerSummary?.avg_spend_per_customer || 0;
  const avgRating = customerSummary?.avg_customer_rating || 0;
  const totalCustomers = customerSummary?.total_customers || 0;
  const activeCustomers = customerSummary?.active_customers || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {/* Total Sales Revenue Card */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Sales Revenue</span>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-white mb-1">{formatCurrency(totalRevenue)}</div>
        <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Top Region: {salesSummary?.top_region || 'N/A'}
        </span>
      </div>

      {/* Customer Churn Rate Card */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer Churn Rate</span>
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
            <UserX className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-white mb-1">{churnRatePct}%</div>
        <span className={`text-[11px] font-medium flex items-center gap-1 ${churnRatePct > 15 ? 'text-red-400' : 'text-emerald-400'}`}>
          <AlertTriangle className="w-3 h-3" /> {churnRatePct > 15 ? 'Exceeds benchmark target (<5%)' : 'Healthy retention rate'}
        </span>
      </div>

      {/* Avg Spend per Customer Card */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Spend / Customer</span>
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-white mb-1">{formatCurrency(avgSpend)}</div>
        <span className="text-[11px] text-slate-400">
          Active Customers: <strong className="text-slate-200">{activeCustomers}</strong> / {totalCustomers}
        </span>
      </div>

      {/* CSAT Customer Rating Card */}
      <div className="glass-card p-5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CSAT Score Rating</span>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Star className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-white mb-1">{avgRating} <span className="text-sm font-normal text-slate-400">/ 5.0</span></div>
        <span className="text-[11px] text-amber-400 font-medium">
          Benchmark Target: ≥ 4.2 CSAT
        </span>
      </div>
    </div>
  );
};
