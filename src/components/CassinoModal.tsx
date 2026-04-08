import { useState } from "react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";
import { Dice5, Target, DollarSign } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const formatMoney = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

interface CassinoModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const CassinoModal = ({ open, onOpenChange }: CassinoModalProps) => {
  const { state, setState, addLog } = useGame();
  const [betInput, setBetInput] = useState("500");
  const [lastResult, setLastResult] = useState<string | null>(null);

  const bet = Math.max(0, Number(betInput) || 0);

  const handleSlots = () => {
    if (bet <= 0 || bet > state.dinheiro) {
      toast.error("Aposta inválida!");
      return;
    }
    const roll = Math.random();
    if (roll < 0.1) {
      // 10% triple
      const winnings = bet * 3;
      setState((p) => ({ ...p, dinheiro: p.dinheiro + bet * 2 }));
      setLastResult(`🎰 JACKPOT! Você ganhou ${formatMoney(winnings)}!`);
      addLog(`🎰 Jackpot nos Slots! +${formatMoney(winnings)}`);
      toast.success("JACKPOT!");
    } else if (roll < 0.4) {
      // 30% break even
      setLastResult("🎰 Empate! Você recuperou sua aposta.");
      addLog("🎰 Empate nos Slots.");
    } else {
      // 60% lose
      setState((p) => ({ ...p, dinheiro: p.dinheiro - bet }));
      setLastResult(`🎰 Perdeu ${formatMoney(bet)}...`);
      addLog(`🎰 Perdeu ${formatMoney(bet)} nos Slots.`);
    }
  };

  const handleRoleta = () => {
    if (bet <= 0 || bet > state.dinheiro) {
      toast.error("Aposta inválida!");
      return;
    }
    const roll = Math.random();
    if (roll < 0.5) {
      // 50% double
      setState((p) => ({ ...p, dinheiro: p.dinheiro + bet }));
      setLastResult(`🎯 Sorte! Você dobrou e ganhou ${formatMoney(bet * 2)}!`);
      addLog(`🎯 Roleta: ganhou ${formatMoney(bet * 2)}`);
      toast.success("Você dobrou!");
    } else {
      // 50% lose all bet + hospital 1 min
      setState((p) => ({
        ...p,
        dinheiro: p.dinheiro - bet,
        hospitalEnd: Date.now() + 60_000,
        energia: Math.max(0, p.energia - 30),
      }));
      setLastResult(`🎯 BANG! Perdeu ${formatMoney(bet)} e foi parar no Hospital!`);
      addLog(`🎯 Roleta russa: perdeu e hospitalizado!`);
      toast.error("Você perdeu e foi hospitalizado!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
            <Dice5 className="w-5 h-5" /> Cassino
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Arrisque tudo ou vá para casa rico. Saldo: {formatMoney(state.dinheiro)}
          </DialogDescription>
        </DialogHeader>

        {/* Bet input */}
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          <input
            type="number"
            value={betInput}
            onChange={(e) => setBetInput(e.target.value)}
            className="flex-1 bg-muted/30 border border-border rounded px-3 py-2 text-sm font-mono-game text-foreground focus:outline-none focus:border-primary"
            placeholder="Valor da aposta"
            min={1}
          />
        </div>

        {/* Quick bet buttons */}
        <div className="flex gap-2">
          {[100, 500, 1000, 5000].map((v) => (
            <button
              key={v}
              onClick={() => setBetInput(String(v))}
              className="flex-1 text-xs font-mono-game py-1 rounded border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {v >= 1000 ? `${v / 1000}k` : v}
            </button>
          ))}
        </div>

        {/* Games */}
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-2">
            <div className="flex items-center gap-2">
              <Dice5 className="w-5 h-5 text-primary" />
              <div>
                <p className="font-mono-game text-sm font-bold text-foreground">Caça-Níqueis</p>
                <p className="text-xs text-muted-foreground">10% triplicar · 30% empate · 60% perder</p>
              </div>
            </div>
            <Button
              onClick={handleSlots}
              disabled={bet <= 0 || bet > state.dinheiro}
              className="w-full font-mono-game text-xs"
              size="sm"
            >
              Jogar Slots — {formatMoney(bet)}
            </Button>
          </div>

          <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-destructive" />
              <div>
                <p className="font-mono-game text-sm font-bold text-foreground">Roleta Russa</p>
                <p className="text-xs text-muted-foreground">50% dobrar · 50% perder tudo + Hospital 1min</p>
              </div>
            </div>
            <Button
              onClick={handleRoleta}
              disabled={bet <= 0 || bet > state.dinheiro}
              className="w-full font-mono-game text-xs"
              variant="destructive"
              size="sm"
            >
              Arriscar — {formatMoney(bet)}
            </Button>
          </div>
        </div>

        {/* Last result */}
        {lastResult && (
          <div className="p-3 rounded-lg bg-secondary/50 border border-primary/30 text-sm text-foreground font-mono-game text-center">
            {lastResult}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CassinoModal;
