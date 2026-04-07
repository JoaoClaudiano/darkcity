import { useGame } from "@/contexts/GameContext";
import { Zap, Brain, DollarSign } from "lucide-react";

const StatBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
    <div
      className={`h-full rounded-full transition-all duration-500 ${color}`}
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

const StatsHeader = () => {
  const { state } = useGame();

  const formatMoney = (v: number) =>
    `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
      <div className="max-w-lg mx-auto space-y-2">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span className="font-mono-game text-sm font-bold neon-text text-primary">
            NVL {state.nivel}
          </span>
          <div className="flex-1 mx-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-0.5">
              <span>XP</span>
              <span>{state.xp}/{state.xpMax}</span>
            </div>
            <StatBar value={state.xp} max={state.xpMax} color="bg-primary" />
          </div>
          <span className="font-mono-game text-xs text-primary flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {formatMoney(state.dinheiro)}
          </span>
        </div>

        {/* Bottom row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-0.5">
              <Zap className="w-3 h-3 text-primary" />
              <span>Energia</span>
              <span className="ml-auto">{state.energia}/{state.energiaMax}</span>
            </div>
            <StatBar value={state.energia} max={state.energiaMax} color="bg-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-0.5">
              <Brain className="w-3 h-3 text-destructive" />
              <span>Nervos</span>
              <span className="ml-auto">{state.nervos}/{state.nervosMax}</span>
            </div>
            <StatBar value={state.nervos} max={state.nervosMax} color="bg-destructive" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default StatsHeader;
