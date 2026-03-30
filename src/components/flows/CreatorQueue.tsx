import { useState } from "react";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";

interface Product {
  name: string;
  price: string;
  rating: number;
  reviews: number;
  commission: string;
  emoji?: string;
}

interface CreatorQueueProps {
  queued: Product[];
  onRemove: (index: number) => void;
  onReorder: (from: number, to: number) => void;
  onGoLive: () => void;
  commerceEnabled: boolean;
  onToggleCommerce: () => void;
}

const CreatorQueue = ({ queued, onRemove, onReorder, onGoLive, commerceEnabled, onToggleCommerce }: CreatorQueueProps) => {
  const emojis = ["🎧", "⌨️", "🖱️", "🎧", "🖱️", "⌨️"];

  return (
  <div className="space-y-6">
    <div className="bg-twitch-panel border border-border rounded-lg p-4 flex items-center justify-between">
    <div>
      <h3 className="text-foreground text-lg font-semibold">E-Commerce</h3>
      <p className="text-muted-foreground text-sm">Toggle shopping features for your stream.</p>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-foreground text-sm font-medium"></span>
      <button
        onClick={onToggleCommerce}
        className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${commerceEnabled ? "bg-twitch-purple" : "bg-secondary"}`}
      >
        <div className={`absolute top-0.5 w-5 h-5 bg-primary-foreground rounded-full shadow transition-all ${commerceEnabled ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  </div>
    
    {!commerceEnabled && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive">
          Commerce is OFF. Product cards won't appear on your stream.
        </div>
      )}

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-bold">Product Queue</h2>
        <div className="flex items-center gap-3">
        </div>
      </div>

      <p className="text-muted-foreground text-sm">Products queued for your next stream. Use arrows to reorder. You control when each appears.</p>

      {queued.length === 0 ? (
        <div className="bg-twitch-panel border border-border border-dashed rounded-lg p-8 text-center">
          <p className="text-muted-foreground text-sm">No products queued. Browse the catalog to add products.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {queued.map((p, i) => (
            <div key={i} className="flex items-center gap-3 bg-twitch-panel border border-border rounded-lg p-3 hover:border-twitch-purple/50 transition-colors">
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => i > 0 && onReorder(i, i - 1)}
                  disabled={i === 0}
                  className={`p-0.5 rounded transition-colors ${i === 0 ? "text-muted-foreground/30" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => i < queued.length - 1 && onReorder(i, i + 1)}
                  disabled={i === queued.length - 1}
                  className={`p-0.5 rounded transition-colors ${i === queued.length - 1 ? "text-muted-foreground/30" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-muted-foreground font-mono w-5">#{i + 1}</span>
              <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center text-lg">
                {p.emoji || emojis[i % emojis.length]}
              </div>
              <div className="flex-1">
                <h4 className="text-foreground text-sm font-semibold">{p.name}</h4>
                <p className="text-muted-foreground text-xs">{p.price} • You earn: {p.commission}</p>
              </div>
              <button onClick={() => onRemove(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {queued.length > 0 && (
        <button onClick={onGoLive} className="w-full bg-destructive text-primary-foreground py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
          🔴 Go Live with Commerce ({queued.length} products)
        </button>
      )}
    </div>

  </div>
  );
};

export default CreatorQueue;
