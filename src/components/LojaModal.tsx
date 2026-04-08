import { toast } from "sonner";
import { useGame, InventoryItem } from "@/contexts/GameContext";
import { ShoppingBag, Zap, Brain, Dumbbell, Shield, ScrollText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: typeof Zap;
  description: string;
  type: "consumable" | "equipment";
  onBuy: (prev: any) => any;
}

const shopItems: ShopItem[] = [
  {
    id: "energetico",
    name: "Energético",
    price: 500,
    icon: Zap,
    description: "Restaura 50 de Energia.",
    type: "consumable",
    onBuy: (prev: any) => prev, // added to inventory
  },
  {
    id: "adrenalina",
    name: "Drogas (Adrenalina)",
    price: 1200,
    icon: Brain,
    description: "Restaura 30 de Nervos.",
    type: "consumable",
    onBuy: (prev: any) => prev,
  },
  {
    id: "taco",
    name: "Taco de Beisebol",
    price: 5000,
    icon: Dumbbell,
    description: "+10 Força permanente.",
    type: "equipment",
    onBuy: (prev: any) => ({ ...prev, forca: prev.forca + 10 }),
  },
  {
    id: "colete",
    name: "Colete Balístico",
    price: 8000,
    icon: Shield,
    description: "+10 Defesa permanente.",
    type: "equipment",
    onBuy: (prev: any) => ({ ...prev, defesa: prev.defesa + 10 }),
  },
];

const formatMoney = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

interface LojaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LojaModal = ({ open, onOpenChange }: LojaModalProps) => {
  const { state, setState, addLog } = useGame();

  const alreadyOwnsEquipment = (id: string) =>
    state.inventory.some((i) => i.id === id && i.type === "equipment");

  const handleBuy = (item: ShopItem) => {
    if (state.dinheiro < item.price) {
      toast.error("Dinheiro insuficiente!");
      return;
    }

    if (item.type === "equipment" && alreadyOwnsEquipment(item.id)) {
      toast.error("Você já possui este equipamento!");
      return;
    }

    setState((prev) => {
      let updated = { ...prev, dinheiro: prev.dinheiro - item.price };
      // Apply stat bonuses for equipment
      updated = item.onBuy(updated);

      // Add to inventory
      const existing = updated.inventory.find((i: InventoryItem) => i.id === item.id);
      if (existing) {
        updated.inventory = updated.inventory.map((i: InventoryItem) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updated.inventory = [
          ...updated.inventory,
          {
            id: item.id,
            name: item.name,
            type: item.type,
            quantity: 1,
            equipped: item.type === "equipment",
            level: item.type === "equipment" ? 0 : undefined,
            baseStat: item.id === "taco" ? 10 : item.id === "colete" ? 10 : undefined,
            statType: item.id === "taco" ? "forca" : item.id === "colete" ? "defesa" : undefined,
          },
        ];
      }
      return updated;
    });

    addLog(`Comprou ${item.name} por ${formatMoney(item.price)}.`);
    toast.success(`${item.name} comprado!`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Loja
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/30 rounded-md px-3 py-2">
          <span>Saldo disponível</span>
          <span className="font-mono-game text-foreground font-bold">
            {formatMoney(state.dinheiro)}
          </span>
        </div>

        <div className="space-y-2">
          {shopItems.map((item) => {
            const canBuy = state.dinheiro >= item.price;
            const owned = item.type === "equipment" && alreadyOwnsEquipment(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleBuy(item)}
                disabled={!canBuy || owned}
                className="w-full flex items-center gap-3 p-3 rounded-md border border-border bg-secondary/50 transition-all duration-200 hover:neon-box hover:border-primary/60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-left flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {item.name}
                    {owned && (
                      <span className="ml-2 text-xs text-primary font-mono-game">
                        ✓ Equipado
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
                <span className="font-mono-game text-xs text-primary whitespace-nowrap">
                  {formatMoney(item.price)}
                </span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LojaModal;
