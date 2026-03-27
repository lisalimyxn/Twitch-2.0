import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

interface Props {
  onDone: () => void;
}

const PurchaseSuccess = ({ onDone }: Props) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-0 bg-black/70 flex items-center justify-center z-30"
    >
      <div className="bg-twitch-panel rounded-xl border border-border p-8 w-72 text-center shadow-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.1 }}
        >
          <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
        </motion.div>
        <h3 className="text-foreground text-xl font-bold mt-4">Order Placed!</h3>
        <p className="text-muted-foreground text-sm mt-2">Arriving tomorrow, March 28</p>
        <button className="text-twitch-purple text-sm font-medium mt-3 hover:underline">Track Order</button>
      </div>
    </motion.div>
  );
};

export default PurchaseSuccess;
