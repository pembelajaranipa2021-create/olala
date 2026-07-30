import React, { useState } from 'react';
import { X, BookOpen, GraduationCap, Calculator, Search, Sparkles, CheckCircle2, ChevronRight, BookMarked } from 'lucide-react';
import { KAMUS_ZAKAT_LIST, KamusItem } from '../data/kamusZakat';
import { MATERI_ZAKAT_LIST, MateriChapter } from '../data/materiZakat';
import { InteractiveCalculatorModal } from './InteractiveCalculatorModal';
import { soundEffects } from '../utils/soundEffects';

interface LearningHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'kamus' | 'materi' | 'simulator';
}

export const LearningHubModal: React.FC<LearningHubModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'materi'
}) => {
  const [activeTab, setActiveTab] = useState<'kamus' | 'materi' | 'simulator'>(defaultTab);

  // State for Kamus
  const [kamusSearch, setKamusSearch] = useState('');
  const [selectedKamusItem, setSelectedKamusItem] = useState<KamusItem>(KAMUS_ZAKAT_LIST[0]);

  // State for Materi
  const [selectedMateri, setSelectedMateri] = useState<MateriChapter>(MATERI_ZAKAT_LIST[0]);

  // State for Simulator Zakat
  const [fitrahPeopleCount, setFitrahPeopleCount] = useState<number>(4);
  const [fitrahRicePrice, setFitrahRicePrice] = useState<number>(15000);

  const [goldGram, setGoldGram] = useState<number>(90);
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(1000000);

  const [monthlyIncome, setMonthlyIncome] = useState<number>(8000000);

  if (!isOpen) return null;

  // Filter Kamus
  const filteredKamus = KAMUS_ZAKAT_LIST.filter(item =>
    item.title.toLowerCase().includes(kamusSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(kamusSearch.toLowerCase()) ||
    item.summary.toLowerCase().includes(kamusSearch.toLowerCase())
  );

  // Calculations for Simulator
  const fitrahKgTotal = fitrahPeopleCount * 2.5;
  const fitrahLitreTotal = fitrahPeopleCount * 3.5;
  const fitrahMoneyTotal = fitrahPeopleCount * 2.5 * fitrahRicePrice;

  const goldNisabGrams = 85;
  const isGoldReachedNisab = goldGram >= goldNisabGrams;
  const totalGoldValue = goldGram * goldPricePerGram;
  const goldZakatAmountMoney = isGoldReachedNisab ? totalGoldValue * 0.025 : 0;
  const goldZakatAmountGram = isGoldReachedNisab ? goldGram * 0.025 : 0;

  const monthlyNisabMoney = (85 * 1000000) / 12; // Approx Rp 7.083.333
  const isIncomeReachedNisab = monthlyIncome >= monthlyNisabMoney;
  const incomeZakatAmount = isIncomeReachedNisab ? monthlyIncome * 0.025 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in text-[#3D405B]">
      <div className="bg-[#FDFCF0] border-4 border-[#3D405B] rounded-3xl w-full max-w-5xl shadow-[8px_8px_0px_#3D405B] overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-[#F4F1DE] px-5 py-4 border-b-2 border-[#3D405B] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F2CC8F] border-2 border-[#3D405B] flex items-center justify-center text-xl shadow-[2px_2px_0px_#3D405B]">
              📚
            </div>
            <div>
              <h2 className="font-black text-base sm:text-lg text-[#3D405B] flex items-center gap-2">
                Pusat Edukasi & Mode Belajar Zakat
              </h2>
              <p className="text-xs font-bold text-[#3D405B]/80">Pelajari ilmu zakat lengkap, kamus istilah, & simulator perhitungan</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#FDFCF0] hover:bg-[#E07A5F] hover:text-white text-[#3D405B] border-2 border-[#3D405B] transition-colors cursor-pointer shadow-[2px_2px_0px_#3D405B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="bg-[#F4F1DE]/60 px-4 py-2 border-b-2 border-[#3D405B] flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('materi');
            }}
            className={`px-4 py-2 rounded-xl font-black text-xs border-2 border-[#3D405B] transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'materi'
                ? 'bg-[#F2CC8F] text-[#3D405B] shadow-[2px_2px_0px_#3D405B] scale-105'
                : 'bg-[#FDFCF0] text-[#3D405B]/70 hover:bg-[#F2CC8F]/40'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#E07A5F]" />
            <span>1. Materi Edukasi Zakat</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('kamus');
            }}
            className={`px-4 py-2 rounded-xl font-black text-xs border-2 border-[#3D405B] transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'kamus'
                ? 'bg-[#81B29A] text-[#3D405B] shadow-[2px_2px_0px_#3D405B] scale-105'
                : 'bg-[#FDFCF0] text-[#3D405B]/70 hover:bg-[#81B29A]/40'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#3D405B]" />
            <span>2. Kamus & Istilah Zakat</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('simulator');
            }}
            className={`px-4 py-2 rounded-xl font-black text-xs border-2 border-[#3D405B] transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-[#E07A5F] text-white shadow-[2px_2px_0px_#3D405B] scale-105'
                : 'bg-[#FDFCF0] text-[#3D405B]/70 hover:bg-[#E07A5F]/40'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>3. Simulator Kalkulator Zakat</span>
          </button>
        </div>

        {/* Content Body based on Tab */}
        <div className="flex-1 overflow-hidden">
          
          {/* TAB 1: MATERI EDUKASI ZAKAT */}
          {activeTab === 'materi' && (
            <div className="grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden">
              
              {/* Left Column: Chapters */}
              <div className="md:col-span-4 bg-[#F4F1DE] border-r-2 border-[#3D405B] p-3 overflow-y-auto custom-scrollbar space-y-2">
                <span className="text-[10px] uppercase font-black text-[#3D405B]/70 px-2 block">Daftar Modul Belajar</span>
                {MATERI_ZAKAT_LIST.map((mat) => {
                  const isSelected = selectedMateri.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => {
                        soundEffects.playClick();
                        setSelectedMateri(mat);
                      }}
                      className={`w-full text-left p-3 rounded-2xl border-2 border-[#3D405B] transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#F2CC8F] font-black shadow-[3px_3px_0px_#3D405B] scale-[1.01]'
                          : 'bg-[#FDFCF0] font-bold hover:bg-[#F2CC8F]/30'
                      }`}
                    >
                      <span className="text-2xl p-1 bg-[#F4F1DE] rounded-xl border border-[#3D405B]">{mat.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase font-black text-[#E07A5F] block">{mat.category}</span>
                        <div className="text-xs font-black truncate">{mat.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Chapter Detail */}
              <div className="md:col-span-8 p-5 overflow-y-auto custom-scrollbar space-y-4 bg-[#FDFCF0]">
                <div className="flex items-center gap-3 border-b-2 border-[#3D405B]/20 pb-3">
                  <span className="text-4xl p-2.5 bg-[#F2CC8F] rounded-2xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
                    {selectedMateri.icon}
                  </span>
                  <div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#81B29A] text-[#3D405B] font-black border border-[#3D405B]">
                      {selectedMateri.category}
                    </span>
                    <h3 className="text-xl font-black text-[#3D405B] mt-1">{selectedMateri.title}</h3>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="bg-[#F4F1DE] p-4 rounded-2xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] space-y-2">
                  <span className="text-[10px] font-black uppercase text-[#E07A5F] block"> Ringkasan Materi:</span>
                  <p className="text-xs font-bold leading-relaxed">{selectedMateri.summary}</p>
                </div>

                {/* Dalil Box if available */}
                {selectedMateri.dalil && (
                  <div className="bg-[#81B29A]/20 border-2 border-[#3D405B] p-4 rounded-2xl space-y-2">
                    <span className="text-[10px] font-black uppercase text-[#3D405B] block">📖 Dalil & Dasar Hukum:</span>
                    <p className="text-base sm:text-lg font-serif font-bold text-right text-[#3D405B] font-mono leading-loose">
                      {selectedMateri.dalil.arabic}
                    </p>
                    <p className="text-xs italic font-bold text-[#3D405B]/90">"{selectedMateri.dalil.translation}"</p>
                    <span className="text-[10px] font-black text-[#E07A5F] block text-right">— {selectedMateri.dalil.source}</span>
                  </div>
                )}

                {/* Nisab & Formula */}
                {(selectedMateri.nisabRule || selectedMateri.formula) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedMateri.nisabRule && (
                      <div className="bg-[#F4F1DE] p-3 rounded-2xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
                        <span className="text-[10px] font-black uppercase text-[#E07A5F] block">Syarat Minimal (Nisab)</span>
                        <span className="text-xs font-black text-[#3D405B] mt-1 block">{selectedMateri.nisabRule}</span>
                      </div>
                    )}
                    {selectedMateri.formula && (
                      <div className="bg-[#F4F1DE] p-3 rounded-2xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
                        <span className="text-[10px] font-black uppercase text-[#81B29A] block">Rumus Perhitungan</span>
                        <span className="text-xs font-black text-[#3D405B] mt-1 block">{selectedMateri.formula}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Points */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#3D405B] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" /> Poin Penting yang Wajib Diingat:
                  </h4>
                  <ul className="space-y-2">
                    {selectedMateri.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-bold bg-[#F4F1DE] p-2.5 rounded-xl border border-[#3D405B]/40">
                        <CheckCircle2 className="w-4 h-4 text-[#81B29A] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example */}
                <div className="bg-[#F2CC8F]/30 border-2 border-[#3D405B] p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black uppercase text-[#3D405B]">💡 Contoh Simulasi Nyata:</span>
                  <p className="text-xs font-extrabold text-[#3D405B]">{selectedMateri.example}</p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: KAMUS ZAKAT */}
          {activeTab === 'kamus' && (
            <div className="grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden">
              <div className="md:col-span-5 bg-[#F4F1DE] border-r-2 border-[#3D405B] p-3 flex flex-col gap-3 overflow-hidden">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#3D405B] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Cari zakat, nisab, asnaf..."
                    value={kamusSearch}
                    onChange={(e) => setKamusSearch(e.target.value)}
                    className="w-full bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl pl-9 pr-3 py-1.5 text-xs font-bold text-[#3D405B] placeholder-[#3D405B]/40 focus:outline-none focus:border-[#E07A5F]"
                  />
                </div>

                <div className="space-y-1.5 overflow-y-auto custom-scrollbar flex-1 pr-1">
                  {filteredKamus.map((item) => {
                    const isSelected = selectedKamusItem.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          soundEffects.playClick();
                          setSelectedKamusItem(item);
                        }}
                        className={`w-full text-left p-2.5 rounded-2xl border-2 border-[#3D405B] transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? 'bg-[#81B29A] text-[#3D405B] font-black shadow-[3px_3px_0px_#3D405B] scale-[1.01]'
                            : 'bg-[#FDFCF0] text-[#3D405B] hover:bg-[#F2CC8F]/40'
                        }`}
                      >
                        <span className="text-2xl p-1 bg-[#F4F1DE] rounded-xl border border-[#3D405B]">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-black truncate">{item.title}</div>
                          <div className="text-[10px] font-bold text-[#3D405B]/70 truncate">{item.category}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-7 p-5 overflow-y-auto custom-scrollbar bg-[#FDFCF0] space-y-4">
                <div className="flex items-center gap-3 border-b-2 border-[#3D405B]/20 pb-3">
                  <span className="text-4xl p-2 bg-[#F2CC8F] rounded-2xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
                    {selectedKamusItem.icon}
                  </span>
                  <div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#E07A5F] text-white font-black border border-[#3D405B]">
                      {selectedKamusItem.category}
                    </span>
                    <h3 className="text-xl font-black text-[#3D405B] mt-1">{selectedKamusItem.title}</h3>
                  </div>
                </div>

                <p className="text-xs font-bold leading-relaxed bg-[#F4F1DE] p-3.5 rounded-2xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
                  {selectedKamusItem.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#F4F1DE] p-3 rounded-2xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
                    <span className="text-[10px] font-black uppercase text-[#E07A5F] block">Nisab / Syarat Minimal</span>
                    <span className="text-xs font-black text-[#3D405B] mt-1 block">{selectedKamusItem.nisabFormula}</span>
                  </div>
                  <div className="bg-[#F4F1DE] p-3 rounded-2xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
                    <span className="text-[10px] font-black uppercase text-[#81B29A] block">Kadar / Tarif Zakat</span>
                    <span className="text-xs font-black text-[#3D405B] mt-1 block">{selectedKamusItem.kadar}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-[#3D405B] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" /> Ketentuan Utama:
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedKamusItem.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-bold text-[#3D405B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#81B29A] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SIMULATOR KALKULATOR ZAKAT */}
          {activeTab === 'simulator' && (
            <div className="p-5 overflow-y-auto custom-scrollbar h-full space-y-6 bg-[#FDFCF0]">
              
              {/* Simulator 1: Zakat Fitrah */}
              <div className="bg-[#F4F1DE] border-2 border-[#3D405B] p-5 rounded-3xl shadow-[4px_4px_0px_#3D405B] space-y-3">
                <div className="flex items-center gap-2 border-b-2 border-[#3D405B]/20 pb-2">
                  <span className="text-2xl">🌾</span>
                  <h3 className="font-black text-sm uppercase text-[#3D405B]">1. Simulator Zakat Fitrah</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Jumlah Orang / Anggota Keluarga:</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={fitrahPeopleCount}
                      onChange={(e) => setFitrahPeopleCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl px-3 py-2 text-xs font-black text-[#3D405B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Harga Beras per kg (Rp):</label>
                    <input
                      type="number"
                      step={500}
                      value={fitrahRicePrice}
                      onChange={(e) => setFitrahRicePrice(Math.max(1000, parseInt(e.target.value) || 15000))}
                      className="w-full bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl px-3 py-2 text-xs font-black text-[#3D405B]"
                    />
                  </div>
                </div>

                <div className="bg-[#81B29A]/30 border-2 border-[#3D405B] p-3 rounded-2xl flex flex-wrap justify-between items-center gap-2 text-xs font-bold">
                  <div>
                    <span className="block text-[10px] font-black uppercase text-[#3D405B]">Total Beras Wajib Dikeluarkan:</span>
                    <span className="text-base font-black text-[#E07A5F]">{fitrahKgTotal} kg ({fitrahLitreTotal} Liter)</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black uppercase text-[#3D405B]">Setara Uang Rupiah:</span>
                    <span className="text-base font-black font-mono text-[#3D405B]">Rp {fitrahMoneyTotal.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Simulator 2: Zakat Emas */}
              <div className="bg-[#F4F1DE] border-2 border-[#3D405B] p-5 rounded-3xl shadow-[4px_4px_0px_#3D405B] space-y-3">
                <div className="flex items-center gap-2 border-b-2 border-[#3D405B]/20 pb-2">
                  <span className="text-2xl">💰</span>
                  <h3 className="font-black text-sm uppercase text-[#3D405B]">2. Simulator Zakat Emas (Simpanan 1 Tahun)</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Total Emas Murni Dimiliki (Gram):</label>
                    <input
                      type="number"
                      min={0}
                      value={goldGram}
                      onChange={(e) => setGoldGram(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl px-3 py-2 text-xs font-black text-[#3D405B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Harga Emas Murni per Gram (Rp):</label>
                    <input
                      type="number"
                      step={10000}
                      value={goldPricePerGram}
                      onChange={(e) => setGoldPricePerGram(Math.max(10000, parseInt(e.target.value) || 1000000))}
                      className="w-full bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl px-3 py-2 text-xs font-black text-[#3D405B]"
                    />
                  </div>
                </div>

                <div className="bg-[#F2CC8F]/30 border-2 border-[#3D405B] p-3 rounded-2xl flex flex-wrap justify-between items-center gap-2 text-xs font-bold">
                  <div>
                    <span className="block text-[10px] font-black uppercase text-[#3D405B]">Status Nisab (Minimal 85 Gram):</span>
                    <span className={`text-xs font-black ${isGoldReachedNisab ? 'text-[#81B29A]' : 'text-[#E07A5F]'}`}>
                      {isGoldReachedNisab ? '✅ Mencapai Nisab (Wajib Zakat)' : '❌ Belum Mencapai Nisab (Bebas Zakat)'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black uppercase text-[#3D405B]">Zakat Emas (Kadar 2.5%):</span>
                    <span className="text-base font-black font-mono text-[#E07A5F]">
                      {isGoldReachedNisab ? `${goldZakatAmountGram.toFixed(2)} Gram (Rp ${goldZakatAmountMoney.toLocaleString('id-ID')})` : 'Rp 0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Simulator 3: Zakat Profesi */}
              <div className="bg-[#F4F1DE] border-2 border-[#3D405B] p-5 rounded-3xl shadow-[4px_4px_0px_#3D405B] space-y-3">
                <div className="flex items-center gap-2 border-b-2 border-[#3D405B]/20 pb-2">
                  <span className="text-2xl">💼</span>
                  <h3 className="font-black text-sm uppercase text-[#3D405B]">3. Simulator Zakat Profesi / Penghasilan</h3>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold block">Gaji / Penghasilan Bersih per Bulan (Rp):</label>
                  <input
                    type="number"
                    step={100000}
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl px-3 py-2 text-xs font-black text-[#3D405B]"
                  />
                </div>

                <div className="bg-[#81B29A]/30 border-2 border-[#3D405B] p-3 rounded-2xl flex flex-wrap justify-between items-center gap-2 text-xs font-bold">
                  <div>
                    <span className="block text-[10px] font-black uppercase text-[#3D405B]">Status Nisab Bulanan (~Rp 7.083.333):</span>
                    <span className={`text-xs font-black ${isIncomeReachedNisab ? 'text-[#81B29A]' : 'text-[#E07A5F]'}`}>
                      {isIncomeReachedNisab ? '✅ Wajib Zakat Profesi' : '❌ Bebas Zakat (Belum Mencapai Nisab)'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black uppercase text-[#3D405B]">Zakat per Bulan (Kadar 2.5%):</span>
                    <span className="text-base font-black font-mono text-[#E07A5F]">
                      Rp {incomeZakatAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#F4F1DE] px-5 py-3 border-t-2 border-[#3D405B] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] transition-all cursor-pointer"
          >
            Selesai Belajar
          </button>
        </div>

      </div>
    </div>
  );
};
