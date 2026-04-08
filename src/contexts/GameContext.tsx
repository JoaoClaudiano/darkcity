import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { PROPERTIES } from "@/components/ImoveisModal";

export interface LogEntry {
  id: number;
  message: string;
  timestamp: Date;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: "consumable" | "equipment";
  quantity: number;
  equipped?: boolean;
}

export type RankTitle = "Novato" | "Pivete" | "Capanga" | "Sub-chefe" | "Don";

export interface RankInfo {
  title: RankTitle;
  minRespeito: number;
  minLevel: number;
}

export const RANKS: RankInfo[] = [
  { title: "Novato", minRespeito: 0, minLevel: 1 },
  { title: "Pivete", minRespeito: 50, minLevel: 3 },
  { title: "Capanga", minRespeito: 200, minLevel: 5 },
  { title: "Sub-chefe", minRespeito: 500, minLevel: 8 },
  { title: "Don", minRespeito: 1000, minLevel: 12 },
];

export const getRank = (respeito: number, nivel: number): RankInfo => {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (respeito >= r.minRespeito && nivel >= r.minLevel) current = r;
  }
  return current;
};

export const getRankIndex = (respeito: number, nivel: number): number => {
  let idx = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (respeito >= RANKS[i].minRespeito && nivel >= RANKS[i].minLevel) idx = i;
  }
  return idx;
};

interface GameState {
  nivel: number;
  xp: number;
  xpMax: number;
  energia: number;
  energiaMax: number;
  nervos: number;
  nervosMax: number;
  dinheiro: number;
  forca: number;
  defesa: number;
  agilidade: number;
  respeito: number;
  ppisoEnd: number | null;
  inventory: InventoryItem[];
  properties: Record<string, number>;
  lastIncomeTime: number;
}

interface GameContextType {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  logs: LogEntry[];
  addLog: (message: string) => void;
  isInJail: boolean;
  jailSecondsLeft: number;
  resetGame: () => void;
  triggerRandomEvent: () => boolean;
}

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be inside GameProvider");
  return ctx;
};

let logId = 0;

const STORAGE_KEY = "mafia-rpg-save";

const defaultState: GameState = {
  nivel: 1,
  xp: 35,
  xpMax: 100,
  energia: 80,
  energiaMax: 100,
  nervos: 60,
  nervosMax: 100,
  dinheiro: 1250,
  forca: 10,
  defesa: 10,
  agilidade: 10,
  respeito: 0,
  ppisoEnd: null,
  inventory: [],
  properties: {},
  lastIncomeTime: Date.now(),
};

const calcPassiveIncome = (props: Record<string, number>): number =>
  PROPERTIES.reduce((sum, p) => sum + (props[p.id] || 0) * p.income, 0);

const INCOME_INTERVAL = 5 * 60 * 1000; // 5 minutes

const loadState = (): { state: GameState; offlineEarnings: number } => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.ppisoEnd && Date.now() >= parsed.ppisoEnd) {
        parsed.ppisoEnd = null;
      }
      const full: GameState = { ...defaultState, ...parsed };
      // Calculate offline income
      const now = Date.now();
      const elapsed = now - (full.lastIncomeTime || now);
      const ticks = Math.floor(elapsed / INCOME_INTERVAL);
      const incomePerTick = calcPassiveIncome(full.properties);
      const offlineEarnings = ticks * incomePerTick;
      if (offlineEarnings > 0) {
        full.dinheiro += offlineEarnings;
        full.lastIncomeTime = (full.lastIncomeTime || now) + ticks * INCOME_INTERVAL;
      } else {
        full.lastIncomeTime = full.lastIncomeTime || now;
      }
      return { state: full, offlineEarnings };
    }
  } catch {}
  return { state: { ...defaultState }, offlineEarnings: 0 };
};

// Random events pool
interface RandomEvent {
  message: string;
  apply: (prev: GameState) => GameState;
}

const randomEvents: RandomEvent[] = [
  {
    message: "Você achou R$ 200,00 no chão!",
    apply: (s) => ({ ...s, dinheiro: s.dinheiro + 200 }),
  },
  {
    message: "Um batedor de carteira te roubou R$ 50,00!",
    apply: (s) => ({ ...s, dinheiro: Math.max(0, s.dinheiro - 50) }),
  },
  {
    message: "Você encontrou um energético no lixo! +20 Energia.",
    apply: (s) => ({ ...s, energia: Math.min(s.energia + 20, s.energiaMax) }),
  },
  {
    message: "Um velho sábio te ensinou um truque! +2 Agilidade.",
    apply: (s) => ({ ...s, agilidade: s.agilidade + 2 }),
  },
  {
    message: "Você tropeçou e se machucou! -10 Energia.",
    apply: (s) => ({ ...s, energia: Math.max(0, s.energia - 10) }),
  },
  {
    message: "Um traficante te deu um bônus! +5 Respeito.",
    apply: (s) => ({ ...s, respeito: s.respeito + 5 }),
  },
];

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const loaded = useRef(loadState());
  const [state, setState] = useState<GameState>(() => loaded.current.state);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [jailSecondsLeft, setJailSecondsLeft] = useState(0);

  // Show offline earnings on mount
  useEffect(() => {
    const earnings = loaded.current.offlineEarnings;
    if (earnings > 0) {
      const fmt = (v: number) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
      addLog(`💰 Renda offline: ${fmt(earnings)}`);
      import("sonner").then(({ toast }) => {
        toast.success(`Enquanto você estava fora, seus negócios renderam ${fmt(earnings)}!`);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Passive income tick every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const income = calcPassiveIncome(prev.properties);
        if (income <= 0) return prev;
        return { ...prev, dinheiro: prev.dinheiro + income, lastIncomeTime: Date.now() };
      });
    }, INCOME_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const addLog = useCallback((message: string) => {
    setLogs((prev) =>
      [{ id: ++logId, message, timestamp: new Date() }, ...prev].slice(0, 5)
    );
  }, []);

  const resetGame = useCallback(() => {
    setState({ ...defaultState });
    setLogs([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // 5% chance random event — returns true if triggered
  const triggerRandomEvent = useCallback((): boolean => {
    if (Math.random() > 0.05) return false;
    const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
    setState((prev) => event.apply(prev));
    addLog(`⚡ ${event.message}`);
    return true;
  }, [addLog]);

  const isInJail = state.ppisoEnd !== null && Date.now() < state.ppisoEnd;

  // Auto level-up
  useEffect(() => {
    if (state.xp >= state.xpMax) {
      setState((prev) => ({
        ...prev,
        nivel: prev.nivel + 1,
        xp: prev.xp - prev.xpMax,
        xpMax: Math.floor(prev.xpMax * 1.5),
        energiaMax: prev.energiaMax + 10,
        nervosMax: prev.nervosMax + 5,
        energia: prev.energiaMax + 10,
        nervos: prev.nervosMax + 5,
      }));
      addLog(`🎉 Level Up! Agora você é nível ${state.nivel + 1}!`);
    }
  }, [state.xp, state.xpMax, state.nivel, addLog]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Jail countdown
  useEffect(() => {
    if (!state.ppisoEnd) {
      setJailSecondsLeft(0);
      return;
    }
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((state.ppisoEnd! - Date.now()) / 1000));
      setJailSecondsLeft(remaining);
      if (remaining <= 0) {
        setState((prev) => ({ ...prev, ppisoEnd: null }));
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [state.ppisoEnd]);

  // Energy regen: +5 every 60s
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) =>
        prev.energia >= prev.energiaMax
          ? prev
          : { ...prev, energia: Math.min(prev.energia + 5, prev.energiaMax) }
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Nervos regen: +2 every 120s
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) =>
        prev.nervos >= prev.nervosMax
          ? prev
          : { ...prev, nervos: Math.min(prev.nervos + 2, prev.nervosMax) }
      );
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider
      value={{ state, setState, logs, addLog, isInJail, jailSecondsLeft, resetGame, triggerRandomEvent }}
    >
      {children}
    </GameContext.Provider>
  );
};
