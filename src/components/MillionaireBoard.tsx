import React from 'react';
import { LEVEL_PRIZES } from '../data/zakatQuestions';
import { Shield, Crown, Sparkles, CheckCircle2 } from 'lucide-react';

interface MillionaireBoardProps {
  currentLevel: number; // 1 to 15
  reachedLevels: number[];
}

export const MillionaireBoard: React.FC<MillionaireBoardProps> = ({
  currentLevel,
  reachedLevels
}) => {
  return (
    <div className="bg-[#F4F1DE] border-2 border-[#3D405B] rounded-3xl p-4 shadow-[4px_4px_0px_#3D405B] flex flex-col h-full text-[#3D405B]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b-2 border-[#3D405B]/20 pb-2">
        <h3 className="text-[#3D405B] font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1.5">
          <Crown className="w-4 h-4 text-[#E07A5F]" /> Tangga Pahlawan Zakat
        </h3>
        <span className="text-[10px] text-[#3D405B] bg-[#81B29A] px-2.5 py-0.5 rounded-full border border-[#3D405B] font-extrabold">
          30 Level
        </span>
      </div>

      {/* Ladder list in reverse order (30 down to 1) */}
      <div className="flex flex-col gap-1 overflow-y-auto pr-1 custom-scrollbar flex-1">
        {[...LEVEL_PRIZES].reverse().map((item) => {
          const isCurrent = item.level === currentLevel;
          const isPassed = item.level < currentLevel || reachedLevels.includes(item.level);

          return (
            <div
              key={item.level}
              className={`flex items-center justify-between px-3 py-1 rounded-xl text-xs font-bold transition-all duration-300 border-2 ${
                isCurrent
                  ? 'bg-[#F2CC8F] text-[#3D405B] border-[#3D405B] shadow-[2px_2px_0px_#3D405B] font-black scale-[1.02] animate-pulse'
                  : isPassed
                  ? 'bg-[#81B29A]/30 text-[#3D405B]/70 border-[#3D405B]/20'
                  : item.safe
                  ? 'bg-[#E07A5F]/20 text-[#3D405B] border-[#3D405B]/60 font-black'
                  : 'bg-[#FDFCF0] text-[#3D405B]/80 border-[#3D405B]/30 hover:bg-[#81B29A]/20'
              }`}
            >
              {/* Level Number & Indicators */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isCurrent
                      ? 'bg-[#3D405B] text-[#F2CC8F]'
                      : isPassed
                      ? 'bg-[#81B29A] text-[#FDFCF0]'
                      : 'bg-[#3D405B]/10 text-[#3D405B]'
                  }`}
                >
                  {item.level}
                </span>

                {item.safe && (
                  <span
                    className={`flex items-center gap-0.5 text-[9px] px-1.5 py-0.2 rounded-md font-extrabold uppercase border ${
                      isCurrent
                        ? 'bg-[#3D405B] text-[#F2CC8F] border-[#3D405B]'
                        : 'bg-[#E07A5F] text-white border-[#3D405B]'
                    }`}
                  >
                    <Shield className="w-2.5 h-2.5" /> AMAN
                  </span>
                )}

                {item.level === 30 && (
                  <Sparkles className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#3D405B]' : 'text-[#E07A5F]'}`} />
                )}
              </div>

              {/* Prize Label */}
              <div className="flex items-center gap-1.5 font-mono font-black text-[11px]">
                <span>{item.label}</span>
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-[#81B29A] shrink-0" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Level Info Footer */}
      <div className="mt-3 pt-2 border-t-2 border-[#3D405B]/20 text-[10px] font-bold text-[#3D405B]/80 flex items-center justify-between">
        <span className="flex items-center gap-1 text-[#E07A5F] font-black">
          <Shield className="w-3 h-3 text-[#E07A5F]" /> Titik Aman: Level 5, 10, 15, 20, 25, 30
        </span>
        <span className="text-[10px] text-[#3D405B]/70 font-semibold">Uang terkunci aman</span>
      </div>
    </div>
  );
};

