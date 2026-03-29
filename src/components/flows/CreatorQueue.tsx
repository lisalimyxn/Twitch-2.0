import { GripVertical, Trash2 } from "lucide-react";

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
  onGoLive: () => void;
}

const CreatorQueue = ({ queued, onRemove, onGoLive }: CreatorQueueProps) => {
  const emojis = ["🎧", "⌨️", "🖱️", "🎧", "🖱️", "⌨️"];

  return (
    <div className="space-y-4">
      <h2 className="text-foreground text-2xl font-bold">Product Queue</h2>
      <p className="text-muted-foreground text-sm">Products queued for your next stream. Drag to reorder. You control when each appears.</p>

      {queued.length === 0 ? (
        <div className="bg-twitch-panel border border-border border-dashed rounded-lg p-8 text-center">
          <p className="text-muted-foreground text-sm">No products queued. Browse the catalog to add products.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {queued.map((p, i) => (
            <div key={i} className="flex items-center gap-3 bg-twitch-panel border border-border rounded-lg p-3 hover:border-twitch-purple/50 transition-colors">
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
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
  );
};

export default CreatorQueue;
