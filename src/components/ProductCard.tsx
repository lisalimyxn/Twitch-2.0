import { X, Star, ShoppingCart as CartIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import productHeadphones from "@/assets/product-headphones.jpg";

interface ProductCardProps {
  onDismiss: () => void;
  onTap: () => void;
}

const ProductCard = ({ onDismiss, onTap }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      name: "SteelSeries Arctis Nova Pro",
      price: "$249.99",
      emoji: "🎧",
      fromStream: "🔴 LIVE Stream",
      fromChannel: "iShowSpeed",
    });
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute bottom-20 right-4 w-64 bg-twitch-panel rounded-lg border border-border shadow-2xl overflow-hidden cursor-pointer z-10"
      onClick={onTap}
    >
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-secondary to-twitch-hover flex items-center justify-center overflow-hidden">
          <img src={productHeadphones} alt="Gaming Headphones" className="w-full h-full object-cover" />
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
          className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-foreground" />
        </button>
        <div className="absolute top-2 left-2 bg-twitch-purple/90 px-2 py-0.5 rounded text-xs font-semibold text-primary-foreground">
          Featured
        </div>
      </div>
      <div className="p-3">
        <h4 className="text-foreground text-sm font-semibold truncate">SteelSeries Arctis Nova Pro</h4>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < 4 ? "text-amazon-orange fill-amazon-orange" : "text-muted-foreground"}`} />
          ))}
          <span className="text-muted-foreground text-xs ml-1">(2,847)</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-foreground font-bold">$249.99</span>
          <div className="flex gap-1.5">
            <button
              onClick={handleAddToCart}
              className="bg-secondary text-foreground px-2 py-1 rounded text-xs font-medium hover:bg-twitch-hover transition-colors flex items-center gap-1"
            >
              <CartIcon className="w-3 h-3" />
            </button>
            <button className="amazon-btn text-black px-3 py-1 rounded text-xs font-bold">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
