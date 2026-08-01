import React, { useState } from 'react';
import { RoomState, Player } from '../types/zakat';
import { Users, Copy, Check, Play, Send, ShieldCheck, Crown, LogOut, Home } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface RoomLobbyProps {
  room: RoomState;
  currentPlayerId: string;
  onToggleReady: () => void;
  onStartGame: () => void;
  onSendChat: (text: string) => void;
  onLeaveRoom?: () => void;
}

export const AVATAR_OPTIONS = [
  'https://lh3.googleusercontent.com/d/1HKwN57J25Ny7DquzSu9ItbLPnTyIGjpE',
  'https://lh3.googleusercontent.com/d/1NHdyVcEPAmZEZmjBQiwI7f5aQ5uGYrYP',
  'https://lh3.googleusercontent.com/d/17UFPWhUkW4OtXQRUkQ8Vv53QE4j01qMx',
  'https://lh3.googleusercontent.com/d/1NuD_aym1rDpvj_0vz9zP4dHr6nEMKiOq',
  'https://lh3.googleusercontent.com/d/1KmwJ1gGdkB_fV9MvIe5NuMTGgR3mVvYj',
  'https://lh3.googleusercontent.com/d/12Q8tB0hWMn0Zy1gvLo6v_sH-0yduZKR7',
  'https://lh3.googleusercontent.com/d/1sbtdj6rxeLAemeEiL8Y70bUBq6XUXYxN',
  'https://lh3.googleusercontent.com/d/1UnvzdBfbTsgk3aKjWn-G4_sZT3Vj9SBQ',
  'https://lh3.googleusercontent.com/d/1Zr6jJwXHprZhdtIwK2lEz9Doc2XlaiHa',
  'https://lh3.googleusercontent.com/d/1PVexU5IamGUOX64x5hvin5ENCmSTWp_S'
];

export const RoomLobby: React.FC<RoomLobbyProps> = ({
  room,
  currentPlayerId,
  onToggleReady,
  onStartGame,
  onSendChat,
  onLeaveRoom
}) => {
  const [chatInput, setChatInput] = useState('');
  const [copiedPIN, setCopiedPIN] = useState(false);

  const playersList = Object.values(room.players) as Player[];
  const currentPlayer = room.players[currentPlayerId];
  const isHost = currentPlayer?.isHost;

  const handleCopyPIN = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(room.code);
    setCopiedPIN(true);
    setTimeout(() => setCopiedPIN(false), 2000);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendChat(chatInput.trim());
    setChatInput('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 text-[#3D405B]">
      
      {/* Lobby Header Card */}
      <div className="bg-[#FDFCF0] border-4 border-[#3D405B] rounded-3xl p-5 sm:p-6 shadow-[6px_6px_0px_#3D405B] flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#81B29A] text-[#3D405B] border border-[#3D405B] inline-block">
            Lobi Multiplayer: {room.gameType === 'adventure' ? 'Zakat Adventure' : 'Jutawan Zakat'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#3D405B] font-serif">{room.name}</h2>
          <p className="text-xs text-[#3D405B]/80 font-bold">
            Tunggu peserta kawan-kawanmu bergabung lalu tekan Siap / Mulai!
          </p>
        </div>

        {/* PIN Copy Badge & Exit Button */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center gap-3 bg-[#F2CC8F] border-2 border-[#3D405B] px-4 py-2 rounded-2xl shadow-[2px_2px_0px_#3D405B]">
            <div>
              <div className="text-[10px] text-[#3D405B]/80 font-black uppercase">Kode PIN Ruangan</div>
              <div className="text-2xl font-black text-[#E07A5F] font-mono tracking-widest">{room.code}</div>
            </div>
            <button
              onClick={handleCopyPIN}
              className="p-2 rounded-xl bg-[#FDFCF0] hover:bg-[#81B29A] border-2 border-[#3D405B] font-bold transition-all cursor-pointer shadow-[2px_2px_0px_#3D405B]"
              title="Salin Kode PIN"
            >
              {copiedPIN ? <Check className="w-5 h-5 text-[#81B29A]" /> : <Copy className="w-5 h-5 text-[#3D405B]" />}
            </button>
          </div>

          {onLeaveRoom && (
            <button
              onClick={() => {
                soundEffects.playClick();
                if (confirm('Keluar dari lobi ruangan multiplayer ini?')) {
                  onLeaveRoom();
                }
              }}
              className="px-3.5 py-3 bg-[#E07A5F] hover:bg-rose-700 text-white font-black text-xs rounded-2xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
              title="Keluar dari Lobi"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          )}
        </div>

      </div>

      {/* Main Grid: Player Badges + Live Chat */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left Column: Player Roster & Ready Controls (7 Cols) */}
        <div className="md:col-span-7 bg-[#F4F1DE] border-2 border-[#3D405B] rounded-3xl p-5 shadow-[4px_4px_0px_#3D405B] space-y-4 flex flex-col justify-between">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-2 border-[#3D405B]/20 pb-2">
              <h3 className="font-black text-[#3D405B] text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-[#E07A5F]" /> Peserta di Server ({playersList.length})
              </h3>
              <span className="text-[10px] font-extrabold text-[#3D405B] bg-[#FDFCF0] px-2.5 py-0.5 rounded-full border border-[#3D405B]">
                Maksimal 1000 Orang
              </span>
            </div>

            {/* Players Roster Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[280px] overflow-y-auto custom-scrollbar pr-1">
              {playersList.map((player) => (
                <div
                  key={player.id}
                  className={`p-3 rounded-2xl border-2 border-[#3D405B] flex items-center justify-between transition-all shadow-[2px_2px_0px_#3D405B] ${
                    player.id === currentPlayerId
                      ? 'bg-[#F2CC8F]'
                      : 'bg-[#FDFCF0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="p-1 bg-[#F4F1DE] rounded-xl border border-[#3D405B]">
                      <img src={player.avatar} alt="avatar" className="w-8 h-8 object-contain" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-[#3D405B] truncate flex items-center gap-1">
                        {player.name}
                        {player.isHost && (
                          <Crown className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" title="Tuan Rumah" />
                        )}
                      </div>
                      <div className="text-[10px] font-bold text-[#3D405B]/80">
                        {player.isHost ? 'Tuan Rumah (Host)' : player.isReady ? '✅ Siap!' : '⏳ Menunggu'}
                      </div>
                    </div>
                  </div>

                  {/* Status Tag */}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase border border-[#3D405B] ${
                      player.isReady || player.isHost
                        ? 'bg-[#81B29A] text-[#3D405B]'
                        : 'bg-[#E07A5F] text-white'
                    }`}
                  >
                    {player.isHost ? 'HOST' : player.isReady ? 'SIAP' : 'BELUM'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Control Button */}
          <div className="pt-3 border-t-2 border-[#3D405B]/20">
            {isHost ? (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onStartGame();
                }}
                className="w-full py-3.5 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-sm rounded-2xl border-2 border-[#3D405B] shadow-[3px_3px_0px_#3D405B] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-[#3D405B]" /> MULAI PERMAINAN SEKARANG!
              </button>
            ) : (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onToggleReady();
                }}
                className={`w-full py-3.5 rounded-2xl font-black text-sm border-2 border-[#3D405B] shadow-[3px_3px_0px_#3D405B] flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  currentPlayer?.isReady
                    ? 'bg-[#81B29A] text-[#3D405B]'
                    : 'bg-[#F2CC8F] text-[#3D405B] hover:bg-[#81B29A]'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                {currentPlayer?.isReady ? 'BATALKAN SIAP' : 'SAYA SIAP BERMAIN!'}
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Live Lobby Chat (5 Cols) */}
        <div className="md:col-span-5 bg-[#F4F1DE] border-2 border-[#3D405B] rounded-3xl p-4 shadow-[4px_4px_0px_#3D405B] flex flex-col h-[380px]">
          <h3 className="font-black text-[#3D405B] text-xs border-b-2 border-[#3D405B]/20 pb-2 mb-2 flex items-center gap-1.5">
            💬 Obrolan & Reaksi Lobi
          </h3>

          {/* Chat Messages Box */}
          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1 mb-2">
            {room.chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-xl text-xs border border-[#3D405B]/30 ${
                  msg.type === 'system'
                    ? 'bg-[#F2CC8F]/50 text-[#3D405B] text-[11px] text-center font-bold italic'
                    : 'bg-[#FDFCF0] text-[#3D405B]'
                }`}
              >
                {msg.type !== 'system' && (
                  <div className="font-black text-[#E07A5F] text-[10px] flex items-center gap-1">
                    {msg.avatar ? <img src={msg.avatar} alt="avatar" className="w-3 h-3 object-contain inline-block" /> : null} {msg.sender}:
                  </div>
                )}
                <div className="mt-0.5 font-semibold">{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Chat Form Input */}
          <form onSubmit={handleChatSubmit} className="flex gap-1.5 pt-2 border-t-2 border-[#3D405B]/20">
            <input
              type="text"
              placeholder="Tulis pesan..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl px-3 py-1.5 text-xs text-[#3D405B] font-bold placeholder-[#3D405B]/50 focus:outline-none focus:border-[#E07A5F]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] border-2 border-[#3D405B] rounded-xl font-black transition-all cursor-pointer shadow-[2px_2px_0px_#3D405B]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
