import { useState } from "react";
import { Search, Star, Plus, Upload, Link2, Package } from "lucide-react";

const amazonProducts = [
  { name: "SteelSeries Arctis Nova Pro", price: "$249.99", rating: 4.3, reviews: 2847, commission: "15%", emoji: "🎧" },
  { name: "Razer DeathAdder V3 Pro", price: "$89.99", rating: 4.5, reviews: 5123, commission: "12%", emoji: "🖱️" },
  { name: "Elgato Stream Deck MK.2", price: "$149.99", rating: 4.7, reviews: 8921, commission: "10%", emoji: "⌨️" },
  { name: "HyperX Cloud III Wireless", price: "$169.99", rating: 4.4, reviews: 3456, commission: "14%", emoji: "🎧" },
  { name: "Logitech G Pro X Superlight", price: "$129.99", rating: 4.6, reviews: 7234, commission: "11%", emoji: "🖱️" },
  { name: "Corsair K70 RGB Pro", price: "$139.99", rating: 4.2, reviews: 1982, commission: "13%", emoji: "⌨️" },
];

interface CreatorCatalogProps {
  queued: typeof amazonProducts;
  onAddToQueue: (product: typeof amazonProducts[0]) => void;
}

const CreatorCatalog = ({ queued, onAddToQueue }: CreatorCatalogProps) => {
  const [tab, setTab] = useState<"browse" | "own">("browse");
  const [search, setSearch] = useState("");

  const filtered = amazonProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-foreground text-2xl font-bold">Product Catalog</h2>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-lg p-1">
        <button
          onClick={() => setTab("browse")}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${tab === "browse" ? "bg-twitch-panel text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          Browse Amazon Catalog
        </button>
        <button
          onClick={() => setTab("own")}
          className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${tab === "own" ? "bg-twitch-panel text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          Your Own Products
        </button>
      </div>

      {tab === "browse" && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-secondary rounded-lg px-4 py-2">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-foreground text-sm flex-1 outline-none placeholder:text-muted-foreground"
                placeholder="Search Amazon products..."
              />
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
            {filtered.map((p, i) => {
              const isQueued = queued.some(q => q.name === p.name);
              return (
                <div key={i} className="bg-twitch-panel border border-border rounded-lg overflow-hidden hover:border-twitch-purple transition-colors">
                  <div className="h-28 bg-secondary flex items-center justify-center text-3xl">{p.emoji}</div>
                  <div className="p-3">
                    <h4 className="text-foreground text-sm font-semibold truncate">{p.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < Math.floor(p.rating) ? "text-amazon-orange fill-amazon-orange" : "text-muted-foreground"}`} />
                      ))}
                      <span className="text-muted-foreground text-xs">({p.reviews.toLocaleString()})</span>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1">Commission: {p.commission}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-foreground font-bold text-sm">{p.price}</span>
                      <button
                        onClick={() => !isQueued && onAddToQueue(p)}
                        className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${isQueued ? "bg-success/20 text-success" : "bg-twitch-purple text-primary-foreground hover:bg-twitch-purple/80"}`}
                      >
                        {isQueued ? "✓ Queued" : "+ Add"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "own" && (
        <div className="space-y-4">
          <div className="bg-twitch-purple/10 border border-twitch-purple/30 rounded-lg p-4">
            <h3 className="text-foreground font-semibold text-sm">List Your Own Products</h3>
            <p className="text-muted-foreground text-xs mt-1">
              Sell your own merch or brand partnerships. Products are fulfilled through Amazon FBA — ship your inventory to Amazon's warehouse and they handle storage, packing, and delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                const ownProducts = [
                  { name: "Lisa Lim Logo Hoodie", price: "$45.00", rating: 5, reviews: 0, commission: "100%", emoji: "👕" },
                  { name: "LisaLim Mousepad XL", price: "$24.99", rating: 5, reviews: 0, commission: "100%", emoji: "🖱️" },
                ];
                ownProducts.forEach(p => {
                  if (!queued.some(q => q.name === p.name)) onAddToQueue(p as any);
                });
              }}
              className="bg-twitch-panel border border-border border-dashed rounded-lg p-6 text-center hover:border-twitch-purple transition-colors group"
            >
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2 group-hover:text-twitch-purple transition-colors" />
              <h4 className="text-foreground font-semibold text-sm">Queue All Listed Products</h4>
              <p className="text-muted-foreground text-xs mt-1">Add all your active listings to the product queue</p>
            </button>
            <button className="bg-twitch-panel border border-border border-dashed rounded-lg p-6 text-center hover:border-twitch-purple transition-colors group">
              <Link2 className="w-8 h-8 text-muted-foreground mx-auto mb-2 group-hover:text-twitch-purple transition-colors" />
              <h4 className="text-foreground font-semibold text-sm">Link Amazon Listing</h4>
              <p className="text-muted-foreground text-xs mt-1">Connect an existing Amazon seller listing to your Twitch commerce</p>
            </button>
          </div>

          {/* Example own products */}
          <h3 className="text-foreground font-semibold text-sm">Your Listed Products</h3>
          <div className="space-y-2">
            {[
              { name: "Lisa Lim Logo Hoodie", price: "$45.00", status: "Active", fulfillment: "Amazon FBA", emoji: "👕" },
              { name: "LisaLim Mousepad XL", price: "$24.99", status: "Active", fulfillment: "Amazon FBA", emoji: "🖱️" },
              { name: "Signed Poster Bundle", price: "$19.99", status: "Draft", fulfillment: "Pending FBA", emoji: "🖼️" },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 bg-twitch-panel border border-border rounded-lg p-3">
                <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center text-lg">{p.emoji}</div>
                <div className="flex-1">
                  <h4 className="text-foreground text-sm font-semibold">{p.name}</h4>
                  <p className="text-muted-foreground text-xs">{p.price} • {p.fulfillment}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${p.status === "Active" ? "bg-success/20 text-success" : "bg-secondary text-muted-foreground"}`}>
                  {p.status}
                </span>
                <button
                  onClick={() => {
                    const product = { name: p.name, price: p.price, rating: 5, reviews: 0, commission: "100%", emoji: p.emoji };
                    if (!queued.some(q => q.name === p.name)) onAddToQueue(product as any);
                  }}
                  className="bg-twitch-purple/20 text-twitch-purple px-2 py-1 rounded text-xs font-semibold hover:bg-twitch-purple/30 transition-colors"
                >
                  <Plus className="w-3 h-3 inline mr-1" />Queue
                </button>
              </div>
            ))}
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-amazon-orange mt-0.5" />
              <div>
                <h4 className="text-foreground text-sm font-semibold">How Amazon FBA Works</h4>
                <ol className="text-muted-foreground text-xs mt-1 space-y-1 list-decimal list-inside">
                  <li>Create your product listing on Twitch Commerce</li>
                  <li>Ship your inventory to Amazon's fulfillment center</li>
                  <li>Amazon stores, packs, and ships orders for you</li>
                  <li>Prime members get free shipping on your products</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorCatalog;
