import { useState } from "react";
import { useGame, getRank } from "@/contexts/GameContext";
import { Zap, Brain, DollarSign, Briefcase, RotateCcw, Crown, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { PROPERTIES } from "@/components/ImoveisModal";
import InventarioModal from "@/components/InventarioModal";
import ProfileModal from "@/components/ProfileModal";

const StatBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
    <div
      className={`h-full rounded-full transition-all duration-500 ${color}`}
      style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
    />
  </div>
);

const StatsHeader = () => {
  const { state, resetGame } = useGame();
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const rank = getRank(state.respeito, state.nivel);

  const formatMoney = (v: number) =>
    `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  const handleReset = () => {
    resetGame();
    toast.success("Progresso resetado!");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto space-y-2">
          {/* Top row */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              title="Perfil"
            >
              <Crown className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono-game text-xs font-bold neon-text text-primary">
                {rank.title}
              </span>
              <span className="font-mono-game text-xs text-muted-foreground">
                NVL {state.nivel}
              </span>
            </button>
            <div className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-primary" />
              <span className="font-mono-game text-xs text-primary">{state.respeito}</span>
              <span className="mx-1 text-border">|</span>
              <DollarSign className="w-3 h-3 text-primary" />
              <span className="font-mono-game text-xs text-primary">
                {formatMoney(state.dinheiro)}
              </span>
              <button
                onClick={() => setInventoryOpen(true)}
                className="p-1 rounded hover:bg-muted/50 transition-colors text-muted-foreground hover:text-primary"
                title="Mochila"
              >
                <Briefcase className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleReset}
                className="p-1 rounded hover:bg-muted/50 transition-colors text-muted-foreground hover:text-destructive"
                title="Resetar Progresso"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* XP bar */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-0.5">
              <span>XP</span>
              <span>{state.xp}/{state.xpMax}</span>
            </div>
            <StatBar value={state.xp} max={state.xpMax} color="bg-primary" />
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

      <InventarioModal open={inventoryOpen} onOpenChange={setInventoryOpen} />
      <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
};

export default StatsHeader;
