import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import { ShieldAlert } from 'lucide-react';

interface CustomerChurnChartProps {
  churnRiskBreakdown?: { [key: string]: number };
}

export const CustomerChurnChart: React.FC<CustomerChurnChartProps> = ({ churnRiskBreakdown = {} }) => {
  const COLORS: { [key: string]: string } = {
    High: '#ef4444',
    Medium: '#f59e0b',
    Low: '#10b981',
  };

  const chartData = Object.entries(churnRiskBreakdown).map(([riskLevel, count]) => ({
    riskLevel,
    count,
    color: COLORS[riskLevel] || '#6366f1',
  }));

  if (chartData.length === 0) {
    return (
      <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 h-72 flex flex-col items-center justify-center text-slate-400">
        <ShieldAlert className="w-8 h-8 mb-2 text-slate-600" />
        <span className="text-xs">No customer churn risk breakdown data loaded yet. Upload Customer CSV.</span>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" /> Customer Churn Risk Vector Analysis
        </h3>
        <span className="text-xs text-slate-400">Customer Count</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="riskLevel" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '12px',
              }}
              formatter={(value: any) => [`${value} Customers`, 'Count']}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
