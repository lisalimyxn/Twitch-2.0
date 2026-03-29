import { useState } from "react";
import { Search, Star, GripVertical, Trash2, BarChart3, TrendingUp, DollarSign, Eye, ShoppingCart, ArrowLeft } from "lucide-react";

type CreatorStep = "dashboard" | "catalog" | "queue" | "live" | "analytics" | "summary";

const sidebarItems = ["Stream Manager", "Content", "Analytics", "Community", "Commerce"];

const products = [
  { name: "SteelSeries Arctis Nova Pro", price: "$249.99", rating: 4.3, reviews: 2847, commission: "15%" },
  { name: "Razer DeathAdder V3 Pro", price: "$89.99", rating: 4.5, reviews: 5123, commission: "12%" },
  { name: "Elgato Stream Deck MK.2", price: "$149.99", rating: 4.7, reviews: 8921, commission: "10%" },
  { name: "HyperX Cloud III Wireless", price: "$169.99", rating: 4.4, reviews: 3456, commission: "14%" },
  { name: "Logitech G Pro X Superlight", price: "$129.99", rating: 4.6, reviews: 7234, commission: "11%" },
  { name: "Corsair K70 RGB Pro", price: "$139.99", rating: 4.2, reviews: 1982, commission: "13%" },
];

interface CreatorFlowProps {
  onBack?: () => void;
}

const CreatorFlow = ({ onBack }: CreatorFlowProps) => {
  const [step, setStep] = useState<CreatorStep>("dashboard");
  const [queued, setQueued] = useState([products[0], products[2], products[4]]);
  const [commerceEnabled, setCommerceEnabled] = useState(true);

  const goBack = () => {
    const backMap: Record<CreatorStep, CreatorStep | "exit"> = {
      dashboard: "exit",
      catalog: "dashboard",
      queue: "dashboard",
      live: "queue",
      analytics: "live",
      summary: "dashboard",
    };
    const target = backMap[step];
    if (target === "exit") onBack?.();
    else setStep(target);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 bg-twitch-panel border-r border-border p-4 space-y-1">
          {onBack && (
            <button onClick={onBack} className="w-full text-left px-3 py-2 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-twitch-hover flex items-center gap-2 mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Twitch
            </button>
          )}
          {sidebarItems.map((item) => (
            <button
              key={item}
              onClick={() => item === "Commerce" && setStep("dashboard")}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                item === "Commerce" ? "bg-twitch-purple/20 text-twitch-purple" : "text-muted-foreground hover:text-foreground hover:bg-twitch-hover"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {step === "dashboard" && (
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-foreground text-2xl font-bold">Commerce</h2>
              <div className="flex items-center justify-between bg-twitch-panel rounded-lg border border-border p-4">
                <div>
                  <h3 className="text-foreground font-semibold">Enable Commerce for Next Stream</h3>
                  <p className="text-muted-foreground text-sm">Allow product cards during your stream</p>
                </div>
                <button
                  onClick={() => setCommerceEnabled(!commerceEnabled)}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${commerceEnabled ? "bg-twitch-purple" : "bg-secondary"}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-primary-foreground rounded-full transition-all ${commerceEnabled ? "right-0.5" : "left-0.5"}`} />
                </button>
              </div>
              {commerceEnabled && (
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setStep("queue")} className="bg-twitch-panel border border-border rounded-lg p-4 text-left hover:border-twitch-purple transition-colors">
                    <ShoppingCart className="w-6 h-6 text-twitch-purple mb-2" />
                    <h3 className="text-foreground font-semibold">Your Product Queue</h3>
                    <p className="text-muted-foreground text-sm">{queued.length} products queued</p>
                  </button>
                  <button onClick={() => setStep("catalog")} className="bg-twitch-panel border border-border rounded-lg p-4 text-left hover:border-twitch-purple transition-colors">
                    <Search className="w-6 h-6 text-twitch-purple mb-2" />
                    <h3 className="text-foreground font-semibold">Browse Catalog</h3>
                    <p className="text-muted-foreground text-sm">Search Amazon products</p>
                  </button>
                  <button onClick={() => setStep("summary")} className="bg-twitch-panel border border-border rounded-lg p-4 text-left hover:border-twitch-purple transition-colors">
                    <BarChart3 className="w-6 h-6 text-twitch-purple mb-2" />
                    <h3 className="text-foreground font-semibold">Commerce Analytics</h3>
                    <p className="text-muted-foreground text-sm">View performance data</p>
                  </button>
                  <div className="bg-twitch-panel border border-border rounded-lg p-4">
                    <TrendingUp className="w-6 h-6 text-success mb-2" />
                    <h3 className="text-foreground font-semibold">Last Stream Revenue</h3>
                    <p className="text-foreground text-xl font-bold">$127.50</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === "catalog" && (
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center gap-3">
                <button onClick={goBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-foreground text-2xl font-bold">Browse Catalog</h2>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 flex items-center bg-secondary rounded-lg px-4 py-2">
                  <Search className="w-4 h-4 text-muted-foreground mr-2" />
                  <input className="bg-transparent text-foreground text-sm flex-1 outline-none placeholder:text-muted-foreground" placeholder="Search products..." />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["Gaming", "Tech", "Apparel", "Audio", "Peripherals", "Streaming Gear"].map((cat) => (
                  <span key={cat} className="bg-secondary text-muted-foreground px-3 py-1 rounded-full text-xs font-medium hover:bg-twitch-purple/20 hover:text-twitch-purple cursor-pointer transition-colors">
                    {cat}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {products.map((p, i) => (
                  <div key={i} className="bg-twitch-panel border border-border rounded-lg overflow-hidden hover:border-twitch-purple transition-colors">
                    <div className="h-32 bg-secondary flex items-center justify-center text-3xl">
                      {["🎧", "🖱️", "⌨️", "🎧", "🖱️", "⌨️"][i]}
                    </div>
                    <div className="p-3">
                      <h4 className="text-foreground text-sm font-semibold truncate">{p.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < Math.floor(p.rating) ? "text-amazon-orange fill-amazon-orange" : "text-muted-foreground"}`} />
                        ))}
                        <span className="text-muted-foreground text-xs">({p.reviews.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-foreground font-bold text-sm">{p.price}</span>
                        <button
                          onClick={() => !queued.find(q => q.name === p.name) && setQueued([...queued, p])}
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            queued.find(q => q.name === p.name)
                              ? "bg-success/20 text-success"
                              : "bg-twitch-purple text-primary-foreground"
                          }`}
                        >
                          {queued.find(q => q.name === p.name) ? "✓ Queued" : "+ Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === "queue" && (
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <button onClick={goBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-foreground text-2xl font-bold">Product Queue</h2>
              </div>
              <p className="text-muted-foreground text-sm">Products queued for your next stream. Drag to reorder.</p>
              <div className="space-y-2">
                {queued.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 bg-twitch-panel border border-border rounded-lg p-3 hover:border-twitch-purple/50 transition-colors">
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                    <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center text-lg">
                      {["🎧", "⌨️", "🖱️", "🎧", "🖱️", "⌨️"][products.indexOf(p)]}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground text-sm font-semibold">{p.name}</h4>
                      <p className="text-muted-foreground text-xs">{p.price} • You earn: {p.commission}</p>
                    </div>
                    <button onClick={() => setQueued(queued.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep("live")} className="w-full bg-twitch-purple text-primary-foreground py-3 rounded-lg font-bold text-sm">
                Go Live with Commerce
              </button>
            </div>
          )}

          {step === "live" && (
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center gap-3">
                <button onClick={goBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-foreground text-2xl font-bold">Stream Manager</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-black rounded-lg aspect-video flex items-center justify-center relative">
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1"
                    allow="encrypted-media"
                    allowFullScreen
                    style={{ border: 0 }}
                  />
                  <div className="absolute top-2 left-2 bg-destructive px-2 py-0.5 rounded text-xs font-bold text-primary-foreground z-10">🔴 LIVE</div>
                </div>
                <div className="bg-twitch-panel border border-border rounded-lg p-4 space-y-3">
                  <h3 className="text-foreground font-semibold text-sm">Commerce Panel</h3>
                  <div className="bg-success/10 border border-success/30 rounded p-2 text-xs">
                    <span className="text-success font-semibold">Currently showing:</span>
                    <p className="text-foreground mt-1">SteelSeries Arctis Nova Pro</p>
                    <button className="text-destructive text-xs mt-1 hover:underline">Remove from Screen</button>
                  </div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase">Up Next</p>
                  {queued.slice(1).map((p, i) => (
                    <div key={i} className="flex items-center gap-2 bg-secondary rounded p-2">
                      <span className="text-foreground text-xs flex-1 truncate">{p.name}</span>
                      <button className="bg-twitch-purple text-primary-foreground px-2 py-0.5 rounded text-xs">Feature</button>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep("analytics")} className="bg-secondary text-foreground px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> View Live Analytics
              </button>
            </div>
          )}

          {step === "analytics" && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <button onClick={goBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-foreground text-2xl font-bold">Live Analytics</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Products Featured", value: "3", icon: ShoppingCart, color: "text-twitch-purple" },
                  { label: "Total Card Views", value: "847", icon: Eye, color: "text-foreground" },
                  { label: "Purchases", value: "43", icon: TrendingUp, color: "text-success" },
                  { label: "Revenue Earned", value: "$127.50", icon: DollarSign, color: "text-amazon-orange" },
                ].map((stat, i) => (
                  <div key={i} className="bg-twitch-panel border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-muted-foreground text-xs">{stat.label}</span>
                    </div>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-twitch-panel border border-border rounded-lg p-4">
                <p className="text-muted-foreground text-xs mb-2">Conversion Rate</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-secondary rounded-full h-3">
                    <div className="bg-twitch-purple h-3 rounded-full" style={{ width: "5.1%" }} />
                  </div>
                  <span className="text-foreground font-bold">5.1%</span>
                </div>
              </div>
            </div>
          )}

          {step === "summary" && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <button onClick={goBack} className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-foreground text-2xl font-bold">Post-Stream Commerce Summary</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-twitch-panel border border-border rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-xs">Total GMV</p>
                  <p className="text-foreground text-2xl font-bold mt-1">$2,499.50</p>
                </div>
                <div className="bg-twitch-panel border border-border rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-xs">Commission Earned</p>
                  <p className="text-success text-2xl font-bold mt-1">$127.50</p>
                </div>
                <div className="bg-twitch-panel border border-border rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-xs">Total Purchases</p>
                  <p className="text-foreground text-2xl font-bold mt-1">43</p>
                </div>
              </div>
              <div className="bg-twitch-panel border border-border rounded-lg p-4">
                <h3 className="text-foreground font-semibold text-sm mb-3">Top Products</h3>
                {queued.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-foreground text-sm">{p.name}</span>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-muted-foreground">{[18, 15, 10][i]} sales</span>
                      <span className="text-success font-semibold">{["5.2%", "4.8%", "5.5%"][i]} CVR</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-twitch-panel border border-border rounded-lg p-4">
                <h3 className="text-foreground font-semibold text-sm mb-3">Purchases Over Time</h3>
                <div className="flex items-end gap-1 h-24">
                  {[2, 5, 3, 8, 12, 7, 15, 18, 10, 6, 14, 8, 4].map((v, i) => (
                    <div key={i} className="flex-1 bg-twitch-purple/60 rounded-t hover:bg-twitch-purple transition-colors" style={{ height: `${(v / 18) * 100}%` }} />
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Start</span><span>Mid</span><span>End</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorFlow;
