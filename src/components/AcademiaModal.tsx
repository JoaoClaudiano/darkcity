import { useState } from "react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";

import { Dumbbell, Shield, Zap, ScrollText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TrainOption {
  label: string;
  stat: "forca" | "defesa" | "agilidade";
  icon: typeof Dumbbell;
  statLabel: string;
}

const trainOptions: TrainOption[] = [
  { label: "Treinar Força", stat: "forca", icon: Dumbbell, statLabel: "Força" },
  { label: "Treinar Defesa", stat: "defesa", icon: Shield, statLabel: "Defesa" },
  { label: "Treinar Agilidade", stat: "agilidade", icon: Zap, statLabel: "Agilidade" },
];

const ENERGY_COST = 10;

interface AcademiaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AcademiaModal = ({ open, onOpenChange }: AcademiaModalProps) => {
  const { state, setState, logs, addLog } = useGame();
  const [training, setTraining] = useState<string | null>(null);

  const canTrain = state.energia >= ENERGY_COST;

  const handleTrain = (option: TrainOption) => {
    if (!canTrain) {
      toast.error("Você está exausto! Descanse um pouco.");
      return;
    }

    setTraining(option.stat);
    const gain = Math.floor(Math.random() * 5) + 1;

    setState((prev) => ({
      ...prev,
      energia: prev.energia - ENERGY_COST,
      [option.stat]: prev[option.stat] + gain,
      xp: Math.min(prev.xp + 5, prev.xpMax),
    }));

    addLog(`Você treinou ${option.statLabel} e ganhou +${gain} pontos!`);
    toast.success(`+${gain} ${option.statLabel}!`);

    setTimeout(() => setTraining(null), 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            Academia
          </DialogTitle>
        </DialogHeader>

        {/* Current stats */}
        <div className="grid grid-cols-3 gap-3 py-2">
          {trainOptions.map((opt) => (
            <div key={opt.stat} className="text-center p-2 rounded-md bg-muted/50 border border-border">
              <opt.icon className="w-4 h-4 mx-auto text-primary mb-1" />
              <div className="text-xs text-muted-foreground">{opt.statLabel}</div>
              <div className="font-mono-game text-sm font-bold text-foreground">
                {state[opt.stat]}
              </div>
            </div>
          ))}
        </div>

        {/* Training buttons */}
        <div className="space-y-2">
          {trainOptions.map((opt) => (
            <button
              key={opt.stat}
              onClick={() => handleTrain(opt)}
              disabled={!canTrain || training === opt.stat}
              className="w-full flex items-center gap-3 p-3 rounded-md border border-border bg-secondary/50 transition-all duration-200 hover:neon-box hover:border-primary/60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              <opt.icon className="w-5 h-5 text-primary" />
              <div className="text-left flex-1">
                <div className="text-sm font-medium text-foreground">{opt.label}</div>
                <div className="text-xs text-muted-foreground">
                  Custo: {ENERGY_COST} Energia · Ganho: +1~5
                </div>
              </div>
            </button>
          ))}
        </div>

        {!canTrain && (
          <p className="text-xs text-destructive text-center font-mono-game animate-pulse-neon">
            ⚠ Energia insuficiente! Descanse um pouco.
          </p>
        )}

        {/* Activity Log */}
        {logs.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono-game">
              <ScrollText className="w-3 h-3" />
              Log de Atividades
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="text-xs text-secondary-foreground bg-muted/30 rounded px-2 py-1 border-l-2 border-primary/40"
                >
                  {log.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AcademiaModal;
