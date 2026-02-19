import React, { useState } from 'react';
import { PikminColor, PikminStatus, DecorType, PikminEntry } from '../types';
import { PIKMIN_COLORS, PIKMIN_STATUSES, DECOR_TYPES } from '../constants';

interface PikminFormProps {
  onAdd: (entry: PikminEntry) => void;
}

const PikminForm: React.FC<PikminFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState<PikminColor>(PikminColor.RED);
  const [decorType, setDecorType] = useState<DecorType>('Roadside');
  const [status, setStatus] = useState<PikminStatus>(PikminStatus.SEEDLING);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: PikminEntry = {
      id: crypto.randomUUID(),
      name: name || 'New Pikmin',
      color,
      decorType,
      status,
      createdAt: Date.now(),
    };
    onAdd(newEntry);
    setName('');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto pt-4">
      {/* Header Section (Study Tracker style) */}
      <div className="sage-gradient-header rounded-t-[2.5rem] p-10 pb-24 shadow-sm text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-6 text-white">
          <div className="bg-white/20 w-16 h-16 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shrink-0">
            <i className="fa-solid fa-leaf text-3xl text-sage-light"></i>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight">New Entry</h2>
            <p className="text-sage-light/80 font-medium mt-1">Found a new seedling or grew a Pikmin?</p>
          </div>
        </div>
      </div>

      {/* Form Content Card */}
      <div className="bg-white mx-4 -mt-16 p-8 rounded-[2.5rem] form-card relative z-10 border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-soft-slate uppercase tracking-widest ml-1">Decor Category</label>
              <select
                value={decorType}
                onChange={(e) => setDecorType(e.target.value as DecorType)}
                className="w-full bg-warm-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-sage/10 outline-none transition-all appearance-none cursor-pointer"
              >
                {DECOR_TYPES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-soft-slate uppercase tracking-widest ml-1">Color</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value as PikminColor)}
                className="w-full bg-warm-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-sage/10 outline-none transition-all appearance-none cursor-pointer"
              >
                {PIKMIN_COLORS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-soft-slate uppercase tracking-widest ml-1">Pikmin Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a nickname..."
                className="w-full bg-warm-white border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-sage/10 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-soft-slate uppercase tracking-widest ml-1">Current Status</label>
            <div className="grid grid-cols-3 bg-warm-white p-1.5 rounded-[1.5rem] border border-slate-100 gap-1.5">
              {PIKMIN_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    status === s 
                    ? 'bg-sage text-white shadow-md shadow-sage/10 scale-[1.02]' 
                    : 'text-soft-slate hover:text-slate-600 hover:bg-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full sage-gradient-header text-white font-black py-5 rounded-[1.5rem] shadow-lg shadow-sage/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg mt-4"
          >
            <i className="fa-solid fa-square-plus text-xl"></i>
            Add to Collection
          </button>
        </form>
      </div>
    </div>
  );
};

export default PikminForm;