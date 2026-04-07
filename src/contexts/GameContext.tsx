import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

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
  ppisoEnd: number | null;
  inventory: InventoryItem[];
}

interface GameContextType {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  logs: LogEntry[];
  addLog: (message: string) => void;
  isInJail: boolean;
  jailSecondsLeft: number;
  resetGame: () => void;
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
  ppisoEnd: null,
  inventory: [],
};

const loadState = (): GameState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // If jail expired while away, clear it
      if (parsed.ppisoEnd && Date.now() >= parsed.ppisoEnd) {
        parsed.ppisoEnd = null;
      }
      return { ...defaultState, ...parsed };
    }
  } catch {}
  return { ...defaultState };
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>(loadState);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [jailSecondsLeft, setJailSecondsLeft] = useState(0);

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

  const isInJail = state.ppisoEnd !== null && Date.now() < state.ppisoEnd;

  // Save to localStorage on every state change
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
      value={{ state, setState, logs, addLog, isInJail, jailSecondsLeft, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};
