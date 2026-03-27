const messages = [
  { user: "xQcFan42", color: "#FF6B6B", msg: "LMAOOO" },
  { user: "ninja_wannabe", color: "#4ECDC4", msg: "this game is insane" },
  { user: "pogchamp99", color: "#FFE66D", msg: "PogChamp PogChamp" },
  { user: "streamsniper", color: "#A8E6CF", msg: "GG EZ" },
  { user: "ModeratorBot", color: "#9146FF", msg: "Welcome to the stream!" },
  { user: "chatter_001", color: "#FF9900", msg: "let's goooo" },
  { user: "lurker_king", color: "#45B7D1", msg: "been here for 3 hours" },
  { user: "sub_hype", color: "#96CEB4", msg: "just subbed! Pog" },
  { user: "donation_alert", color: "#FFEAA7", msg: "$5 dono: love the stream" },
  { user: "clip_it", color: "#DDA0DD", msg: "CLIP THAT" },
  { user: "emote_only", color: "#98D8C8", msg: "Kappa Kappa Kappa" },
  { user: "new_viewer", color: "#F7DC6F", msg: "first time here, hi!" },
];

const TwitchChat = () => (
  <div className="w-80 bg-twitch-panel border-l border-border flex flex-col h-full">
    <div className="p-3 border-b border-border text-center">
      <span className="text-foreground font-semibold text-sm">Stream Chat</span>
    </div>
    <div className="flex-1 overflow-y-auto p-3 space-y-1">
      {messages.map((m, i) => (
        <div key={i} className="text-sm">
          <span className="font-bold" style={{ color: m.color }}>{m.user}</span>
          <span className="text-muted-foreground">: </span>
          <span className="text-foreground">{m.msg}</span>
        </div>
      ))}
    </div>
    <div className="p-3 border-t border-border">
      <div className="bg-secondary rounded px-3 py-2">
        <input className="bg-transparent text-foreground text-sm w-full outline-none placeholder:text-muted-foreground" placeholder="Send a message" />
      </div>
      <div className="flex justify-end mt-2">
        <button className="bg-twitch-purple text-primary-foreground px-4 py-1 rounded text-sm font-semibold">Chat</button>
      </div>
    </div>
  </div>
);

export default TwitchChat;
