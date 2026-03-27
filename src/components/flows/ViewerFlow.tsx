import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TwitchNav from "../TwitchNav";
import TwitchChat from "../TwitchChat";
import StreamVideo from "../StreamVideo";
import ProductCard from "../ProductCard";
import ProductDetailPanel from "../ProductDetailPanel";
import PurchaseConfirmation from "../PurchaseConfirmation";
import PurchaseSuccess from "../PurchaseSuccess";

type ViewerStep = "stream" | "card" | "detail" | "confirm" | "success" | "dismissed";

const ViewerFlow = () => {
  const [step, setStep] = useState<ViewerStep>("stream");

  const reset = () => setStep("stream");

  const stepLabels: Record<ViewerStep, string> = {
    stream: "Screen 1: Normal stream — no commerce",
    card: "Screen 2: Product card appears (creator activated)",
    detail: "Screen 3: Viewer taps card — detail panel",
    confirm: "Screen 4: One-tap purchase confirmation",
    success: "Screen 5: Purchase complete!",
    dismissed: "Screen 6: Viewer dismissed — back to normal",
  };

  return (
    <div className="h-full flex flex-col">
      {/* Step indicator */}
      <div className="bg-twitch-panel/80 border-b border-border px-4 py-2 flex items-center justify-between">
        <span className="text-sm text-twitch-purple font-semibold">{stepLabels[step]}</span>
        <div className="flex gap-2">
          {step === "stream" && (
            <button onClick={() => setStep("card")} className="bg-twitch-purple text-primary-foreground px-3 py-1 rounded text-xs font-semibold">
              Show Product Card →
            </button>
          )}
          {step === "dismissed" && (
            <button onClick={reset} className="bg-twitch-purple text-primary-foreground px-3 py-1 rounded text-xs font-semibold">
              Restart Flow
            </button>
          )}
          {step === "card" && (
            <button onClick={() => setStep("stream")} className="bg-secondary text-foreground px-3 py-1 rounded text-xs">
              ← Back
            </button>
          )}
        </div>
      </div>
      <TwitchNav />
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 relative">
          <StreamVideo />
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
        <TwitchChat />
      </div>
    </div>
  );
};

export default ViewerFlow;
