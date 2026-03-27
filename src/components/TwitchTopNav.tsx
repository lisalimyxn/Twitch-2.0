import { Search, Bell, MessageSquare, Crown } from "lucide-react";

interface TwitchTopNavProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const TwitchTopNav = ({ onNavigate, currentPage }: TwitchTopNavProps) => (
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
        onClick={() => onNavigate?.("viewer")}
        className={`text-sm font-semibold hover:text-twitch-purple transition-colors flex items-center gap-1 ${currentPage === "viewer" ? "text-twitch-purple" : "text-muted-foreground"}`}
      >
        <Crown className="w-3.5 h-3.5" /> Live Demo
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
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">21</span>
      </button>
      <MessageSquare className="w-5 h-5 text-muted-foreground cursor-pointer" />
      <button className="bg-twitch-purple text-primary-foreground px-3 py-1 rounded text-sm font-semibold">Log In</button>
      <button className="bg-foreground text-background px-3 py-1 rounded text-sm font-semibold">Sign Up</button>
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
        <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
      </div>
    </div>
  </div>
);

export default TwitchTopNav;
