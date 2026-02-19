
import React from 'react';
import { PikminEntry } from '../types';
import { COLOR_CLASSES, STATUS_ICONS } from '../constants';

interface PikminListProps {
  entries: PikminEntry[];
  onDelete: (id: string) => void;
  onEdit: (entry: PikminEntry) => void;
}

const PikminList: React.FC<PikminListProps> = ({ entries, onDelete, onEdit }) => {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="bg-warm-white w-24 h-24 rounded-full flex items-center justify-center mb-6 text-slate-200">
          <i className="fa-solid fa-magnifying-glass text-4xl"></i>
        </div>
        <p className="font-black text-slate-800 uppercase tracking-widest">No entries found</p>
        <p className="text-sm text-soft-slate mt-2 font-medium">Add a Pikmin or check your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {entries.sort((a, b) => b.createdAt - a.createdAt).map((pikmin) => (
        <div key={pikmin.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 flex items-center gap-4 group hover:border-sage/30 transition-all">
          {/* Color Icon */}
          <div className={`w-16 h-16 rounded-2xl ${COLOR_CLASSES[pikmin.color]} flex items-center justify-center shadow-sm shrink-0`}>
            <i className="fa-solid fa-leaf text-white/90 text-2xl"></i>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-black text-slate-800 truncate">{pikmin.name}</h4>
              <span className="text-[10px] bg-warm-white text-soft-slate px-2 py-0.5 rounded-full font-black border border-slate-50 uppercase">
                {pikmin.color}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-soft-slate uppercase tracking-widest flex items-center gap-1.5">
                <i className="fa-solid fa-location-dot text-sage/60"></i>
                {pikmin.decorType}
              </span>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                {STATUS_ICONS[pikmin.status]}
                {pikmin.status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onEdit(pikmin)}
              className="w-10 h-10 rounded-xl bg-warm-white text-soft-slate hover:text-sage hover:bg-sage-light transition-all flex items-center justify-center"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
            <button
              onClick={() => onDelete(pikmin.id)}
              className="w-10 h-10 rounded-xl bg-warm-white text-soft-slate hover:text-red-400 hover:bg-red-50 transition-all flex items-center justify-center"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PikminList;