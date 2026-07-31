export type ZakatCategory = 
  | 'konsep' 
  | 'fitrah' 
  | 'emas_perak' 
  | 'profesi' 
  | 'pertanian' 
  | 'peternakan' 
  | 'perdagangan' 
  | 'asnaf';

export interface CalculatorPreset {
  type: 'fitrah' | 'emas' | 'profesi' | 'pertanian' | 'peternakan';
  defaultValues: Record<string, number>;
  unitText?: string;
  targetFormulaExplanation?: string;
}

export interface Question {
  id: string;
  level: number; // 1 to 15
  prize: number; // Poin / Rupiah
  prizeLabel: string;
  category: ZakatCategory;
  questionText: string;
  options: [string, string, string, string];
  correctAnswerIndex: number;
  explanation: string;
  hasCalculator?: boolean;
  calculatorPreset?: CalculatorPreset;
  hintUstadz: string;
}

export interface LifelineState {
  fiftyFifty: boolean;
  ustadz: boolean;
  jamaah: boolean;
}

export interface PlayerAnswer {
  chosenOption: number; // 0, 1, 2, 3
  timeTaken: number; // seconds
  isCorrect: boolean;
  pointsEarned: number;
}

export interface Player {
  id: string;
  name: string;
  avatar: string; // Emoji or Avatar key
  score: number;
  levelReached: number;
  isHost: boolean;
  isReady: boolean;
  isOnline: boolean;
  streak: number;
  lifelines: LifelineState;
  currentAnswer?: PlayerAnswer;
  answersHistory: Record<number, PlayerAnswer>;
  isEliminated?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar?: string;
  text: string;
  timestamp: number;
  type: 'chat' | 'system' | 'emoji';
}

export type RoomStatus = 'waiting' | 'playing' | 'question_results' | 'game_over';

export interface RoomState {
  id: string;
  code: string;
  name: string;
  hostId: string;
  gameType: 'millionaire' | 'adventure' | 'interactive_quiz';
  status: RoomStatus;
  currentQuestionIndex: number; // 0 to 14
  questionStartTime: number;
  timeLimit: number; // e.g. 30 seconds
  players: Record<string, Player>;
  chatMessages: ChatMessage[];
  selectedQuestionIds?: string[];
  adventurePlayers?: any[];
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  name: string;
  avatar: string;
  score: number;
  levelReached: number;
  correctCount: number;
  streak: number;
}
