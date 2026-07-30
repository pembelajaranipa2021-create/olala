import React, { useState } from 'react';
import { X, BookOpen, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { KAMUS_ZAKAT_LIST, KamusItem } from '../data/kamusZakat';
import { soundEffects } from '../utils/soundEffects';

interface KamusZakatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KamusZakatModal: React.FC<KamusZakatModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<KamusItem>(KAMUS_ZAKAT_LIST[0]);

  if (!isOpen) return null;

  const filteredList = KAMUS_ZAKAT_LIST.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-emerald-950 border border-emerald-600/60 rounded-3xl w-full max-w-4xl shadow-2xl text-white overflow-hidden flex flex-col h-[88vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 px-5 py-4 border-b border-emerald-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-xl">
              📖
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-amber-300 flex items-center gap-2">
                Kamus & Panduan Zakat Cilik
              </h2>
              <p className="text-xs text-emerald-200/80">Ensiklopedia edukasi zakat lengkap & bergambar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left Sidebar: List & Search */}
          <div className="md:col-span-5 bg-emerald-900/30 border-r border-emerald-800/80 p-3 flex flex-col gap-3 overflow-hidden">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari zakat, nisab, asnaf..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-emerald-950/80 border border-emerald-700/60 rounded-xl pl-9 pr-3 py-1.5 text-xs text-emerald-100 placeholder-emerald-400/60 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* List */}
            <div className="space-y-1.5 overflow-y-auto custom-scrollbar flex-1 pr-1">
              {filteredList.map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedItem(item);
                    }}
                    className={`w-full text-left p-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-extrabold shadow-md border border-amber-300 scale-[1.01]'
                        : 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-800/40'
                    }`}
                  >
                    <span className="text-2xl p-1 bg-emerald-900/40 rounded-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate leading-tight">{item.title}</div>
                      <div
                        className={`text-[10px] truncate ${
                          isSelected ? 'text-emerald-950/80' : 'text-emerald-400/80'
                        }`}
                      >
                        {item.category}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Area: Detailed View */}
          <div className="md:col-span-7 p-5 overflow-y-auto custom-scrollbar bg-emerald-950 space-y-4">
            <div className="flex items-center gap-3 border-b border-emerald-800/80 pb-3">
              <span className="text-4xl p-2 bg-amber-400/20 rounded-2xl border border-amber-400/30">
                {selectedItem.icon}
              </span>
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-semibold border border-amber-400/30">
                  {selectedItem.category}
                </span>
                <h3 className="text-xl font-black text-amber-300 mt-0.5">{selectedItem.title}</h3>
              </div>
            </div>

            <p className="text-xs text-emerald-100 leading-relaxed bg-emerald-900/40 p-3 rounded-xl border border-emerald-700/50">
              {selectedItem.summary}
            </p>

            {/* Nisab & Kadar Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-700/50">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Nisab / Syarat Minimal</span>
                <span className="text-xs font-extrabold text-white mt-1 block">{selectedItem.nisabFormula}</span>
              </div>
              <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-700/50">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">Kadar / Tarif Zakat</span>
                <span className="text-xs font-extrabold text-amber-200 mt-1 block">{selectedItem.kadar}</span>
              </div>
            </div>

            {/* Details Bullet Points */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Ketentuan Penting:
              </h4>
              <ul className="space-y-1.5">
                {selectedItem.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-emerald-200/90 leading-normal">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Example Case */}
            <div className="bg-amber-500/10 border border-amber-400/40 p-3.5 rounded-2xl space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-amber-300">💡 Contoh Kasus Sederhana:</span>
              <p className="text-xs text-amber-100/90 font-medium">{selectedItem.example}</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-emerald-900/90 px-5 py-3 border-t border-emerald-700/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Tutup Kamus
          </button>
        </div>

      </div>
    </div>
  );
};
