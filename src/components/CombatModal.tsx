import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";
import { Swords, ScrollText, Heart, Shield, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NPC {
  id: string;
  name: string;
  hp: number;
  forca: number;
  defesa: number;
  agilidade: number;
  xpReward: number;
  respeitoReward: number;
  energyCost: number;
  requiredRank: number; // rank index
}

const npcs: NPC[] = [
  {
    id: "ladrao",
    name: "Ladrão Comum",
    hp: 50,
    forca: 8,
    defesa: 5,
    agilidade: 6,
    xpReward: 15,
    respeitoReward: 5,
    energyCost: 15,
    requiredRank: 0,
  },
  {
    id: "seguranca",
    name: "Segurança de Boate",
    hp: 90,
    forca: 15,
    defesa: 12,
    agilidade: 8,
    xpReward: 30,
    respeitoReward: 15,
    energyCost: 25,
    requiredRank: 1,
  },
  {
    id: "chefe",
    name: "Chefe do Tráfico",
    hp: 150,
    forca: 25,
    defesa: 20,
    agilidade: 15,
    xpReward: 60,
    respeitoReward: 40,
    energyCost: 40,
    requiredRank: 2,
  },
];

interface BattleLogLine {
  id: number;
  text: string;
  type: "player" | "npc" | "info";
}

interface CombatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

let battleLogId = 0;

import { getRankIndex } from "@/contexts/GameContext";

const CombatModal = ({ open, onOpenChange }: CombatModalProps) => {
  const { state, setState, addLog, triggerRandomEvent } = useGame();
  const [fighting, setFighting] = useState(false);
  const [battleLog, setBattleLog] = useState<BattleLogLine[]>([]);
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);

  const playerRankIdx = getRankIndex(state.respeito, state.nivel);

  const resetBattle = useCallback(() => {
    setFighting(false);
    setBattleLog([]);
    setSelectedNPC(null);
  }, []);

  // Reset on close
  useEffect(() => {
    if (!open) resetBattle();
  }, [open, resetBattle]);

  const addBattleLine = (text: string, type: BattleLogLine["type"]) => {
    setBattleLog((prev) => [...prev, { id: ++battleLogId, text, type }]);
  };

  const startFight = (npc: NPC) => {
    if (state.energia < npc.energyCost) {
      toast.error("Energia insuficiente para lutar!");
      return;
    }

    setState((prev) => ({ ...prev, energia: prev.energia - npc.energyCost }));
    setSelectedNPC(npc);
    setFighting(true);
    setBattleLog([]);

    // Simulate turn-based combat
    let playerHp = 50 + state.defesa * 2;
    let npcHp = npc.hp;
    const log: BattleLogLine[] = [];

    const addLine = (text: string, type: BattleLogLine["type"]) => {
      log.push({ id: ++battleLogId, text, type });
    };

    addLine(`⚔️ Batalha contra ${npc.name} começou!`, "info");

    let round = 1;
    while (playerHp > 0 && npcHp > 0 && round <= 10) {
      // Player attacks
      const dodge = Math.random() < state.agilidade / (state.agilidade + npc.agilidade) * 0.3;
      const playerDmg = Math.max(1, Math.floor(state.forca * (0.8 + Math.random() * 0.4) - npc.defesa * 0.3));
      npcHp -= playerDmg;
      addLine(`Rodada ${round}: Você atacou e causou ${playerDmg} de dano.`, "player");

      if (npcHp <= 0) break;

      // NPC attacks
      const playerDodged = Math.random() < state.agilidade / (state.agilidade + npc.agilidade) * 0.4;
      if (playerDodged) {
        addLine(`${npc.name} atacou, mas você desviou!`, "npc");
      } else {
        const npcDmg = Math.max(1, Math.floor(npc.forca * (0.8 + Math.random() * 0.4) - state.defesa * 0.3));
        playerHp -= npcDmg;
        addLine(`${npc.name} atacou e causou ${npcDmg} de dano.`, "npc");
      }

      round++;
    }

    const won = npcHp <= 0;
    if (won) {
      addLine(`🏆 Vitória! Você derrotou ${npc.name}!`, "info");
      addLine(`+${npc.xpReward} XP · +${npc.respeitoReward} Respeito`, "info");
      setState((prev) => ({
        ...prev,
        xp: prev.xp + npc.xpReward,
        respeito: prev.respeito + npc.respeitoReward,
      }));
      addLog(`Derrotou ${npc.name}! +${npc.respeitoReward} Respeito.`);
    } else {
      addLine(`💀 Derrota! ${npc.name} venceu a luta.`, "info");
      addLog(`Perdeu a luta contra ${npc.name}.`);
    }

    setBattleLog(log);
    triggerRandomEvent();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
            <Swords className="w-5 h-5" />
            Arena — Combate
          </DialogTitle>
        </DialogHeader>

        {!fighting ? (
          <>
            <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/30 rounded-md px-3 py-2">
              <span>Energia disponível</span>
              <span className="font-mono-game text-foreground font-bold">
                {state.energia}/{state.energiaMax}
              </span>
            </div>

            <div className="space-y-2">
              {npcs.map((npc) => {
                const locked = playerRankIdx < npc.requiredRank;
                const canFight = state.energia >= npc.energyCost && !locked;
                return (
                  <button
                    key={npc.id}
                    onClick={() => startFight(npc)}
                    disabled={!canFight}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-border bg-secondary/50 transition-all duration-200 hover:neon-box hover:border-primary/60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  >
                    <Swords className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="text-left flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {npc.name}
                        {locked && (
                          <span className="ml-2 text-xs text-destructive font-mono-game">🔒 Rank insuficiente</span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" /> {npc.hp}</span>
                        <span className="flex items-center gap-0.5"><Swords className="w-3 h-3" /> {npc.forca}</span>
                        <span className="flex items-center gap-0.5"><Shield className="w-3 h-3" /> {npc.defesa}</span>
                        <span className="flex items-center gap-0.5"><Zap className="w-3 h-3" /> {npc.agilidade}</span>
                      </div>
                      <div className="text-xs text-primary/70">
                        Custo: {npc.energyCost} Energia · +{npc.respeitoReward} Respeito
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Battle Log */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono-game mb-2">
                <ScrollText className="w-3 h-3" />
                Registro de Batalha
              </div>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {battleLog.map((line) => (
                  <div
                    key={line.id}
                    className={`text-xs rounded px-2 py-1.5 border-l-2 ${
                      line.type === "player"
                        ? "bg-primary/10 border-primary/60 text-foreground"
                        : line.type === "npc"
                        ? "bg-destructive/10 border-destructive/60 text-foreground"
                        : "bg-muted/30 border-muted-foreground/40 text-muted-foreground font-bold"
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={resetBattle}
              className="w-full p-3 rounded-md border border-border bg-secondary/50 text-sm font-medium text-foreground hover:neon-box hover:border-primary/60 transition-all"
            >
              Voltar à Arena
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CombatModal;
