
import React from 'react';
import { PikminEntry, PikminStatus } from '../types';

interface DashboardProps {
  entries: PikminEntry[];
  onExport: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ entries, onExport }) => {
  const total = entries.length;
  const seedlings = entries.filter(p => p.status === PikminStatus.SEEDLING).length;
  const decorCount = entries.filter(p => p.status === PikminStatus.DECOR).length;
  
  const completionRate = total > 0 ? Math.round((decorCount / total) * 100) : 0;

  const stats = [
    { label: 'Total Count', value: total, icon: 'fa-box-archive', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Seedlings', value: seedlings, icon: 'fa-seedling', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Decor Complete', value: `${completionRate}%`, icon: 'fa-award', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Collection Dashboard</h3>
          <p className="text-xs font-bold text-slate-400">Overview of your current progress</p>
        </div>
        <button
          onClick={onExport}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm active:scale-95 group"
        >
          <i className="fa-solid fa-file-export text-blue-500 group-hover:scale-110 transition-transform"></i>
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0`}>
              <i className={`fa-solid ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
