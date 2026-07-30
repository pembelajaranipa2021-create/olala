import React, { useState, useEffect } from 'react';
import { RoomState, Question, LifelineState, LeaderboardEntry } from '../types/zakat';
import { QuestionCard } from './QuestionCard';
import { MillionaireBoard } from './MillionaireBoard';
import { soundEffects } from '../utils/soundEffects';
import { Users, Crown, Trophy, Sparkles, Send, CheckCircle2, Home } from 'lucide-react';

interface MultiplayerGameViewProps {
  room: RoomState;
  currentPlayerId: string;
  currentQuestion: Question;
  leaderboard: LeaderboardEntry[];
  onSubmitAnswer: (chosenOptionIndex: number, timeTaken: number) => void;
  onUseLifeline: (type: 'fifty' | 'ustadz' | 'jamaah') => void;
  onNextQuestion: () => void;
  onOpenCalculator: () => void;
  onSendChat: (text: string) => void;
  onRestartGame: () => void;
  onOpenCertificate: (score: number, level: number) => void;
  onGoHome?: () => void;
}

export const MultiplayerGameView: React.FC<MultiplayerGameViewProps> = ({
  room,
  currentPlayerId,
  currentQuestion,
  leaderboard,
  onSubmitAnswer,
  onUseLifeline,
  onNextQuestion,
  onOpenCalculator,
  onSendChat,
  onRestartGame,
  onOpenCertificate,
  onGoHome
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [disabledOptionIndices, setDisabledOptionIndices] = useState<number[]>([]);
  const [chatText, setChatText] = useState('');

  const currentPlayer = room.players[currentPlayerId];
  const isHost = currentPlayer?.isHost;
  const isAnswerSubmitted = currentPlayer?.currentAnswer !== undefined;
  const showResults = room.status === 'question_results' || room.status === 'game_over';

  const [multiAutoAdvanceSeconds, setMultiAutoAdvanceSeconds] = useState<number>(4);

  // Reset local state when question changes
  useEffect(() => {
    setSelectedOptionIndex(null);
    setDisabledOptionIndices([]);
    setMultiAutoAdvanceSeconds(4);
  }, [room.currentQuestionIndex]);

  // Host Auto Advance effect
  useEffect(() => {
    if (!isHost || room.status !== 'question_results') return;

    setMultiAutoAdvanceSeconds(4);
    const timer = setInterval(() => {
      setMultiAutoAdvanceSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onNextQuestion();
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isHost, room.status, room.currentQuestionIndex]);

  const handleSelectOption = (chosenIdx: number, timeTaken: number) => {
    if (currentPlayer?.isEliminated) return;
    setSelectedOptionIndex(chosenIdx);
    onSubmitAnswer(chosenIdx, timeTaken);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    onSendChat(chatText.trim());
    setChatText('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      
      {/* Top Session Progress Bar */}
      <div className="bg-[#F4F1DE] border-2 border-[#3D405B] rounded-2xl p-3 shadow-[3px_3px_0px_#3D405B] flex flex-wrap items-center justify-between text-[#3D405B] text-xs font-bold gap-2">
        <div className="flex items-center gap-2">
          {onGoHome && (
            <button
              onClick={() => {
                soundEffects.playClick();
                if (confirm('Keluar dari permainan multiplayer dan kembali ke Home?')) {
                  onGoHome();
                }
              }}
              className="px-3 py-1 bg-[#FDFCF0] hover:bg-[#E07A5F] hover:text-white text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] flex items-center gap-1 transition-all cursor-pointer shadow-[2px_2px_0px_#3D405B]"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </button>
          )}

          <span className="w-2.5 h-2.5 rounded-full bg-[#81B29A] animate-ping" />
          <span className="font-black text-[#E07A5F]">SERVER SYNC LIVE</span>
          <span className="text-[#3D405B]/80">• Room: {room.code}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-extrabold text-[#3D405B]">
            <Users className="w-3.5 h-3.5 text-[#E07A5F]" /> {Object.keys(room.players).length} Pemain
          </span>
          <span className="font-black text-[#3D405B] font-mono">
            Soal {room.currentQuestionIndex + 1} / 30
          </span>
        </div>
      </div>

      {/* Main Game Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Arena: Question Card + Controls (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <QuestionCard
            question={currentQuestion}
            timeLimit={room.timeLimit || 30}
            lifelines={currentPlayer?.lifelines || { fiftyFifty: true, ustadz: true, jamaah: true }}
            disabledOptionIndices={disabledOptionIndices}
            selectedOptionIndex={selectedOptionIndex}
            isAnswerSubmitted={isAnswerSubmitted}
            showResults={showResults}
            isEliminated={currentPlayer?.isEliminated}
            onSelectOption={handleSelectOption}
            onUseLifeline={onUseLifeline}
            onOpenCalculator={onOpenCalculator}
          />

          {/* Host Controls for Next Question */}
          {showResults && room.status === 'question_results' && (
            <div className="bg-[#FDFCF0] border-2 border-[#3D405B] p-4 rounded-3xl shadow-[4px_4px_0px_#3D405B] flex flex-wrap items-center justify-between gap-3 animate-fade-in text-[#3D405B]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <div>
                  <div className="text-xs font-black text-[#3D405B]">Hasil Ronde Ini Selesai!</div>
                  <div className="text-[10px] font-bold text-[#3D405B]/80">
                    {isHost ? `Otomatis berlanjut ke soal berikutnya dalam ${multiAutoAdvanceSeconds} detik.` : 'Menunggu soal berikutnya...'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#E07A5F] bg-[#F2CC8F]/60 px-3 py-1.5 rounded-xl border border-[#3D405B] animate-pulse">
                  ⏰ Auto Lanjut ({multiAutoAdvanceSeconds}s)
                </span>
                {isHost && (
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onNextQuestion();
                    }}
                    className="px-4 py-2 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs sm:text-sm rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer transition-all hover:scale-105"
                  >
                    Lanjut Sekarang ➔
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Game Over Screen Banner */}
          {room.status === 'game_over' && (
            <div className="bg-[#FDFCF0] text-[#3D405B] p-6 rounded-3xl shadow-[6px_6px_0px_#3D405B] text-center space-y-3 animate-fade-in border-4 border-[#3D405B]">
              <div className="text-4xl">👑</div>
              <h2 className="text-2xl font-black uppercase font-serif text-[#3D405B]">PERMAINAN MULTIPLAYER SELESAI!</h2>
              <p className="text-xs font-bold max-w-md mx-auto text-[#3D405B]/80">
                Selamat untuk seluruh Pahlawan Zakat yang telah berjuang dan belajar zakat bersama!
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onOpenCertificate(currentPlayer?.score || 0, currentPlayer?.levelReached || 1)}
                  className="px-5 py-2.5 bg-[#F2CC8F] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] hover:scale-105 transition-all cursor-pointer"
                >
                  📜 Lihat Sertifikat Jutawan Zakat
                </button>

                {isHost && (
                  <button
                    onClick={onRestartGame}
                    className="px-5 py-2.5 bg-[#81B29A] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] hover:scale-105 transition-all cursor-pointer"
                  >
                    🔄 Mainkan Sesi Baru
                  </button>
                )}

                {onGoHome && (
                  <button
                    onClick={onGoHome}
                    className="px-5 py-2.5 bg-[#F4F1DE] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] hover:scale-105 transition-all cursor-pointer"
                  >
                    <Home className="w-4 h-4 inline mr-1" /> Home
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Area: Millionaire Board + Live Room Leaderboard (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="h-[320px]">
            <MillionaireBoard
              currentLevel={currentQuestion.level}
              reachedLevels={Object.keys(currentPlayer?.answersHistory || {}).map(Number)}
            />
          </div>

          {/* Live Mini Leaderboard Box */}
          <div className="bg-[#FDFCF0] border-2 border-[#3D405B] rounded-2xl p-3.5 shadow-[4px_4px_0px_#3D405B] space-y-2 text-[#3D405B]">
            <h4 className="font-black text-[#3D405B] text-xs flex items-center justify-between border-b-2 border-[#3D405B]/20 pb-1.5">
              <span className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-[#E07A5F]" /> Peringkat Sesi Live
              </span>
              <span className="text-[10px] text-[#3D405B]/80 font-bold">{leaderboard.length} Pemain</span>
            </h4>

            <div className="space-y-1.5 max-h-[180px] overflow-y-auto custom-scrollbar pr-1">
              {leaderboard.map((entry) => (
                <div
                  key={entry.playerId}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold border-2 ${
                    entry.playerId === currentPlayerId
                      ? 'bg-[#F2CC8F] border-[#3D405B]'
                      : 'bg-[#F4F1DE] border-[#3D405B]/40'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-black text-[#E07A5F] font-mono w-4">#{entry.rank}</span>
                    <span>{entry.avatar}</span>
                    <span className="truncate text-[#3D405B]">{entry.name}</span>
                  </div>
                  <span className="font-mono font-black text-[#E07A5F] text-xs">
                    {entry.score.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

