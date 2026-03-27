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

// YouTube video IDs for fake "live" streams
const streamVideos: Record<string, string> = {
  GamerStreamer_Pro: "jfKfPfyJRdk", // lofi girl (always live)
  TechReviewer: "dQw4w9WgXcQ",
  ArtistLive: "5qap5aO4i9A", // lofi chill
  FashionFwd: "jfKfPfyJRdk",
};

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
  const videoId = streamVideos[channelName] || "jfKfPfyJRdk";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Video + overlay area */}
        <div className="flex-1 flex flex-col">
          {/* Video */}
          <div className="flex-1 bg-black relative">
            {/* YouTube embed as fake stream */}
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${videoId}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: 0 }}
            />

            {/* Stream bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10 pointer-events-none">
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
                {hasCommerce && step === "dismissed" && (
                  <button onClick={() => setStep("card")} className="bg-twitch-purple/20 text-twitch-purple px-3 py-1 rounded text-xs font-semibold">
                    ↻ Replay Commerce Flow
                  </button>
                )}
              </div>
            </div>
            {/* Step indicator */}
            {hasCommerce && (
              <div className="mt-2 flex items-center gap-2">
                {(["stream", "card", "detail", "confirm", "success", "dismissed"] as ViewerStep[]).map((s) => (
                  <div key={s} className={`h-1 flex-1 rounded-full overflow-hidden bg-secondary`}>
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
