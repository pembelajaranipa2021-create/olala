import React, { useEffect, useRef, useState } from 'react';
import { Home, Volume2, VolumeX } from 'lucide-react';

const questions = [
  { q: "Apa hukum menunaikan zakat bagi muslim yang mampu?", a: "Sunnah", b: "Mubah", c: "Wajib", d: "Makruh", correct: 'c' },
  { q: "Zakat yang wajib dikeluarkan setiap bulan Ramadhan disebut?", a: "Zakat Mal", b: "Zakat Fitrah", c: "Infak", d: "Sedekah", correct: 'b' },
  { q: "Berapa takaran Zakat Fitrah per jiwa (beras)?", a: "2,5 kg", b: "3 kg", c: "5 kg", d: "1 kg", correct: 'a' },
  { q: "Batas waktu terakhir membayar zakat fitrah adalah sebelum?", a: "Malam Lailatul Qadar", b: "Shalat Idul Fitri", c: "Puasa hari pertama", d: "Malam takbiran", correct: 'b' },
  { q: "Batas minimal harta yang wajib dizakati disebut?", a: "Haul", b: "Nisab", c: "Kadar", d: "Fidyah", correct: 'b' },
  { q: "Waktu kepemilikan harta selama satu tahun hijriah disebut?", a: "Nisab", b: "Haul", c: "Qada", d: "Kafarat", correct: 'b' },
  { q: "Berapa persentase zakat mal yang harus dikeluarkan (emas/uang)?", a: "2,5%", b: "5%", c: "10%", d: "20%", correct: 'a' },
  { q: "Orang yang berhak menerima zakat disebut?", a: "Muzakki", b: "Mustahik", c: "Amil", d: "Gharim", correct: 'b' },
  { q: "Ada berapa golongan (asnaf) yang berhak menerima zakat?", a: "5 Golongan", b: "6 Golongan", c: "7 Golongan", d: "8 Golongan", correct: 'd' },
  { q: "Orang yang tidak memiliki harta dan tidak ada penghasilan disebut?", a: "Miskin", b: "Fakir", c: "Gharim", d: "Mualaf", correct: 'b' },
  { q: "Panitia atau orang yang mengurus pengumpulan dan pembagian zakat disebut?", a: "Amil", b: "Muzakki", c: "Ibnu Sabil", d: "Riqab", correct: 'a' },
  { q: "Orang yang baru masuk Islam dan imannya masih lemah disebut?", a: "Musafir", b: "Mualaf", c: "Gharim", d: "Fakir", correct: 'b' },
  { q: "Orang yang memiliki banyak hutang untuk kebaikan disebut?", a: "Riqab", b: "Amil", c: "Gharim", d: "Ibnu Sabil", correct: 'c' },
  { q: "Orang yang sedang dalam perjalanan jauh (musafir) dan kehabisan bekal disebut?", a: "Ibnu Sabil", b: "Gharim", c: "Mualaf", d: "Fi Sabilillah", correct: 'a' },
  { q: "Selain membersihkan harta, zakat fitrah bertujuan untuk mensucikan diri orang yang?", a: "Berhaji", b: "Shalat", c: "Berpuasa", d: "Umdrah", correct: 'c' }
];

export function InteractiveQuizView({ 
  isMultiplayer = false,
  socket = null,
  roomId = null,
  playerId = null,
  otherPlayers = [],
  onGoHome 
}: { 
  isMultiplayer?: boolean;
  socket?: WebSocket | null;
  roomId?: string | null;
  playerId?: string | null;
  otherPlayers?: any[];
  onGoHome: () => void;
}) {
  // states for UI
  const [viewState, setViewState] = useState<'LOADING' | 'MENU' | 'PLAYING' | 'GAMEOVER'>('LOADING');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [finalScore, setFinalScore] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refs for fast UI updates without re-renders
  const scoreRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const ammoRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const qCounterRef = useRef<HTMLParagraphElement>(null);
  const qTextRef = useRef<HTMLHeadingElement>(null);
  
  const g = useRef({
    isGameRunning: false,
    score: 0,
    currentQIdx: 0,
    ammo: 5,
    lastShotTime: 0,
    questionStartTime: 0,
    isTransitioning: false,
    players: [] as any[],
    bullets: [] as any[],
    quizRocks: [] as any[],
    particles: [] as any[],
    audioCtx: null as AudioContext | null,
    bgmOscillator: null as any,
    bgmGain: null as any,
    camera: null as any,
    hands: null as any,
    animationFrameId: 0
  }).current;

  // Audio System
  const initAudio = () => {
    if (!g.audioCtx) {
      g.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (g.audioCtx?.state === 'suspended') g.audioCtx.resume();
  };

  const playSound = (freq: number, type: OscillatorType, duration: number, vol = 1.0) => {
    if (!isAudioEnabled || !g.audioCtx) return;
    try {
      if (g.audioCtx.state === 'suspended') g.audioCtx.resume();
      const osc = g.audioCtx.createOscillator();
      const gain = g.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, g.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, g.audioCtx.currentTime + duration);
      gain.gain.setValueAtTime(vol, g.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, g.audioCtx.currentTime + duration);
      osc.connect(gain); gain.connect(g.audioCtx.destination);
      osc.start(); osc.stop(g.audioCtx.currentTime + duration);
    } catch(e) {}
  };

  const startBGM = () => {
    if (!isAudioEnabled || !g.audioCtx) return;
    try {
      if (g.bgmOscillator) stopBGM();
      g.bgmOscillator = g.audioCtx.createOscillator();
      g.bgmGain = g.audioCtx.createGain();
      g.bgmOscillator.type = 'triangle';
      g.bgmOscillator.frequency.setValueAtTime(440, g.audioCtx.currentTime); 
      const now = g.audioCtx.currentTime;
      const notes = [440, 493.88, 523.25, 587.33, 659.25, 587.33, 523.25, 493.88];
      for(let i=0; i<1000; i++) {
          const time = now + (i * 0.8);
          g.bgmOscillator.frequency.setValueAtTime(notes[i % notes.length], time);
      }
      g.bgmGain.gain.setValueAtTime(0.15, g.audioCtx.currentTime); 
      g.bgmOscillator.connect(g.bgmGain);
      g.bgmGain.connect(g.audioCtx.destination);
      g.bgmOscillator.start();
    } catch(e) {}
  };

  const stopBGM = () => {
    if (g.bgmOscillator) {
      try { g.bgmOscillator.stop(); } catch(e) {}
      g.bgmOscillator = null;
    }
  };

  const SFX = {
    shoot: () => playSound(1200, 'square', 0.1, 0.4),
    correct: () => playSound(800, 'sine', 0.5, 0.8),
    wrong: () => playSound(150, 'sawtooth', 0.6, 0.9)
  };

  const toggleAudio = () => {
    setIsAudioEnabled(prev => {
      const next = !prev;
      if (!next) stopBGM();
      else if (g.isGameRunning) setTimeout(startBGM, 100);
      return next;
    });
  };

  const showFeedback = (text: string, color: string) => {
    if (feedbackRef.current) {
      feedbackRef.current.innerText = text;
      feedbackRef.current.style.color = color;
      feedbackRef.current.style.opacity = '1';
      setTimeout(() => { 
         if (feedbackRef.current) feedbackRef.current.style.opacity = '0'; 
      }, 1500);
    }
  };

  const syncToServer = (isEliminated = false) => {
    if (isMultiplayer && socket && socket.readyState === WebSocket.OPEN && roomId && playerId) {
      socket.send(JSON.stringify({
        type: 'INTERACTIVE_QUIZ_SYNC',
        payload: {
          score: g.score,
          currentQIdx: g.currentQIdx,
          isEliminated
        }
      }));
    }
  };

  const spawnQuizQuestion = () => {
    g.isTransitioning = false;
    if (g.currentQIdx >= questions.length) { 
      endGame(); 
      return; 
    }
    
    g.ammo = 5;
    if (ammoRef.current) ammoRef.current.innerText = "🔫".repeat(g.ammo);
    g.questionStartTime = Date.now();

    const q = questions[g.currentQIdx];
    if (qTextRef.current) qTextRef.current.innerText = q.q;
    if (qCounterRef.current) qCounterRef.current.innerText = `Pertanyaan ${g.currentQIdx + 1}/15`;
    
    const optionsData = [
      { key: 'A', text: q.a, val: 'a' },
      { key: 'B', text: q.b, val: 'b' },
      { key: 'C', text: q.c, val: 'c' },
      { key: 'D', text: q.d, val: 'd' }
    ];

    if (!canvasRef.current) return;
    const cw = canvasRef.current.width;

    g.quizRocks = optionsData.map((opt, i) => ({
      x: (cw / 5) * (i + 1),
      y: -100 - (Math.random() * 150),
      size: 80,
      text: opt.text,
      isCorrect: q.correct === opt.val,
      speed: 1.5 + Math.random() * 1.5
    }));
  };

  const gameLoop = () => {
    if (!g.isGameRunning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();
    const age = now - g.questionStartTime;
    const isInvincible = age < 1500;
    
    if (!g.isTransitioning) {
      const timeLeft = Math.max(0, 10000 - age);
      if (timerRef.current) timerRef.current.innerText = `⏱️ ${(timeLeft/1000).toFixed(1)}s`;
      
      if (timeLeft <= 0) {
        g.isTransitioning = true;
        showFeedback(isMultiplayer ? "TERELIMINASI (WAKTU HABIS)!" : "WAKTU HABIS!", "#ef4444");
        SFX.wrong();
        g.quizRocks = [];
        g.currentQIdx++;
        syncToServer(isMultiplayer ? true : false);
        if (isMultiplayer) {
          setTimeout(endGame, 2000);
        } else {
          setTimeout(spawnQuizQuestion, 2000);
        }
      } else if (g.ammo <= 0 && g.bullets.length === 0 && g.quizRocks.length > 0) {
        g.isTransitioning = true;
        showFeedback(isMultiplayer ? "TERELIMINASI (AMUNISI HABIS)!" : "AMUNISI HABIS!", "#ef4444");
        SFX.wrong();
        g.quizRocks = [];
        g.currentQIdx++;
        syncToServer(isMultiplayer ? true : false);
        if (isMultiplayer) {
          setTimeout(endGame, 2000);
        } else {
          setTimeout(spawnQuizQuestion, 2000);
        }
      }
    }

    // Render Players
    g.players.forEach(p => {
      if (p.shooting && now - g.lastShotTime > 800 && g.ammo > 0 && !g.isTransitioning) {
        SFX.shoot();
        g.bullets.push({ x: p.x, y: p.y - 40, vy: -15, color: p.color });
        g.lastShotTime = now;
        g.ammo--;
        if (ammoRef.current) ammoRef.current.innerText = "🔫".repeat(g.ammo);
      }
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillStyle = p.shooting ? "#f59e0b" : p.color;
      ctx.shadowBlur = 15; ctx.shadowColor = ctx.fillStyle;
      ctx.beginPath();
      ctx.moveTo(0, -30); 
      ctx.lineTo(20, 15); 
      ctx.lineTo(0, 5); 
      ctx.lineTo(-20, 15); 
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    // Render Bullets
    for (let i = g.bullets.length - 1; i >= 0; i--) {
      const b = g.bullets[i];
      b.y += b.vy; 
      ctx.fillStyle = b.color;
      ctx.shadowBlur = 10; ctx.shadowColor = b.color;
      ctx.fillRect(b.x - 3, b.y, 6, 20); 
      ctx.shadowBlur = 0;
      if (b.y < -50) g.bullets.splice(i,1); 
    }

    // Render Rocks (Balloons)
    if (g.quizRocks.length > 0) {
      for (let ri = g.quizRocks.length - 1; ri >= 0; ri--) {
        const r = g.quizRocks[ri];
        r.y += r.speed;
        
        if (r.y > canvas.height + r.size) {
          r.y = -r.size - Math.random() * 100;
          r.x = Math.random() * (canvas.width - 200) + 100;
        }
        
        ctx.fillStyle = isInvincible ? "#4b5563" : "#d97706"; 
        ctx.strokeStyle = isInvincible ? "#9ca3af" : "#fef08a"; 
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(r.x, r.y, r.size, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        
        ctx.fillStyle = "white"; 
        ctx.font = "bold 17px 'Segoe UI'"; 
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(r.text, r.x, r.y, r.size * 1.7); 

        // Collision
        let balloonDestroyed = false;
        for (let bi = g.bullets.length - 1; bi >= 0; bi--) {
          const b = g.bullets[bi];
          if (Math.hypot(r.x-b.x, r.y-b.y) < r.size) {
            g.bullets.splice(bi, 1);
            
            if (isInvincible) {
              g.score -= 5;
              showFeedback("-5 (KEBAL!)", "#ef4444");
              SFX.wrong();
              for(let p=0; p<5; p++) g.particles.push({x: b.x, y: b.y, vx: (Math.random()-0.5)*10, vy: (Math.random()-0.5)*10, life: 1, color: '#ef4444'});
            } else {
              if (r.isCorrect) { 
                g.score += 20; 
                SFX.correct(); 
                showFeedback("BENAR! +20", "#10b981");
                g.isTransitioning = true;
                g.quizRocks = []; 
                g.currentQIdx++;
                syncToServer(false);
                setTimeout(spawnQuizQuestion, 1500);
                for(let p=0; p<30; p++) g.particles.push({x: r.x, y: r.y, vx: (Math.random()-0.5)*15, vy: (Math.random()-0.5)*15, life: 1.5, color: '#10b981'});
              } else { 
                g.score -= 15; 
                SFX.wrong(); 
                showFeedback(isMultiplayer ? "TERELIMINASI!" : "SALAH! -15", "#ef4444");
                g.isTransitioning = true;
                g.quizRocks = []; 
                g.currentQIdx++;
                syncToServer(isMultiplayer ? true : false);
                if (isMultiplayer) {
                  setTimeout(endGame, 1500);
                } else {
                  setTimeout(spawnQuizQuestion, 1500);
                }
                for(let p=0; p<20; p++) g.particles.push({x: r.x, y: r.y, vx: (Math.random()-0.5)*15, vy: (Math.random()-0.5)*15, life: 1, color: '#ef4444'});
              }
              balloonDestroyed = true;
            }
            if (scoreRef.current) scoreRef.current.innerText = `SKOR: ${g.score}`;
            break; // Bullet destroyed
          }
        }
        if (balloonDestroyed) {
          break; // Exit the rocks loop because array is cleared
        }
      }
    }

    // Render Particles
    for (let i = g.particles.length - 1; i >= 0; i--) {
      const p = g.particles[i];
      p.x += p.vx; p.y += p.vy; p.life -= 0.03;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI*2); ctx.fill();
      if (p.life <= 0) g.particles.splice(i, 1);
    }
    ctx.globalAlpha = 1;

    if (g.isGameRunning) {
      g.animationFrameId = requestAnimationFrame(gameLoop);
    }
  };

  const endGame = () => {
    g.isGameRunning = false;
    stopBGM();
    setFinalScore(g.score);
    setViewState('GAMEOVER');
  };

  const startGame = () => {
    initAudio();
    g.isGameRunning = true; 
    g.score = 0; 
    g.currentQIdx = 0;
    g.bullets = []; g.particles = []; g.quizRocks = [];
    
    setViewState('PLAYING');
    if (scoreRef.current) scoreRef.current.innerText = "SKOR: 0";
    
    startBGM(); 
    spawnQuizQuestion();
    if (g.camera) g.camera.start(); 
    gameLoop();
  };

  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const loadScript = (src: string) => new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
      if (existingScript) {
        if (existingScript.getAttribute('data-loaded') === 'true') {
          resolve(true);
        } else {
          existingScript.addEventListener('load', () => {
            existingScript.setAttribute('data-loaded', 'true');
            resolve(true);
          });
          existingScript.addEventListener('error', reject);
        }
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        script.setAttribute('data-loaded', 'true');
        resolve(true);
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });

    const initMediaPipe = async () => {
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/hands.js");
        
        const win = window as any;
        
        // Polling to wait for MediaPipe to attach to window, sometimes it takes a few ms
        let retries = 0;
        while ((!win.Hands || !win.Camera) && retries < 20) {
          await new Promise(r => setTimeout(r, 100));
          retries++;
        }

        if (!win.Hands || !win.Camera) {
          throw new Error("MediaPipe not loaded");
        }

        const hands = new win.Hands({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${file}`
        });

        hands.setOptions({ 
          maxNumHands: 2,
          modelComplexity: 1, 
          minDetectionConfidence: 0.5, 
          minTrackingConfidence: 0.5 
        });

        hands.onResults((results: any) => {
          if (!g.isGameRunning) return;
          g.players = [];
          if (results.multiHandLandmarks) {
            results.multiHandLandmarks.forEach((landmarks: any, idx: number) => {
              if (!landmarks || landmarks.length < 17) return;
              const colors = ["#10b981", "#3b82f6"];
              // Clench detection
              const isClenched = (landmarks[8] && landmarks[5] && landmarks[12] && landmarks[9] && landmarks[16] && landmarks[13]) 
                                 ? (landmarks[8].y > landmarks[5].y && 
                                    landmarks[12].y > landmarks[9].y && 
                                    landmarks[16].y > landmarks[13].y) 
                                 : false;
              if (canvasRef.current && landmarks[9]) {
                g.players.push({
                  x: (1 - landmarks[9].x) * canvasRef.current.width,
                  y: landmarks[9].y * canvasRef.current.height,
                  shooting: isClenched, 
                  color: colors[idx % colors.length]
                });
              }
            });
          }
        });
        
        g.hands = hands;
        if (videoRef.current) {
          g.camera = new win.Camera(videoRef.current, {
            onFrame: async () => { 
              try {
                if (videoRef.current && videoRef.current.readyState >= 2) {
                  await hands.send({image: videoRef.current}); 
                }
              } catch (err) {
                console.error("MediaPipe error:", err);
              }
            },
            width: 1280, height: 720
          });
        }
        setViewState('MENU');
      } catch (e) {
        console.error("Failed to init MediaPipe", e);
      }
    };

    initMediaPipe();

    return () => {
      g.isGameRunning = false;
      if (g.animationFrameId) cancelAnimationFrame(g.animationFrameId);
      if (g.camera) g.camera.stop();
      stopBGM();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white font-sans overflow-hidden">
      <div className="fixed inset-0 w-screen h-screen z-0" style={{ transform: 'scaleX(-1)' }}>
        <video ref={videoRef} playsInline autoPlay muted className="w-full h-full object-cover" />
      </div>

      <canvas ref={canvasRef} className="block bg-transparent absolute inset-0 z-10 pointer-events-none" />

      <div className="absolute inset-0 z-20 pointer-events-none">
        
        {/* Top Controls */}
        <div className="absolute top-5 right-5 flex gap-2 pointer-events-auto">
          {viewState !== 'LOADING' && viewState !== 'MENU' && (
            <button onClick={onGoHome} className="bg-black/70 px-4 py-2 rounded-xl border border-gray-600 hover:bg-white/10 hover:border-white transition-all font-bold flex items-center gap-2">
              <Home size={18} /> BERANDA
            </button>
          )}
          <button onClick={toggleAudio} className="bg-black/70 px-4 py-2 rounded-xl border border-gray-600 hover:bg-white/10 hover:border-white transition-all font-bold flex items-center gap-2">
            {isAudioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />} {isAudioEnabled ? 'SUARA MAX' : 'SUARA MATI'}
          </button>
        </div>

        {/* HUD */}
        <div className={`absolute top-5 left-5 bg-black/80 p-5 rounded-2xl border border-emerald-500 pointer-events-auto transition-opacity duration-300 ${viewState === 'PLAYING' ? 'opacity-100' : 'opacity-0'}`}>
          <div ref={scoreRef} className="text-4xl font-black italic text-emerald-400">SKOR: 0</div>
          <div className="text-xs text-yellow-400 mt-2 font-bold uppercase">{isMultiplayer ? 'Mode Kuis Multiplayer' : 'Mode Kuis Zakat'}</div>
          <div ref={ammoRef} className="text-2xl mt-2 tracking-widest">🔫🔫🔫🔫🔫</div>
          <div ref={timerRef} className="text-2xl text-red-400 font-bold mt-2">⏱️ 10.0s</div>
        </div>

        {isMultiplayer && viewState === 'PLAYING' && (
          <div className="absolute top-20 right-5 bg-black/80 p-4 rounded-2xl border border-blue-500 pointer-events-auto w-64 max-h-96 overflow-y-auto">
            <h3 className="text-blue-400 font-bold mb-3 border-b border-blue-500/50 pb-2">Pemain Lain</h3>
            <div className="flex flex-col gap-2">
              {otherPlayers.filter(p => p.id !== playerId).map(p => (
                <div key={p.id} className={`flex items-center justify-between p-2 rounded-lg ${p.isEliminated ? 'bg-red-900/50' : 'bg-slate-800'}`}>
                  <div className="flex items-center gap-2">
                    <img src={p.avatar} alt="avatar" className="w-6 h-6 object-contain" />
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${p.isEliminated ? 'text-red-300 line-through' : 'text-white'}`}>{p.name}</span>
                      <span className="text-[10px] text-gray-400">Soal {p.currentQIdx !== undefined ? p.currentQIdx + 1 : 1}/15</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold">{p.score || 0}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div ref={feedbackRef} className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-7xl font-black italic pointer-events-none opacity-0 transition-opacity duration-300 z-50 drop-shadow-2xl text-center w-full"></div>

        {/* Question Overlay */}
        <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] text-center pointer-events-none z-10 transition-opacity duration-300 ${viewState === 'PLAYING' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-black/90 p-8 rounded-[30px] border-4 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
            <p ref={qCounterRef} className="text-yellow-500 font-bold text-sm mb-1 uppercase tracking-widest">Pertanyaan 1/15</p>
            <h2 ref={qTextRef} className="text-3xl font-extrabold text-white leading-tight">Memuat Pertanyaan...</h2>
          </div>
        </div>

        {/* Loading / Menu / Game Over Modals */}
        {(viewState === 'LOADING' || viewState === 'MENU' || viewState === 'GAMEOVER') && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-[#00140a]/95 p-12 rounded-[30px] border-4 border-emerald-600 pointer-events-auto min-w-[550px] shadow-[0_0_60px_rgba(5,150,105,0.5)]">
            {viewState === 'LOADING' && (
              <>
                <h1 className="text-6xl font-black mb-4 tracking-tighter text-emerald-500 italic">KUIS ZAKAT</h1>
                <p className="mb-8 text-xl text-yellow-500 font-bold animate-pulse">MENYIAPKAN SENSOR TANGAN...</p>
              </>
            )}

            {viewState === 'MENU' && (
              <>
                <h1 className="text-6xl font-black mb-4 tracking-tighter text-emerald-500 italic">KUIS ZAKAT</h1>
                <p className="mb-8 text-gray-300 text-lg max-w-sm mx-auto">Gunakan tanganmu (di kamera) untuk menembak balon jawaban! Kepalkan jarimu untuk menembak.</p>
                <div className="flex justify-center gap-4">
                  <button onClick={startGame} className="bg-slate-900 border-2 border-emerald-600 p-8 rounded-3xl text-center hover:bg-emerald-950 w-64 hover:scale-105 transition-all">
                    <div className="text-6xl mb-4">🕌</div>
                    <h3 className="text-2xl font-bold text-emerald-400">MULAI KUIS</h3>
                    <p className="text-sm text-gray-400 mt-2">15 Pertanyaan</p>
                  </button>
                  <button onClick={onGoHome} className="bg-slate-900 border-2 border-rose-600 p-8 rounded-3xl text-center hover:bg-rose-950 w-64 hover:scale-105 transition-all">
                    <div className="text-6xl mb-4">🏠</div>
                    <h3 className="text-2xl font-bold text-rose-400">KEMBALI</h3>
                    <p className="text-sm text-gray-400 mt-2">Ke Menu Utama</p>
                  </button>
                </div>
              </>
            )}

            {viewState === 'GAMEOVER' && (() => {
              let predikat = "";
              let color = "";
              if (finalScore >= 1300) { predikat = "MUMTAZ (Luar Biasa)!"; color = "text-emerald-400"; }
              else if (finalScore >= 900) { predikat = "JAYYID (Bagus)!"; color = "text-blue-400"; }
              else { predikat = "TINGKATKAN LAGI!"; color = "text-yellow-400"; }

              return (
                <>
                  <h1 className="text-7xl font-black mb-6 italic text-emerald-400">ALHAMDULILLAH</h1>
                  <div className="text-left bg-black/70 p-8 rounded-2xl mb-6 border-2 border-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400 text-xl font-bold">TOTAL SKOR:</span>
                        <span className={`${color} text-4xl font-black italic`}>{finalScore}</span>
                    </div>
                    <div className="text-center mt-6">
                        <span className="text-gray-300">PREDIKAT:</span><br/>
                        <span className={`${color} text-2xl font-bold`}>{predikat}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                      <button onClick={startGame} className="bg-emerald-600 hover:bg-emerald-700 hover:scale-105 transition-all text-white font-black py-4 px-12 rounded-full text-2xl w-full">MAIN LAGI</button>
                      <button onClick={onGoHome} className="bg-slate-800 hover:bg-slate-700 hover:scale-105 transition-all text-white font-black py-4 px-12 rounded-full text-xl w-full border border-slate-600">KEMBALI KE MENU UTAMA</button>
                  </div>
                </>
              )
            })()}
          </div>
        )}

      </div>
    </div>
  );
}
