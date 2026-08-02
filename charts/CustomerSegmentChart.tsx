import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { Users } from 'lucide-react';

interface CustomerSegmentChartProps {
  segmentBreakdown?: { [key: string]: any };
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

export const CustomerSegmentChart: React.FC<CustomerSegmentChartProps> = ({
  segmentBreakdown = {},
}) => {
  const chartData = Object.entries(segmentBreakdown).map(([segment, data]) => {
    const spend = typeof data === 'object' && data !== null ? data.total_spend || 0 : Number(data) || 0;
    return {
      name: segment,
      value: spend,
    };
  });

  if (chartData.length === 0 || chartData.every(d => d.value === 0)) {
    return (
      <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 h-72 flex flex-col items-center justify-center text-slate-400">
        <Users className="w-8 h-8 mb-2 text-slate-600" />
        <span className="text-xs">No customer segment spend data available yet.</span>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-400" /> Customer Segment Spend Distribution
        </h3>
        <span className="text-xs text-slate-400">Segment Share</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={75}
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
              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Total Spend']}
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
