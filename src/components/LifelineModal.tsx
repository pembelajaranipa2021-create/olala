import React from 'react';
import { X, Sparkles, BarChart2, Lightbulb, Users, CheckCircle2 } from 'lucide-react';

interface LifelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  lifelineType: 'ustadz' | 'jamaah' | 'fifty' | null;
  ustadzAdvice?: string;
  jamaahPercents?: number[]; // [A%, B%, C%, D%]
  options?: string[];
}

export const LifelineModal: React.FC<LifelineModalProps> = ({
  isOpen,
  onClose,
  lifelineType,
  ustadzAdvice,
  jamaahPercents = [25, 25, 25, 25],
  options = ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D']
}) => {
  if (!isOpen || !lifelineType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FDFCF0] border-4 border-[#3D405B] rounded-3xl w-full max-w-lg shadow-[8px_8px_0px_#3D405B] text-[#3D405B] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#F4F1DE] px-5 py-4 border-b-2 border-[#3D405B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#F2CC8F] border-2 border-[#3D405B] flex items-center justify-center text-[#3D405B] text-xl shadow-[2px_2px_0px_#3D405B]">
              {lifelineType === 'ustadz' ? '💡' : lifelineType === 'jamaah' ? '👥' : '⚖️'}
            </div>
            <div>
              <h2 className="font-black text-base sm:text-lg text-[#3D405B]">
                {lifelineType === 'ustadz'
                  ? 'Bantuan Tanya Ustadz'
                  : lifelineType === 'jamaah'
                  ? 'Suara Jamaah & Teman'
                  : 'Bantuan 50:50'}
              </h2>
              <p className="text-xs font-bold text-[#3D405B]/80">
                {lifelineType === 'ustadz'
                  ? 'Nasihat bijak ustadz untuk kuis zakat ini'
                  : lifelineType === 'jamaah'
                  ? 'Hasil jajak pendapat suara sahabat'
                  : 'Dua pilihan salah telah dieliminasi!'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#FDFCF0] hover:bg-[#E07A5F] hover:text-white text-[#3D405B] border-2 border-[#3D405B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          
          {/* TANYA USTADZ */}
          {lifelineType === 'ustadz' && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-[#F4F1DE] p-3 rounded-2xl border-2 border-[#3D405B]">
                <div className="w-12 h-12 rounded-2xl bg-[#F2CC8F] border-2 border-[#3D405B] flex items-center justify-center text-2xl shrink-0">
                  👳‍♂️
                </div>
                <div>
                  <div className="text-xs font-black text-[#3D405B]">Ustadz Mubarok</div>
                  <div className="text-[10px] font-bold text-[#3D405B]/80">Pembimbing Edukasi Zakat Cilik</div>
                </div>
              </div>

              <div className="bg-[#F2CC8F]/30 border-2 border-[#3D405B] p-4 rounded-2xl relative space-y-2">
                <Sparkles className="w-4 h-4 text-[#E07A5F] absolute top-3 right-3" />
                <p className="text-xs sm:text-sm text-[#3D405B] italic leading-relaxed font-extrabold">
                  "{ustadzAdvice || 'Bismillah! Bacalah pertanyaan dengan cermat dan perhatikan nisabnya ya anakku.'}"
                </p>
              </div>
            </div>
          )}

          {/* SUARA JAMAAH */}
          {lifelineType === 'jamaah' && (
            <div className="space-y-3">
              <p className="text-xs text-[#3D405B] text-center font-bold">
                Berikut persentase pilihan sahabat dan jamaah:
              </p>
              
              <div className="space-y-2.5 bg-[#F4F1DE] p-4 rounded-2xl border-2 border-[#3D405B]">
                {['A', 'B', 'C', 'D'].map((letter, idx) => {
                  const pct = jamaahPercents[idx] || 25;
                  return (
                    <div key={letter} className="space-y-1">
                      <div className="flex justify-between text-xs font-black">
                        <span className="text-[#3D405B]">
                          {letter}. {options[idx] || `Pilihan ${letter}`}
                        </span>
                        <span className="text-[#E07A5F] font-mono">{pct}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#FDFCF0] rounded-full overflow-hidden border-2 border-[#3D405B]">
                        <div
                          className="h-full bg-[#81B29A] rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 50:50 */}
          {lifelineType === 'fifty' && (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 bg-[#F2CC8F] border-2 border-[#3D405B] rounded-full flex items-center justify-center text-3xl mx-auto text-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
                ⚖️
              </div>
              <h3 className="text-base font-black text-[#3D405B]">Bantuan 50:50 Berhasil Digunakan!</h3>
              <p className="text-xs font-bold text-[#3D405B]/80 max-w-xs mx-auto">
                Dua opsi pilihan jawaban yang tidak tepat telah dicoret. Silakan tentukan jawaban terbaikmu dari 2 opsi tersisa!
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#F4F1DE] px-5 py-3 border-t-2 border-[#3D405B] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] transition-all cursor-pointer"
          >
            Paham, Lanjutkan!
          </button>
        </div>

      </div>
    </div>
  );
};
