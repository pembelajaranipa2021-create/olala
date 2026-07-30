import React from 'react';
import { Home, Volume2, VolumeX, BookOpen, Calculator, Trophy, Users, Sparkles, LogOut } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface NavbarProps {
  playerName: string;
  playerAvatar: string;
  totalScore: number;
  roomCode?: string;
  isMultiplayer: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenKamus: () => void;
  onOpenCalculator: () => void;
  onOpenLeaderboard: () => void;
  onGoHome?: () => void;
  onLeaveRoom?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  playerName,
  playerAvatar,
  totalScore,
  roomCode,
  isMultiplayer,
  soundEnabled,
  onToggleSound,
  onOpenKamus,
  onOpenCalculator,
  onOpenLeaderboard,
  onGoHome,
  onLeaveRoom
}) => {
  return (
    <header className="bg-[#81B29A] border-b-4 border-[#3D405B] text-[#3D405B] sticky top-0 z-40 px-3 py-2.5 sm:px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Brand Logo & Home Button */}
        <div className="flex items-center gap-2">
          {onGoHome && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onGoHome();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FDFCF0] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs sm:text-sm rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] transition-all hover:scale-105 cursor-pointer"
              title="Kembali ke Menu Utama (Home)"
            >
              <Home className="w-4 h-4 text-[#E07A5F]" />
              <span className="font-black">Home</span>
            </button>
          )}

          <div
            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => {
              if (onGoHome) {
                soundEffects.playClick();
                onGoHome();
              }
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-[#F2CC8F] border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center justify-center text-xl shrink-0">
              🕌
            </div>
            <div>
              <h1 className="font-black text-base sm:text-lg text-[#3D405B] tracking-wide flex items-center gap-1.5 leading-tight">
                PAHLAWAN ZAKAT <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F2CC8F] text-[#3D405B] border border-[#3D405B] font-black uppercase">NUSANTARA</span>
              </h1>
              <p className="text-[10px] text-[#3D405B]/80 font-bold hidden sm:block">
                Petualangan Edukasi & Kuis Zakat
              </p>
            </div>
          </div>
        </div>

        {/* Room Code Badge (If Multiplayer) */}
        {isMultiplayer && roomCode && (
          <div className="flex items-center gap-1.5 bg-[#FDFCF0] border-2 border-[#3D405B] px-3 py-1 rounded-xl text-xs font-bold text-[#3D405B] shadow-[2px_2px_0px_#3D405B]">
            <Users className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>PIN:</span>
            <span className="text-[#E07A5F] font-mono text-sm font-black">{roomCode}</span>
          </div>
        )}

        {/* Middle Navigation Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenKamus();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FDFCF0] hover:bg-[#F2CC8F] text-xs font-bold text-[#3D405B] border-2 border-[#3D405B] transition-all cursor-pointer shadow-[2px_2px_0px_#3D405B]"
            title="Kamus Zakat & Edukasi"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#3D405B]" />
            <span className="hidden md:inline">Kamus Zakat</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenCalculator();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FDFCF0] hover:bg-[#F2CC8F] text-xs font-bold text-[#3D405B] border-2 border-[#3D405B] transition-all cursor-pointer shadow-[2px_2px_0px_#3D405B]"
            title="Simulator Hitung Zakat"
          >
            <Calculator className="w-3.5 h-3.5 text-[#3D405B]" />
            <span className="hidden md:inline">Simulator</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#F2CC8F] hover:bg-[#E07A5F] hover:text-white text-xs font-bold text-[#3D405B] border-2 border-[#3D405B] transition-all cursor-pointer shadow-[2px_2px_0px_#3D405B]"
            title="Papan Peringkat"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Peringkat</span>
          </button>
        </div>

        {/* Right Controls: Sound, Player Profile & Leave/Exit Button */}
        <div className="flex items-center gap-2">
          {/* Audio Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 sm:p-2 rounded-xl border-2 border-[#3D405B] transition-all cursor-pointer shadow-[2px_2px_0px_#3D405B] ${
              soundEnabled
                ? 'bg-[#F2CC8F] text-[#3D405B]'
                : 'bg-[#FDFCF0] text-[#3D405B]/50'
            }`}
            title={soundEnabled ? 'Matikan Suara' : 'Aktifkan Suara'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Player Badge */}
          <div className="flex items-center gap-2 bg-[#FDFCF0] border-2 border-[#3D405B] px-2.5 py-1 rounded-xl shadow-[2px_2px_0px_#3D405B]">
            <span className="text-xl leading-none">{playerAvatar}</span>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-[#3D405B] max-w-[80px] sm:max-w-[100px] truncate leading-tight">
                {playerName}
              </span>
              <span className="text-[10px] text-[#E07A5F] font-mono font-black flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-[#F2CC8F] fill-[#F2CC8F]" />
                {totalScore.toLocaleString('id-ID')} Poin
              </span>
            </div>
          </div>

          {/* Exit / Keluar Button */}
          {onLeaveRoom && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onLeaveRoom();
              }}
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-[#E07A5F] text-white hover:bg-rose-700 border-2 border-[#3D405B] rounded-xl font-black transition-all cursor-pointer shadow-[2px_2px_0px_#3D405B]"
              title="Keluar dari sesi / ruangan"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

