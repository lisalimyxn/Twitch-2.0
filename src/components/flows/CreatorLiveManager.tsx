import { useState, useEffect, useCallback } from "react";
import { Eye, ShoppingCart, TrendingUp, DollarSign, SkipForward, X, Zap } from "lucide-react";

interface Product {
  name: string;
  price: string;
  rating: number;
  reviews: number;
  commission: string;
  emoji?: string;
}

interface CreatorLiveManagerProps {
  queued: Product[];
  onBack: () => void;
}

const emojis = ["🎧", "⌨️", "🖱️", "🎧", "🖱️", "⌨️"];

const CreatorLiveManager = ({ queued, onBack }: CreatorLiveManagerProps) => {
  const [commerceEnabled, setCommerceEnabled] = useState(true);
  const [featuredIdx, setFeaturedIdx] = useState<number | null>(null);
  const [stats, setStats] = useState({ views: 0, purchases: 0, revenue: 0 });
  const [streamTime, setStreamTime] = useState(0);

  // Stream timer
  useEffect(() => {
    const t = setInterval(() => setStreamTime(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Simulate stats ticking up when a product is featured
  useEffect(() => {
    if (featuredIdx === null) return;
    const t = setInterval(() => {
      setStats(s => ({
        views: s.views + Math.floor(Math.random() * 8) + 2,
        purchases: s.purchases + (Math.random() > 0.7 ? 1 : 0),
        revenue: s.revenue + (Math.random() > 0.7 ? parseFloat(queued[featuredIdx]?.price?.replace("$", "") || "0") * 0.12 : 0),
      }));
    }, 2000);
    return () => clearInterval(t);
  }, [featuredIdx, queued]);

  const featureProduct = useCallback((idx: number) => {
    if (commerceEnabled && idx < queued.length) {
      setFeaturedIdx(idx);
    }
  }, [commerceEnabled, queued.length]);

  const dismissProduct = useCallback(() => {
    setFeaturedIdx(null);
  }, []);

  const featureNext = useCallback(() => {
    if (featuredIdx === null) featureProduct(0);
    else if (featuredIdx < queued.length - 1) featureProduct(featuredIdx + 1);
    else dismissProduct();
  }, [featuredIdx, featureProduct, dismissProduct, queued.length]);

  // Keyboard shortcut: press 'F' to feature next, 'D' to dismiss
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key.toLowerCase() === "f") featureNext();
      if (e.key.toLowerCase() === "d") dismissProduct();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [featureNext, dismissProduct]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-bold">Stream Manager</h2>
        <div className="flex items-center gap-3">
          <span className="bg-destructive px-2 py-0.5 rounded text-xs font-bold text-primary-foreground animate-pulse">🔴 LIVE</span>
          <span className="text-muted-foreground text-sm font-mono">{formatTime(streamTime)}</span>
          <button onClick={onBack} className="bg-secondary text-muted-foreground px-3 py-1 rounded text-xs font-medium hover:text-foreground transition-colors">
            End Stream
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Stream preview */}
        <div className="col-span-2 space-y-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=jfKfPfyJRdk"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: 0 }}
            />
            <div className="absolute top-2 left-2 bg-destructive px-2 py-0.5 rounded text-xs font-bold text-primary-foreground z-10">🔴 LIVE</div>
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-xs text-foreground z-10">
              <Eye className="w-3 h-3" /> 14.2K
            </div>

            {/* Product card preview overlay */}
            {featuredIdx !== null && queued[featuredIdx] && (
              <div className="absolute bottom-4 right-4 w-56 bg-twitch-panel rounded-lg border border-border shadow-2xl z-10 animate-slide-in-up">
                <div className="h-24 bg-secondary flex items-center justify-center text-2xl rounded-t">
                  {queued[featuredIdx].emoji || emojis[featuredIdx % emojis.length]}
                </div>
                <div className="p-2">
                  <p className="text-foreground text-xs font-semibold truncate">{queued[featuredIdx].name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-foreground text-xs font-bold">{queued[featuredIdx].price}</span>
                    <span className="amazon-btn text-black px-2 py-0.5 rounded text-[10px] font-bold">Buy Now</span>
                  </div>
                </div>
                <button className="absolute top-1 right-1 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center">
                  <X className="w-2.5 h-2.5 text-foreground" />
                </button>
                <div className="absolute top-1 left-1 bg-twitch-purple/90 px-1.5 py-0.5 rounded text-[10px] text-primary-foreground font-semibold">Featured</div>
              </div>
            )}
          </div>

          {/* Keyboard hint */}
          <div className="bg-secondary rounded-lg p-3 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>Press <kbd className="bg-twitch-panel px-1.5 py-0.5 rounded border border-border font-mono text-foreground">F</kbd> to feature next product</span>
            <span>Press <kbd className="bg-twitch-panel px-1.5 py-0.5 rounded border border-border font-mono text-foreground">D</kbd> to dismiss current card</span>
          </div>
        </div>

        {/* Commerce control panel */}
        <div className="space-y-4">
          {/* Commerce toggle */}
          <div className="bg-twitch-panel border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-foreground font-semibold text-sm">Commerce</h3>
              <button
                onClick={() => { setCommerceEnabled(!commerceEnabled); if (commerceEnabled) setFeaturedIdx(null); }}
                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${commerceEnabled ? "bg-twitch-purple" : "bg-secondary"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-primary-foreground rounded-full transition-all ${commerceEnabled ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>
            {!commerceEnabled && (
              <p className="text-muted-foreground text-xs">Commerce is disabled. No product cards will appear on stream.</p>
            )}
            {commerceEnabled && featuredIdx !== null && queued[featuredIdx] && (
              <div className="bg-success/10 border border-success/30 rounded p-2 text-xs mb-3">
                <span className="text-success font-semibold">Currently showing:</span>
                <p className="text-foreground mt-1">{queued[featuredIdx].name}</p>
                <button onClick={dismissProduct} className="text-destructive text-xs mt-1 hover:underline">Remove from Screen</button>
              </div>
            )}
            {commerceEnabled && featuredIdx === null && (
              <p className="text-muted-foreground text-xs mb-3">No product currently featured. Use the buttons below or press <kbd className="bg-secondary px-1 py-0.5 rounded text-[10px] font-mono">F</kbd> to feature.</p>
            )}
          </div>

          {/* Queue controls */}
          {commerceEnabled && (
            <div className="bg-twitch-panel border border-border rounded-lg p-4">
              <h3 className="text-foreground font-semibold text-sm mb-2">Product Queue</h3>
              <div className="space-y-1">
                {queued.map((p, i) => (
                  <div key={i} className={`flex items-center gap-2 rounded p-2 transition-colors ${featuredIdx === i ? "bg-twitch-purple/20 border border-twitch-purple/40" : "bg-secondary"}`}>
                    <span className="text-lg">{p.emoji || emojis[i % emojis.length]}</span>
                    <span className="text-foreground text-xs flex-1 truncate">{p.name}</span>
                    <button
                      onClick={() => featuredIdx === i ? dismissProduct() : featureProduct(i)}
                      className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${featuredIdx === i ? "bg-destructive/20 text-destructive" : "bg-twitch-purple text-primary-foreground"}`}
                    >
                      {featuredIdx === i ? "Hide" : "Feature"}
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={featureNext} className="w-full mt-3 bg-twitch-purple text-primary-foreground py-2 rounded text-xs font-semibold flex items-center justify-center gap-1">
                <SkipForward className="w-3 h-3" /> Feature Next Product
              </button>
            </div>
          )}

          {/* Real-time stats */}
          <div className="bg-twitch-panel border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amazon-orange" />
              <h3 className="text-foreground font-semibold text-sm">Live Analytics</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Card Views", value: stats.views.toString(), icon: Eye, color: "text-foreground" },
                { label: "Purchases", value: stats.purchases.toString(), icon: ShoppingCart, color: "text-success" },
                { label: "Revenue", value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: "text-amazon-orange" },
                { label: "CVR", value: stats.views > 0 ? `${((stats.purchases / stats.views) * 100).toFixed(1)}%` : "0%", icon: TrendingUp, color: "text-twitch-purple" },
              ].map((s, i) => (
                <div key={i} className="bg-secondary rounded p-2">
                  <p className="text-muted-foreground text-[10px]">{s.label}</p>
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorLiveManager;
