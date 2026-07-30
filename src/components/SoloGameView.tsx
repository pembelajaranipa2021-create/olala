import React, { useState } from 'react';
import { ZAKAT_QUESTIONS_BANK, LEVEL_PRIZES, getQuestionsForGameSession } from '../data/zakatQuestions';
import { QuestionCard } from './QuestionCard';
import { MillionaireBoard } from './MillionaireBoard';
import { Question, LifelineState } from '../types/zakat';
import { soundEffects } from '../utils/soundEffects';
import { Home, LogOut, ShieldCheck, DollarSign, RefreshCw, Award, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';

interface SoloGameViewProps {
  playerName: string;
  playerAvatar: string;
  onOpenCalculator: () => void;
  onOpenCertificate: (score: number, level: number) => void;
  onGoHome?: () => void;
}

export const SoloGameView: React.FC<SoloGameViewProps> = ({
  playerName,
  playerAvatar,
  onOpenCalculator,
  onOpenCertificate,
  onGoHome
}) => {
  const [questions, setQuestions] = useState<Question[]>(() => getQuestionsForGameSession());
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [reachedLevels, setReachedLevels] = useState<number[]>([]);
  const [lifelines, setLifelines] = useState<LifelineState>({
    fiftyFifty: true,
    ustadz: true,
    jamaah: true
  });

  const [disabledOptionIndices, setDisabledOptionIndices] = useState<number[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState<number>(3);

  // Game lifecycle status: 'playing' | 'eliminated' | 'walk_away' | 'completed'
  const [gameStatus, setGameStatus] = useState<'playing' | 'eliminated' | 'walk_away' | 'completed'>('playing');
  const [guaranteedPrize, setGuaranteedPrize] = useState<number>(0);
  const [showWalkAwayConfirm, setShowWalkAwayConfirm] = useState<boolean>(false);
  const [showExitHomeConfirm, setShowExitHomeConfirm] = useState<boolean>(false);

  // Active Lifeline modal state
  const [activeLifelineType, setActiveLifelineType] = useState<'ustadz' | 'jamaah' | 'fifty' | null>(null);
  const [ustadzAdviceText, setUstadzAdviceText] = useState<string>('');
  const [jamaahPercents, setJamaahPercents] = useState<number[]>([25, 25, 25, 25]);

  const currentQuestion = questions[currentLevelIndex] || questions[0];

  // Auto-advance timer when answer is correct
  React.useEffect(() => {
    if (!showResults || gameStatus !== 'playing' || selectedOptionIndex !== currentQuestion.correctAnswerIndex) {
      return;
    }

    setAutoAdvanceSeconds(3);
    const timer = setInterval(() => {
      setAutoAdvanceSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 3;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults, gameStatus, selectedOptionIndex, currentQuestion.correctAnswerIndex, currentLevelIndex]);

  // Calculate safe haven prize fallback based on Millionaire rules
  const getSafeHavenPrize = (levelNum: number): number => {
    for (let i = levelNum - 1; i >= 0; i--) {
      if (LEVEL_PRIZES[i]?.safe) {
        return LEVEL_PRIZES[i].prize;
      }
    }
    return 0;
  };

  const handleSelectOption = (chosenIdx: number, timeTaken: number) => {
    setSelectedOptionIndex(chosenIdx);
    setIsAnswerSubmitted(true);
    setShowResults(true);

    const isCorrect = chosenIdx === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
      soundEffects.playCorrect();
      const prizeLevel = LEVEL_PRIZES[currentQuestion.level - 1];
      const speedBonus = Math.max(0, Math.floor((30 - timeTaken) * 1000));
      const pointsEarned = prizeLevel.prize + speedBonus;
      
      const newScore = Math.max(score, prizeLevel.prize + speedBonus);
      setScore(newScore);
      setReachedLevels((prev) => [...prev, currentQuestion.level]);

      if (currentQuestion.level === 30 || currentQuestion.level === questions.length) {
        setGameStatus('completed');
        setGuaranteedPrize(LEVEL_PRIZES[currentQuestion.level - 1].prize);
      }
    } else {
      soundEffects.playWrong();
      // GUGUR! Calculate fallback to highest Titik Aman reached
      const safePrize = getSafeHavenPrize(currentQuestion.level - 1);
      setGuaranteedPrize(safePrize);
      setGameStatus('eliminated');
    }
  };

  const handleNextQuestion = () => {
    soundEffects.playClick();
    if (currentLevelIndex + 1 < questions.length) {
      setCurrentLevelIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
      setShowResults(false);
      setDisabledOptionIndices([]);
    } else {
      // Completed all 30 levels!
      setGameStatus('completed');
      onOpenCertificate(score, questions.length);
    }
  };

  // Walk Away (Ambil Uang)
  const handleWalkAway = () => {
    soundEffects.playClick();
    const cashOutAmount = currentLevelIndex > 0 ? LEVEL_PRIZES[currentLevelIndex - 1].prize : 0;
    setGuaranteedPrize(cashOutAmount);
    setScore(cashOutAmount);
    setGameStatus('walk_away');
    setShowWalkAwayConfirm(false);
  };

  const handleUseLifeline = (type: 'fifty' | 'ustadz' | 'jamaah') => {
    soundEffects.playLifeline();
    if (type === 'fifty') {
      setLifelines((prev) => ({ ...prev, fiftyFifty: false }));
      const correct = currentQuestion.correctAnswerIndex;
      const wrongIdxs = [0, 1, 2, 3].filter((i) => i !== correct);
      const keepWrong = wrongIdxs[Math.floor(Math.random() * wrongIdxs.length)];
      const disabled = [0, 1, 2, 3].filter((i) => i !== correct && i !== keepWrong);
      setDisabledOptionIndices(disabled);
      setActiveLifelineType('fifty');
    } else if (type === 'ustadz') {
      setLifelines((prev) => ({ ...prev, ustadz: false }));
      setUstadzAdviceText(currentQuestion.hintUstadz);
      setActiveLifelineType('ustadz');
    } else if (type === 'jamaah') {
      setLifelines((prev) => ({ ...prev, jamaah: false }));
      const correct = currentQuestion.correctAnswerIndex;
      const percents = [0, 0, 0, 0];
      percents[correct] = 60 + Math.floor(Math.random() * 20);
      let rem = 100 - percents[correct];
      const wrongIdxs = [0, 1, 2, 3].filter((i) => i !== correct);
      wrongIdxs.forEach((w, idx) => {
        if (idx === wrongIdxs.length - 1) percents[w] = rem;
        else {
          const p = Math.floor(Math.random() * (rem / 2));
          percents[w] = p;
          rem -= p;
        }
      });
      setJamaahPercents(percents);
      setActiveLifelineType('jamaah');
    }
  };

  const handleRestartSolo = () => {
    soundEffects.playClick();
    setQuestions(getQuestionsForGameSession());
    setCurrentLevelIndex(0);
    setScore(0);
    setReachedLevels([]);
    setLifelines({ fiftyFifty: true, ustadz: true, jamaah: true });
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setShowResults(false);
    setDisabledOptionIndices([]);
    setGameStatus('playing');
    setGuaranteedPrize(0);
  };

  const previousLevelPrize = currentLevelIndex > 0 ? LEVEL_PRIZES[currentLevelIndex - 1].prize : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      
      {/* Top Game Controls Bar: Home & Ambil Uang */}
      <div className="bg-[#F4F1DE] border-2 border-[#3D405B] rounded-2xl p-3 shadow-[3px_3px_0px_#3D405B] flex flex-wrap items-center justify-between gap-2 text-[#3D405B]">
        
        {/* Home / Exit Button */}
        <button
          onClick={() => {
            soundEffects.playClick();
            if (gameStatus === 'playing' && currentLevelIndex > 0) {
              setShowExitHomeConfirm(true);
            } else if (onGoHome) {
              onGoHome();
            }
          }}
          className="px-3.5 py-1.5 bg-[#FDFCF0] hover:bg-[#E07A5F] hover:text-white text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Home / Menu Utama</span>
        </button>

        {/* Level & Titik Aman Info Badge */}
        <div className="flex items-center gap-2 text-xs font-black">
          <span className="bg-[#81B29A] px-2.5 py-1 rounded-xl border border-[#3D405B] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3D405B]" />
            Titik Aman: {currentQuestion.level >= 10 ? 'Level 10 (250 Juta)' : currentQuestion.level >= 5 ? 'Level 5 (5 Juta)' : 'Belum Ada'}
          </span>
        </div>

        {/* Ambil Uang / Menyerah Button (Available during active play before answering) */}
        {gameStatus === 'playing' && !isAnswerSubmitted && (
          <button
            onClick={() => {
              soundEffects.playClick();
              setShowWalkAwayConfirm(true);
            }}
            className="px-3.5 py-1.5 bg-[#F2CC8F] hover:bg-[#81B29A] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center gap-1.5 transition-all cursor-pointer"
            title="Ambil uang hadiah yang didapat dan akhiri permainan dengan aman"
          >
            <DollarSign className="w-4 h-4 text-[#3D405B]" />
            <span>Ambil Uang & Menyerah ({previousLevelPrize.toLocaleString('id-ID')} Poin)</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal for Walk Away */}
      {showWalkAwayConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FDFCF0] border-4 border-[#3D405B] rounded-3xl p-6 max-w-md w-full shadow-[6px_6px_0px_#3D405B] space-y-4 text-[#3D405B] text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F2CC8F] border-2 border-[#3D405B] flex items-center justify-center text-2xl mx-auto">
              💰
            </div>
            <h3 className="text-lg font-black uppercase">Ambil Uang & Amankan Hadiah?</h3>
            <p className="text-xs font-bold leading-relaxed text-[#3D405B]/80">
              Kamu akan menghentikan permainan sekarang dan mengunci uang hadiah sebesar{' '}
              <strong className="text-[#E07A5F] text-sm block font-mono font-black pt-1">
                {previousLevelPrize.toLocaleString('id-ID')} Poin Berkah
              </strong>
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowWalkAwayConfirm(false)}
                className="flex-1 py-2.5 bg-[#F4F1DE] hover:bg-gray-200 text-[#3D405B] font-extrabold text-xs rounded-xl border-2 border-[#3D405B] cursor-pointer"
              >
                Lanjut Main
              </button>
              <button
                onClick={handleWalkAway}
                className="flex-1 py-2.5 bg-[#E07A5F] text-white font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer"
              >
                Ya, Ambil Uang!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Exit Home */}
      {showExitHomeConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FDFCF0] border-4 border-[#3D405B] rounded-3xl p-6 max-w-md w-full shadow-[6px_6px_0px_#3D405B] space-y-4 text-[#3D405B] text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#E07A5F] text-white border-2 border-[#3D405B] flex items-center justify-center text-2xl mx-auto">
              🏠
            </div>
            <h3 className="text-lg font-black uppercase">Keluar ke Menu Utama?</h3>
            <p className="text-xs font-bold leading-relaxed text-[#3D405B]/80">
              Sesi permainan solo saat ini akan dihentikan.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowExitHomeConfirm(false)}
                className="flex-1 py-2.5 bg-[#F4F1DE] text-[#3D405B] font-extrabold text-xs rounded-xl border-2 border-[#3D405B] cursor-pointer"
              >
                Kembali Bermain
              </button>
              <button
                onClick={() => {
                  setShowExitHomeConfirm(false);
                  if (onGoHome) onGoHome();
                }}
                className="flex-1 py-2.5 bg-[#E07A5F] text-white font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GUGUR SCREEN OVERLAY */}
      {gameStatus === 'eliminated' && (
        <div className="bg-[#FDFCF0] border-4 border-[#3D405B] p-6 sm:p-8 rounded-3xl shadow-[6px_6px_0px_#3D405B] text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 bg-[#E07A5F] text-white rounded-2xl border-2 border-[#3D405B] flex items-center justify-center text-3xl mx-auto shadow-[3px_3px_0px_#3D405B]">
            💥
          </div>
          <div className="space-y-2">
            <span className="bg-[#E07A5F] text-white font-black px-3 py-1 rounded-full text-xs uppercase border border-[#3D405B]">
              GUGUR / TERELIMINASI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3D405B] uppercase font-serif">
              JAWABAN KURANG TEPAT!
            </h2>
            <p className="text-xs font-bold text-[#3D405B]/80 max-w-md mx-auto leading-relaxed">
              Sesuai aturan Jutawan Zakat, jawaban yang salah mengakibatkan kamu gugur. Namun kamu berhak membawa pulang hadiah dari <strong className="text-[#E07A5F]">Titik Aman Terakhir</strong>!
            </p>
          </div>

          {/* Guaranteed Safe Haven Prize Card */}
          <div className="bg-[#F4F1DE] border-2 border-[#3D405B] p-4 rounded-2xl max-w-sm mx-auto shadow-[2px_2px_0px_#3D405B] space-y-1">
            <span className="text-[10px] font-black uppercase text-[#3D405B]/70 block">Hadiah Titik Aman Terkunci</span>
            <div className="text-xl sm:text-2xl font-black font-mono text-[#E07A5F]">
              {guaranteedPrize.toLocaleString('id-ID')} Poin
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartSolo}
              className="px-5 py-2.5 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Coba Lagi (Mulai Ulang)
            </button>

            <button
              onClick={() => onOpenCertificate(guaranteedPrize, currentQuestion.level)}
              className="px-5 py-2.5 bg-[#F2CC8F] hover:bg-[#81B29A] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <Award className="w-4 h-4" /> Lihat Sertifikat
            </button>

            {onGoHome && (
              <button
                onClick={onGoHome}
                className="px-5 py-2.5 bg-[#F4F1DE] hover:bg-gray-200 text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] cursor-pointer flex items-center gap-1.5"
              >
                <Home className="w-4 h-4" /> Kembali ke Home
              </button>
            )}
          </div>
        </div>
      )}

      {/* WALK AWAY SCREEN OVERLAY */}
      {gameStatus === 'walk_away' && (
        <div className="bg-[#FDFCF0] border-4 border-[#3D405B] p-6 sm:p-8 rounded-3xl shadow-[6px_6px_0px_#3D405B] text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 bg-[#F2CC8F] text-[#3D405B] rounded-2xl border-2 border-[#3D405B] flex items-center justify-center text-3xl mx-auto shadow-[3px_3px_0px_#3D405B]">
            🏆
          </div>
          <div className="space-y-2">
            <span className="bg-[#81B29A] text-[#3D405B] font-black px-3 py-1 rounded-full text-xs uppercase border border-[#3D405B]">
              KEPUTUSAN BIJAK
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3D405B] uppercase font-serif">
              KAMU MEMBAWA PULANG HADIAH!
            </h2>
            <p className="text-xs font-bold text-[#3D405B]/80 max-w-md mx-auto leading-relaxed">
              Selamat! Kamu memilih untuk mengamankan poin hadiah yang telah kamu kumpulkan dalam petualangan ini!
            </p>
          </div>

          <div className="bg-[#F4F1DE] border-2 border-[#3D405B] p-4 rounded-2xl max-w-sm mx-auto shadow-[2px_2px_0px_#3D405B] space-y-1">
            <span className="text-[10px] font-black uppercase text-[#3D405B]/70 block">Total Poin Diamankan</span>
            <div className="text-xl sm:text-2xl font-black font-mono text-[#E07A5F]">
              {guaranteedPrize.toLocaleString('id-ID')} Poin
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartSolo}
              className="px-5 py-2.5 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Main Lagi
            </button>

            <button
              onClick={() => onOpenCertificate(guaranteedPrize, currentQuestion.level)}
              className="px-5 py-2.5 bg-[#F2CC8F] hover:bg-[#81B29A] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <Award className="w-4 h-4" /> Lihat Sertifikat
            </button>

            {onGoHome && (
              <button
                onClick={onGoHome}
                className="px-5 py-2.5 bg-[#F4F1DE] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] cursor-pointer flex items-center gap-1.5"
              >
                <Home className="w-4 h-4" /> Kembali ke Home
              </button>
            )}
          </div>
        </div>
      )}

      {/* ACTIVE PLAYING VIEW */}
      {gameStatus === 'playing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Area: Millionaire Question Arena (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <QuestionCard
              question={currentQuestion}
              timeLimit={30}
              lifelines={lifelines}
              disabledOptionIndices={disabledOptionIndices}
              selectedOptionIndex={selectedOptionIndex}
              isAnswerSubmitted={isAnswerSubmitted}
              showResults={showResults}
              onSelectOption={handleSelectOption}
              onUseLifeline={handleUseLifeline}
              onOpenCalculator={onOpenCalculator}
            />

            {/* Action Controls when answer submitted and correct */}
            {showResults && (
              <div className="bg-[#FDFCF0] border-2 border-[#3D405B] p-4 rounded-3xl shadow-[4px_4px_0px_#3D405B] flex flex-wrap items-center justify-between gap-3 animate-fade-in text-[#3D405B]">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {selectedOptionIndex === currentQuestion.correctAnswerIndex ? '🎉' : '💡'}
                  </span>
                  <div>
                    <div className="text-xs font-black text-[#3D405B]">
                      {selectedOptionIndex === currentQuestion.correctAnswerIndex
                        ? 'Jawabanmu Tepat Sekali!'
                        : 'Tetap Semangat & Pelajari Penjelasannya!'}
                    </div>
                    <div className="text-[10px] font-bold text-[#3D405B]/80">
                      {selectedOptionIndex === currentQuestion.correctAnswerIndex
                        ? 'Kamu berhasil menambah Poin Berkah Jutawan Zakat!'
                        : 'Ingat kembali syarat dan rumus zakatnya ya.'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {selectedOptionIndex === currentQuestion.correctAnswerIndex ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#E07A5F] bg-[#F2CC8F]/60 px-3 py-1.5 rounded-xl border border-[#3D405B] animate-pulse">
                        ⏰ Otomatis Lanjut ({autoAdvanceSeconds}s)
                      </span>
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2.5 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs sm:text-sm rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        {currentLevelIndex + 1 < questions.length ? 'Lanjut Sekarang ➔' : 'Selesai & Lihat Sertifikat 🏆'}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

          </div>

          {/* Right Area: Millionaire Prize Ladder (4 Cols) */}
          <div className="lg:col-span-4 h-[480px] lg:h-auto">
            <MillionaireBoard
              currentLevel={currentQuestion.level}
              reachedLevels={reachedLevels}
            />
          </div>

        </div>
      )}

    </div>
  );
};

