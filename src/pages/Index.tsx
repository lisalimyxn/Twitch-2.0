import { useState } from "react";
import TwitchTopNav from "@/components/TwitchTopNav";
import TwitchSidebar from "@/components/TwitchSidebar";
import BrowsePage from "@/components/BrowsePage";
import StreamPage from "@/components/StreamPage";
import CreatorFlow from "@/components/flows/CreatorFlow";
import SafeguardsFlow from "@/components/flows/SafeguardsFlow";

type Page = "browse" | "stream" | "creator" | "safeguards" | "viewer";

const Index = () => {
  const [page, setPage] = useState<Page>("browse");
  const [activeChannel, setActiveChannel] = useState("GamerStreamer_Pro");

  const handleNavigate = (target: string) => {
    if (target === "home" || target === "browse") setPage("browse");
    else if (target === "viewer") {
      setActiveChannel("GamerStreamer_Pro");
      setPage("stream");
    }
  };

  const handleWatchStream = (channelName: string) => {
    setActiveChannel(channelName);
    setPage("stream");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <TwitchTopNav onNavigate={handleNavigate} currentPage={page === "browse" ? "browse" : page === "stream" ? "viewer" : undefined} />
      <div className="flex flex-1 overflow-hidden">
        <TwitchSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub-nav for flows */}
          <div className="bg-twitch-panel/60 border-b border-border px-4 py-1.5 flex items-center gap-1 text-xs">
            <button
              onClick={() => setPage("browse")}
              className={`px-3 py-1 rounded font-semibold transition-colors ${page === "browse" ? "bg-twitch-purple text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              🏠 Browse
            </button>
            <button
              onClick={() => { setActiveChannel("GamerStreamer_Pro"); setPage("stream"); }}
              className={`px-3 py-1 rounded font-semibold transition-colors ${page === "stream" ? "bg-twitch-purple text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              🎮 Viewer Flow
            </button>
            <button
              onClick={() => setPage("creator")}
              className={`px-3 py-1 rounded font-semibold transition-colors ${page === "creator" ? "bg-twitch-purple text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              📊 Creator Dashboard
            </button>
            <button
              onClick={() => setPage("safeguards")}
              className={`px-3 py-1 rounded font-semibold transition-colors ${page === "safeguards" ? "bg-twitch-purple text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              🛡️ Safeguards
            </button>
          </div>

          {/* Main content */}
          {page === "browse" && <BrowsePage onWatchStream={handleWatchStream} />}
          {page === "stream" && (
            <StreamPage
              channelName={activeChannel}
              onBack={() => setPage("browse")}
              hasCommerce={["GamerStreamer_Pro", "TechReviewer", "ArtistLive", "FashionFwd"].includes(activeChannel)}
            />
          )}
          {page === "creator" && <CreatorFlow />}
          {page === "safeguards" && <SafeguardsFlow />}
        </div>
      </div>
      {/* Bottom banner */}
      <div className="bg-twitch-purple flex items-center justify-between px-4 py-1.5">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 40 40" className="w-5 h-5 text-primary-foreground" fill="currentColor">
            <path d="M5.7 0L1.4 10.985V34.314h9.7v5.686h5.7L22.6 34.314h7.1l9.7-10.985V0H5.7zM8.6 2.857h27.4v17.143l-5.7 5.714h-8.6l-5.7 5.714v-5.714H8.6V2.857zM17.2 8.57h2.9v8.572h-2.9V8.57zm8.6 0h2.9v8.572h-2.9V8.57z" />
          </svg>
          <span className="text-primary-foreground text-xs font-semibold">Join the Twitch community!</span>
          <span className="text-primary-foreground/80 text-xs">Discover the best live streams anywhere.</span>
        </div>
        <button className="bg-foreground text-background px-3 py-0.5 rounded text-xs font-semibold">Sign Up</button>
      </div>
    </div>
  );
};

export default Index;
