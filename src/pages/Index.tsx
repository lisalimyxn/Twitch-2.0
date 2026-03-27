import { useState } from "react";
import { ShoppingCart, Monitor, Shield, Play } from "lucide-react";
import ViewerFlow from "@/components/flows/ViewerFlow";
import CreatorFlow from "@/components/flows/CreatorFlow";
import SafeguardsFlow from "@/components/flows/SafeguardsFlow";

type Flow = "home" | "viewer" | "creator" | "safeguards";

const Index = () => {
  const [flow, setFlow] = useState<Flow>("home");

  if (flow === "viewer") return (
    <div className="h-screen flex flex-col">
      <FlowHeader onBack={() => setFlow("home")} title="Flow 1: Viewer Experience" />
      <div className="flex-1 overflow-hidden"><ViewerFlow /></div>
    </div>
  );
  if (flow === "creator") return (
    <div className="h-screen flex flex-col">
      <FlowHeader onBack={() => setFlow("home")} title="Flow 2: Creator Experience" />
      <div className="flex-1 overflow-hidden"><CreatorFlow /></div>
    </div>
  );
  if (flow === "safeguards") return (
    <div className="h-screen flex flex-col">
      <FlowHeader onBack={() => setFlow("home")} title="Flow 3: Safeguards" />
      <div className="flex-1 overflow-hidden"><SafeguardsFlow /></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <svg viewBox="0 0 40 40" className="w-10 h-10 text-twitch-purple" fill="currentColor">
              <path d="M5.7 0L1.4 10.985V34.314h9.7v5.686h5.7L22.6 34.314h7.1l9.7-10.985V0H5.7zM8.6 2.857h27.4v17.143l-5.7 5.714h-8.6l-5.7 5.714v-5.714H8.6V2.857zM17.2 8.57h2.9v8.572h-2.9V8.57zm8.6 0h2.9v8.572h-2.9V8.57z" />
            </svg>
            <span className="text-3xl font-bold">×</span>
            <span className="text-amazon-orange text-3xl font-extrabold">amazon</span>
          </div>
          <h1 className="text-foreground text-4xl font-extrabold">Twitch Live Commerce</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Seamless in-stream shopping powered by Amazon Pay. 3 taps, under 10 seconds, without ever leaving the stream.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { key: "viewer" as Flow, icon: Play, title: "Viewer Experience", desc: "What viewers see when a creator sells a product", screens: "6 screens" },
            { key: "creator" as Flow, icon: Monitor, title: "Creator Experience", desc: "How creators manage commerce in their dashboard", screens: "6 screens" },
            { key: "safeguards" as Flow, icon: Shield, title: "Safeguards", desc: "Opt-in controls proving commerce is non-intrusive", screens: "4 screens" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFlow(f.key)}
              className="bg-twitch-panel border border-border rounded-xl p-6 text-left hover:border-twitch-purple transition-all group"
            >
              <f.icon className="w-8 h-8 text-twitch-purple mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground font-bold text-lg">{f.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{f.desc}</p>
              <span className="inline-block mt-3 text-twitch-purple text-xs font-semibold bg-twitch-purple/10 px-2 py-1 rounded">{f.screens}</span>
            </button>
          ))}
        </div>

        <p className="text-muted-foreground text-xs">Digital Business, Technology & Transformation • Interactive Prototype</p>
      </div>
    </div>
  );
};

const FlowHeader = ({ onBack, title }: { onBack: () => void; title: string }) => (
  <div className="bg-background border-b border-border px-4 py-2 flex items-center gap-3">
    <button onClick={onBack} className="text-muted-foreground hover:text-foreground text-sm">← Home</button>
    <span className="text-foreground font-semibold text-sm">{title}</span>
  </div>
);

export default Index;
