import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const PurchaseConfirmation = ({ onConfirm, onCancel }: Props) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="absolute inset-0 bg-black/70 flex items-center justify-center z-30"
  >
    <div className="bg-twitch-panel rounded-xl border border-border p-6 w-80 shadow-2xl">
      <h3 className="text-foreground text-lg font-bold text-center">Confirm Purchase</h3>
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3 bg-secondary rounded-lg p-3">
          <div className="w-12 h-12 bg-twitch-hover rounded flex items-center justify-center text-2xl">🎧</div>
          <div className="flex-1">
            <p className="text-foreground text-sm font-medium">SteelSeries Arctis Nova Pro</p>
            <p className="text-foreground font-bold">$249.99</p>
          </div>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-muted-foreground">Delivering to:</p>
            <p className="text-foreground">123 Main St, San Francisco, CA 94102</p>
          </div>
        </div>
        <div className="text-sm text-success font-medium">🚚 Prime: FREE delivery tomorrow</div>
      </div>
      <button onClick={onConfirm} className="w-full amazon-btn text-black py-3 rounded-lg font-bold text-sm mt-4">
        Confirm Purchase
      </button>
      <button onClick={onCancel} className="w-full text-muted-foreground text-sm mt-2 hover:text-foreground transition-colors">
        Cancel
      </button>
    </div>
  </motion.div>
);

export default PurchaseConfirmation;
