import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { ZAKAT_QUESTIONS_BANK, getQuestionsForGameSession, LEVEL_PRIZES } from './src/data/zakatQuestions';
import { Question, RoomState, Player, ChatMessage, LeaderboardEntry } from './src/types/zakat';

const PORT = 3000;
const app = express();
const httpServer = createServer(app);

app.use(express.json());

// In-Memory Storage for Rooms
const rooms: Record<string, RoomState & { questions: Question[]; timer?: NodeJS.Timeout }> = {};

// Helper: Generate 6-character room code
function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Map WebSockets to user & room
interface ExtendedWebSocket extends WebSocket {
  roomId?: string;
  playerId?: string;
  isAlive?: boolean;
}

const wss = new WebSocketServer({ server: httpServer });

function broadcastToRoom(roomId: string, data: any) {
  const payload = JSON.stringify(data);
  wss.clients.forEach((client) => {
    const extClient = client as ExtendedWebSocket;
    if (extClient.roomId === roomId && extClient.readyState === WebSocket.OPEN) {
      extClient.send(payload);
    }
  });
}

function calculateSessionLeaderboard(room: RoomState): LeaderboardEntry[] {
  const playersList = Object.values(room.players);
  const sorted = [...playersList].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.levelReached - a.levelReached;
  });

  return sorted.map((p, idx) => {
    const correctCount = Object.values(p.answersHistory).filter(ans => ans.isCorrect).length;
    return {
      rank: idx + 1,
      playerId: p.id,
      name: p.name,
      avatar: p.avatar,
      score: p.score,
      levelReached: p.levelReached,
      correctCount,
      streak: p.streak
    };
  });
}

// REST API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', activeRooms: Object.keys(rooms).length });
});

app.get('/api/rooms', (req, res) => {
  const activeList = Object.values(rooms)
    .filter(r => r.status === 'waiting')
    .map(r => ({
      id: r.id,
      code: r.code,
      name: r.name,
      gameType: r.gameType,
      playerCount: Object.keys(r.players).length,
      status: r.status
    }));
  res.json(activeList);
});

// Server-side Gemini AI for Tanya Ustadz
app.post('/api/ustadz-ai', async (req, res) => {
  try {
    const { questionText, options, category } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        advice: 'Bismillah! Bacalah soal dengan teliti. Ingat rukun dan nisab zakat yang sudah kita pelajari ya!'
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Kamu adalah seorang Ustadz ramah dan bijak yang sedang mengajar anak-anak SD tentang Zakat dalam sebuah game kuis interaktif.
Soal: "${questionText}"
Kategori: ${category}
Pilihan: ${JSON.stringify(options)}

Berikan 2-3 kalimat petunjuk ringkas, hangat, mudah dipahami anak-anak (panggilan "Anakku/Adik-adik"), yang membantu mereka memilih jawaban yang benar tanpa langsung menyebut opsi A/B/C/D secara gamblang.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ advice: response.text || 'Inatlah nasehat ustadz tentang zakat!' });
  } catch (err: any) {
    console.error('Gemini Ustadz Error:', err);
    res.json({ advice: 'Tetap semangat! Pelajari kembali syarat nisab dan kadar zakat dengan cermat ya.' });
  }
});

// WebSocket Connection Logic
wss.on('connection', (ws: ExtendedWebSocket) => {
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', (messageRaw: string) => {
    try {
      const data = JSON.parse(messageRaw.toString());
      const { type, payload } = data;

      switch (type) {
        case 'CREATE_ROOM': {
          const { roomName, hostName, avatar, gameType = 'millionaire' } = payload;
          const code = generateRoomCode();
          const roomId = `room_${code}`;
          const hostId = `player_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

          const hostPlayer: Player = {
            id: hostId,
            name: hostName || 'Tuan Rumah',
            avatar: avatar || '👳‍♂️',
            score: 0,
            levelReached: 1,
            isHost: true,
            isReady: true,
            isOnline: true,
            streak: 0,
            lifelines: { fiftyFifty: true, ustadz: true, jamaah: true },
            answersHistory: {}
          };

          rooms[roomId] = {
            id: roomId,
            code,
            name: roomName || `Petualangan Zakat ${code}`,
            hostId,
            gameType,
            status: 'waiting',
            currentQuestionIndex: 0,
            questionStartTime: 0,
            timeLimit: 30,
            players: { [hostId]: hostPlayer },
            adventurePlayers: [],
            chatMessages: [
              {
                id: `msg_${Date.now()}`,
                sender: 'Sistem',
                text: `Ruangan ${code} berhasil dibuat! Bagikan PIN ini ke kawan-kawanmu.`,
                timestamp: Date.now(),
                type: 'system'
              }
            ],
            questions: []
          };

          ws.roomId = roomId;
          ws.playerId = hostId;

          ws.send(JSON.stringify({
            type: 'ROOM_JOINED',
            payload: {
              room: getCleanRoomState(rooms[roomId]),
              playerId: hostId
            }
          }));
          break;
        }

        case 'JOIN_ROOM': {
          const { roomCode, playerName, avatar } = payload;
          const roomKey = Object.keys(rooms).find(k => rooms[k].code.toUpperCase() === roomCode.trim().toUpperCase());

          if (!roomKey || !rooms[roomKey]) {
            ws.send(JSON.stringify({ type: 'ERROR', payload: 'Kode ruangan tidak ditemukan!' }));
            return;
          }

          const room = rooms[roomKey];
          if (room.status !== 'waiting') {
            ws.send(JSON.stringify({ type: 'ERROR', payload: 'Permainan di ruangan ini sudah berjalan!' }));
            return;
          }

          if (Object.keys(room.players).length >= 1000) {
            ws.send(JSON.stringify({ type: 'ERROR', payload: 'Ruangan ini sudah penuh (maksimal 1000 pemain)!' }));
            return;
          }

          const playerId = `player_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
          const newPlayer: Player = {
            id: playerId,
            name: playerName || `Pahlawan Zakat`,
            avatar: avatar || '🧒',
            score: 0,
            levelReached: 1,
            isHost: false,
            isReady: false,
            isOnline: true,
            isEliminated: false,
            streak: 0,
            lifelines: { fiftyFifty: true, ustadz: true, jamaah: true },
            answersHistory: {}
          };

          room.players[playerId] = newPlayer;
          room.chatMessages.push({
            id: `msg_${Date.now()}`,
            sender: 'Sistem',
            text: `${newPlayer.name} bergabung ke ruangan!`,
            timestamp: Date.now(),
            type: 'system'
          });

          ws.roomId = room.id;
          ws.playerId = playerId;

          ws.send(JSON.stringify({
            type: 'ROOM_JOINED',
            payload: {
              room: getCleanRoomState(room),
              playerId
            }
          }));

          broadcastToRoom(room.id, {
            type: 'ROOM_UPDATE',
            payload: getCleanRoomState(room)
          });
          break;
        }

        case 'TOGGLE_READY': {
          const { roomId, playerId } = ws;
          if (!roomId || !playerId || !rooms[roomId]) return;
          const room = rooms[roomId];
          if (room.players[playerId]) {
            room.players[playerId].isReady = !room.players[playerId].isReady;
            broadcastToRoom(roomId, {
              type: 'ROOM_UPDATE',
              payload: getCleanRoomState(room)
            });
          }
          break;
        }

        case 'START_GAME': {
          const { roomId, playerId } = ws;
          if (!roomId || !playerId || !rooms[roomId]) return;
          const room = rooms[roomId];

          if (room.hostId !== playerId) {
            ws.send(JSON.stringify({ type: 'ERROR', payload: 'Hanya Tuan Rumah yang bisa memulai permainan!' }));
            return;
          }

          room.questions = getQuestionsForGameSession();
          room.status = 'playing';
          room.currentQuestionIndex = 0;
          room.questionStartTime = Date.now();

          // Reset all players scores/answers
          Object.values(room.players).forEach(p => {
            p.score = 0;
            p.levelReached = 1;
            p.streak = 0;
            p.isEliminated = false;
            p.lifelines = { fiftyFifty: true, ustadz: true, jamaah: true };
            p.answersHistory = {};
            delete p.currentAnswer;
          });

          broadcastToRoom(roomId, {
            type: 'GAME_STARTED',
            payload: {
              room: getCleanRoomState(room),
              currentQuestion: room.questions[0]
            }
          });
          break;
        }

        case 'SUBMIT_ANSWER': {
          const { roomId, playerId } = ws;
          if (!roomId || !playerId || !rooms[roomId]) return;
          const room = rooms[roomId];
          if (room.status !== 'playing') return;

          const { chosenOptionIndex, timeTaken } = payload;
          const player = room.players[playerId];
          const currentQ = room.questions[room.currentQuestionIndex];

          if (!player || !currentQ || player.currentAnswer !== undefined || player.isEliminated) return;

          const isCorrect = chosenOptionIndex === currentQ.correctAnswerIndex;
          let pointsEarned = 0;

          if (isCorrect) {
            const levelInfo = LEVEL_PRIZES[currentQ.level - 1] || LEVEL_PRIZES[LEVEL_PRIZES.length - 1];
            // Base prize + speed bonus (up to 20% bonus)
            const speedBonus = Math.max(0, Math.floor((30 - timeTaken) * 2000));
            pointsEarned = levelInfo.prize + speedBonus;
            player.score += pointsEarned;
            player.levelReached = currentQ.level;
            player.streak += 1;
          } else {
            player.streak = 0;
            player.isEliminated = true; // GUGUR! Peserta yang salah tidak bisa lagi menjawab soal berikutnya
          }

          player.currentAnswer = {
            chosenOption: chosenOptionIndex,
            timeTaken,
            isCorrect,
            pointsEarned
          };

          player.answersHistory[currentQ.level] = player.currentAnswer;

          // Check if all active non-eliminated players answered
          const activePlayers = Object.values(room.players).filter(p => p.isOnline && !p.isEliminated);
          const allAnswered = activePlayers.length === 0 || activePlayers.every(p => p.currentAnswer !== undefined);

          broadcastToRoom(roomId, {
            type: 'PLAYER_ANSWERED',
            payload: {
              playerId,
              hasAnswered: true,
              allAnswered,
              room: getCleanRoomState(room)
            }
          });

          if (allAnswered) {
            // If all players in the room are eliminated, end the game immediately
            if (activePlayers.length === 0) {
              room.status = 'game_over';
              const leaderboard = calculateSessionLeaderboard(room);
              broadcastToRoom(roomId, {
                type: 'GAME_OVER',
                payload: {
                  room: getCleanRoomState(room),
                  leaderboard
                }
              });
            } else {
              room.status = 'question_results';
              const leaderboard = calculateSessionLeaderboard(room);
              broadcastToRoom(roomId, {
                type: 'QUESTION_RESULTS',
                payload: {
                  room: getCleanRoomState(room),
                  correctAnswerIndex: currentQ.correctAnswerIndex,
                  explanation: currentQ.explanation,
                  leaderboard
                }
              });
            }
          }
          break;
        }

        case 'NEXT_QUESTION': {
          const { roomId, playerId } = ws;
          if (!roomId || !playerId || !rooms[roomId]) return;
          const room = rooms[roomId];

          if (room.hostId !== playerId && room.status !== 'question_results') return;

          const remainingActivePlayers = Object.values(room.players).filter(p => p.isOnline && !p.isEliminated);

          if (remainingActivePlayers.length > 0 && room.currentQuestionIndex + 1 < room.questions.length) {
            room.currentQuestionIndex += 1;
            room.status = 'playing';
            room.questionStartTime = Date.now();

            // Clear current answers
            Object.values(room.players).forEach(p => {
              delete p.currentAnswer;
            });

            broadcastToRoom(roomId, {
              type: 'NEXT_QUESTION',
              payload: {
                room: getCleanRoomState(room),
                currentQuestion: room.questions[room.currentQuestionIndex]
              }
            });
          } else {
            // Finished game or all players eliminated!
            room.status = 'game_over';
            const leaderboard = calculateSessionLeaderboard(room);
            broadcastToRoom(roomId, {
              type: 'GAME_OVER',
              payload: {
                room: getCleanRoomState(room),
                leaderboard
              }
            });
          }
          break;
        }

        case 'USE_LIFELINE': {
          const { roomId, playerId } = ws;
          if (!roomId || !playerId || !rooms[roomId]) return;
          const room = rooms[roomId];
          const player = room.players[playerId];
          const { lifelineType } = payload; // 'fiftyFifty' | 'ustadz' | 'jamaah'

          if (!player || !player.lifelines[lifelineType as keyof typeof player.lifelines]) return;

          player.lifelines[lifelineType as keyof typeof player.lifelines] = false;
          const currentQ = room.questions[room.currentQuestionIndex];

          let resultData: any = {};
          if (lifelineType === 'fiftyFifty') {
            // Keep correct + 1 wrong
            const correct = currentQ.correctAnswerIndex;
            const wrongOptions = [0, 1, 2, 3].filter(idx => idx !== correct);
            const keepWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
            const disabledIndices = [0, 1, 2, 3].filter(idx => idx !== correct && idx !== keepWrong);
            resultData = { disabledIndices };
          } else if (lifelineType === 'jamaah') {
            // Generate audience percentage
            const correct = currentQ.correctAnswerIndex;
            const percents = [0, 0, 0, 0];
            percents[correct] = 55 + Math.floor(Math.random() * 25);
            let remaining = 100 - percents[correct];

            const wrongIdxs = [0, 1, 2, 3].filter(i => i !== correct);
            wrongIdxs.forEach((wIdx, i) => {
              if (i === wrongIdxs.length - 1) {
                percents[wIdx] = remaining;
              } else {
                const portion = Math.floor(Math.random() * (remaining / 2));
                percents[wIdx] = portion;
                remaining -= portion;
              }
            });
            resultData = { percents };
          }

          ws.send(JSON.stringify({
            type: 'LIFELINE_USED',
            payload: {
              lifelineType,
              resultData,
              player
            }
          }));

          broadcastToRoom(roomId, {
            type: 'ROOM_UPDATE',
            payload: getCleanRoomState(room)
          });
          break;
        }

        case 'SEND_CHAT': {
          const { roomId, playerId } = ws;
          if (!roomId || !playerId || !rooms[roomId]) return;
          const room = rooms[roomId];
          const player = room.players[playerId];

          if (!player) return;

          const newMsg: ChatMessage = {
            id: `msg_${Date.now()}_${Math.random()}`,
            sender: player.name,
            avatar: player.avatar,
            text: payload.text,
            timestamp: Date.now(),
            type: payload.type || 'chat'
          };

          room.chatMessages.push(newMsg);
          if (room.chatMessages.length > 50) room.chatMessages.shift();

          broadcastToRoom(roomId, {
            type: 'NEW_CHAT',
            payload: newMsg
          });
          break;
        }

        case 'ADVENTURE_SYNC': {
          const { roomId, playerId } = ws;
          if (!roomId || !playerId || !rooms[roomId]) return;
          const room = rooms[roomId];
          const player = room.players[playerId];
          if (!player) return;

          const { mapName, pos, stats } = payload;
          if (!room.adventurePlayers) room.adventurePlayers = [];
          
          let advPlayer = room.adventurePlayers.find(p => p.id === playerId);
          if (!advPlayer) {
            advPlayer = { id: playerId, name: player.name, avatar: player.avatar };
            room.adventurePlayers.push(advPlayer);
          }
          advPlayer.mapName = mapName;
          advPlayer.pos = pos;
          advPlayer.stats = stats;
          
          // update overall score for leaderboard
          if (stats && stats.score !== undefined) {
            player.score = stats.score;
          }

          broadcastToRoom(roomId, {
            type: 'ROOM_UPDATE',
            payload: getCleanRoomState(room)
          });
          break;
        }

        case 'ADVENTURE_END': {
          const { roomId, playerId } = ws;
          if (!roomId || !playerId || !rooms[roomId]) return;
          const room = rooms[roomId];
          const player = room.players[playerId];
          if (player && payload.score !== undefined) {
             player.score = payload.score;
          }
          
          // Only end room if host ends? Or maybe everyone ends individually. 
          // We can just trigger an update so leaderboard reflects final score
          broadcastToRoom(roomId, {
            type: 'ROOM_UPDATE',
            payload: getCleanRoomState(room)
          });
          break;
        }

        case 'RESTART_GAME': {
          const { roomId, playerId } = ws;
          if (!roomId || !playerId || !rooms[roomId]) return;
          const room = rooms[roomId];

          if (room.hostId === playerId) {
            room.status = 'waiting';
            room.currentQuestionIndex = 0;
            Object.values(room.players).forEach(p => {
              p.score = 0;
              p.levelReached = 1;
              p.streak = 0;
              p.isEliminated = false;
              p.isReady = p.isHost;
              p.lifelines = { fiftyFifty: true, ustadz: true, jamaah: true };
              p.answersHistory = {};
              delete p.currentAnswer;
            });

            broadcastToRoom(roomId, {
              type: 'GAME_RESTARTED',
              payload: getCleanRoomState(room)
            });
          }
          break;
        }
      }
    } catch (err) {
      console.error('WebSocket Message Error:', err);
    }
  });

  ws.on('close', () => {
    const { roomId, playerId } = ws;
    if (roomId && playerId && rooms[roomId]) {
      const room = rooms[roomId];
      if (room.players[playerId]) {
        room.players[playerId].isOnline = false;
        broadcastToRoom(roomId, {
          type: 'ROOM_UPDATE',
          payload: getCleanRoomState(room)
        });
      }
    }
  });
});

function getCleanRoomState(room: any): RoomState {
  const { timer, questions, ...clean } = room;
  return clean;
}

// Start Server Setup (Vite integration for development / Express static for production)
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 Petualangan Jutawan Zakat Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
