import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SoloGameView } from './components/SoloGameView';
import { MultiplayerGameView } from './components/MultiplayerGameView';
import { RoomLobby, AVATAR_OPTIONS } from './components/RoomLobby';
import { InteractiveCalculatorModal } from './components/InteractiveCalculatorModal';
import { KamusZakatModal } from './components/KamusZakatModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { LifelineModal } from './components/LifelineModal';
import { CertificateModal } from './components/CertificateModal';
import { LearningHubModal } from './components/LearningHubModal';
import { AdventureGameView } from './components/AdventureGameView';
import { InteractiveQuizView } from './components/InteractiveQuizView';
import { RoomState, Question, LeaderboardEntry } from './types/zakat';
import { soundEffects } from './utils/soundEffects';
import { Play, Users, BookOpen, Calculator, Sparkles, Trophy, GraduationCap, Radio, ArrowRight, Video } from 'lucide-react';

export default function App() {
  // Player Profile State
  const [playerName, setPlayerName] = useState<string>('');
  const [playerAvatar, setPlayerAvatar] = useState<string>('https://lh3.googleusercontent.com/d/1HKwN57J25Ny7DquzSu9ItbLPnTyIGjpE');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // App Screen Mode State
  const [gameMode, setGameMode] = useState<'landing' | 'solo' | 'lobby' | 'multiplayer' | 'adventure_solo' | 'adventure_multiplayer' | 'interactive_quiz'>('landing');

  // Multiplayer Socket State
  const [roomCodeInput, setRoomCodeInput] = useState<string>('');
  const [roomNameInput, setRoomNameInput] = useState<string>('');
  const [currentRoom, setCurrentRoom] = useState<RoomState | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Live active rooms from server
  const [liveServerRooms, setLiveServerRooms] = useState<any[]>([]);

  const socketRef = useRef<WebSocket | null>(null);

  // Modals state
  const [isLearningHubOpen, setIsLearningHubOpen] = useState<boolean>(false);
  const [learningHubTab, setLearningHubTab] = useState<'kamus' | 'materi' | 'simulator'>('materi');

  const [isKamusOpen, setIsKamusOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [pendingRoomType, setPendingRoomType] = useState<'millionaire' | 'adventure' | 'interactive_quiz' | null>(null);

  // Poll active live rooms on landing screen
  useEffect(() => {
    if (gameMode !== 'landing') return;

    const fetchLiveRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        if (res.ok) {
          const data = await res.json();
          setLiveServerRooms(data);
        }
      } catch (e) {
        console.log('Error fetching live rooms:', e);
      }
    };

    fetchLiveRooms();
    const interval = setInterval(fetchLiveRooms, 3000);
    return () => clearInterval(interval);
  }, [gameMode]);
  
  // Active Lifeline modal state for multiplayer
  const [lifelineModalState, setLifelineModalState] = useState<{
    isOpen: boolean;
    type: 'ustadz' | 'jamaah' | 'fifty' | null;
    advice?: string;
    percents?: number[];
  }>({ isOpen: false, type: null });

  const [certData, setCertData] = useState<{ score: number; level: number }>({ score: 0, level: 1 });

  // Initialize WebSocket connection for Multiplayer
  const initWebSocket = () => {
    if (socketRef.current) return socketRef.current;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('⚡ Connected to Petualangan Jutawan Zakat WebSocket server');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { type, payload } = data;

        switch (type) {
          case 'ROOM_JOINED':
            setCurrentRoom(payload.room);
            setCurrentUserId(payload.playerId);
            setGameMode('lobby');
            break;

          case 'ROOM_UPDATE':
            setCurrentRoom(payload);
            break;

          case 'GAME_STARTED':
            setCurrentRoom(payload.room);
            setCurrentQuestion(payload.currentQuestion);
            if (payload.room.gameType === 'adventure') {
              setGameMode('adventure_multiplayer');
            } else if (payload.room.gameType === 'interactive_quiz') {
              setGameMode('interactive_quiz');
            } else {
              setGameMode('multiplayer');
            }
            soundEffects.playVictoryFanfare();
            break;

          case 'PLAYER_ANSWERED':
            setCurrentRoom(payload.room);
            break;

          case 'QUESTION_RESULTS':
            setCurrentRoom(payload.room);
            if (payload.leaderboard) setLeaderboard(payload.leaderboard);
            break;

          case 'NEXT_QUESTION':
            setCurrentRoom(payload.room);
            setCurrentQuestion(payload.currentQuestion);
            break;

          case 'GAME_OVER':
            setCurrentRoom(payload.room);
            if (payload.leaderboard) setLeaderboard(payload.leaderboard);
            break;

          case 'LIFELINE_USED':
            if (payload.lifelineType === 'ustadz') {
              setLifelineModalState({
                isOpen: true,
                type: 'ustadz',
                advice: currentQuestion?.hintUstadz || 'Perhatikan nisab dan kadarnya dengan cermat!'
              });
            } else if (payload.lifelineType === 'jamaah') {
              setLifelineModalState({
                isOpen: true,
                type: 'jamaah',
                percents: payload.resultData.percents
              });
            } else if (payload.lifelineType === 'fifty') {
              setLifelineModalState({
                isOpen: true,
                type: 'fifty'
              });
            }
            break;

          case 'NEW_CHAT':
            setCurrentRoom((prev) => prev ? { ...prev, chatMessages: [...prev.chatMessages, payload] } : null);
            break;

          case 'GAME_RESTARTED':
            setCurrentRoom(payload);
            setGameMode('lobby');
            break;

          case 'ERROR':
            setErrorMessage(payload);
            setTimeout(() => setErrorMessage(''), 4000);
            break;
        }
      } catch (err) {
        console.error('Socket parse error:', err);
      }
    };

    ws.onclose = () => {
      console.log('Socket connection closed');
    };

    socketRef.current = ws;
    return ws;
  };

  const handleCreateRoom = (gameType: 'millionaire' | 'adventure' | 'interactive_quiz' = 'millionaire') => {
    soundEffects.playClick();
    const ws = initWebSocket();
    const sendPayload = () => {
      ws.send(JSON.stringify({
        type: 'CREATE_ROOM',
        payload: {
          gameType,
          roomName: roomNameInput || `Petualangan ${playerName}`,
          hostName: playerName,
          avatar: playerAvatar
        }
      }));
    };

    if (ws.readyState === WebSocket.OPEN) {
      sendPayload();
    } else {
      ws.onopen = () => sendPayload();
    }
  };

  const handleCreateRoomClick = (gameType: 'millionaire' | 'adventure' | 'interactive_quiz') => {
    soundEffects.playClick();
    if (!playerName.trim()) {
      setErrorMessage('Tolong masukkan Nama Panggilanmu terlebih dahulu!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    if (isAdminLoggedIn) {
      handleCreateRoom(gameType);
    } else {
      setPendingRoomType(gameType);
      setShowAdminLogin(true);
    }
  };

  const handleAdminLogin = async () => {
    soundEffects.playClick();
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUsername, password: adminPassword })
      });
      const data = await res.json();
      
      if (data.success) {
        setIsAdminLoggedIn(true);
        setShowAdminLogin(false);
        setAdminUsername('');
        setAdminPassword('');
        if (pendingRoomType) {
          handleCreateRoom(pendingRoomType);
          setPendingRoomType(null);
        }
      } else {
        setErrorMessage('Username atau Password Admin salah!');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (e) {
      setErrorMessage('Terjadi kesalahan koneksi server.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      setErrorMessage('Tolong masukkan Nama Panggilanmu terlebih dahulu!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    if (!roomCodeInput.trim()) {
      setErrorMessage('Masukkan 6 digit kode PIN ruangan!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    soundEffects.playClick();
    const ws = initWebSocket();
    const sendPayload = () => {
      ws.send(JSON.stringify({
        type: 'JOIN_ROOM',
        payload: {
          roomCode: roomCodeInput.trim(),
          playerName,
          avatar: playerAvatar
        }
      }));
    };

    if (ws.readyState === WebSocket.OPEN) {
      sendPayload();
    } else {
      ws.onopen = () => sendPayload();
    }
  };

  const handleJoinRoomWithCode = (code: string) => {
    if (!playerName.trim()) {
      setErrorMessage('Tolong masukkan Nama Panggilanmu terlebih dahulu!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    setRoomCodeInput(code);
    soundEffects.playClick();
    const ws = initWebSocket();
    const sendPayload = () => {
      ws.send(JSON.stringify({
        type: 'JOIN_ROOM',
        payload: {
          roomCode: code.trim(),
          playerName,
          avatar: playerAvatar
        }
      }));
    };

    if (ws.readyState === WebSocket.OPEN) {
      sendPayload();
    } else {
      ws.onopen = () => sendPayload();
    }
  };

  const handleToggleReady = () => {
    if (socketRef.current && currentRoom) {
      socketRef.current.send(JSON.stringify({ type: 'TOGGLE_READY' }));
    }
  };

  const handleStartMultiplayerGame = () => {
    if (socketRef.current && currentRoom) {
      socketRef.current.send(JSON.stringify({ type: 'START_GAME' }));
    }
  };

  const handleSubmitAnswerMultiplayer = (chosenOptionIndex: number, timeTaken: number) => {
    if (socketRef.current && currentRoom) {
      socketRef.current.send(JSON.stringify({
        type: 'SUBMIT_ANSWER',
        payload: { chosenOptionIndex, timeTaken }
      }));
    }
  };

  const handleUseLifelineMultiplayer = (type: 'fifty' | 'ustadz' | 'jamaah') => {
    if (socketRef.current && currentRoom) {
      socketRef.current.send(JSON.stringify({
        type: 'USE_LIFELINE',
        payload: { lifelineType: type }
      }));
    }
  };

  const handleNextQuestionMultiplayer = () => {
    if (socketRef.current && currentRoom) {
      socketRef.current.send(JSON.stringify({ type: 'NEXT_QUESTION' }));
    }
  };

  const handleSendChatMultiplayer = (text: string) => {
    if (socketRef.current && currentRoom) {
      socketRef.current.send(JSON.stringify({
        type: 'SEND_CHAT',
        payload: { text, type: 'chat' }
      }));
    }
  };

  const handleRestartMultiplayer = () => {
    if (socketRef.current && currentRoom) {
      socketRef.current.send(JSON.stringify({ type: 'RESTART_GAME' }));
    }
  };

  const handleOpenCertificate = (score: number, level: number) => {
    setCertData({ score, level });
    setIsCertificateOpen(true);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.enabled = next;
  };

  const currentPlayerObj = currentRoom?.players[currentUserId];

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#3D405B] font-sans flex flex-col selection:bg-[#F2CC8F] selection:text-[#3D405B]">
      
      {/* Top Navigation Bar */}
      <Navbar
        playerName={playerName}
        playerAvatar={playerAvatar}
        totalScore={currentPlayerObj?.score || 0}
        roomCode={currentRoom?.code}
        isMultiplayer={gameMode === 'multiplayer' || gameMode === 'lobby'}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenKamus={() => {
          setLearningHubTab('kamus');
          setIsLearningHubOpen(true);
        }}
        onOpenCalculator={() => {
          setLearningHubTab('simulator');
          setIsLearningHubOpen(true);
        }}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onGoHome={() => {
          if (gameMode !== 'landing') {
            if (confirm('Kembali ke Menu Utama (Home)? Sesi permainan saat ini akan dihentikan.')) {
              setGameMode('landing');
              setCurrentRoom(null);
            }
          } else {
            setGameMode('landing');
          }
        }}
        onLeaveRoom={() => {
          if (confirm('Keluar dari ruangan permainan dan kembali ke Home?')) {
            setGameMode('landing');
            setCurrentRoom(null);
          }
        }}
      />

      {/* Error Toast Notification */}
      {errorMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-rose-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-2xl shadow-2xl border border-rose-400 animate-bounce">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 max-w-7xl mx-auto w-full text-[#3D405B]">
        
        {/* SCREEN 1: LANDING / PROFILE SETUP / MODE SELECTION */}
        {gameMode === 'landing' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            
            {/* Hero Welcome Banner */}
            <div className="bg-[#FDFCF0] border-4 border-[#3D405B] rounded-3xl p-6 sm:p-8 text-center shadow-[6px_6px_0px_#3D405B] relative overflow-hidden space-y-3">
              <h1 className="text-2xl sm:text-4xl font-black text-[#3D405B] font-serif tracking-wide uppercase leading-tight">
                PAHLAWAN ZAKAT NUSANTARA<br />🕌
              </h1>
              <p className="text-xs sm:text-sm text-[#3D405B]/80 max-w-xl mx-auto leading-relaxed font-semibold">
                Ayo belajar menghitung Zakat Fitrah, Zakat Emas, Profesi & Pertanian melalui simulasi petualangan berhadiah <strong className="text-[#E07A5F] font-black">1 Miliar Poin Berkah</strong>! Main sendiri atau tanding bersama kawan-kawan dalam 1 server live!
              </p>
            </div>

            {/* Profile Setup Box */}
            <div className="bg-[#F4F1DE] border-2 border-[#3D405B] rounded-3xl p-5 sm:p-6 shadow-[4px_4px_0px_#3D405B] space-y-4">
              <h3 className="font-black text-[#3D405B] text-sm border-b-2 border-[#3D405B]/20 pb-2 flex items-center gap-2">
                👤 Profil Pahlawan Zakat Cilik
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#3D405B] block">Nama Panggilan:</label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full bg-[#FDFCF0] border-2 border-[#3D405B] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#3D405B] placeholder-[#3D405B]/40 focus:outline-none focus:border-[#E07A5F] shadow-[2px_2px_0px_#3D405B]"
                    placeholder="Masukkan namamu..."
                  />
                </div>

                {/* Avatar Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#3D405B] block">Pilih Karakter Avatar:</label>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_OPTIONS.map((av) => (
                      <button
                        key={av}
                        onClick={() => {
                          soundEffects.playClick();
                          setPlayerAvatar(av);
                        }}
                        className={`text-2xl p-2 rounded-xl transition-all cursor-pointer ${
                          playerAvatar === av
                            ? 'bg-[#F2CC8F] text-[#3D405B] border-2 border-[#3D405B] scale-110 shadow-[3px_3px_0px_#3D405B]'
                            : 'bg-[#FDFCF0] text-[#3D405B] border border-[#3D405B]/40 hover:bg-[#F2CC8F]/50'
                        }`}
                      >
                        <img src={av} alt="avatar" className="w-8 h-8 object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5 MAIN MODE SELECTORS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* MODE 1: JUTAWAN ZAKAT (KUIS) */}
              <div className="bg-[#FDFCF0] border-2 border-[#3D405B] rounded-3xl p-5 shadow-[4px_4px_0px_#3D405B] space-y-3 hover:border-[#E07A5F] transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-[#F2CC8F] border-2 border-[#3D405B] rounded-2xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_#3D405B]">
                    🕹️
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#3D405B]">1. Jutawan Zakat (Kuis)</h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#81B29A] text-[#3D405B] border border-[#3D405B] inline-block mt-0.5">
                      Tanya Jawab & Lifeline
                    </span>
                    <p className="text-xs text-[#3D405B]/80 leading-relaxed font-semibold mt-1.5">
                      Uji wawasan zakatmu! Jawab 30 pertanyaan untuk meraih gelar pahlawan tertinggi.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      if (!playerName.trim()) {
                        setErrorMessage('Tolong masukkan Nama Panggilanmu terlebih dahulu!');
                        setTimeout(() => setErrorMessage(''), 3000);
                        return;
                      }
                      setGameMode('solo');
                    }}
                    className="flex-1 py-2.5 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-[10px] rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center justify-center gap-1 transition-all"
                  >
                    <Play className="w-3 h-3 fill-[#3D405B]" /> MAIN SOLO
                  </button>
                  <button
                    onClick={() => handleCreateRoomClick('millionaire')}
                    className="flex-1 py-2.5 bg-[#F2CC8F] hover:bg-[#81B29A] text-[#3D405B] font-black text-[10px] rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center justify-center gap-1 transition-all"
                  >
                    <Users className="w-3 h-3" /> BUAT SERVER
                  </button>
                </div>
              </div>

              {/* MODE 2: ZAKAT ADVENTURE (RPG) */}
              <div className="bg-[#FDFCF0] border-2 border-[#3D405B] rounded-3xl p-5 shadow-[4px_4px_0px_#3D405B] space-y-3 hover:border-[#E07A5F] transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-[#81B29A] border-2 border-[#3D405B] rounded-2xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_#3D405B]">
                    🗺️
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#3D405B]">2. Zakat Adventure</h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#F2CC8F] text-[#3D405B] border border-[#3D405B] inline-block mt-0.5">
                      RPG & Simulasi
                    </span>
                    <p className="text-xs text-[#3D405B]/80 leading-relaxed font-semibold mt-1.5">
                      Jelajahi peta Nusantara, bantu muzakki menghitung zakat & salurkan ke mustahik.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      if (!playerName.trim()) {
                        setErrorMessage('Tolong masukkan Nama Panggilanmu terlebih dahulu!');
                        setTimeout(() => setErrorMessage(''), 3000);
                        return;
                      }
                      setGameMode('adventure_solo');
                    }}
                    className="flex-1 py-2.5 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-[10px] rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center justify-center gap-1 transition-all"
                  >
                    <Play className="w-3 h-3 fill-[#3D405B]" /> MAIN SOLO
                  </button>
                  <button
                    onClick={() => handleCreateRoomClick('adventure')}
                    className="flex-1 py-2.5 bg-[#F2CC8F] hover:bg-[#81B29A] text-[#3D405B] font-black text-[10px] rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center justify-center gap-1 transition-all"
                  >
                    <Users className="w-3 h-3" /> BUAT SERVER
                  </button>
                </div>
              </div>

              {/* MODE 3: GABUNG SERVER LIVE */}
              <div className="bg-[#FDFCF0] border-2 border-[#3D405B] rounded-3xl p-5 shadow-[4px_4px_0px_#3D405B] space-y-3 hover:border-[#E07A5F] transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-[#E07A5F] text-white border-2 border-[#3D405B] rounded-2xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_#3D405B]">
                    🤝
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#3D405B]">3. Gabung Server Live</h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#81B29A] text-[#3D405B] border border-[#3D405B] inline-block mt-0.5">
                      Main Bersama Kawan
                    </span>
                    <p className="text-xs text-[#3D405B]/80 leading-relaxed font-semibold mt-1.5">
                      Punya kode PIN dari temanmu? Masukkan di bawah ini untuk ikut bermain bersama.
                    </p>
                  </div>
                </div>

                <div className="flex gap-1.5 mt-2">
                  <input
                    type="text"
                    placeholder="PIN Ruangan"
                    value={roomCodeInput}
                    onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl px-2.5 py-2 text-xs font-mono text-[#3D405B] font-black placeholder-[#3D405B]/40 focus:outline-none uppercase shadow-[2px_2px_0px_#3D405B]"
                  />
                  <button
                    onClick={handleJoinRoom}
                    className="px-4 py-2 bg-[#F2CC8F] hover:bg-[#81B29A] text-[#3D405B] font-black text-[10px] rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer"
                  >
                    GABUNG
                  </button>
                </div>
              </div>

              {/* MODE 4: INTERACTIVE QUIZ */}
              <div className="bg-[#FDFCF0] border-2 border-[#3D405B] rounded-3xl p-5 shadow-[4px_4px_0px_#3D405B] space-y-3 hover:border-[#E07A5F] transition-all flex flex-col justify-between md:col-span-2">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-purple-500 text-white border-2 border-[#3D405B] rounded-2xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_#3D405B]">
                    <Video size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#3D405B]">4. Kuis Zakat Interaktif (AR)</h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-300 text-[#3D405B] border border-[#3D405B] inline-block mt-0.5">
                      Gunakan Tanganmu!
                    </span>
                    <p className="text-xs text-[#3D405B]/80 leading-relaxed font-semibold mt-1.5">
                      Mainkan kuis zakat dengan kamera. Tembak jawaban yang benar dengan kepalan tangan!
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      if (!playerName.trim()) {
                        setErrorMessage('Tolong masukkan Nama Panggilanmu terlebih dahulu!');
                        setTimeout(() => setErrorMessage(''), 3000);
                        return;
                      }
                      setGameMode('interactive_quiz');
                    }}
                    className="flex-1 py-2.5 bg-purple-400 hover:bg-purple-300 text-[#3D405B] font-black text-[10px] rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center justify-center gap-1 transition-all"
                  >
                    <Play className="w-3 h-3 fill-[#3D405B]" /> MAIN SOLO
                  </button>
                  <button
                    onClick={() => handleCreateRoomClick('interactive_quiz')}
                    className="flex-1 py-2.5 bg-[#F2CC8F] hover:bg-purple-400 text-[#3D405B] font-black text-[10px] rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center justify-center gap-1 transition-all"
                  >
                    <Users className="w-3 h-3" /> BUAT SERVER
                  </button>
                </div>
              </div>

              {/* MODE 5: MODE BELAJAR (KAMUS, MATERI, SIMULATOR) */}
              <div className="bg-[#FDFCF0] border-2 border-[#3D405B] rounded-3xl p-5 shadow-[4px_4px_0px_#3D405B] space-y-3 hover:border-[#E07A5F] transition-all flex flex-col justify-between md:col-span-2">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-[#3D405B] text-white border-2 border-[#3D405B] rounded-2xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_#3D405B]">
                    📚
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#3D405B]">5. Mode Belajar</h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#E07A5F] text-white border border-[#3D405B] inline-block mt-0.5">
                      Pusat Edukasi Zakat
                    </span>
                    <p className="text-xs text-[#3D405B]/80 leading-relaxed font-semibold mt-1.5">
                      Kamus istilah zakat, materi lengkap, dan simulator kalkulator zakat otomatis.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 mt-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setLearningHubTab('materi');
                      setIsLearningHubOpen(true);
                    }}
                    className="w-full py-1.5 bg-[#F2CC8F] hover:bg-[#81B29A] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5" /> Materi Edukasi Lengkap
                  </button>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setLearningHubTab('kamus');
                        setIsLearningHubOpen(true);
                      }}
                      className="py-1.5 bg-[#F4F1DE] hover:bg-[#81B29A] text-[#3D405B] font-bold text-[11px] rounded-xl border-2 border-[#3D405B] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3 text-[#E07A5F]" /> Kamus
                    </button>
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setLearningHubTab('simulator');
                        setIsLearningHubOpen(true);
                      }}
                      className="py-1.5 bg-[#F4F1DE] hover:bg-[#81B29A] text-[#3D405B] font-bold text-[11px] rounded-xl border-2 border-[#3D405B] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Calculator className="w-3 h-3 text-[#81B29A]" /> Simulator
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* LIVE ACTIVE SERVERS LIST SECTION */}
            <div className="bg-[#F4F1DE] border-2 border-[#3D405B] rounded-3xl p-5 shadow-[4px_4px_0px_#3D405B] space-y-3">
              <div className="flex items-center justify-between border-b-2 border-[#3D405B]/20 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#81B29A] animate-ping" />
                  <h3 className="font-black text-[#3D405B] text-sm flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-[#E07A5F]" /> Daftar Server Live Aktif (Realtime)
                  </h3>
                </div>
                <span className="text-[10px] font-black uppercase text-[#3D405B]/70 bg-[#FDFCF0] px-2.5 py-0.5 rounded-full border border-[#3D405B]">
                  Status Live Sync
                </span>
              </div>

              {liveServerRooms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {liveServerRooms.map((sRoom) => (
                    <div
                      key={sRoom.code}
                      className="bg-[#FDFCF0] border-2 border-[#3D405B] p-3.5 rounded-2xl shadow-[3px_3px_0px_#3D405B] flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black font-mono text-sm text-[#E07A5F] bg-[#F2CC8F] px-2 py-0.5 rounded-md border border-[#3D405B]">
                            PIN: {sRoom.code}
                          </span>
                          <span className="text-[10px] font-bold text-[#81B29A] uppercase bg-[#81B29A]/20 px-1.5 py-0.5 rounded border border-[#3D405B]/40">
                            {sRoom.status === 'waiting' ? 'LOBBY' : 'IN GAME'}
                          </span>
                        </div>
                        <div className="text-xs font-black text-[#3D405B] mt-1">{sRoom.name}</div>
                        <div className="text-[10px] font-bold text-[#3D405B]/80">Host: {sRoom.hostName || 'Tuan Rumah'} • {sRoom.playerCount} Pemain</div>
                      </div>

                      <button
                        onClick={() => handleJoinRoomWithCode(sRoom.code)}
                        className="px-3 py-2 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer shrink-0"
                      >
                        GABUNG ➔
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#3D405B]/80 text-center py-1">
                    Saat ini belum ada server custom aktif dari pemain lain. Kamu bisa langsung mencoba server publik berikut:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#FDFCF0] border-2 border-[#3D405B] p-3.5 rounded-2xl shadow-[3px_3px_0px_#3D405B] flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black font-mono text-sm text-[#E07A5F] bg-[#F2CC8F] px-2 py-0.5 rounded-md border border-[#3D405B]">
                            PIN: ZAKAT1
                          </span>
                          <span className="text-[10px] font-bold text-[#81B29A] uppercase bg-[#81B29A]/20 px-1.5 py-0.5 rounded border border-[#3D405B]/40">
                            SERVER LIVE
                          </span>
                        </div>
                        <div className="text-xs font-black text-[#3D405B] mt-1">Ruangan Edukasi Ustadz Cilik</div>
                        <div className="text-[10px] font-bold text-[#3D405B]/80">Host: Ustadz Mubarok • Live Public Server</div>
                      </div>

                      <button
                        onClick={() => handleJoinRoomWithCode('ZAKAT1')}
                        className="px-3.5 py-2 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer shrink-0"
                      >
                        GABUNG ➔
                      </button>
                    </div>

                    <div className="bg-[#FDFCF0] border-2 border-[#3D405B] p-3.5 rounded-2xl shadow-[3px_3px_0px_#3D405B] flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black font-mono text-sm text-[#E07A5F] bg-[#F2CC8F] px-2 py-0.5 rounded-md border border-[#3D405B]">
                            PIN: ZAKAT2
                          </span>
                          <span className="text-[10px] font-bold text-[#81B29A] uppercase bg-[#81B29A]/20 px-1.5 py-0.5 rounded border border-[#3D405B]/40">
                            SERVER LIVE
                          </span>
                        </div>
                        <div className="text-xs font-black text-[#3D405B] mt-1">Arena Sahabat Zakat Live</div>
                        <div className="text-[10px] font-bold text-[#3D405B]/80">Host: Tim Pahlawan Zakat • Live Public Server</div>
                      </div>

                      <button
                        onClick={() => handleJoinRoomWithCode('ZAKAT2')}
                        className="px-3.5 py-2 bg-[#81B29A] hover:bg-[#F2CC8F] text-[#3D405B] font-black text-xs rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] cursor-pointer shrink-0"
                      >
                        GABUNG ➔
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* SCREEN 2: SOLO GAME VIEW */}
        {gameMode === 'solo' && (
          <SoloGameView
            playerName={playerName}
            playerAvatar={playerAvatar}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenCertificate={handleOpenCertificate}
            onGoHome={() => setGameMode('landing')}
          />
        )}

        {/* SCREEN 3: MULTIPLAYER LOBBY */}
        {gameMode === 'lobby' && currentRoom && (
          <RoomLobby
            room={currentRoom}
            currentPlayerId={currentUserId}
            onToggleReady={handleToggleReady}
            onStartGame={handleStartMultiplayerGame}
            onSendChat={handleSendChatMultiplayer}
            onLeaveRoom={() => {
              setGameMode('landing');
              setCurrentRoom(null);
            }}
          />
        )}

        {/* SCREEN 4: MULTIPLAYER GAME VIEW */}
        {gameMode === 'multiplayer' && currentRoom && currentQuestion && (
          <MultiplayerGameView
            room={currentRoom}
            currentPlayerId={currentUserId}
            currentQuestion={currentQuestion}
            leaderboard={leaderboard}
            onSubmitAnswer={handleSubmitAnswerMultiplayer}
            onUseLifeline={handleUseLifelineMultiplayer}
            onNextQuestion={handleNextQuestionMultiplayer}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onSendChat={handleSendChatMultiplayer}
            onRestartGame={handleRestartMultiplayer}
            onOpenCertificate={handleOpenCertificate}
            onGoHome={() => setGameMode('landing')}
          />
        )}

        {/* SCREEN 5: ADVENTURE SOLO */}
        {gameMode === 'adventure_solo' && (
          <AdventureGameView
            playerName={playerName}
            playerAvatar={playerAvatar}
            isMultiplayer={false}
            onGoHome={() => setGameMode('landing')}
          />
        )}

        {/* SCREEN 6: ADVENTURE MULTIPLAYER */}
        {gameMode === 'adventure_multiplayer' && currentRoom && (
          <AdventureGameView
            playerName={playerName}
            playerAvatar={playerAvatar}
            isMultiplayer={true}
            socket={socketRef.current}
            roomId={currentRoom.id}
            playerId={currentUserId}
            otherPlayers={currentRoom.adventurePlayers || []}
            onGoHome={() => {
              setGameMode('landing');
              setCurrentRoom(null);
            }}
          />
        )}

        {/* SCREEN 7: INTERACTIVE QUIZ */}
        {gameMode === 'interactive_quiz' && (
          <InteractiveQuizView 
            isMultiplayer={currentRoom?.gameType === 'interactive_quiz'}
            socket={socketRef.current}
            roomId={currentRoom?.id}
            playerId={currentUserId}
            otherPlayers={currentRoom?.adventurePlayers || []}
            onGoHome={() => {
              setGameMode('landing');
              setCurrentRoom(null);
            }} 
          />
        )}

      </main>

      {/* Global Application Modals */}
      <LearningHubModal
        isOpen={isLearningHubOpen}
        onClose={() => setIsLearningHubOpen(false)}
        initialTab={learningHubTab}
      />

      <KamusZakatModal
        isOpen={isKamusOpen}
        onClose={() => setIsKamusOpen(false)}
      />

      <InteractiveCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        leaderboard={leaderboard}
        currentUserId={currentUserId}
      />

      <LifelineModal
        isOpen={lifelineModalState.isOpen}
        onClose={() => setLifelineModalState({ isOpen: false, type: null })}
        lifelineType={lifelineModalState.type}
        ustadzAdvice={lifelineModalState.advice}
        jamaahPercents={lifelineModalState.percents}
        options={currentQuestion?.options}
      />

      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FDFCF0] border-4 border-[#3D405B] rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-[8px_8px_0px_#3D405B]">
            <h2 className="text-xl font-black text-[#3D405B] mb-4 text-center">Login Admin Server</h2>
            <p className="text-sm text-[#3D405B]/80 text-center mb-6 font-semibold">Hanya admin yang dapat membuat server baru.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#3D405B] mb-1">Username Admin</label>
                <input
                  type="password"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full bg-white border-2 border-[#3D405B] rounded-xl px-4 py-2 text-sm font-bold text-[#3D405B] focus:outline-none focus:ring-4 focus:ring-[#E07A5F]/20"
                  placeholder="Masukkan username"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3D405B] mb-1">Password Admin</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-white border-2 border-[#3D405B] rounded-xl px-4 py-2 text-sm font-bold text-[#3D405B] focus:outline-none focus:ring-4 focus:ring-[#E07A5F]/20"
                  placeholder="Masukkan password"
                />
              </div>
              
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-black text-sm rounded-xl border-2 border-gray-400 transition-all"
                >
                  BATAL
                </button>
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 py-2 bg-[#E07A5F] hover:bg-[#F2CC8F] text-white hover:text-[#3D405B] font-black text-sm rounded-xl border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] transition-all"
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        playerName={playerName}
        playerAvatar={playerAvatar}
        totalScore={certData.score}
        levelReached={certData.level}
      />

      {/* App Footer */}
      <footer className="bg-emerald-950/90 border-t border-emerald-800/60 py-3 px-4 text-center text-[11px] text-emerald-300/80">
        <p>🕌 Pahlawan Zakat Nusantara • Game Edukasi & Simulasi Zakat Interaktif</p>
      </footer>

    </div>
  );
}
