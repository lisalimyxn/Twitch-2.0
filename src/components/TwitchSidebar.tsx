import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Channel {
  name: string;
  game: string;
  viewers: string;
  avatar: string;
}

const liveChannels: Channel[] = [
  { name: "BLASTPremier", game: "Counter-Strike", viewers: "38K", avatar: "BP" },
  { name: "ESL_DOTA2", game: "Dota 2", viewers: "13.6K", avatar: "ED" },
  { name: "ohnePixel", game: "Counter-Strike", viewers: "40.9K", avatar: "oP" },
  { name: "Jinnytty", game: "Just Chatting", viewers: "3.7K", avatar: "Jn" },
  { name: "Gorgc", game: "Dota 2", viewers: "6.7K", avatar: "Gc" },
  { name: "singsing", game: "Crimson Desert", viewers: "2K", avatar: "ss" },
  { name: "shroud", game: "Crimson Desert", viewers: "107", avatar: "sh" },
  { name: "shxtou", game: "Just Chatting", viewers: "2.4K", avatar: "sx" },
  { name: "Peter", game: "FINAL FANTASY IX", viewers: "2.3K", avatar: "Pt" },
];

const TwitchSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-twitch-panel border-r border-border flex flex-col transition-all duration-200 ${collapsed ? "w-[50px]" : "w-[240px]"}`}>
      <div className="flex items-center justify-between px-3 py-2">
        {!collapsed && <span className="text-foreground text-sm font-semibold">Live Channels</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground hover:text-foreground">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {liveChannels.map((ch) => (
          <div key={ch.name} className="flex items-center gap-2 px-3 py-1.5 hover:bg-twitch-hover cursor-pointer transition-colors">
            <div className="w-7 h-7 rounded-full bg-twitch-purple/30 flex items-center justify-center text-[10px] font-bold text-twitch-purple flex-shrink-0">
              {ch.avatar}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-foreground text-sm font-medium truncate">{ch.name}</p>
                  <p className="text-muted-foreground text-xs truncate">{ch.game}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-muted-foreground text-xs">{ch.viewers}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwitchSidebar;
