import { X, Star, Truck, Shield, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProductDetailPanelProps {
  onClose: () => void;
  onBuy: () => void;
}

const ProductDetailPanel = ({ onClose, onBuy }: ProductDetailPanelProps) => (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "spring", damping: 30, stiffness: 300 }}
    className="absolute top-0 right-0 w-96 h-full bg-twitch-panel border-l border-border z-20 flex flex-col"
  >
    <div className="flex items-center justify-between p-4 border-b border-border">
      <span className="text-foreground font-semibold">Product Details</span>
      <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-twitch-hover transition-colors">
        <X className="w-4 h-4 text-foreground" />
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="h-48 bg-gradient-to-br from-secondary to-twitch-hover rounded-lg flex items-center justify-center">
        <div className="w-28 h-28 bg-secondary rounded-lg flex items-center justify-center text-4xl">🎧</div>
      </div>
      <div>
        <h3 className="text-foreground text-lg font-bold">SteelSeries Arctis Nova Pro Wireless</h3>
        <p className="text-muted-foreground text-sm mt-1">Multi-System Gaming Headset — Premium Hi-Fi Drivers — Active Noise Cancellation</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-amazon-orange fill-amazon-orange" : "text-muted-foreground"}`} />
          ))}
        </div>
        <span className="text-twitch-purple text-sm font-medium">4.3 (2,847 ratings)</span>
      </div>
      <div className="text-3xl font-bold text-foreground">$249.99</div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="w-4 h-4 text-success" />
          <span className="text-success font-medium">Prime: FREE delivery tomorrow</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">30-day return policy</span>
        </div>
      </div>
      <button onClick={onBuy} className="w-full amazon-btn text-black py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
        <span>Buy with</span>
        <span className="font-extrabold">amazon pay</span>
        <ChevronRight className="w-4 h-4" />
      </button>
      <p className="text-muted-foreground text-xs text-center">One-tap purchase using your Amazon account</p>
    </div>
  </motion.div>
);

export default ProductDetailPanel;
