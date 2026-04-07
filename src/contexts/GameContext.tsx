import { createContext, useContext, useState, ReactNode } from "react";

interface GameState {
  nivel: number;
  xp: number;
  xpMax: number;
  energia: number;
  energiaMax: number;
  nervos: number;
  nervosMax: number;
  dinheiro: number;
}

interface GameContextType {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be inside GameProvider");
  return ctx;
};

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
  });

  return (
    <GameContext.Provider value={{ state, setState }}>
      {children}
    </GameContext.Provider>
  );
};
