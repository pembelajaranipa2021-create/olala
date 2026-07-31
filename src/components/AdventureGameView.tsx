import React, { useState, useEffect, useCallback } from 'react';
import { soundEffects } from '../utils/soundEffects';
import { Home, ShoppingCart, ChevronRight, Package, Heart, Shield, Award, Crown, TrendingUp, AlertTriangle, Trophy } from 'lucide-react';

const PRICES = { rice: 15000, gold: 1200000 };

const ALL_MAPS = [
  { name: 'Dusun Hijau', icon: 'leaf', color: 'emerald', npcs: [
      { id: 'pak_haji', name: 'Haji Sulaiman', x: 1, y: 1, type: 'MUZAKKI', quest: 'TANI' },
      { id: 'yatim_piatu', name: 'Rumah Yatim', x: 4, y: 3, type: 'MUSTAHIK', cost: 2500000 }
  ]},
  { name: 'Pasar Rakyat', icon: 'shopping-bag', color: 'amber', npcs: [
      { id: 'pedagang', name: 'Saudagar Malik', x: 3, y: 1, type: 'MUZAKKI', quest: 'DAGANG' },
      { id: 'kuli_panggul', name: 'Pak Darmono', x: 1, y: 4, type: 'MUSTAHIK', cost: 4000000 }
  ]},
  { name: 'Pesisir Karang', icon: 'anchor', color: 'blue', npcs: [
      { id: 'juragan_kapal', name: 'Kapten Idris', x: 0, y: 2, type: 'MUZAKKI', quest: 'NELAYAN' },
      { id: 'janda_nelayan', name: 'Ibu Fatimah', x: 3, y: 4, type: 'MUSTAHIK', cost: 3500000 }
  ]},
  { name: 'Lembah Subur', icon: 'wheat', color: 'lime', npcs: [
      { id: 'peternak', name: 'Pak Bejo', x: 2, y: 0, type: 'MUZAKKI', quest: 'TERNAK' },
      { id: 'sekolah_desa', name: 'Guru Madrasah', x: 4, y: 4, type: 'MUSTAHIK', cost: 5000000 }
  ]},
  { name: 'Kota Niaga', icon: 'globe', color: 'indigo', npcs: [
      { id: 'toko_emas', name: 'Nyonya Tan', x: 4, y: 1, type: 'MUZAKKI', quest: 'EMAS_MURNI' },
      { id: 'panti_jompo', name: 'Wisma Lansia', x: 0, y: 4, type: 'MUSTAHIK', cost: 6000000 }
  ]},
  { name: 'Hutan Damai', icon: 'tree-pine', color: 'emerald', npcs: [
      { id: 'pencari_madu', name: 'Kang Asep', x: 1, y: 3, type: 'MUZAKKI', quest: 'MADU' },
      { id: 'pengungsi', name: 'Kamp Pengungsi', x: 3, y: 0, type: 'MUSTAHIK', cost: 4500000 }
  ]},
  { name: 'Pusat Kerajaan', icon: 'crown', color: 'purple', npcs: [
      { id: 'menteri', name: 'Patih Kerajaan', x: 2, y: 2, type: 'MUZAKKI', quest: 'NEGARA' },
      { id: 'masjid_agung', name: 'Marbot Masjid', x: 0, y: 0, type: 'MUSTAHIK', cost: 10000000 }
  ]}
];

const QUESTS = {
  'TANI': { dialog: "Hasil panen padi kami melimpah tahun ini, total 10 ton. Berapa zakatnya jika menggunakan irigasi alami (5%)?", target: 500, unit: 'rice', label: 'Beras', formula: 'Hitung 5% dari 10.000 kg' },
  'DAGANG': { dialog: "Alhamdulillah, keuntungan emas dari perdagangan tahun ini mencapai 200 gram. Berapa zakat mal saya (2.5%)?", target: 5, unit: 'gold', label: 'Emas', formula: 'Hitung 2.5% dari 200 gram' },
  'NELAYAN': { dialog: "Tangkapan ikan sedang ramai, pendapatan bersih Rp 60.000.000. Bantu hitung zakatnya (2.5%).", target: 1500000, unit: 'cash', label: 'Rupiah', formula: 'Hitung 2.5% dari Rp 60.000.000' },
  'TERNAK': { dialog: "Ternak kami berkembang pesat. Hasil penjualan mencapai Rp 80.000.000. Berapa zakatnya (2.5%)?", target: 2000000, unit: 'cash', label: 'Rupiah', formula: 'Hitung 2.5% dari Rp 80.000.000' },
  'EMAS_MURNI': { dialog: "Simpanan emas saya mencapai 400 gram tahun ini. Hitung zakat mal-nya (2.5%)!", target: 10, unit: 'gold', label: 'Emas', formula: 'Hitung 2.5% dari 400 gram' },
  'MADU': { dialog: "Hutan memberikan hasil madu 200 kg. Berapa zakat pertaniannya (10% karena alami)?", target: 20, unit: 'rice', label: 'Beras', formula: 'Hitung 10% dari 200 kg' },
  'NEGARA': { dialog: "Negara memberikan hibah sebesar Rp 400.000.000. Berapa zakat/pajaknya (2.5%)?", target: 10000000, unit: 'cash', label: 'Rupiah', formula: 'Hitung 2.5% dari Rp 400.000.000' }
};

const LEVELS = {
  'JUNIOR': { label: 'Junior', months: 4, icon: Shield, cityCount: 3, assistance: 'FULL', color: 'emerald', desc: 'Krisis: Bulan 3.', crisisMonths: [3] },
  'SENIOR': { label: 'Senior', months: 8, icon: Award, cityCount: 5, assistance: 'HALF', color: 'blue', desc: 'Krisis: Bulan 3, 6.', crisisMonths: [3, 6] },
  'MASTER': { label: 'Master', months: 12, icon: Crown, cityCount: 7, assistance: 'NONE', color: 'amber', desc: 'Krisis: Bulan 3, 6, 9.', crisisMonths: [3, 6, 9] }
};

const CRISIS_DESC = [
  "Usahanya bangkrut karena inflasi.",
  "Terserang hama paceklik musim kemarau.",
  "Rumahnya terbakar habis tanpa sisa.",
  "Kapal dagangnya tenggelam diterjang badai.",
  "Tabungannya ludes karena tertipu investasi bodong."
];

interface PlayerPos { x: number; y: number }
interface AdventureStats { trust: number; population_saved: number; cash: number; rice: number; gold: number }

export function AdventureGameView({ 
  playerName, playerAvatar, isMultiplayer = false, socket = null, roomId = null, playerId = null, otherPlayers = [], onGoHome
}: any) {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'ENDING'>('START');
  const [level, setLevel] = useState<keyof typeof LEVELS>('JUNIOR');
  const [month, setMonth] = useState(0);
  const [maxMonths, setMaxMonths] = useState(4);
  const [currentMap, setCurrentMap] = useState<string>('');
  const [playerPos, setPlayerPos] = useState<PlayerPos>({ x: 2, y: 2 });
  const [stats, setStats] = useState<AdventureStats>({ trust: 60, population_saved: 0, cash: 0, rice: 0, gold: 0 });
  const [activeMaps, setActiveMaps] = useState<any[]>([]);
  const [completedThisMonth, setCompletedThisMonth] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>(["Selamat datang, Petugas Amil."]);

  const [modalState, setModalState] = useState<{isOpen: boolean, type: 'NPC' | 'CRISIS', data: any, reason?: string}>({isOpen: false, type: 'NPC', data: null});
  const [questInput, setQuestInput] = useState('');

  // Multiplayer sync
  useEffect(() => {
    if (isMultiplayer && socket && gameState === 'PLAYING') {
      socket.send(JSON.stringify({
        type: 'ADVENTURE_SYNC',
        payload: {
          mapName: currentMap,
          pos: playerPos,
          stats: {
             score: (stats.population_saved * 100) + stats.trust,
             trust: stats.trust,
             population: stats.population_saved
          }
        }
      }));
    }
  }, [playerPos, currentMap, stats, isMultiplayer, socket, gameState]);

  const startGame = (lvl: keyof typeof LEVELS) => {
    soundEffects.playVictoryFanfare();
    const config = LEVELS[lvl];
    setGameState('PLAYING');
    setLevel(lvl);
    setMaxMonths(config.months);
    setMonth(0);
    setStats({ trust: 60, population_saved: 0, cash: 0, rice: 0, gold: 0 });
    setLog([`Tugas dimulai sebagai ${config.label}.`]);
    setCompletedThisMonth([]);
    
    const maps = JSON.parse(JSON.stringify(ALL_MAPS.slice(0, config.cityCount)));
    setActiveMaps(maps);
    setCurrentMap(maps[0].name);
    setPlayerPos({ x: 2, y: 2 });
  };

  const move = useCallback((dx: number, dy: number) => {
    if (gameState !== 'PLAYING' || modalState.isOpen) return;
    setPlayerPos(prev => {
      const nx = Math.max(0, Math.min(4, prev.x + dx));
      const ny = Math.max(0, Math.min(4, prev.y + dy));
      if (nx !== prev.x || ny !== prev.y) {
        soundEffects.playClick();
        checkInteraction(nx, ny, currentMap, activeMaps, completedThisMonth);
        return { x: nx, y: ny };
      }
      return prev;
    });
  }, [gameState, modalState.isOpen, currentMap, activeMaps, completedThisMonth]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') move(0, -1);
      if (e.key === 'ArrowDown') move(0, 1);
      if (e.key === 'ArrowLeft') move(-1, 0);
      if (e.key === 'ArrowRight') move(1, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const checkInteraction = (x: number, y: number, mapName: string, maps: any[], completed: string[]) => {
    const mapData = maps.find((m: any) => m.name === mapName);
    if (!mapData) return;
    const npc = mapData.npcs.find((n: any) => n.x === x && n.y === y);
    if (npc && !completed.includes(`${npc.id}_${month}`)) {
      soundEffects.playClick();
      setModalState({ isOpen: true, type: 'NPC', data: npc });
      setQuestInput('');
    }
  };

  const liquidate = (type: 'rice' | 'gold') => {
    soundEffects.playClick();
    if (stats[type] <= 0) return;
    const amount = stats[type];
    const gain = amount * PRICES[type];
    setStats(prev => ({ ...prev, [type]: 0, cash: prev.cash + gain }));
    setLog(prev => [`PASAR: Menjual ${amount} ${type === 'rice' ? 'kg Beras' : 'gr Emas'} seharga Rp ${gain.toLocaleString()}.`, ...prev]);
  };

  const triggerCrisis = (maps: any[]) => {
    const muzakkis: any[] = [];
    maps.forEach(map => {
      map.npcs.forEach((npc: any) => {
        if (npc.type === 'MUZAKKI') muzakkis.push({mapName: map.name, npc});
      });
    });

    if (muzakkis.length > 0) {
      const target = muzakkis[Math.floor(Math.random() * muzakkis.length)];
      const reason = CRISIS_DESC[Math.floor(Math.random() * CRISIS_DESC.length)];
      target.npc.type = 'MUSTAHIK';
      target.npc.isHelped = false;
      target.npc.cost = 4000000 + (Math.floor(Math.random() * 6) * 1000000);
      target.npc.name = target.npc.name.replace(" (Mandiri)", "");
      setModalState({ isOpen: true, type: 'CRISIS', data: target.npc, reason });
      setLog(prev => [`DARURAT: ${target.npc.name} jatuh miskin!`, ...prev]);
      soundEffects.playWrong();
    }
  };

  const nextMonth = () => {
    soundEffects.playCorrect();
    if (month >= maxMonths - 1) {
      setGameState('ENDING');
      if (isMultiplayer && socket) {
         socket.send(JSON.stringify({ type: 'ADVENTURE_END', payload: { score: (stats.population_saved * 100) + stats.trust }}));
      }
    } else {
      setMonth(prev => prev + 1);
      const newMaps = [...activeMaps];
      newMaps.forEach(map => {
        map.npcs.forEach((npc: any) => {
          if (npc.type === 'MUSTAHIK' && npc.isHelped) {
            npc.type = 'MUZAKKI';
            npc.name += " (Mandiri)";
            npc.quest = 'TERNAK';
            setLog(prev => [`BERKAH: ${npc.name} kini mandiri!`, ...prev]);
          }
        });
      });
      setActiveMaps(newMaps);
      
      const config = LEVELS[level];
      if (config.crisisMonths.includes(month + 2)) { // +2 because month is 0-indexed and we are advancing
        triggerCrisis(newMaps);
      }
      setCompletedThisMonth([]);
      setLog(prev => [`--- Memasuki Bulan ${month + 2} ---`, ...prev]);
    }
  };

  const handleNPCAction = () => {
    const npc = modalState.data;
    const isMuzakki = npc.type === 'MUZAKKI';
    if (isMuzakki) {
      const input = parseFloat(questInput);
      const quest = QUESTS[npc.quest as keyof typeof QUESTS];
      if (input === quest.target) {
        soundEffects.playCorrect();
        setStats(prev => ({ ...prev, [quest.unit]: prev[quest.unit as keyof AdventureStats] + quest.target, trust: Math.min(100, prev.trust + 5) }));
        setLog(prev => [`BERHASIL: Menerima ${quest.target} ${quest.label} dari ${npc.name}.`, ...prev]);
        setCompletedThisMonth(prev => [...prev, `${npc.id}_${month}`]);
        setModalState({ isOpen: false, type: 'NPC', data: null });
      } else {
        soundEffects.playWrong();
        setStats(prev => ({ ...prev, trust: Math.max(0, prev.trust - 5) }));
        setLog(prev => [`SALAH: Perhitungan zakat ${npc.name} keliru.`, ...prev]);
        setModalState({ isOpen: false, type: 'NPC', data: null });
      }
    } else {
      if (stats.cash >= npc.cost) {
        soundEffects.playCorrect();
        setStats(prev => ({ ...prev, cash: prev.cash - npc.cost, population_saved: prev.population_saved + 1, trust: Math.min(100, prev.trust + 5) }));
        npc.isHelped = true;
        setLog(prev => [`MULIA: Bantuan disalurkan. ${npc.name} akan mulai mandiri bulan depan!`, ...prev]);
        setCompletedThisMonth(prev => [...prev, `${npc.id}_${month}`]);
        setModalState({ isOpen: false, type: 'NPC', data: null });
      } else {
        soundEffects.playWrong();
        setLog(prev => [`GAGAL: Uang tunai tidak cukup. Tukarkan aset di Gudang!`, ...prev]);
        setModalState({ isOpen: false, type: 'NPC', data: null });
      }
    }
  };

  const getSpriteClass = (type: string) => {
    if (type === 'PLAYER') return 'bg-emerald-500';
    if (type === 'MUZAKKI') return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 relative z-10 text-[#3D405B] font-sans">
      
      {/* Header */}
      {gameState !== 'START' && (
        <div className="bg-[#FDFCF0] p-4 rounded-3xl flex flex-col md:flex-row gap-4 shadow-[4px_4px_0px_#3D405B] border-2 border-[#3D405B]">
          <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-[#3D405B]/20 pb-3 md:pb-0 md:pr-4">
            <button onClick={onGoHome} className="w-10 h-10 bg-[#E07A5F] text-white rounded-xl border-2 border-[#3D405B] flex items-center justify-center hover:scale-105 transition-transform"><Home size={18} /></button>
            <div>
              <h2 className="font-black text-sm leading-tight uppercase">{LEVELS[level].label}</h2>
              <p className="text-[10px] text-[#3D405B]/70 font-bold uppercase tracking-wider">Bulan {month + 1}/{maxMonths}</p>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div className="bg-emerald-50 border-2 border-emerald-200 p-2 rounded-2xl flex flex-col items-center justify-center"><span className="text-[9px] font-black text-emerald-600 uppercase">Rupiah</span><span className="font-bold text-[11px]">Rp {stats.cash.toLocaleString()}</span></div>
            <div className="bg-amber-50 border-2 border-amber-200 p-2 rounded-2xl flex flex-col items-center justify-center"><span className="text-[9px] font-black text-amber-600 uppercase">Beras</span><span className="font-bold text-[11px]">{stats.rice.toLocaleString()} kg</span></div>
            <div className="bg-yellow-50 border-2 border-yellow-200 p-2 rounded-2xl flex flex-col items-center justify-center"><span className="text-[9px] font-black text-yellow-600 uppercase">Emas</span><span className="font-bold text-[11px]">{stats.gold.toLocaleString()} gr</span></div>
          </div>
        </div>
      )}

      {/* Main View */}
      {gameState === 'START' && (
         <div className="max-w-4xl mx-auto flex flex-col items-center gap-10 py-10">
            <div className="text-center animate-bounce">
                <div className="inline-flex p-5 bg-emerald-100 text-emerald-600 rounded-3xl border-2 border-emerald-300 mb-6 shadow-xl">
                    <TrendingUp size={48} />
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-[#3D405B] tracking-tighter mb-4 uppercase">Zakat Adventure</h1>
                <p className="text-[#3D405B]/80 text-lg md:text-xl font-bold max-w-lg mx-auto leading-relaxed">Pimpin misi kemandirian umat dan hadapi tantangan krisis ekonomi.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {(Object.keys(LEVELS) as Array<keyof typeof LEVELS>).map((lvl) => {
                  const LvlIcon = LEVELS[lvl].icon;
                  return (
                    <button key={lvl} onClick={() => startGame(lvl)} className="group relative bg-[#FDFCF0] p-8 rounded-3xl border-4 border-[#3D405B] hover:border-emerald-500 hover:shadow-[6px_6px_0px_#10b981] transition-all flex flex-col items-center text-center gap-4 overflow-hidden shadow-[4px_4px_0px_#3D405B]">
                        <div className="relative z-10 w-16 h-16 bg-emerald-100 text-emerald-600 border-2 border-emerald-300 rounded-2xl flex items-center justify-center mb-2"><LvlIcon size={32} /></div>
                        <div className="relative z-10">
                          <h3 className="text-2xl font-black text-[#3D405B] mb-1">Amil {LEVELS[lvl].label}</h3>
                          <div className="flex flex-col items-center justify-center gap-1 mb-3">
                            <span className="px-3 py-1 bg-slate-100 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest">{LEVELS[lvl].cityCount} Kota • {LEVELS[lvl].months} Bulan</span>
                            <span className="text-[9px] text-rose-500 font-bold uppercase tracking-wider">{LEVELS[lvl].desc}</span>
                          </div>
                        </div>
                    </button>
                  );
                })}
            </div>
        </div>
      )}

      {gameState === 'PLAYING' && (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-square bg-emerald-50 border-4 border-[#3D405B] rounded-3xl shadow-[6px_6px_0px_#3D405B] grid grid-cols-5 grid-rows-5 overflow-hidden">
                  {/* Grid Cells */}
                  {Array.from({length:25}).map((_, i) => <div key={i} className="border border-[#3D405B]/10"></div>)}
                  
                  {/* NPCs */}
                  {activeMaps.find(m => m.name === currentMap)?.npcs.map((npc: any) => {
                      const isDone = completedThisMonth.includes(`${npc.id}_${month}`);
                      return (
                        <div key={npc.id} className={`absolute w-[20%] h-[20%] flex items-center justify-center transition-all ${isDone ? 'opacity-40' : 'animate-pulse'}`} style={{ left: `${npc.x*20}%`, top: `${npc.y*20}%` }}>
                           <div className={`w-8 h-8 rounded-lg border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] flex items-center justify-center text-white ${getSpriteClass(npc.type)}`}>
                             {npc.type === 'MUZAKKI' ? <Package size={16}/> : <Heart size={16}/>}
                           </div>
                        </div>
                      )
                  })}

                  {/* Other Players (Multiplayer) */}
                  {isMultiplayer && otherPlayers.map((p: any) => {
                    if (p.mapName === currentMap && p.id !== playerId && p.pos) {
                      return (
                        <div key={p.id} className="absolute w-[20%] h-[20%] flex flex-col items-center justify-center transition-all opacity-80" style={{ left: `${p.pos.x*20}%`, top: `${p.pos.y*20}%` }}>
                          <span className="text-[8px] font-bold bg-white/80 px-1 rounded-sm border border-gray-400 mb-0.5">{p.name}</span>
                          <div className="text-xl">{p.avatar}</div>
                        </div>
                      );
                    }
                    return null;
                  })}

                  {/* Player */}
                  <div className="absolute w-[20%] h-[20%] flex flex-col items-center justify-center transition-all z-20" style={{ left: `${playerPos.x*20}%`, top: `${playerPos.y*20}%` }}>
                      <div className="w-10 h-10 rounded-full border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B] bg-[#F2CC8F] flex items-center justify-center text-2xl">
                         {playerAvatar}
                      </div>
                  </div>
              </div>
              
              <div className="flex gap-2 mt-4 w-full overflow-x-auto pb-2 custom-scrollbar">
                  {activeMaps.map(m => (
                    <button key={m.name} onClick={() => { soundEffects.playClick(); setCurrentMap(m.name); setPlayerPos({x:2, y:2}); }} 
                      className={`flex-1 min-w-[120px] p-3 rounded-2xl border-2 transition-all flex flex-col items-center ${currentMap === m.name ? 'bg-[#FDFCF0] border-emerald-500 shadow-[2px_2px_0px_#10b981]' : 'bg-[#FDFCF0]/50 border-[#3D405B]/30 text-[#3D405B]/60 hover:bg-[#FDFCF0]'}`}>
                      <span className="text-[11px] font-black uppercase leading-none mt-1">{m.name}</span>
                    </button>
                  ))}
              </div>

              {/* Mobile controls */}
              <div className="grid grid-cols-3 gap-2 mt-4 md:hidden">
                <div></div>
                <button onClick={() => move(0, -1)} className="p-3 bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl shadow-[2px_2px_0px_#3D405B] flex justify-center"><ChevronRight size={20} className="-rotate-90"/></button>
                <div></div>
                <button onClick={() => move(-1, 0)} className="p-3 bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl shadow-[2px_2px_0px_#3D405B] flex justify-center"><ChevronRight size={20} className="rotate-180"/></button>
                <button onClick={() => move(0, 1)} className="p-3 bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl shadow-[2px_2px_0px_#3D405B] flex justify-center"><ChevronRight size={20} className="rotate-90"/></button>
                <button onClick={() => move(1, 0)} className="p-3 bg-[#FDFCF0] border-2 border-[#3D405B] rounded-xl shadow-[2px_2px_0px_#3D405B] flex justify-center"><ChevronRight size={20}/></button>
              </div>
          </div>

          <div className="w-full lg:w-80 flex flex-col gap-4">
              <div className="bg-[#FDFCF0] p-5 rounded-3xl border-2 border-[#3D405B] shadow-[4px_4px_0px_#3D405B]">
                  <h3 className="font-black text-xs text-[#3D405B] uppercase tracking-widest mb-4 flex items-center gap-2"><ShoppingCart size={16} /> Gudang & Pasar</h3>
                  <div className="space-y-3">
                      <div className="flex items-center justify-between bg-[#F4F1DE] border-2 border-[#3D405B]/20 p-3 rounded-2xl">
                        <div><p className="text-[10px] font-bold text-[#3D405B] uppercase">Beras ({stats.rice}kg)</p><p className="text-[9px] text-emerald-600 font-bold">Rp {PRICES.rice}/kg</p></div>
                        <button onClick={() => liquidate('rice')} disabled={stats.rice <= 0} className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-2 rounded-xl disabled:opacity-30 border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">UANGKAN</button>
                      </div>
                      <div className="flex items-center justify-between bg-[#F4F1DE] border-2 border-[#3D405B]/20 p-3 rounded-2xl">
                        <div><p className="text-[10px] font-bold text-[#3D405B] uppercase">Emas ({stats.gold}gr)</p><p className="text-[9px] text-amber-600 font-bold">Rp {PRICES.gold.toLocaleString()}/gr</p></div>
                        <button onClick={() => liquidate('gold')} disabled={stats.gold <= 0} className="bg-amber-600 text-white text-[10px] font-bold px-3 py-2 rounded-xl disabled:opacity-30 border-2 border-[#3D405B] shadow-[2px_2px_0px_#3D405B]">UANGKAN</button>
                      </div>
                  </div>
              </div>
              <div className="bg-[#FDFCF0] p-5 rounded-3xl border-2 border-[#3D405B] shadow-[4px_4px_0px_#3D405B]">
                <h3 className="font-black text-xs text-[#3D405B] uppercase tracking-widest mb-4 text-center">Pencapaian</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] font-black mb-1"><span>KEPERCAYAAN</span><span>{stats.trust}%</span></div>
                    <div className="h-2.5 bg-[#F4F1DE] border-2 border-[#3D405B] rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{width:`${stats.trust}%`}}></div></div>
                  </div>
                  <div className="flex justify-between items-center"><span className="text-xs font-black">Warga Mandiri</span><span className="font-black text-emerald-600">{stats.population_saved} Jiwa</span></div>
                </div>
              </div>
              <button onClick={nextMonth} className="bg-[#E07A5F] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 border-2 border-[#3D405B] shadow-[4px_4px_0px_#3D405B] hover:-translate-y-1 transition-transform">LANJUT BULAN <ChevronRight size={18} /></button>
          </div>
        </div>
      )}

      {gameState === 'ENDING' && (
        <div className="bg-[#FDFCF0] p-12 rounded-[3rem] text-center border-4 border-[#3D405B] shadow-[8px_8px_0px_#3D405B] max-w-xl mx-auto animate-fade-in">
            <div className="w-20 h-20 bg-[#F2CC8F] text-[#3D405B] border-2 border-[#3D405B] rounded-3xl flex items-center justify-center mx-auto mb-6"><Trophy size={40} /></div>
            <h1 className="text-3xl font-black mb-2 text-[#3D405B]">Misi Selesai!</h1>
            <p className="text-emerald-600 font-black text-xl mb-4 tracking-wider">SKOR AKHIR: {(stats.population_saved * 100) + stats.trust}</p>
            <p className="text-[#3D405B]/70 mb-8 italic font-bold">"Dedikasi Anda telah memandirikan umat."</p>
            <div className="bg-[#F4F1DE] border-2 border-[#3D405B] rounded-2xl p-6 mb-8 grid grid-cols-2 gap-4 text-center">
                <div><p className="text-2xl font-black text-[#E07A5F]">{stats.population_saved}</p><p className="text-[10px] text-[#3D405B] font-bold uppercase tracking-widest">Warga Mandiri</p></div>
                <div><p className="text-2xl font-black text-emerald-600">{stats.trust}%</p><p className="text-[10px] text-[#3D405B] font-bold uppercase tracking-widest">Kepercayaan</p></div>
            </div>
            <button onClick={onGoHome} className="w-full bg-[#81B29A] text-[#3D405B] font-black py-4 rounded-2xl border-2 border-[#3D405B] shadow-[4px_4px_0px_#3D405B] hover:-translate-y-1 transition-transform">MAIN LAGI (HOME)</button>
        </div>
      )}

      {/* Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/80 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="w-full max-w-md bg-[#FDFCF0] border-4 border-[#3D405B] rounded-3xl p-6 shadow-[8px_8px_0px_#000000] animate-fade-in text-center">
              {modalState.type === 'NPC' && modalState.data && (() => {
                 const npc = modalState.data;
                 const isMuzakki = npc.type === 'MUZAKKI';
                 const quest = isMuzakki ? QUESTS[npc.quest as keyof typeof QUESTS] : null;
                 const assistance = LEVELS[level].assistance;
                 return (
                   <>
                      <div className={`w-16 h-16 ${isMuzakki ? 'bg-[#F2CC8F]' : 'bg-[#E07A5F]'} text-[#3D405B] border-2 border-[#3D405B] rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        {isMuzakki ? <Package size={30} /> : <Heart size={30} />}
                      </div>
                      <h3 className="text-xl font-black text-[#3D405B]">{npc.name}</h3>
                      <p className="text-sm text-[#3D405B]/80 mt-2 font-bold mb-6">"{isMuzakki ? quest?.dialog : `Membutuhkan bantuan modal untuk mandiri: Rp ${npc.cost.toLocaleString()}`}"</p>
                      
                      {isMuzakki ? (
                         <div className="mb-6">
                            <input type="number" value={questInput} onChange={e => setQuestInput(e.target.value)} className="w-full bg-[#F4F1DE] p-4 rounded-2xl text-xl font-black text-center border-2 border-[#3D405B] outline-none" placeholder="Hasil Hitungan" autoFocus />
                            {assistance === 'FULL' && <p className="text-[10px] text-[#3D405B]/60 mt-2 font-bold uppercase tracking-wider">Target: Ketik {quest?.target} ({quest?.label})</p>}
                            {assistance === 'HALF' && <p className="text-[10px] text-emerald-600 mt-2 font-bold uppercase italic tracking-wider">{quest?.formula}</p>}
                         </div>
                      ) : (
                         <div className="bg-[#F4F1DE] border-2 border-[#3D405B] p-4 rounded-2xl mb-6">
                            <p className="text-xs font-black text-[#E07A5F]">Biaya Penyaluran: Rp {npc.cost.toLocaleString()}</p>
                         </div>
                      )}

                      <div className="flex flex-col gap-2">
                          <button onClick={handleNPCAction} className="w-full bg-[#81B29A] text-[#3D405B] font-black py-4 rounded-2xl border-2 border-[#3D405B] shadow-[4px_4px_0px_#3D405B] hover:-translate-y-1 transition-transform">
                             {isMuzakki ? 'TERIMA ZAKAT' : 'SALURKAN BANTUAN'}
                          </button>
                          <button onClick={() => setModalState({isOpen: false, type: 'NPC', data: null})} className="w-full py-3 text-[#3D405B]/60 font-black text-xs uppercase hover:text-[#3D405B]">Batalkan</button>
                      </div>
                   </>
                 );
              })()}

              {modalState.type === 'CRISIS' && modalState.data && (
                <>
                   <div className="w-20 h-20 bg-rose-100 border-2 border-[#3D405B] text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <AlertTriangle size={40} />
                   </div>
                   <h2 className="text-2xl font-black text-rose-600 mb-2 uppercase">Krisis Ekonomi!</h2>
                   <div className="bg-[#F4F1DE] border-2 border-[#3D405B] p-6 rounded-2xl mb-6 text-left">
                       <p className="text-[#3D405B] font-black text-lg mb-1">{modalState.data.name}</p>
                       <p className="text-[#3D405B]/70 font-bold text-sm italic">"{modalState.reason}"</p>
                   </div>
                   <button onClick={() => setModalState({isOpen: false, type: 'NPC', data: null})} className="w-full bg-[#3D405B] text-[#FDFCF0] font-black py-4 rounded-2xl border-2 border-[#3D405B] shadow-[4px_4px_0px_#000000] hover:-translate-y-1 transition-transform">SAYA MENGERTI</button>
                </>
              )}
           </div>
        </div>
      )}

    </div>
  );
}
