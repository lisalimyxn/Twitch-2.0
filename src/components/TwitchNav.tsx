import { Search, Bell, MessageSquare } from "lucide-react";

const TwitchNav = () => (
  <div className="flex items-center justify-between px-4 py-2 bg-twitch-panel border-b border-border">
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 40 40" className="w-8 h-8 text-twitch-purple" fill="currentColor">
        <path d="M5.7 0L1.4 10.985V34.314h9.7v5.686h5.7L22.6 34.314h7.1l9.7-10.985V0H5.7zM8.6 2.857h27.4v17.143l-5.7 5.714h-8.6l-5.7 5.714v-5.714H8.6V2.857zM17.2 8.57h2.9v8.572h-2.9V8.57zm8.6 0h2.9v8.572h-2.9V8.57z" />
      </svg>
      <span className="text-foreground font-bold text-lg">Browse</span>
    </div>
    <div className="flex items-center bg-secondary rounded px-3 py-1.5 w-96">
      <input className="bg-transparent text-foreground text-sm flex-1 outline-none placeholder:text-muted-foreground" placeholder="Search" />
      <Search className="w-4 h-4 text-muted-foreground" />
    </div>
    <div className="flex items-center gap-4">
      <Bell className="w-5 h-5 text-muted-foreground" />
      <MessageSquare className="w-5 h-5 text-muted-foreground" />
      <button className="bg-twitch-purple text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold">Log In</button>
    </div>
  </div>
);

export default TwitchNav;
