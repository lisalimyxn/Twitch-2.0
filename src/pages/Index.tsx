import { useState } from "react";
import TwitchTopNav from "@/components/TwitchTopNav";
import TwitchSidebar from "@/components/TwitchSidebar";
import BrowsePage from "@/components/BrowsePage";
import StreamPage from "@/components/StreamPage";
import CreatorFlow from "@/components/flows/CreatorFlow";
import SafeguardsFlow from "@/components/flows/SafeguardsFlow";

type Page = "browse" | "stream" | "creator" | "safeguards";

const Index = () => {
  const [page, setPage] = useState<Page>("browse");
  const [activeChannel, setActiveChannel] = useState("GamerStreamer_Pro");

  const handleNavigate = (target: string) => {
    if (target === "home" || target === "browse") setPage("browse");
    else if (target === "creator") setPage("creator");
    else if (target === "safeguards") setPage("safeguards");
  };

  const handleWatchStream = (channelName: string) => {
    setActiveChannel(channelName);
    setPage("stream");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <TwitchTopNav onNavigate={handleNavigate} currentPage={page} />
      <div className="flex flex-1 overflow-hidden">
        {(page === "browse" || page === "stream") && <TwitchSidebar />}
        <div className="flex-1 flex flex-col overflow-hidden">
          {page === "browse" && <BrowsePage onWatchStream={handleWatchStream} />}
          {page === "stream" && (
            <StreamPage
              channelName={activeChannel}
              onBack={() => setPage("browse")}
              hasCommerce={["GamerStreamer_Pro", "TechReviewer", "ArtistLive", "FashionFwd"].includes(activeChannel)}
            />
          )}
          {page === "creator" && <CreatorFlow onBack={() => setPage("browse")} />}
          {page === "safeguards" && <SafeguardsFlow onBack={() => setPage("browse")} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
