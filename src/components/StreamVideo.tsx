import { Eye } from "lucide-react";

const StreamVideo = () => (
  <div className="flex-1 bg-black relative">
    {/* Simulated stream content */}
    <div className="absolute inset-0 bg-gradient-to-br from-twitch-dark via-[#1a0a2e] to-twitch-dark flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-32 h-32 mx-auto rounded-full twitch-gradient flex items-center justify-center">
          <span className="text-4xl font-bold text-primary-foreground">GS</span>
        </div>
        <h2 className="text-foreground text-xl font-bold">GamerStreamer_Pro</h2>
        <p className="text-muted-foreground text-sm">Playing: Elden Ring — Level 150 Boss Rush</p>
      </div>
    </div>
    {/* Stream info bar */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-foreground font-bold">🔴 LIVE — Elden Ring Boss Rush No Death Run</h3>
          <p className="text-muted-foreground text-sm">GamerStreamer_Pro • Elden Ring</p>
        </div>
        <div className="flex items-center gap-1 text-destructive">
          <Eye className="w-4 h-4" />
          <span className="text-sm font-semibold">14.2K</span>
        </div>
      </div>
    </div>
  </div>
);

export default StreamVideo;
