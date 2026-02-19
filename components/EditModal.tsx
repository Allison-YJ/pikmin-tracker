
import React, { useState, useEffect } from 'react';
import { PikminEntry, PikminStatus } from '../types';
import { PIKMIN_STATUSES } from '../constants';

interface EditModalProps {
  entry: PikminEntry | null;
  onClose: () => void;
  onSave: (id: string, updates: Partial<PikminEntry>) => void;
}

const EditModal: React.FC<EditModalProps> = ({ entry, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<PikminStatus>(PikminStatus.SEEDLING);

  useEffect(() => {
    if (entry) {
      setName(entry.name);
      setStatus(entry.status);
    }
  }, [entry]);

  if (!entry) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-xl overflow-hidden p-8 animate-in fade-in zoom-in duration-200 border border-slate-100">
        <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
          <i className="fa-solid fa-pen-to-square text-sage"></i>
          Edit Pikmin
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Nickname</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-warm-white border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:ring-4 focus:ring-sage/10 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Status</label>
            <div className="flex flex-col gap-2">
              {PIKMIN_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold border transition-all ${
                    status === s 
                    ? 'bg-sage border-sage text-white shadow-md shadow-sage/10' 
                    : 'bg-warm-white border-slate-100 text-soft-slate hover:border-sage/30'
                  }`}
                >
                  {s}
                  {status === s && <i className="fa-solid fa-check"></i>}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl bg-warm-white border border-slate-100 text-soft-slate font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(entry.id, { name, status });
                onClose();
              }}
              className="flex-1 py-4 rounded-2xl bg-sage text-white font-bold shadow-lg shadow-sage/10 hover:bg-sage-dark transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;