import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { Globe } from 'lucide-react';

interface RegionalSalesChartProps {
  regionalBreakdown?: { [key: string]: number };
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const RegionalSalesChart: React.FC<RegionalSalesChartProps> = ({
  regionalBreakdown = {},
}) => {
  const chartData = Object.entries(regionalBreakdown).map(([region, revenue]) => ({
    name: region,
    value: revenue,
  }));

  if (chartData.length === 0) {
    return (
      <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 h-72 flex flex-col items-center justify-center text-slate-400">
        <Globe className="w-8 h-8 mb-2 text-slate-600" />
        <span className="text-xs">No regional sales data available yet.</span>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-400" /> Regional Revenue Breakdown
        </h3>
        <span className="text-xs text-slate-400">Territory Distribution</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '12px',
              }}
              itemStyle={{ color: '#e2e8f0' }}
              labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
