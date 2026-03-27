import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Eye, ArrowLeft, Users, Settings, Share2 } from "lucide-react";
import TwitchChat from "./TwitchChat";
import ProductCard from "./ProductCard";
import ProductDetailPanel from "./ProductDetailPanel";
import PurchaseConfirmation from "./PurchaseConfirmation";
import PurchaseSuccess from "./PurchaseSuccess";

type ViewerStep = "stream" | "card" | "detail" | "confirm" | "success" | "dismissed";

interface StreamPageProps {
  channelName: string;
  onBack: () => void;
  hasCommerce?: boolean;
}

const StreamPage = ({ channelName, onBack, hasCommerce = true }: StreamPageProps) => {
  const [step, setStep] = useState<ViewerStep>(hasCommerce ? "card" : "stream");

  const titles: Record<string, string> = {
    GamerStreamer_Pro: "🔴 Elden Ring Boss Rush — No Death Run!",
    TechReviewer: "Unboxing NEW SteelSeries Headset + Giveaway!",
    ArtistLive: "Drawing YOUR characters LIVE! Drop refs in chat",
    FashionFwd: "Spring Haul Try-On — Shopping Stream!",
  };
  const games: Record<string, string> = {
    GamerStreamer_Pro: "Elden Ring",
    TechReviewer: "Just Chatting",
    ArtistLive: "Art",
    FashionFwd: "Just Chatting",
  };

  const streamTitle = titles[channelName] || "🔴 LIVE — Chill stream";
  const game = games[channelName] || "Just Chatting";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Video + overlay area */}
        <div className="flex-1 flex flex-col">
          {/* Video */}
          <div className="flex-1 bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-br from-twitch-dark via-[#1a0a2e] to-twitch-dark flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-28 h-28 mx-auto rounded-full twitch-gradient flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-foreground">{channelName.slice(0, 2).toUpperCase()}</span>
                </div>
                <h2 className="text-foreground text-lg font-bold">{channelName}</h2>
                <p className="text-muted-foreground text-sm">Playing: {game}</p>
              </div>
            </div>
            {/* Stream bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-foreground font-bold text-sm">{streamTitle}</h3>
                  <p className="text-muted-foreground text-xs">{channelName} • {game}</p>
                </div>
                <div className="flex items-center gap-1 text-destructive">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-semibold">14.2K</span>
                </div>
              </div>
            </div>

            {/* Commerce overlays */}
            <AnimatePresence>
              {step === "card" && (
                <ProductCard onDismiss={() => setStep("dismissed")} onTap={() => setStep("detail")} />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {step === "detail" && (
                <ProductDetailPanel onClose={() => setStep("card")} onBuy={() => setStep("confirm")} />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {step === "confirm" && (
                <PurchaseConfirmation onConfirm={() => setStep("success")} onCancel={() => setStep("detail")} />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {step === "success" && <PurchaseSuccess onDone={() => setStep("dismissed")} />}
            </AnimatePresence>
          </div>

          {/* Below video info */}
          <div className="bg-twitch-panel border-t border-border px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full twitch-gradient flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">{channelName.slice(0, 2).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">{channelName}</p>
                  <p className="text-muted-foreground text-xs">{game}</p>
                </div>
                <button className="bg-twitch-purple text-primary-foreground px-3 py-1 rounded text-xs font-semibold ml-2">Follow</button>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-muted-foreground hover:text-foreground"><Users className="w-4 h-4" /></button>
                <button className="text-muted-foreground hover:text-foreground"><Settings className="w-4 h-4" /></button>
                <button className="text-muted-foreground hover:text-foreground"><Share2 className="w-4 h-4" /></button>
                {/* Demo controls */}
                {hasCommerce && step === "dismissed" && (
                  <button onClick={() => setStep("card")} className="bg-twitch-purple/20 text-twitch-purple px-3 py-1 rounded text-xs font-semibold">
                    ↻ Replay Commerce Flow
                  </button>
                )}
                {hasCommerce && step === "stream" && (
                  <button onClick={() => setStep("card")} className="bg-twitch-purple text-primary-foreground px-3 py-1 rounded text-xs font-semibold">
                    Show Product Card →
                  </button>
                )}
              </div>
            </div>
            {/* Step indicator for demo */}
            {hasCommerce && (
              <div className="mt-2 flex items-center gap-2">
                {["stream", "card", "detail", "confirm", "success", "dismissed"].map((s) => (
                  <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${step === s ? "bg-twitch-purple" : s === "dismissed" && step !== "stream" ? "bg-secondary" : "bg-secondary"}`}>
                    {(["stream", "card", "detail", "confirm", "success", "dismissed"].indexOf(s) <= ["stream", "card", "detail", "confirm", "success", "dismissed"].indexOf(step)) && (
                      <div className="h-full bg-twitch-purple rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat */}
        <TwitchChat />
      </div>
    </div>
  );
};

export default StreamPage;
