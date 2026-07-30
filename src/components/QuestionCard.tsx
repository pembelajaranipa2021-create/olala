import React, { useEffect, useState } from 'react';
import { Question, LifelineState } from '../types/zakat';
import { Calculator, Sparkles, Clock } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface QuestionCardProps {
  question: Question;
  timeLimit: number; // e.g. 30
  lifelines: LifelineState;
  disabledOptionIndices?: number[];
  selectedOptionIndex?: number | null;
  isAnswerSubmitted?: boolean;
  showResults?: boolean;
  isEliminated?: boolean;
  onSelectOption: (optionIndex: number, timeTaken: number) => void;
  onUseLifeline: (type: 'fifty' | 'ustadz' | 'jamaah') => void;
  onOpenCalculator: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  timeLimit,
  lifelines,
  disabledOptionIndices = [],
  selectedOptionIndex = null,
  isAnswerSubmitted = false,
  showResults = false,
  isEliminated = false,
  onSelectOption,
  onUseLifeline,
  onOpenCalculator
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);

  // Timer Countdown Effect
  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [question.id, timeLimit]);

  useEffect(() => {
    if (isAnswerSubmitted || showResults || timeLeft <= 0 || isEliminated) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto select option if time expired and not selected (-1 means timeout/wrong)
          if (selectedOptionIndex === null && !isAnswerSubmitted && !isEliminated) {
            onSelectOption(-1, timeLimit);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswerSubmitted, showResults, isEliminated, selectedOptionIndex, timeLimit, onSelectOption]);

  const handleOptionClick = (idx: number) => {
    if (isAnswerSubmitted || showResults || disabledOptionIndices.includes(idx) || isEliminated) return;
    soundEffects.playClick();
    const timeTaken = timeLimit - timeLeft;
    onSelectOption(idx, timeTaken);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const timerPercentage = Math.max(0, (timeLeft / timeLimit) * 100);

  return (
    <div className="bg-[#FDFCF0] border-2 border-[#3D405B] rounded-3xl p-4 sm:p-6 shadow-[4px_4px_0px_#3D405B] space-y-4 flex flex-col text-[#3D405B]">
      
      {/* Question Level & Category Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#3D405B]/20 pb-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#E07A5F] text-white border-2 border-[#3D405B] font-black px-3 py-1 rounded-xl text-xs sm:text-sm shadow-[2px_2px_0px_#3D405B]">
            LEVEL {question.level}
          </span>
          <span className="text-[#3D405B] font-black font-mono text-xs sm:text-sm">
            {question.prizeLabel}
          </span>
        </div>

        {/* Category Badge */}
        <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded-full bg-[#81B29A] text-[#3D405B] border border-[#3D405B] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#3D405B]" /> {question.category}
        </span>
      </div>

      {/* Countdown Timer Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-black text-[#3D405B]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#E07A5F]" /> Sisa Waktu:
          </span>
          <span className={`font-mono ${timeLeft <= 5 ? 'text-[#E07A5F] font-black animate-bounce' : 'text-[#3D405B]'}`}>
            {timeLeft} Detik
          </span>
        </div>
        <div className="w-full h-3 bg-[#F4F1DE] rounded-full overflow-hidden border-2 border-[#3D405B]">
          <div
            className={`h-full transition-all duration-1000 ${
              timeLeft > 10 ? 'bg-[#81B29A]' : timeLeft > 5 ? 'bg-[#F2CC8F]' : 'bg-[#E07A5F]'
            }`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>
      </div>

      {/* Lifeline Buttons Bar */}
      <div className="flex items-center justify-between gap-2 bg-[#F4F1DE] p-2 rounded-2xl border-2 border-[#3D405B]">
        <span className="text-[10px] font-black text-[#3D405B] uppercase px-2 hidden sm:inline">
          Bantuan Lifeline:
        </span>
        
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end">
          {/* 50:50 */}
          <button
            onClick={() => onUseLifeline('fifty')}
            disabled={!lifelines.fiftyFifty || isAnswerSubmitted}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-[#3D405B] flex items-center gap-1 cursor-pointer ${
              lifelines.fiftyFifty && !isAnswerSubmitted
                ? 'bg-[#F2CC8F] hover:bg-[#81B29A] text-[#3D405B] shadow-[2px_2px_0px_#3D405B] hover:translate-y-[-1px]'
                : 'bg-[#F4F1DE] text-gray-400 cursor-not-allowed opacity-50'
            }`}
            title="Eliminasi 2 Pilihan Salah"
          >
            <span>⚖️ 50:50</span>
          </button>

          {/* Tanya Ustadz */}
          <button
            onClick={() => onUseLifeline('ustadz')}
            disabled={!lifelines.ustadz || isAnswerSubmitted}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-[#3D405B] flex items-center gap-1 cursor-pointer ${
              lifelines.ustadz && !isAnswerSubmitted
                ? 'bg-[#F2CC8F] hover:bg-[#81B29A] text-[#3D405B] shadow-[2px_2px_0px_#3D405B] hover:translate-y-[-1px]'
                : 'bg-[#F4F1DE] text-gray-400 cursor-not-allowed opacity-50'
            }`}
            title="Minta Petunjuk Ustadz"
          >
            <span>💡 Ustadz</span>
          </button>

          {/* Suara Jamaah */}
          <button
            onClick={() => onUseLifeline('jamaah')}
            disabled={!lifelines.jamaah || isAnswerSubmitted}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-[#3D405B] flex items-center gap-1 cursor-pointer ${
              lifelines.jamaah && !isAnswerSubmitted
                ? 'bg-[#F2CC8F] hover:bg-[#81B29A] text-[#3D405B] shadow-[2px_2px_0px_#3D405B] hover:translate-y-[-1px]'
                : 'bg-[#F4F1DE] text-gray-400 cursor-not-allowed opacity-50'
            }`}
            title="Hasil Jajak Pendapat Jamaah"
          >
            <span>👥 Jamaah</span>
          </button>

          {/* Simulator Calculator Button (If question has calculation) */}
          {question.hasCalculator && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenCalculator();
              }}
              className="px-2.5 py-1.5 rounded-xl bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs border-2 border-[#3D405B] flex items-center gap-1 transition-all cursor-pointer shadow-[2px_2px_0px_#3D405B]"
            >
              <Calculator className="w-3.5 h-3.5 text-[#3D405B]" />
              <span className="hidden sm:inline">Hitung</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Question Box */}
      <div className="bg-[#F4F1DE] p-4 sm:p-5 rounded-2xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] space-y-2 text-center my-1">
        <h2 className="text-base sm:text-lg md:text-xl font-black text-[#3D405B] leading-snug">
          {question.questionText}
        </h2>
        {question.hasCalculator && (
          <p className="text-[11px] text-[#E07A5F] font-bold italic">
            💡 Soal perhitungan! Kamu bisa menggunakan tombol "Hitung" di atas untuk bantuan simulator.
          </p>
        )}
      </div>

      {/* Eliminated Player Spectator Banner */}
      {isEliminated && (
        <div className="bg-[#E07A5F] text-white border-2 border-[#3D405B] p-3 rounded-2xl text-center shadow-[2px_2px_0px_#3D405B] font-black text-xs space-y-0.5 animate-fade-in">
          <div>❌ KAMU SUDAH TERELIMINASI (GUGUR)</div>
          <div className="text-[11px] font-bold text-white/90">
            Jawabanmu pada soal sebelumnya salah sehingga kamu tidak dapat lagi menjawab soal. Silakan nikmati sisa permainan sebagai penonton!
          </div>
        </div>
      )}

      {/* Options Grid (A, B, C, D) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {question.options.map((optionText, idx) => {
          const isDisabled = disabledOptionIndices.includes(idx) || isEliminated;
          const isSelected = selectedOptionIndex === idx;
          const isCorrect = idx === question.correctAnswerIndex;

          let btnClass = 'bg-[#FDFCF0] text-[#3D405B] border-[#3D405B] hover:bg-[#F2CC8F] hover:shadow-[3px_3px_0px_#3D405B]';

          if (showResults) {
            if (isCorrect) {
              btnClass = 'bg-[#81B29A] text-[#3D405B] font-black border-[#3D405B] shadow-[4px_4px_0px_#3D405B] scale-[1.02]';
            } else if (isSelected && !isCorrect) {
              btnClass = 'bg-[#E07A5F] text-white font-black border-[#3D405B] shadow-[4px_4px_0px_#3D405B]';
            } else {
              btnClass = 'bg-[#F4F1DE] text-[#3D405B]/40 border-[#3D405B]/20 opacity-50';
            }
          } else if (isEliminated) {
            btnClass = 'bg-[#F4F1DE] text-[#3D405B]/60 border-[#3D405B]/30 opacity-60 cursor-not-allowed';
          } else if (isDisabled) {
            btnClass = 'bg-[#F4F1DE] text-gray-400 border-gray-300 line-through opacity-40 cursor-not-allowed';
          } else if (isSelected) {
            btnClass = 'bg-[#F2CC8F] text-[#3D405B] font-black border-[#3D405B] shadow-[4px_4px_0px_#3D405B] scale-[1.02]';
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={isDisabled || isAnswerSubmitted || showResults}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 text-xs sm:text-sm font-extrabold transition-all duration-200 text-left flex items-start gap-3 cursor-pointer ${btnClass}`}
            >
              <span className={`w-6 h-6 rounded-xl border-2 border-[#3D405B] flex items-center justify-center font-black text-xs shrink-0 ${
                isSelected ? 'bg-[#3D405B] text-[#F2CC8F]' : 'bg-[#F4F1DE] text-[#3D405B]'
              }`}>
                {optionLabels[idx]}
              </span>
              <span className="flex-1 pt-0.5 leading-snug">{optionText}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation Box when showing results */}
      {showResults && (
        <div className="bg-[#81B29A]/20 border-2 border-[#3D405B] p-4 rounded-2xl space-y-1.5 animate-fade-in">
          <div className="flex items-center gap-2 text-[#3D405B] font-black text-xs uppercase">
            <Sparkles className="w-4 h-4 text-[#E07A5F]" /> Penjelasan & Kunci Jawaban:
          </div>
          <p className="text-xs font-bold text-[#3D405B] leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

    </div>
  );
};

