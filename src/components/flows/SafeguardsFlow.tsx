import { useState } from "react";
import { ArrowRight, ShoppingCart, X, Star } from "lucide-react";

import StreamVideo from "../StreamVideo";

type SafeguardStep = "creator-optin" | "viewer-prefs" | "comparison" | "scale";

const Toggle = ({ on, label, sub }: { on: boolean; label: string; sub?: string }) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p className="text-foreground text-sm font-medium">{label}</p>
      {sub && <p className="text-muted-foreground text-xs">{sub}</p>}
    </div>
    <div className={`w-10 h-5 rounded-full relative cursor-pointer ${on ? "bg-twitch-purple" : "bg-secondary"}`}>
      <div className={`absolute top-0.5 w-4 h-4 bg-primary-foreground rounded-full transition-all ${on ? "right-0.5" : "left-0.5"}`} />
    </div>
  </div>
);

const SafeguardsFlow = () => {
  const [step, setStep] = useState<SafeguardStep>("creator-optin");

  const stepLabels: Record<SafeguardStep, string> = {
    "creator-optin": "Screen 1: Creator opt-in controls",
    "viewer-prefs": "Screen 2: Viewer preference controls",
    "comparison": "Screen 3: Side-by-side comparison",
    "scale": "Screen 4: Product card at actual scale",
  };

  const steps: SafeguardStep[] = ["creator-optin", "viewer-prefs", "comparison", "scale"];
  const currentIdx = steps.indexOf(step);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-twitch-panel/80 border-b border-border px-4 py-2 flex items-center justify-between">
        <span className="text-sm text-twitch-purple font-semibold">{stepLabels[step]}</span>
        <div className="flex gap-2">
          {currentIdx > 0 && (
            <button onClick={() => setStep(steps[currentIdx - 1])} className="bg-secondary text-foreground px-3 py-1 rounded text-xs">← Back</button>
          )}
          {currentIdx < steps.length - 1 && (
            <button onClick={() => setStep(steps[currentIdx + 1])} className="bg-twitch-purple text-primary-foreground px-3 py-1 rounded text-xs font-semibold flex items-center gap-1">
              Next <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
      

      <div className="flex-1 overflow-y-auto">
        {step === "creator-optin" && (
          <div className="max-w-2xl mx-auto p-6 space-y-4">
            <h2 className="text-foreground text-2xl font-bold">Commerce Settings</h2>
            <div className="bg-twitch-panel border border-border rounded-lg p-4">
              <Toggle on={true} label="Enable Commerce" sub="Show commerce features in your stream" />
              <div className="border-t border-border mt-2 pt-2 pl-4 space-y-0">
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground text-sm">Product card position</span>
                  <select className="bg-secondary text-foreground text-xs rounded px-2 py-1 border border-border">
                    <option>Bottom-right</option>
                    <option>Bottom-left</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground text-sm">Card size</span>
                  <select className="bg-secondary text-foreground text-xs rounded px-2 py-1 border border-border">
                    <option>Small</option>
                    <option>Medium</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground text-sm">Auto-dismiss after</span>
                  <select className="bg-secondary text-foreground text-xs rounded px-2 py-1 border border-border">
                    <option>30 seconds</option>
                    <option>60 seconds</option>
                    <option>Never</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground text-sm">Max products per stream</span>
                  <select className="bg-secondary text-foreground text-xs rounded px-2 py-1 border border-border">
                    <option>5</option>
                    <option>10</option>
                    <option>Unlimited</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-twitch-purple/10 border border-twitch-purple/30 rounded-lg p-4 text-sm text-muted-foreground">
              💡 Commerce is <strong className="text-foreground">100% opt-in</strong>. When disabled, your stream has zero commerce elements.
            </div>
          </div>
        )}

        {step === "viewer-prefs" && (
          <div className="max-w-2xl mx-auto p-6 space-y-4">
            <h2 className="text-foreground text-2xl font-bold">Viewer Settings</h2>
            <div className="bg-twitch-panel border border-border rounded-lg p-4 space-y-0">
              <h3 className="text-foreground font-semibold text-sm mb-2">Shopping on Twitch</h3>
              <Toggle on={true} label="Show product cards during streams" sub="See featured products from creators you watch" />
              <div className="border-t border-border" />
              <Toggle on={false} label="Show purchase notifications from other viewers" sub="See when other viewers buy featured products" />
            </div>
            <div className="bg-twitch-purple/10 border border-twitch-purple/30 rounded-lg p-4 text-sm text-muted-foreground">
              💡 If you turn off product cards, you'll <strong className="text-foreground">never see commerce</strong> even if the creator has it enabled. You're always in control.
            </div>
          </div>
        )}

        {step === "comparison" && (
          <div className="p-6 space-y-4">
            <h2 className="text-foreground text-2xl font-bold text-center">Side-by-Side Comparison</h2>
            <div className="grid grid-cols-2 gap-4 h-[500px]">
              <div className="relative rounded-lg overflow-hidden border border-border">
                <div className="absolute top-0 left-0 right-0 bg-success/20 border-b border-success/40 px-3 py-1.5 z-10">
                  <span className="text-success text-xs font-semibold">✓ Commerce Enabled (Viewer Preference: ON)</span>
                </div>
                <div className="h-full pt-8">
                  <StreamVideo />
                  {/* Mini product card */}
                  <div className="absolute bottom-16 right-3 w-48 bg-twitch-panel rounded border border-border shadow-lg z-10">
                    <div className="h-20 bg-secondary flex items-center justify-center text-2xl rounded-t">🎧</div>
                    <div className="p-2">
                      <p className="text-foreground text-xs font-semibold truncate">SteelSeries Arctis Nova Pro</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-foreground text-xs font-bold">$249.99</span>
                        <span className="amazon-btn text-black px-2 py-0.5 rounded text-[10px] font-bold">Buy</span>
                      </div>
                    </div>
                    <button className="absolute top-1 right-1 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center">
                      <X className="w-2.5 h-2.5 text-foreground" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden border border-border">
                <div className="absolute top-0 left-0 right-0 bg-secondary border-b border-border px-3 py-1.5 z-10">
                  <span className="text-muted-foreground text-xs font-semibold">Commerce Disabled (Viewer Preference: OFF)</span>
                </div>
                <div className="h-full pt-8">
                  <StreamVideo />
                </div>
              </div>
            </div>
            <p className="text-center text-muted-foreground text-sm">
              Same stream, same creator — the viewer controls whether commerce appears.
            </p>
          </div>
        )}

        {step === "scale" && (
          <div className="p-6 space-y-4">
            <h2 className="text-foreground text-2xl font-bold text-center">Product Card at Actual Scale</h2>
            <div className="relative rounded-lg overflow-hidden border border-border h-[500px]">
              <StreamVideo />
              {/* Product card at ~15% scale */}
              <div className="absolute bottom-16 right-3 w-48 bg-twitch-panel rounded border border-border shadow-lg z-10">
                <div className="h-20 bg-secondary flex items-center justify-center text-2xl rounded-t">🎧</div>
                <div className="p-2">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-2.5 h-2.5 ${i < 4 ? "text-amazon-orange fill-amazon-orange" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                  <p className="text-foreground text-xs font-semibold truncate">SteelSeries Arctis Nova Pro</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-foreground text-xs font-bold">$249.99</span>
                    <span className="amazon-btn text-black px-2 py-0.5 rounded text-[10px] font-bold">Buy</span>
                  </div>
                </div>
                <button className="absolute top-1 right-1 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center">
                  <X className="w-2.5 h-2.5 text-foreground" />
                </button>
              </div>
              {/* Annotation */}
              <div className="absolute bottom-2 left-3 bg-twitch-panel/90 border border-border rounded px-3 py-2 z-10">
                <p className="text-foreground text-xs font-semibold">≈15% of screen area</p>
                <p className="text-muted-foreground text-[10px]">Same footprint as Twitch Polls & Predictions</p>
              </div>
            </div>
            <div className="bg-twitch-purple/10 border border-twitch-purple/30 rounded-lg p-4 text-sm text-muted-foreground text-center">
              Commerce cards follow the same design language as existing Twitch Extensions — <strong className="text-foreground">familiar, non-intrusive</strong>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafeguardsFlow;
