import { toast } from "sonner";
import { useGame, getRankIndex } from "@/contexts/GameContext";
import { Skull, Wallet, Store, Car, Swords, ScrollText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface CrimeOption {
  label: string;
  icon: typeof Skull;
  nervoCost: number;
  successChance: number;
  rewardMin: number;
  rewardMax: number;
  xpGain: number;
  respeitoGain: number;
  requiredRank: number;
}

const crimes: CrimeOption[] = [
  {
    label: "Furtar Carteira",
    icon: Wallet,
    nervoCost: 5,
    successChance: 0.8,
    rewardMin: 50,
    rewardMax: 150,
    xpGain: 3,
    respeitoGain: 1,
    requiredRank: 0,
  },
  {
    label: "Assaltar Loja",
    icon: Store,
    nervoCost: 10,
    successChance: 0.5,
    rewardMin: 300,
    rewardMax: 800,
    xpGain: 8,
    respeitoGain: 3,
    requiredRank: 1,
  },
  {
    label: "Roubar Carro",
    icon: Car,
    nervoCost: 20,
    successChance: 0.25,
    rewardMin: 1500,
    rewardMax: 3000,
    xpGain: 20,
    respeitoGain: 8,
    requiredRank: 2,
  },
];

const JAIL_DURATION_MS = 2 * 60 * 1000;

const formatMoney = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

interface CrimesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenCombat: () => void;
}

const CrimesModal = ({ open, onOpenChange, onOpenCombat }: CrimesModalProps) => {
  const { state, setState, logs, addLog, triggerRandomEvent } = useGame();
  const playerRankIdx = getRankIndex(state.respeito, state.nivel);

  const handleCrime = (crime: CrimeOption) => {
    if (state.nervos < crime.nervoCost) {
      toast.error("Você não tem nervos suficientes! Espere um pouco.");
      return;
    }

    const success = Math.random() < crime.successChance;

    if (success) {
      const reward = Math.floor(
        Math.random() * (crime.rewardMax - crime.rewardMin + 1) + crime.rewardMin
      );
      setState((prev) => ({
        ...prev,
        nervos: prev.nervos - crime.nervoCost,
        dinheiro: prev.dinheiro + reward,
        xp: prev.xp + crime.xpGain,
        respeito: prev.respeito + crime.respeitoGain,
      }));
      addLog(`Sucesso! ${crime.label} rendeu ${formatMoney(reward)}.`);
      toast.success(`Sucesso! Você conseguiu ${formatMoney(reward)}`);
    } else {
      setState((prev) => ({
        ...prev,
        nervos: prev.nervos - crime.nervoCost,
        ppisoEnd: Date.now() + JAIL_DURATION_MS,
      }));
      addLog(`Falhou em ${crime.label}. Preso por 2 minutos!`);
      toast.error("Você foi pego pela polícia!");
      onOpenChange(false);
    }

    triggerRandomEvent();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
            <Skull className="w-5 h-5" />
            Favela
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="crimes">
          <TabsList className="w-full bg-muted/30">
            <TabsTrigger value="crimes" className="flex-1 text-xs font-mono-game">Crimes</TabsTrigger>
            <TabsTrigger value="lutar" className="flex-1 text-xs font-mono-game">Lutar</TabsTrigger>
          </TabsList>

          <TabsContent value="crimes" className="space-y-2 mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/30 rounded-md px-3 py-2">
              <span>Nervos</span>
              <span className="font-mono-game text-foreground font-bold">
                {state.nervos}/{state.nervosMax}
              </span>
            </div>

            {crimes.map((crime) => {
              const locked = playerRankIdx < crime.requiredRank;
              const canDo = state.nervos >= crime.nervoCost && !locked;
              return (
                <button
                  key={crime.label}
                  onClick={() => handleCrime(crime)}
                  disabled={!canDo}
                  className="w-full flex items-center gap-3 p-3 rounded-md border border-border bg-secondary/50 transition-all duration-200 hover:neon-box hover:border-primary/60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <crime.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="text-left flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {crime.label}
                      {locked && <span className="ml-2 text-xs text-destructive font-mono-game">🔒</span>}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Custo: {crime.nervoCost} Nervos · Chance: {crime.successChance * 100}%
                    </div>
                    <div className="text-xs text-primary/70">
                      {formatMoney(crime.rewardMin)} – {formatMoney(crime.rewardMax)}
                    </div>
                  </div>
                </button>
              );
            })}
          </TabsContent>

          <TabsContent value="lutar" className="mt-3">
            <div className="text-center py-6 space-y-3">
              <Swords className="w-10 h-10 mx-auto text-primary" />
              <p className="text-sm text-muted-foreground">
                Enfrente oponentes na Arena e ganhe Respeito!
              </p>
              <button
                onClick={() => {
                  onOpenChange(false);
                  onOpenCombat();
                }}
                className="px-6 py-2 rounded-md border border-primary/40 text-primary font-mono-game text-sm hover:neon-box hover:border-primary/60 transition-all"
              >
                Entrar na Arena
              </button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Activity Log */}
        {logs.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono-game">
              <ScrollText className="w-3 h-3" />
              Log de Atividades
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
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

export default CrimesModal;
