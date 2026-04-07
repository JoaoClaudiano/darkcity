import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface LogEntry {
  id: number;
  message: string;
  timestamp: Date;
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
  ppisoEnd: number | null; // timestamp when jail ends, null = free
}

interface GameContextType {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  logs: LogEntry[];
  addLog: (message: string) => void;
  isInJail: boolean;
  jailSecondsLeft: number;
}

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be inside GameProvider");
  return ctx;
};

let logId = 0;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>({
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
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [jailSecondsLeft, setJailSecondsLeft] = useState(0);

  const addLog = useCallback((message: string) => {
    setLogs((prev) => [
      { id: ++logId, message, timestamp: new Date() },
      ...prev,
    ].slice(0, 5));
  }, []);

  const isInJail = state.ppisoEnd !== null && Date.now() < state.ppisoEnd;

  // Jail countdown ticker
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
      setState((prev) => {
        if (prev.energia >= prev.energiaMax) return prev;
        return { ...prev, energia: Math.min(prev.energia + 5, prev.energiaMax) };
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Nervos regen: +2 every 120s
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.nervos >= prev.nervosMax) return prev;
        return { ...prev, nervos: Math.min(prev.nervos + 2, prev.nervosMax) };
      });
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider value={{ state, setState, logs, addLog, isInJail, jailSecondsLeft }}>
      {children}
    </GameContext.Provider>
  );
};
