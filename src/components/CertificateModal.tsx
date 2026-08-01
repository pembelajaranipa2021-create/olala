import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Award, Crown, Sparkles, Download, Share2 } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  playerAvatar: string;
  totalScore: number;
  levelReached: number;
  rank?: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  playerName,
  playerAvatar,
  totalScore,
  levelReached,
  rank
}) => {
  useEffect(() => {
    if (isOpen) {
      soundEffects.playVictoryFanfare();
      // Burst confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-[#FDFCF0] border-4 border-[#3D405B] rounded-3xl w-full max-w-2xl shadow-[8px_8px_0px_#3D405B] text-[#3D405B] overflow-hidden flex flex-col relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-[#F4F1DE] hover:bg-[#E07A5F] hover:text-white text-[#3D405B] border-2 border-[#3D405B] transition-colors cursor-pointer shadow-[2px_2px_0px_#3D405B]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Card Printable Area */}
        <div id="certificate-print-area" className="p-6 sm:p-8 text-center space-y-4 relative border-4 border-[#3D405B] m-3 rounded-2xl bg-[#FDFCF0] shadow-[3px_3px_0px_#3D405B]">
          
          {/* Header Seal */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F2CC8F] text-[#3D405B] shadow-[2px_2px_0px_#3D405B] border-2 border-[#3D405B] mx-auto text-3xl font-black">
            🕌
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#E07A5F]">
              SERTIFIKAT PENGHARGAAN RESMI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3D405B] font-serif tracking-wide uppercase">
              PAHLAWAN ZAKAT NUSANTARA
            </h2>
            <p className="text-xs text-[#3D405B]/80 font-bold italic">
              Diberikan atas prestasi gemilang dalam petualangan & kuis simulasi zakat
            </p>
          </div>

          <div className="py-3 border-y-2 border-[#3D405B]/20 max-w-md mx-auto space-y-2">
            <p className="text-xs text-[#3D405B] font-bold">Diberikan Kepada Pahlawan Zakat:</p>
            <div className="text-2xl sm:text-3xl font-black text-[#3D405B] font-serif flex items-center justify-center gap-2">
              <img src={playerAvatar} alt="avatar" className="w-10 h-10 object-contain inline-block" />
              <span className="text-[#E07A5F] underline decoration-[#3D405B] decoration-wavy underline-offset-4">
                {playerName}
              </span>
            </div>
          </div>

          {/* Achievement Metrics */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto text-center pt-2">
            <div className="bg-[#F4F1DE] p-2.5 rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
              <span className="text-[10px] uppercase font-black text-[#3D405B]/70 block">Total Poin</span>
              <span className="text-base sm:text-lg font-black text-[#3D405B] font-mono">
                {totalScore.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="bg-[#F4F1DE] p-2.5 rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
              <span className="text-[10px] uppercase font-black text-[#3D405B]/70 block">Level Dicapai</span>
              <span className="text-base sm:text-lg font-black text-[#E07A5F] font-mono">
                Lvl {levelReached}/30
              </span>
            </div>
            <div className="bg-[#F4F1DE] p-2.5 rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
              <span className="text-[10px] uppercase font-black text-[#3D405B]/70 block">Peringkat Sesi</span>
              <span className="text-base sm:text-lg font-black text-[#81B29A] font-mono">
                {rank ? `#${rank}` : 'Top Rank'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#3D405B]/80 font-semibold italic pt-2 max-w-sm mx-auto">
            "Semoga ilmu zakat ini menjadi pembersih harta, penambah keberkahan, dan amal jariyah untuk kebaikan dunia dan akhirat."
          </p>

          <div className="pt-3 border-t-2 border-[#3D405B]/20 flex items-center justify-between text-[10px] text-[#3D405B] font-bold max-w-md mx-auto">
            <span>Tanggal: {todayStr}</span>
            <span className="font-black text-[#E07A5F]">Akademi Jutawan Zakat</span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="bg-[#F4F1DE] px-6 py-4 border-t-2 border-[#3D405B] flex items-center justify-between">
          <button
            onClick={() => {
              window.print();
            }}
            className="px-4 py-2 bg-[#FDFCF0] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#E07A5F]" /> Cetak Sertifikat
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer transition-all"
          >
            Lanjutkan Bermain
          </button>
        </div>

      </div>
    </div>
  );
};
