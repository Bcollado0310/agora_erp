import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MoreHorizontal, ArrowRight } from 'lucide-react';

const data = [
  { name: "Women's Shoes", value: 1240, color: '#6366f1' }, // Indigo-500
  { name: "Men's Shoes", value: 354, color: '#8b5cf6' }, // Violet-500
  { name: "Kids' Shoes", value: 553, color: '#3b82f6' }, // Blue-500
  { name: "Dresses", value: 204, color: '#d946ef' }, // Fuchsia-500
];

export const LeadSourceChart = () => {
  return (
    <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 text-zinc-300 font-medium">
            <div className="grid grid-cols-2 gap-0.5 opacity-60">
                <div className="w-1 h-1 bg-zinc-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-zinc-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-zinc-400 rounded-[1px]"></div>
                <div className="w-1 h-1 bg-zinc-400 rounded-[1px]"></div>
            </div>
            <span className="text-[15px]">Inventory Breakdown by Category</span>
        </div>
        <button className="text-zinc-500 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex flex-row items-center justify-between gap-2 flex-1 min-h-0">
        {/* Donut Chart */}
        <div className="relative w-[160px] h-[160px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={72}
                paddingAngle={6}
                dataKey="value"
                stroke="none"
                cornerRadius={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ backgroundColor: '#1f1f23', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                 itemStyle={{ color: '#e4e4e7' }}
                 cursor={false}
               />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-white tracking-tight">2351</span>
            <span className="text-[11px] text-zinc-500 font-medium mt-0.5">Total Leads</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 pl-4 flex flex-col justify-center gap-5">
             {data.map((item) => (
                <div key={item.name} className="flex items-center justify-between group cursor-default">
                     <div className="flex items-center gap-3">
                         {/* Pill Indicator */}
                         <div className="w-1 h-3.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" style={{ backgroundColor: item.color }}></div>
                         <span className="text-zinc-400 text-sm font-medium group-hover:text-zinc-300 transition-colors">{item.name}</span>
                     </div>
                     <span className="text-white font-bold text-sm tracking-wide">{item.value.toLocaleString()}</span>
                </div>
             ))}
        </div>
      </div>

      {/* Bottom Button */}
      <button className="w-full mt-6 py-3 bg-[#2a2a30] hover:bg-[#3f3f46] text-zinc-300 hover:text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 group">
        More details
        <ArrowRight size={16} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
