import React, { useState } from 'react';
import { X, Calculator, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface InteractiveCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPresetType?: 'fitrah' | 'emas' | 'profesi' | 'pertanian' | 'peternakan';
}

export const InteractiveCalculatorModal: React.FC<InteractiveCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialPresetType = 'fitrah'
}) => {
  const [activeTab, setActiveTab] = useState<'fitrah' | 'emas' | 'profesi' | 'pertanian'>(
    initialPresetType === 'peternakan' ? 'fitrah' : initialPresetType
  );

  // Fitrah state
  const [anggotaKeluarga, setAnggotaKeluarga] = useState<number>(4);
  const [hargaBerasKg, setHargaBerasKg] = useState<number>(14000);

  // Emas state
  const [beratEmas, setBeratEmas] = useState<number>(100);
  const [hargaEmasPerGram, setHargaEmasPerGram] = useState<number>(1200000);

  // Profesi state
  const [gajiBulan, setGajiBulan] = useState<number>(8500000);

  // Pertanian state
  const [panenKg, setPanenKg] = useState<number>(1000);
  const [isAlamiAir, setIsAlamiAir] = useState<boolean>(true); // true = 10%, false = 5%

  if (!isOpen) return null;

  // Fitrah calculation
  const totalBerasKg = anggotaKeluarga * 2.5;
  const totalBerasLiter = anggotaKeluarga * 3.5;
  const totalUangFitrah = totalBerasKg * hargaBerasKg;

  // Emas calculation
  const nisabEmasGram = 85;
  const isEmasWajib = beratEmas >= nisabEmasGram;
  const zakatEmasGram = isEmasWajib ? beratEmas * 0.025 : 0;
  const zakatEmasRp = zakatEmasGram * hargaEmasPerGram;

  // Profesi calculation
  const nisabProfesiBulan = 8500000; // ~85gr emas / 12 bulan
  const isProfesiWajib = gajiBulan >= nisabProfesiBulan;
  const zakatProfesiRp = isProfesiWajib ? gajiBulan * 0.025 : 0;

  // Pertanian calculation
  const nisabPertanianKg = 653; // kg gabah
  const isPertanianWajib = panenKg >= nisabPertanianKg;
  const kadarPertanian = isAlamiAir ? 0.10 : 0.05;
  const zakatPertanianKg = isPertanianWajib ? panenKg * kadarPertanian : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-emerald-950 border border-emerald-600/60 rounded-3xl w-full max-w-2xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 px-5 py-4 border-b border-emerald-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-amber-300 flex items-center gap-2">
                Simulator Kalkulator Zakat Interaktif
              </h2>
              <p className="text-xs text-emerald-200/80">Hitung & pahami rumus zakat secara nyata!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 bg-emerald-950 border-b border-emerald-800/80 overflow-x-auto custom-scrollbar">
          {[
            { id: 'fitrah', label: '🌾 Fitrah', color: 'emerald' },
            { id: 'emas', label: '🪙 Emas & Perak', color: 'amber' },
            { id: 'profesi', label: '💼 Profesi', color: 'blue' },
            { id: 'pertanian', label: '🌱 Pertanian', color: 'lime' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundEffects.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-emerald-950 shadow-md font-extrabold scale-105'
                  : 'bg-emerald-900/50 text-emerald-200 hover:bg-emerald-800/60 border border-emerald-700/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          
          {/* TAB 1: ZAKAT FITRAH */}
          {activeTab === 'fitrah' && (
            <div className="space-y-4">
              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-3">
                <label className="text-xs font-bold text-amber-300 flex justify-between">
                  <span>Jumlah Anggota Keluarga (Jiwa):</span>
                  <span className="text-sm font-extrabold text-amber-200">{anggotaKeluarga} Orang</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={anggotaKeluarga}
                  onChange={(e) => setAnggotaKeluarga(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-emerald-300/70">
                  <span>1 Orang</span>
                  <span>6 Orang</span>
                  <span>12 Orang</span>
                </div>
              </div>

              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-3">
                <label className="text-xs font-bold text-emerald-200 flex justify-between">
                  <span>Harga Beras Kualitas Pokok per Kg:</span>
                  <span className="text-sm font-extrabold text-emerald-100">
                    Rp {hargaBerasKg.toLocaleString('id-ID')} / kg
                  </span>
                </label>
                <input
                  type="range"
                  min="10000"
                  max="25000"
                  step="500"
                  value={hargaBerasKg}
                  onChange={(e) => setHargaBerasKg(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Result Box */}
              <div className="bg-gradient-to-br from-amber-500/20 to-emerald-800/40 border-2 border-amber-400/60 rounded-2xl p-4 shadow-lg space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs uppercase">
                  <Sparkles className="w-4 h-4" /> Hasil Perhitungan Zakat Fitrah:
                </div>
                <div className="grid grid-cols-2 gap-3 text-center pt-1">
                  <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-600/50">
                    <div className="text-[10px] text-emerald-300 uppercase font-semibold">Total Beras</div>
                    <div className="text-lg font-black text-amber-300">{totalBerasKg} kg</div>
                    <div className="text-[10px] text-emerald-200/80">({totalBerasLiter} Liter)</div>
                  </div>
                  <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-600/50">
                    <div className="text-[10px] text-emerald-300 uppercase font-semibold">Total Uang Cash</div>
                    <div className="text-lg font-black text-emerald-200">
                      Rp {totalUangFitrah.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-200/90 italic pt-1 text-center">
                  Rumus: {anggotaKeluarga} orang × 2,5 kg = {totalBerasKg} kg beras.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ZAKAT EMAS */}
          {activeTab === 'emas' && (
            <div className="space-y-4">
              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-3">
                <label className="text-xs font-bold text-amber-300 flex justify-between">
                  <span>Berat Emas Simpanan (&gt; 1 Tahun):</span>
                  <span className="text-sm font-extrabold text-amber-200">{beratEmas} Gram</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={beratEmas}
                  onChange={(e) => setBeratEmas(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="text-[10px] text-emerald-300/80 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  Nisab Zakat Emas adalah <strong className="text-amber-300">85 Gram</strong>.
                </div>
              </div>

              {/* Result Box */}
              <div
                className={`p-4 rounded-2xl border-2 shadow-lg space-y-2 ${
                  isEmasWajib
                    ? 'bg-amber-500/20 border-amber-400/80'
                    : 'bg-emerald-900/30 border-emerald-700/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-amber-300">
                    Status Wajib Zakat Emas:
                  </span>
                  {isEmasWajib ? (
                    <span className="text-xs bg-amber-400 text-emerald-950 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> WAJIB ZAKAT (2,5%)
                    </span>
                  ) : (
                    <span className="text-xs bg-emerald-800 text-emerald-200 font-bold px-2.5 py-0.5 rounded-full">
                      Belum Mencapai Nisab (&lt; 85gr)
                    </span>
                  )}
                </div>

                {isEmasWajib ? (
                  <div className="grid grid-cols-2 gap-3 text-center pt-2">
                    <div className="bg-emerald-950/90 p-2.5 rounded-xl border border-amber-400/40">
                      <div className="text-[10px] text-amber-200 uppercase font-semibold">Zakat Emas (Gram)</div>
                      <div className="text-lg font-black text-amber-300">{zakatEmasGram.toFixed(2)} Gram</div>
                    </div>
                    <div className="bg-emerald-950/90 p-2.5 rounded-xl border border-amber-400/40">
                      <div className="text-[10px] text-amber-200 uppercase font-semibold">Estimasi Nilai Uang</div>
                      <div className="text-lg font-black text-emerald-200">
                        Rp {Math.round(zakatEmasRp).toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-emerald-200/80 italic pt-1">
                    Emas Anda belum mencapai batas nisab 85 gram, sehingga belum diwajibkan mengeluarkan zakat emas.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ZAKAT PROFESI */}
          {activeTab === 'profesi' && (
            <div className="space-y-4">
              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-3">
                <label className="text-xs font-bold text-emerald-200 flex justify-between">
                  <span>Gaji / Penghasilan Bersih Per Bulan:</span>
                  <span className="text-sm font-extrabold text-amber-300">
                    Rp {gajiBulan.toLocaleString('id-ID')}
                  </span>
                </label>
                <input
                  type="range"
                  min="3000000"
                  max="25000000"
                  step="500000"
                  value={gajiBulan}
                  onChange={(e) => setGajiBulan(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Result */}
              <div
                className={`p-4 rounded-2xl border-2 shadow-lg space-y-2 ${
                  isProfesiWajib
                    ? 'bg-amber-500/20 border-amber-400/80'
                    : 'bg-emerald-900/30 border-emerald-700/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-amber-300">Zakat Profesi (2,5%):</span>
                  {isProfesiWajib ? (
                    <span className="text-xs bg-amber-400 text-emerald-950 font-black px-2.5 py-0.5 rounded-full">
                      Wajib Zakat Rutin
                    </span>
                  ) : (
                    <span className="text-xs bg-emerald-800 text-emerald-200 font-bold px-2.5 py-0.5 rounded-full">
                      Di bawah nisab bulanan
                    </span>
                  )}
                </div>

                <div className="bg-emerald-950/90 p-3 rounded-xl border border-amber-400/40 text-center">
                  <div className="text-[11px] text-emerald-200 uppercase font-semibold">Zakat Profesi Per Bulan</div>
                  <div className="text-xl font-black text-amber-300">
                    Rp {Math.round(zakatProfesiRp).toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-emerald-300/80 mt-1">
                    Rumus: 2,5% × Rp {gajiBulan.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ZAKAT PERTANIAN */}
          {activeTab === 'pertanian' && (
            <div className="space-y-4">
              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-3">
                <label className="text-xs font-bold text-amber-300 flex justify-between">
                  <span>Hasil Panen Padi / Gabah (Masa Panen):</span>
                  <span className="text-sm font-extrabold text-amber-200">{panenKg} Kg</span>
                </label>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={panenKg}
                  onChange={(e) => setPanenKg(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Water Source Toggle */}
              <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-2">
                <span className="text-xs font-bold text-emerald-200 block">Sumber Pengairan Sawah:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAlamiAir(true)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isAlamiAir
                        ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md font-extrabold'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    }`}
                  >
                    🌧️ Air Hujan / Alami (Kadar 10%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAlamiAir(false)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      !isAlamiAir
                        ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md font-extrabold'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    }`}
                  >
                    🚜 Irigasi Berbayar (Kadar 5%)
                  </button>
                </div>
              </div>

              {/* Result */}
              <div className="bg-amber-500/20 border-2 border-amber-400/80 p-4 rounded-2xl shadow-lg text-center space-y-1">
                <div className="text-[11px] text-amber-200 uppercase font-semibold">
                  Zakat Hasil Panen ({isAlamiAir ? '10%' : '5%'})
                </div>
                <div className="text-2xl font-black text-amber-300">
                  {zakatPertanianKg.toFixed(1)} Kg Padi / Gabah
                </div>
                <div className="text-[10px] text-emerald-200/90 italic">
                  Nisab minimal pertanian = 653 kg gabah (5 Wasaq)
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-emerald-900/90 px-5 py-3 border-t border-emerald-700/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Tutup Calculator
          </button>
        </div>

      </div>
    </div>
  );
};
