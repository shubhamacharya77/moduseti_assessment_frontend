import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

interface RevenueTrendChartProps {
  monthlyTrends?: { [key: string]: number };
}

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ monthlyTrends = {} }) => {
  const chartData = Object.entries(monthlyTrends).map(([month, revenue]) => ({
    month,
    revenue,
  }));

  if (chartData.length === 0) {
    return (
      <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 h-72 flex flex-col items-center justify-center text-slate-400">
        <TrendingUp className="w-8 h-8 mb-2 text-slate-600" />
        <span className="text-xs">No monthly revenue trends data loaded yet. Upload Sales CSV to render trends.</span>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-400" /> Monthly Revenue & Growth Trend
        </h3>
        <span className="text-xs text-slate-400">Values in INR (₹)</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '12px',
              }}
              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
