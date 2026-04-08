import { useState } from "react";
import { Map, Briefcase, MessageCircle, Users } from "lucide-react";
import InventarioModal from "@/components/InventarioModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ChatStub = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-card border-border max-w-sm mx-auto">
      <DialogHeader>
        <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Chat
        </DialogTitle>
      </DialogHeader>
      <p className="text-sm text-muted-foreground text-center py-6">
        Em breve — o chat com outros jogadores estará disponível aqui.
      </p>
    </DialogContent>
  </Dialog>
);

const FamiliaStub = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-card border-border max-w-sm mx-auto">
      <DialogHeader>
        <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
          <Users className="w-5 h-5" />
          Família
        </DialogTitle>
      </DialogHeader>
      <p className="text-sm text-muted-foreground text-center py-6">
        Em breve — crie ou entre em uma família e conquiste a cidade.
      </p>
    </DialogContent>
  </Dialog>
);

type Tab = "cidade" | "inventario" | "chat" | "familia";

const BottomNav = () => {
  const [active, setActive] = useState<Tab>("cidade");
  const [inventarioOpen, setInventarioOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [familiaOpen, setFamiliaOpen] = useState(false);

  const handleTab = (tab: Tab) => {
    setActive(tab);
    if (tab === "inventario") setInventarioOpen(true);
    if (tab === "chat") setChatOpen(true);
    if (tab === "familia") setFamiliaOpen(true);
  };

  const tabs: { id: Tab; label: string; Icon: typeof Map }[] = [
    { id: "cidade",    label: "Cidade",    Icon: Map },
    { id: "inventario",label: "Inventário",Icon: Briefcase },
    { id: "chat",      label: "Chat",      Icon: MessageCircle },
    { id: "familia",   label: "Família",   Icon: Users },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="max-w-lg mx-auto flex">
          {tabs.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => handleTab(id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "neon-text" : ""}`} />
                <span className="font-mono-game text-[10px] uppercase tracking-wider">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <InventarioModal open={inventarioOpen} onOpenChange={setInventarioOpen} />
      <ChatStub       open={chatOpen}      onOpenChange={setChatOpen} />
      <FamiliaStub    open={familiaOpen}   onOpenChange={setFamiliaOpen} />
    </>
  );
};

export default BottomNav;
