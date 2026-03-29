import { Search, Bell, MessageSquare, Crown, LayoutDashboard, Settings, ChevronDown, ShoppingCart, X, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

interface TwitchTopNavProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const TwitchTopNav = ({ onNavigate, currentPage }: TwitchTopNavProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { items, removeItem, isOpen, setIsOpen } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setIsOpen]);

  return (
    <div className="flex items-center justify-between px-2 py-1.5 bg-twitch-panel border-b border-border h-[50px]">
      <div className="flex items-center gap-3">
        <button onClick={() => onNavigate?.("home")} className="flex items-center">
          <svg viewBox="0 0 40 40" className="w-8 h-8 text-twitch-purple" fill="currentColor">
            <path d="M5.7 0L1.4 10.985V34.314h9.7v5.686h5.7L22.6 34.314h7.1l9.7-10.985V0H5.7zM8.6 2.857h27.4v17.143l-5.7 5.714h-8.6l-5.7 5.714v-5.714H8.6V2.857zM17.2 8.57h2.9v8.572h-2.9V8.57zm8.6 0h2.9v8.572h-2.9V8.57z" />
          </svg>
        </button>
        <button
          onClick={() => onNavigate?.("browse")}
          className={`text-foreground font-bold text-sm hover:text-twitch-purple transition-colors ${currentPage === "browse" ? "text-twitch-purple" : ""}`}
        >
          Browse
        </button>
        <span className="text-muted-foreground text-sm">|</span>
        <button
          onClick={() => onNavigate?.("creator")}
          className={`text-sm font-semibold hover:text-twitch-purple transition-colors flex items-center gap-1 ${currentPage === "creator" ? "text-twitch-purple" : "text-muted-foreground"}`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" /> Creator Dashboard
        </button>
      </div>
      <div className="flex items-center bg-secondary rounded px-3 py-1.5 w-[380px]">
        <input className="bg-transparent text-foreground text-sm flex-1 outline-none placeholder:text-muted-foreground" placeholder="Search" />
        <div className="border-l border-border pl-2 ml-2">
          <Search className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative">
          <Crown className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">3</span>
        </button>
        <MessageSquare className="w-5 h-5 text-muted-foreground cursor-pointer" />

        {/* Shopping Cart */}
        <div className="relative" ref={cartRef}>
          <button onClick={() => setIsOpen(!isOpen)} className="relative hover:opacity-80 transition-opacity">
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amazon-orange rounded-full text-[10px] text-black flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </button>
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-twitch-panel border border-border rounded-lg shadow-xl z-50">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="text-foreground font-semibold text-sm">Shopping Cart ({items.length})</span>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {items.length === 0 ? (
                <div className="p-6 text-center">
                  <ShoppingCart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Your cart is empty</p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                      <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center text-lg flex-shrink-0">
                        {item.emoji || "📦"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-xs font-semibold truncate">{item.name}</p>
                        <p className="text-foreground text-sm font-bold">{item.price}</p>
                        {item.fromChannel && (
                          <p className="text-muted-foreground text-[10px]">
                            From <span className="text-twitch-purple">{item.fromChannel}</span>'s stream
                          </p>
                        )}
                      </div>
                      <button onClick={() => removeItem(i)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {items.length > 0 && (
                <div className="p-3 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-foreground font-bold">
                      ${items.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0).toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full amazon-btn text-black py-2 rounded-lg font-bold text-sm">
                    Checkout with amazon pay
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User avatar dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-twitch-purple flex items-center justify-center text-primary-foreground text-xs font-bold">
              LL
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-twitch-panel border border-border rounded-lg shadow-xl z-50 py-1">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-foreground font-bold text-sm">Lisa Lim</p>
                <p className="text-muted-foreground text-xs">@lisalim_live</p>
              </div>
              <button
                onClick={() => { onNavigate?.("creator"); setShowDropdown(false); }}
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Creator Dashboard
              </button>
              <button
                onClick={() => { onNavigate?.("safeguards"); setShowDropdown(false); }}
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary flex items-center gap-2"
              >
                <Settings className="w-4 h-4" /> Settings
              </button>
              <div className="border-t border-border mt-1 pt-1">
                <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary">
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwitchTopNav;
