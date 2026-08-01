import React from 'react';
import { X, Trophy, Medal, Crown, Flame, CheckCircle2, Sparkles } from 'lucide-react';
import { LeaderboardEntry } from '../types/zakat';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaderboard: LeaderboardEntry[];
  currentUserId?: string;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  leaderboard,
  currentUserId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-emerald-950 border border-emerald-600/60 rounded-3xl w-full max-w-xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 px-5 py-4 text-emerald-950 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-amber-300 flex items-center justify-center font-black text-xl">
              🏆
            </div>
            <div>
              <h2 className="font-extrabold text-lg flex items-center gap-2 tracking-wide">
                Papan Peringkat Sesi Permainan
              </h2>
              <p className="text-xs font-semibold opacity-90">Juara & Pahlawan Zakat Terbaik</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-950 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 overflow-y-auto custom-scrollbar space-y-3 flex-1">
          {leaderboard.length === 0 ? (
            <div className="text-center py-10 text-emerald-300/80 space-y-2">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto opacity-50" />
              <p className="text-sm font-semibold">Belum ada skor tercatat dalam sesi ini.</p>
              <p className="text-xs text-emerald-400/60">Mulailah menjawab kuis untuk masuk ke papan peringkat!</p>
            </div>
          ) : (
            leaderboard.map((entry) => {
              const isCurrentUser = entry.playerId === currentUserId;
              const isTop1 = entry.rank === 1;
              const isTop2 = entry.rank === 2;
              const isTop3 = entry.rank === 3;

              return (
                <div
                  key={entry.playerId}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 ${
                    isCurrentUser
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg scale-[1.01]'
                      : 'bg-emerald-900/40 border-emerald-700/50 hover:bg-emerald-900/60'
                  }`}
                >
                  {/* Rank Badge & Player Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0">
                      {isTop1 ? (
                        <span className="text-2xl" title="Juara 1">🥇</span>
                      ) : isTop2 ? (
                        <span className="text-2xl" title="Juara 2">🥈</span>
                      ) : isTop3 ? (
                        <span className="text-2xl" title="Juara 3">🥉</span>
                      ) : (
                        <span className="bg-emerald-900 text-emerald-300 w-full h-full rounded-xl flex items-center justify-center border border-emerald-700">
                          #{entry.rank}
                        </span>
                      )}
                    </div>

                    <span className="bg-emerald-950 p-1 rounded-xl border border-emerald-800">
                      <img src={entry.avatar} alt="avatar" className="w-8 h-8 object-contain" />
                    </span>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm text-emerald-100 max-w-[140px] sm:max-w-[180px] truncate">
                          {entry.name}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[9px] bg-amber-400 text-emerald-950 px-1.5 py-0.2 rounded font-black uppercase">
                            Kamu
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-emerald-300/80">
                        <span>Lvl {entry.levelReached}/15</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {entry.correctCount} Benar
                        </span>
                        {entry.streak > 1 && (
                          <span className="flex items-center gap-0.5 text-amber-300 font-bold">
                            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> {entry.streak}x
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-base font-black text-amber-300 font-mono">
                      {entry.score.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[10px] text-emerald-400/80 uppercase font-bold">Total Poin</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="bg-emerald-900/90 px-5 py-3 border-t border-emerald-700/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
