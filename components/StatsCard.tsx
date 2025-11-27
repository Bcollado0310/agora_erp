import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  subtext: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value, trend, trendUp, subtext }) => {
  return (
    <div className="bg-dark-900 border border-dark-800 p-5 rounded-xl flex flex-col justify-between hover:border-dark-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-dark-800 rounded-lg text-zinc-400">
            {icon}
        </div>
      </div>
      
      <div>
        <p className="text-zinc-400 text-s font-medium mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
        <div className="flex items-center gap-2 text-xs">
          <span className={`font-medium ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend}
          </span>
          <span className="text-zinc-500">• {subtext}</span>
        </div>
      </div>
    </div>
  );
};