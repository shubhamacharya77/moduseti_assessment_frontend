import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieIcon } from 'lucide-react';

export interface ChartDataPayload {
  chart_type: 'line' | 'bar' | 'pie' | string;
  title: string;
  data: Array<{ label: string; value: number }>;
}

interface DynamicChatChartProps {
  chartData?: ChartDataPayload | null;
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

export const DynamicChatChart: React.FC<DynamicChatChartProps> = ({ chartData }) => {
  if (!chartData || !chartData.data || chartData.data.length === 0) {
    return null;
  }

  const { chart_type, title, data } = chartData;

  const renderIcon = () => {
    if (chart_type === 'line') return <TrendingUp className="w-4 h-4 text-indigo-400" />;
    if (chart_type === 'pie') return <PieIcon className="w-4 h-4 text-emerald-400" />;
    return <BarChart3 className="w-4 h-4 text-purple-400" />;
  };

  const isCurrency = (val: number) => val > 1000;

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          {renderIcon()}
          <span>{title}</span>
        </h3>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
          Dynamic Data Graph
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chart_type === 'line' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="dynamicChatColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => (val >= 100000 ? `₹${(val / 100000).toFixed(0)}L` : val)}
              />
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
                formatter={(val: any) => [
                  isCurrency(Number(val)) ? `₹${Number(val).toLocaleString('en-IN')}` : val,
                  'Value',
                ]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#dynamicChatColor)"
              />
            </AreaChart>
          ) : chart_type === 'pie' ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                nameKey="label"
              >
                {data.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
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
                formatter={(val: any) => [
                  isCurrency(Number(val)) ? `₹${Number(val).toLocaleString('en-IN')}` : val,
                  'Total',
                ]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
              />
            </PieChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => (val >= 100000 ? `₹${(val / 100000).toFixed(0)}L` : val)}
              />
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
                formatter={(val: any) => [
                  isCurrency(Number(val)) ? `₹${Number(val).toLocaleString('en-IN')}` : val,
                  'Value',
                ]}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
