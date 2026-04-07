import { useGame, getRank, RANKS } from "@/contexts/GameContext";
import { Crown, Dumbbell, Shield, Zap, Star, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileModal = ({ open, onOpenChange }: ProfileModalProps) => {
  const { state } = useGame();
  const rank = getRank(state.respeito, state.nivel);

  const stats = [
    { label: "Força", value: state.forca, icon: Dumbbell },
    { label: "Defesa", value: state.defesa, icon: Shield },
    { label: "Agilidade", value: state.agilidade, icon: Zap },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
            <User className="w-5 h-5" />
            Perfil
          </DialogTitle>
        </DialogHeader>

        {/* Rank badge */}
        <div className="text-center py-4 space-y-2">
          <Crown className="w-10 h-10 mx-auto text-primary animate-pulse-neon" />
          <div className="font-mono-game text-2xl font-bold text-primary neon-text">
            {rank.title}
          </div>
          <div className="text-xs text-muted-foreground">
            Nível {state.nivel} · {state.respeito} Respeito
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-3 rounded-md bg-muted/50 border border-border">
              <s.icon className="w-4 h-4 mx-auto text-primary mb-1" />
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="font-mono-game text-lg font-bold text-foreground">{s.value}</div>
            </div>
          ))}
        </div>

        {/* General info */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between bg-muted/30 rounded px-3 py-2">
            <span className="text-muted-foreground">Energia Máx</span>
            <span className="text-foreground font-mono-game">{state.energiaMax}</span>
          </div>
          <div className="flex justify-between bg-muted/30 rounded px-3 py-2">
            <span className="text-muted-foreground">Nervos Máx</span>
            <span className="text-foreground font-mono-game">{state.nervosMax}</span>
          </div>
          <div className="flex justify-between bg-muted/30 rounded px-3 py-2">
            <span className="text-muted-foreground">Itens no Inventário</span>
            <span className="text-foreground font-mono-game">{state.inventory.length}</span>
          </div>
        </div>

        {/* Rank progression */}
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground font-mono-game flex items-center gap-1">
            <Star className="w-3 h-3" /> Progressão de Rank
          </div>
          <div className="space-y-1">
            {RANKS.map((r, i) => {
              const unlocked = state.respeito >= r.minRespeito && state.nivel >= r.minLevel;
              return (
                <div
                  key={r.title}
                  className={`flex items-center justify-between text-xs rounded px-3 py-1.5 border-l-2 ${
                    rank.title === r.title
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : unlocked
                      ? "border-primary/30 bg-muted/20 text-muted-foreground"
                      : "border-border bg-muted/10 text-muted-foreground/50"
                  }`}
                >
                  <span>{r.title}</span>
                  <span className="font-mono-game">
                    NVL {r.minLevel} · {r.minRespeito} Resp
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
