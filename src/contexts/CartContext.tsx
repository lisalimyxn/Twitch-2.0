import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  name: string;
  price: string;
  emoji?: string;
  image?: string;
  fromStream?: string;
  fromChannel?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([
    { name: "Razer DeathAdder V3 Pro", price: "$89.99", emoji: "🖱️", fromStream: "Elden Ring Boss Rush", fromChannel: "iShowSpeed" },
    { name: "Corsair K70 RGB Pro", price: "$139.99", emoji: "⌨️", fromStream: "Spring Haul Try-On", fromChannel: "FashionFwd" },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (item: CartItem) => {
    if (!items.some(i => i.name === item.name)) {
      setItems(prev => [...prev, item]);
    }
  };

  const removeItem = (index: number) => setItems(prev => prev.filter((_, i) => i !== index));
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
};
