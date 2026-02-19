
import React, { useState } from 'react';
import { PikminColor, PikminStatus, DecorType, PikminEntry } from '../types';
import { PIKMIN_COLORS, PIKMIN_STATUSES, DECOR_TYPES, YELLOW_PUNS } from '../constants';

interface PikminFormProps {
  onAdd: (entry: PikminEntry) => void;
}

const PikminForm: React.FC<PikminFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState<PikminColor>(PikminColor.RED);
  const [decorType, setDecorType] = useState<DecorType>('Roadside');
  const [status, setStatus] = useState<PikminStatus>(PikminStatus.SEEDLING);

  const handleSuggestName = () => {
    const randomPun = YELLOW_PUNS[Math.floor(Math.random() * YELLOW_PUNS.length)];
    setName(randomPun);
  };

  const onColorChange = (newColor: PikminColor) => {
    setColor(newColor);
    if (newColor === PikminColor.YELLOW && !name) {
      const randomPun = YELLOW_PUNS[Math.floor(Math.random() * YELLOW_PUNS.length)];
      setName(randomPun);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: PikminEntry = {
      id: crypto.randomUUID(),
      name: name || `${color} Pikmin`,
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
      <div className="blue-gradient-header rounded-t-[2.5rem] p-10 pb-24 shadow-lg text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-6 text-white">
          <div className="bg-white/20 w-16 h-16 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shrink-0">
            <i className="fa-solid fa-leaf text-3xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight">New Entry</h2>
            <p className="text-blue-100 font-medium mt-1">Found a new seedling or grew a Pikmin?</p>
          </div>
        </div>
      </div>

      {/* Form Content Card */}
      <div className="bg-white mx-4 -mt-16 p-8 rounded-[2.5rem] form-card border border-slate-50 relative z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Decor Category</label>
              <select
                value={decorType}
                onChange={(e) => setDecorType(e.target.value as DecorType)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer"
              >
                {DECOR_TYPES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Color</label>
              <select
                value={color}
                onChange={(e) => onColorChange(e.target.value as PikminColor)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer"
              >
                {PIKMIN_COLORS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Pikmin Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a nickname..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
              {color === PikminColor.YELLOW && (
                <button
                  type="button"
                  onClick={handleSuggestName}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black text-[10px] px-3 py-1.5 rounded-xl uppercase tracking-widest transition-colors shadow-sm"
                >
                  Pun!
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Current Status</label>
            <div className="grid grid-cols-3 bg-slate-50 p-1.5 rounded-[1.5rem] border border-slate-100 gap-1.5">
              {PIKMIN_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    status === s 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-[1.02]' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full blue-gradient-header text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-100 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg mt-4"
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
