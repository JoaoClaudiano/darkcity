import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";
import { Lock, DollarSign } from "lucide-react";

const BAIL_COST = 5000;

const PrisaoOverlay = () => {
  const { isInJail, jailSecondsLeft, state, setState, addLog } = useGame();

  if (!isInJail) return null;

  const minutes = Math.floor(jailSecondsLeft / 60);
  const seconds = jailSecondsLeft % 60;
  const canPayBail = state.dinheiro >= BAIL_COST;

  const handleBail = () => {
    if (!canPayBail) {
      toast.error("Você não tem dinheiro suficiente para a fiança!");
      return;
    }
    setState((prev) => ({
      ...prev,
      dinheiro: prev.dinheiro - BAIL_COST,
      ppisoEnd: null,
    }));
    addLog(`Pagou fiança de R$ 5.000,00 e saiu da prisão.`);
    toast.success("Você pagou a fiança e está livre!");
  };

  const formatMoney = (v: number) =>
    `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="max-w-sm w-full text-center space-y-6">
        <Lock className="w-16 h-16 mx-auto text-destructive animate-pulse-neon" />

        <h2 className="font-mono-game text-2xl font-bold text-destructive">
          PRESO!
        </h2>

        <p className="text-sm text-muted-foreground">
          Você foi pego pela polícia e está na prisão. Aguarde o tempo ou pague a fiança.
        </p>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-xs text-muted-foreground mb-1 font-mono-game">
            Tempo restante na Prisão
          </div>
          <div className="font-mono-game text-4xl font-bold text-destructive neon-text">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
        </div>

        <button
          onClick={handleBail}
          disabled={!canPayBail}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-md border border-border bg-secondary/50 transition-all duration-200 hover:neon-box hover:border-primary/60 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <DollarSign className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm font-medium text-foreground">Pagar Fiança</div>
            <div className="text-xs text-muted-foreground">
              Custo: {formatMoney(BAIL_COST)} · Saldo: {formatMoney(state.dinheiro)}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PrisaoOverlay;
