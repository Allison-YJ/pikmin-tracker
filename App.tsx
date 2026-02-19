
import React, { useState, useEffect, useMemo } from 'react';
import { PikminEntry, PikminColor, PikminStatus, DecorType } from './types';
import PikminForm from './components/PikminForm';
import PikminList from './components/PikminList';
import Dashboard from './components/Dashboard';
import EditModal from './components/EditModal';
import { PIKMIN_COLORS, DECOR_TYPES, PIKMIN_STATUSES } from './constants';

const STORAGE_KEY = 'pikmin_tracker_pro_v4';

const App: React.FC = () => {
  const [entries, setEntries] = useState<PikminEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'log' | 'collection'>('log');
  const [editingPikmin, setEditingPikmin] = useState<PikminEntry | null>(null);
  
  // Filters
  const [filterColor, setFilterColor] = useState<string>('');
  const [filterDecor, setFilterDecor] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setEntries(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (newEntry: PikminEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
    setActiveTab('collection');
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Delete this entry forever?')) {
      setEntries((prev) => prev.filter(e => e.id !== id));
    }
  };

  const handleUpdateEntry = (id: string, updates: Partial<PikminEntry>) => {
    setEntries((prev) => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const handleExportCSV = () => {
    if (entries.length === 0) {
      alert("No data to export!");
      return;
    }

    const headers = ["Decor Category", "Color", "Name", "Status"];
    
    // Helper to escape CSV values
    const escapeCSV = (val: string) => {
      const escaped = val.replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const rows = entries.map(e => [
      escapeCSV(e.decorType),
      escapeCSV(e.color),
      escapeCSV(e.name),
      escapeCSV(e.status)
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "my_pikmin_collection.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEntries = useMemo(() => {
    return entries.filter(e => {
      const matchColor = !filterColor || e.color === filterColor;
      const matchDecor = !filterDecor || e.decorType === filterDecor;
      const matchStatus = !filterStatus || e.status === filterStatus;
      return matchColor && matchDecor && matchStatus;
    });
  }, [entries, filterColor, filterDecor, filterStatus]);

  const resetFilters = () => {
    setFilterColor('');
    setFilterDecor('');
    setFilterStatus('');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-warm-white">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex md:w-80 bg-white border-r border-slate-100 flex-col z-50 sticky top-0 h-screen">
        <div className="p-10">
          <div className="flex items-center gap-4 text-sage">
            <i className="fa-solid fa-leaf text-4xl"></i>
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Pikmin Manager</h1>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-3">
          <button
            onClick={() => setActiveTab('log')}
            className={`w-full flex items-center gap-5 px-6 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all ${
              activeTab === 'log' 
              ? 'bg-sage text-white shadow-lg shadow-sage/10 translate-x-1' 
              : 'text-soft-slate hover:bg-sage-light'
            }`}
          >
            <i className="fa-solid fa-circle-plus text-xl"></i>
            Log Entry
          </button>
          <button
            onClick={() => setActiveTab('collection')}
            className={`w-full flex items-center gap-5 px-6 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all ${
              activeTab === 'collection' 
              ? 'bg-sage text-white shadow-lg shadow-sage/10 translate-x-1' 
              : 'text-soft-slate hover:bg-sage-light'
            }`}
          >
            <i className="fa-solid fa-shapes text-xl"></i>
            Collection
          </button>
        </nav>

        <div className="p-8">
          <div className="bg-sage-light rounded-3xl p-6 border border-sage/5">
            <p className="text-[10px] font-black text-soft-slate uppercase tracking-widest mb-1 text-center">Data Persistence</p>
            <p className="text-xs font-bold text-sage-dark text-center">Auto-saved Locally</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 lg:px-16 py-8 pb-32 md:pb-8">
        {activeTab === 'log' ? (
          <PikminForm onAdd={handleAddEntry} />
        ) : (
          <div className="animate-in fade-in duration-500 max-w-6xl mx-auto space-y-10">
            {/* Dashboard Stats */}
            <Dashboard entries={entries} onExport={handleExportCSV} />

            {/* Filter Section */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex-1 min-w-[150px] space-y-2">
                  <label className="text-[10px] font-black text-soft-slate uppercase tracking-widest ml-1">Color</label>
                  <select 
                    value={filterColor}
                    onChange={(e) => setFilterColor(e.target.value)}
                    className="w-full bg-warm-white border border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold focus:ring-4 focus:ring-sage/10 outline-none appearance-none cursor-pointer"
                  >
                    <option value="">All Colors</option>
                    {PIKMIN_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[150px] space-y-2">
                  <label className="text-[10px] font-black text-soft-slate uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={filterDecor}
                    onChange={(e) => setFilterDecor(e.target.value)}
                    className="w-full bg-warm-white border border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold focus:ring-4 focus:ring-sage/10 outline-none appearance-none cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    {DECOR_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[150px] space-y-2">
                  <label className="text-[10px] font-black text-soft-slate uppercase tracking-widest ml-1">Status</label>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-warm-white border border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold focus:ring-4 focus:ring-sage/10 outline-none appearance-none cursor-pointer"
                  >
                    <option value="">All Statuses</option>
                    {PIKMIN_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <button 
                  onClick={resetFilters}
                  className="px-6 py-3 text-xs font-black text-soft-slate hover:text-sage transition-colors uppercase tracking-widest"
                >
                  Reset
                </button>
              </div>
            </section>

            {/* List */}
            <PikminList 
              entries={filteredEntries} 
              onDelete={handleDeleteEntry} 
              onEdit={(p) => setEditingPikmin(p)}
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-[2.5rem] py-4 px-10 flex justify-between items-center shadow-xl z-50">
        <button 
          onClick={() => setActiveTab('log')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'log' ? 'text-sage scale-110' : 'text-slate-300'}`}
        >
          <i className="fa-solid fa-circle-plus text-2xl"></i>
          <span className="text-[8px] font-black uppercase tracking-tighter">Log</span>
        </button>
        <button 
          onClick={() => setActiveTab('collection')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'collection' ? 'text-sage scale-110' : 'text-slate-300'}`}
        >
          <i className="fa-solid fa-shapes text-2xl"></i>
          <span className="text-[8px] font-black uppercase tracking-tighter">Collection</span>
        </button>
      </nav>

      {/* Edit Modal */}
      <EditModal 
        entry={editingPikmin} 
        onClose={() => setEditingPikmin(null)} 
        onSave={handleUpdateEntry} 
      />
    </div>
  );
};

export default App;