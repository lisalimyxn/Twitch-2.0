import { useState } from "react";
import { ArrowLeft, ShoppingCart, Search, BarChart3, Radio } from "lucide-react";
import CreatorCatalog from "./CreatorCatalog";
import CreatorQueue from "./CreatorQueue";
import CreatorDashboard from "./CreatorDashboard";
import CreatorLiveManager from "./CreatorLiveManager";

type CreatorPage = "queue" | "catalog" | "dashboard" | "live";

const products = [
  { name: "SteelSeries Arctis Nova Pro", price: "$249.99", rating: 4.3, reviews: 2847, commission: "15%", emoji: "🎧" },
  { name: "Elgato Stream Deck MK.2", price: "$149.99", rating: 4.7, reviews: 8921, commission: "10%", emoji: "⌨️" },
  { name: "Logitech G Pro X Superlight", price: "$129.99", rating: 4.6, reviews: 7234, commission: "11%", emoji: "🖱️" },
];

interface CreatorFlowProps {
  onBack?: () => void;
}

const sidebarNav = [
  { id: "queue" as const, label: "Product Queue", icon: ShoppingCart },
  { id: "catalog" as const, label: "Catalog", icon: Search },
  { id: "dashboard" as const, label: "Analytics & Revenue", icon: BarChart3 },
];

const CreatorFlow = ({ onBack }: CreatorFlowProps) => {
  const [page, setPage] = useState<CreatorPage>("queue");
  const [queued, setQueued] = useState(products);

  if (page === "live") {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <CreatorLiveManager queued={queued} onBack={() => setPage("queue")} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 bg-twitch-panel border-r border-border p-4 space-y-1 flex-shrink-0">
          {onBack && (
            <button onClick={onBack} className="w-full text-left px-3 py-2 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-twitch-hover flex items-center gap-2 mb-3">
              <ArrowLeft className="w-4 h-4" /> Back to Twitch
            </button>
          )}
          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider px-3 mb-2">Commerce</p>
          {sidebarNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
                page === item.id ? "bg-twitch-purple/20 text-twitch-purple" : "text-muted-foreground hover:text-foreground hover:bg-twitch-hover"
              }`}
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
          <div className="border-t border-border my-3" />
          <button
            onClick={() => setPage("live")}
            className="w-full text-left px-3 py-2 rounded text-sm font-bold transition-colors flex items-center gap-2 bg-destructive/10 text-destructive hover:bg-destructive/20"
          >
            <Radio className="w-4 h-4" /> Go Live
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {page === "queue" && (
            <CreatorQueue
              queued={queued}
              onRemove={(i) => setQueued(queued.filter((_, j) => j !== i))}
              onGoLive={() => setPage("live")}
            />
          )}
          {page === "catalog" && (
            <CreatorCatalog
              queued={queued}
              onAddToQueue={(p) => setQueued([...queued, p])}
            />
          )}
          {page === "dashboard" && <CreatorDashboard />}
        </div>
      </div>
    </div>
  );
};

export default CreatorFlow;
