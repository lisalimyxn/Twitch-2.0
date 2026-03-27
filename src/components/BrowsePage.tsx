import { X } from "lucide-react";

const categories = [
  { name: "Games", color: "from-blue-600 to-purple-600", emoji: "🎮" },
  { name: "IRL", color: "from-amber-500 to-orange-600", emoji: "📷" },
  { name: "Music & DJs", color: "from-green-500 to-teal-600", emoji: "🎵" },
  { name: "Creative", color: "from-pink-500 to-rose-600", emoji: "🎨" },
  { name: "Esports", color: "from-red-500 to-red-700", emoji: "🏆" },
  { name: "Shopping", color: "from-yellow-500 to-amber-600", emoji: "🛍️" },
];

const liveChannels = [
  { name: "GamerStreamer_Pro", title: "🔴 Elden Ring Boss Rush — No Death Run!", game: "Elden Ring", viewers: "14.2K", tags: ["English", "Gaming"], hasCommerce: true },
  { name: "TechReviewer", title: "Unboxing NEW SteelSeries Headset + Giveaway!", game: "Just Chatting", viewers: "8.4K", tags: ["Shopping", "Tech"], hasCommerce: true },
  { name: "CasualChatting", title: "Chill vibes & Q&A — Come hang out!", game: "Just Chatting", viewers: "3.1K", tags: ["English", "Chill"], hasCommerce: false },
  { name: "ProLeague_CS2", title: "BLAST Premier Finals — Semi-Final Match", game: "Counter-Strike", viewers: "42.5K", tags: ["Esports", "English"], hasCommerce: false },
  { name: "ArtistLive", title: "Drawing YOUR characters LIVE! Drop refs in chat", game: "Art", viewers: "1.8K", tags: ["Creative", "Art"], hasCommerce: true },
  { name: "SpeedRunner_X", title: "WR Attempts — Hollow Knight Any% 🏃", game: "Hollow Knight", viewers: "5.6K", tags: ["Speedrun", "Gaming"], hasCommerce: false },
  { name: "MusicMaestro", title: "Lo-fi beats to stream to 🎵 Taking requests!", game: "Music", viewers: "2.9K", tags: ["Music", "Chill"], hasCommerce: false },
  { name: "FashionFwd", title: "Spring Haul Try-On — Shopping Stream!", game: "Just Chatting", viewers: "6.2K", tags: ["Shopping", "Fashion"], hasCommerce: true },
];

interface BrowsePageProps {
  onWatchStream: (channelName: string) => void;
}

const BrowsePage = ({ onWatchStream }: BrowsePageProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h1 className="text-foreground text-4xl font-extrabold mb-6">Browse</h1>

      {/* Category cards */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <div key={cat.name} className={`flex-shrink-0 w-[180px] h-[80px] bg-gradient-to-r ${cat.color} rounded-lg flex items-center justify-between px-4 cursor-pointer hover:scale-105 transition-transform`}>
            <span className="text-primary-foreground font-bold text-lg">{cat.name}</span>
            <span className="text-3xl">{cat.emoji}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border mb-4">
        <button className="text-muted-foreground font-semibold text-sm pb-2 hover:text-foreground">Categories</button>
        <button className="text-foreground font-semibold text-sm pb-2 border-b-2 border-twitch-purple">Live Channels</button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button className="bg-secondary text-muted-foreground text-xs px-3 py-1.5 rounded flex items-center gap-1">
            Language <span className="text-muted-foreground/50">▾</span>
          </button>
          <div className="flex items-center bg-secondary text-muted-foreground text-xs px-3 py-1.5 rounded gap-1">
            <input placeholder="Search Tags" className="bg-transparent outline-none text-foreground w-20 placeholder:text-muted-foreground" />
          </div>
          <span className="bg-twitch-purple text-primary-foreground text-xs px-3 py-1.5 rounded flex items-center gap-1">
            Shopping <X className="w-3 h-3 cursor-pointer" />
          </span>
        </div>
        <button className="text-muted-foreground text-xs flex items-center gap-1">
          Sort by <span className="text-foreground font-semibold">Recommended For You ▾</span>
        </button>
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-4 gap-4">
        {liveChannels.map((ch) => (
          <div key={ch.name} className="cursor-pointer group" onClick={() => onWatchStream(ch.name)}>
            <div className="relative aspect-video bg-gradient-to-br from-twitch-dark via-[#1a0a2e] to-twitch-dark rounded-lg overflow-hidden mb-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full twitch-gradient flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">{ch.name.slice(0, 2).toUpperCase()}</span>
                </div>
              </div>
              <div className="absolute top-2 left-2 bg-destructive px-1.5 py-0.5 rounded text-[10px] font-bold text-primary-foreground">LIVE</div>
              <div className="absolute bottom-2 left-2 bg-black/70 px-1.5 py-0.5 rounded text-[10px] text-foreground">{ch.viewers} viewers</div>
              {ch.hasCommerce && (
                <div className="absolute top-2 right-2 bg-amazon-orange/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-black">🛒</div>
              )}
              <div className="absolute inset-0 bg-twitch-purple/0 group-hover:bg-twitch-purple/10 transition-colors" />
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-twitch-purple/30 flex items-center justify-center text-[10px] font-bold text-twitch-purple flex-shrink-0 mt-0.5">
                {ch.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-foreground text-sm font-semibold truncate group-hover:text-twitch-purple transition-colors">{ch.title}</p>
                <p className="text-muted-foreground text-xs">{ch.name}</p>
                <p className="text-muted-foreground text-xs">{ch.game}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {ch.tags.map((tag) => (
                    <span key={tag} className="bg-secondary text-muted-foreground text-[10px] px-1.5 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mt-8 bg-twitch-purple/10 border border-twitch-purple/30 rounded-lg p-4 text-center">
        <p className="text-muted-foreground text-sm">
          🛍️ Channels with the <span className="bg-amazon-orange/90 text-black text-[10px] px-1.5 py-0.5 rounded font-bold">🛒</span> badge have <strong className="text-foreground">Live Commerce</strong> enabled — powered by Amazon Pay
        </p>
      </div>
    </div>
  );
};

export default BrowsePage;
