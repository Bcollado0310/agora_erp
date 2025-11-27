import React from 'react';
import { AreaChart, Area, YAxis, ResponsiveContainer, ReferenceDot, ReferenceLine } from 'recharts';
import { MoreHorizontal, ChevronRight, ChevronLeft, TrendingUp } from 'lucide-react';

// Data specifically shaped to match the curve in the design screenshot
const data = [
  { name: '1', value: 1200 },
  { name: '2', value: 1800 },
  { name: '3', value: 2500 },
  { name: '4', value: 3200 },
  { name: '5', value: 2900 }, // slight dip
  { name: '6', value: 3600 },
  { name: '7', value: 4500 },
  { name: '8', value: 4200 }, // dip
  { name: '9', value: 5100 },
  { name: '10', value: 6500 },
  { name: '11', value: 5800 }, // dip
  { name: '12', value: 4800 }, // deeper dip
  { name: '13', value: 6200 },
  { name: '14', value: 7800 },
  { name: '15', value: 8500 },
  { name: '16', value: 7500 }, // slight dip
  { name: '17', value: 8900 },
  { name: '18', value: 10500 }, // Peak associated with annotation
  { name: '19', value: 9200 },
  { name: '20', value: 11500 },
];

export const RevenueChart = () => {
  return (
    <div className="bg-dark-900 border border-dark-800 rounded-xl flex flex-col md:flex-row h-full overflow-hidden group">
      
      {/* LEFT COLUMN: Info & Notification */}
      <div className="w-full md:w-[38%] p-6 flex flex-col justify-between relative z-10">
        <div>
           {/* Header Title */}
           <div className="flex items-center gap-2 text-zinc-300 font-medium mb-8">
             <TrendingUp size={20} className="text-zinc-400" />
             <span>Revenue Flow</span>
          </div>

          {/* Main KPI Stats */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">$6,745,500</h2>
            <div className="text-zinc-500 text-sm font-medium mb-1">Total Revenue</div>
            <div className="flex items-center gap-2">
                <span className="text-emerald-500 text-sm font-bold">+20%($2,423)</span>
                <span className="text-zinc-600 text-sm">• Last 30 Days</span>
            </div>
          </div>
        </div>

        {/* Notification Card */}
        <div className="bg-[#1f1f23] border border-dark-700/80 p-5 rounded-2xl shadow-lg mt-auto">
            <h4 className="text-white font-bold text-base mb-1">New Record Achieved!</h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-5">
                November is the highest revenue since the start with $6,745,500.
            </p>
            
            <div className="flex items-center justify-between px-1">
                <button className="text-zinc-500 hover:text-white transition-colors"><ChevronLeft size={16}/></button>
                <div className="flex gap-1">
                    <div className="w-8 h-1 bg-white rounded-full"></div>
                    <div className="w-8 h-1 bg-zinc-700 rounded-full"></div>
                    <div className="w-8 h-1 bg-zinc-700 rounded-full"></div>
                    <div className="w-8 h-1 bg-zinc-700 rounded-full"></div>
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors"><ChevronRight size={16}/></button>
            </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Chart */}
      <div className="w-full md:w-[62%] p-6 relative flex flex-col">
        {/* Top Right Menu */}
        <div className="absolute top-6 right-6 z-20">
             <button className="text-zinc-500 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
            </button>
        </div>

        {/* Floating Tooltip Overlay: 8 Nov */}
        <div className="absolute right-[12%] top-[25%] z-20 hidden md:block animate-fade-in pointer-events-none">
             <div className="bg-[#2a2a30] px-4 py-3 rounded-xl shadow-xl border border-zinc-700/50 min-w-[150px] relative">
                <div className="text-[11px] text-zinc-400 mb-1 font-medium">8 Nov, 2025</div>
                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg">$4,845,550</span>
                    <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-1 py-0.5 rounded">+20%</span>
                </div>
                {/* Tooltip Triangle */}
                <div className="w-3 h-3 bg-[#2a2a30] border-r border-b border-zinc-700/50 transform rotate-45 absolute left-1/2 -bottom-1.5 -translate-x-1/2"></div>
            </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 w-full min-h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                </defs>
                <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: '#a1a1aa', fontSize: 11, fontWeight: 500}}
                    tickFormatter={(value) => value >= 1000 ? `$${value/1000}K` : value}
                    ticks={[1000, 3000, 6000, 9000, 12000]}
                    domain={[0, 13000]}
                    width={45}
                />
                
                {/* Area Chart - Rendered first so dots appear on top */}
                <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8b5cf6" 
                    strokeWidth={3} 
                    fill="url(#colorValue)" 
                    activeDot={false} 
                />

                {/* Dashed line connecting to X axis */}
                <ReferenceLine x="18" stroke="#52525b" strokeDasharray="4 4" strokeWidth={1} />
                
                {/* Outer Glow Ring for Dot */}
                <ReferenceDot 
                    x="18" 
                    y={10500} 
                    r={10} 
                    fill="#8b5cf6" 
                    fillOpacity={0.3}
                    stroke="none" 
                />
                {/* Highlight Dot */}
                <ReferenceDot 
                    x="18" 
                    y={10500} 
                    r={5} 
                    fill="#8b5cf6" 
                    stroke="#fff" 
                    strokeWidth={2}
                />
            </AreaChart>
            </ResponsiveContainer>
        </div>

        {/* Footer / X-Axis Labels */}
        <div className="flex justify-between px-2 text-[11px] text-zinc-500 font-medium mt-1 pl-8">
            <span>18 Oct, 2025</span>
            <span>18 Nov, 2025</span>
        </div>
      </div>
    </div>
  );
};