import { useState } from "react";
import { TrendingUp, DollarSign, ShoppingCart, Users, Brain, Clock, Sparkles, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from "recharts";

/* ── STATIC DATA ── */
const monthlyData = [
  { month: "Apr", revenue: 89, sales: 34 },
  { month: "May", revenue: 124, sales: 48 },
  { month: "Jun", revenue: 156, sales: 61 },
  { month: "Jul", revenue: 203, sales: 78 },
  { month: "Aug", revenue: 178, sales: 69 },
  { month: "Sep", revenue: 245, sales: 95 },
  { month: "Oct", revenue: 312, sales: 121 },
  { month: "Nov", revenue: 487, sales: 189 },
  { month: "Dec", revenue: 623, sales: 241 },
  { month: "Jan", revenue: 534, sales: 207 },
  { month: "Feb", revenue: 478, sales: 185 },
  { month: "Mar", revenue: 567, sales: 220 },
];

const audienceSegments = [
  { name: "Core Gamers", value: 35.8, avg: "$110", color: "hsl(264, 100%, 64%)" },
  { name: "Casual Viewers", value: 25.2, avg: "$99", color: "hsl(200, 100%, 68%)" },
  { name: "Tech Enthusiasts", value: 24.0, avg: "$119", color: "hsl(145, 63%, 52%)" },
  { name: "High-Value Buyers", value: 15.0, avg: "$108", color: "hsl(36, 100%, 50%)" },
];

const interestData = [
  { name: "Tech Gadgets", value: 31.8 },
  { name: "Gaming Peripherals", value: 26.8 },
  { name: "Software", value: 13.1 },
  { name: "Energy Drinks", value: 9.9 },
  { name: "Furniture", value: 8.5 },
  { name: "Apparel", value: 6.4 },
  { name: "Collectibles", value: 3.4 },
];

const recommendedProducts = [
  { name: "Logitech G Pro X Superlight 2", price: "$79.99", match: 83, cvr: "8.2%", reason: "Top match for segment" },
  { name: "Elgato Stream Deck MK.2", price: "$99.99", match: 83, cvr: "5.5%", reason: "Trending in gaming" },
  { name: "Blue Yeti USB Microphone", price: "$129.99", match: 81, cvr: "4.8%", reason: "Strong price-point fit" },
  { name: "Razer Kraken V4 Headset", price: "$129.99", match: 79, cvr: "6.8%", reason: "Top seller in segment" },
  { name: "Razer Chroma Mousepad XL", price: "$49.99", match: 78, cvr: "9.5%", reason: "Highest CVR potential" },
];

const topProducts = [
  { name: "SteelSeries Arctis Nova Pro", sales: 312, revenue: "$1,247", cvr: "5.2%" },
  { name: "Lisa Lim Logo Hoodie", sales: 287, revenue: "$892", cvr: "8.1%" },
  { name: "Elgato Stream Deck MK.2", sales: 198, revenue: "$594", cvr: "4.3%" },
  { name: "LisaLim Mousepad XL", sales: 156, revenue: "$312", cvr: "7.6%" },
  { name: "Razer DeathAdder V3 Pro", sales: 134, revenue: "$402", cvr: "3.9%" },
];

// Engagement curve (simulated Gaussian peak around minute 55-65)
const engagementData = Array.from({ length: 24 }, (_, i) => {
  const min = i * 5;
  const peak = 60;
  const engagement = Math.exp(-0.5 * Math.pow((min - peak) / 25, 2)) * 100;
  return { minute: `${min}m`, engagement: Math.round(engagement), min };
});

// Revenue timeline (cumulative, from AI output)
const revenueTimeline = [40, 44, 45, 73, 73, 108, 116, 175, 212, 253, 284, 354, 409, 444, 496, 545, 583, 633, 646, 671, 676, 699, 720, 720, 731, 741, 741, 755, 755, 755].map((v, i) => ({
  minute: `${(i + 1) * 4}m`,
  actual: v,
  smoothed: [40, 41, 42, 52, 58, 73, 86, 113, 142, 176, 208, 252, 299, 342, 388, 435, 480, 526, 562, 594, 619, 643, 666, 682, 697, 710, 719, 730, 738, 743][i],
}));

const PIE_COLORS = ["hsl(264, 100%, 64%)", "hsl(200, 100%, 68%)", "hsl(145, 63%, 52%)", "hsl(36, 100%, 50%)"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-background border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-foreground font-semibold">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-muted-foreground">
          {p.name}: <span className="text-foreground font-medium">{typeof p.value === "number" && p.name?.includes("evenue") ? `$${p.value}` : p.value}</span>
        </p>
      ))}
    </div>
  );
};

const CreatorDashboard = () => {
  const [showAlgoDetails, setShowAlgoDetails] = useState(false);
  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const totalSales = monthlyData.reduce((s, d) => s + d.sales, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-bold">Commerce Analytics</h2>
        <span className="bg-twitch-purple/20 text-twitch-purple text-[10px] px-2 py-0.5 rounded-full font-bold">AI-Powered</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Revenue (12mo)", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-success" },
          { label: "Sales (12mo)", value: totalSales.toLocaleString(), icon: ShoppingCart, color: "text-twitch-purple" },
          { label: "Avg CVR", value: "4.8%", icon: TrendingUp, color: "text-amazon-orange" },
          { label: "Unique Buyers", value: "1,247", icon: Users, color: "text-foreground" },
        ].map((s, i) => (
          <div key={i} className="bg-twitch-panel border border-border rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              <span className="text-muted-foreground text-[10px]">{s.label}</span>
            </div>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-twitch-panel border border-border rounded-lg p-4">
        <h3 className="text-foreground font-semibold text-sm mb-3">Monthly Revenue</h3>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenue" fill="hsl(264, 100%, 64%)" radius={[3, 3, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-twitch-panel border border-border rounded-lg p-4">
        <h3 className="text-foreground font-semibold text-sm mb-2">Top Products</h3>
        {topProducts.map((p, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-mono w-4">#{i + 1}</span>
              <span className="text-foreground text-sm">{p.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">{p.sales} sales</span>
              <span className="text-foreground font-semibold">{p.revenue}</span>
              <span className="text-success font-semibold">{p.cvr}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI INSIGHTS SECTION */}
      <div className="bg-twitch-panel border border-twitch-purple/30 rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-twitch-purple" />
          <h3 className="text-foreground font-semibold text-sm">AI Insights</h3>
          <span className="bg-twitch-purple/20 text-twitch-purple text-[10px] px-2 py-0.5 rounded-full font-medium">Powered by AI</span>
        </div>

        {/* Audience Demographics + Pie */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-twitch-purple" />
              <h4 className="text-foreground text-sm font-semibold">Audience Segments</h4>
            </div>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={audienceSegments} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value" paddingAngle={2}>
                    {audienceSegments.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-1">
              {audienceSegments.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                    <span className="text-foreground">{s.name}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-muted-foreground">{s.value}%</span>
                    <span className="text-amazon-orange font-medium">{s.avg}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-foreground" />
              <h4 className="text-foreground text-sm font-semibold">Audience Interests</h4>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={interestData} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={95} />
                  <Bar dataKey="value" fill="hsl(264, 100%, 64%)" radius={[0, 3, 3, 0]} opacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-muted-foreground text-[10px] mt-1">70.8% male, 18–24 · Sweet spot: $50–$150</p>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amazon-orange" />
            <h4 className="text-foreground text-sm font-semibold">Recommended Products</h4>
          </div>
          <div className="space-y-1">
            {recommendedProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-twitch-panel rounded p-2">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-[10px] font-mono w-4">#{i + 1}</span>
                  <span className="text-foreground text-xs">{p.name}</span>
                  <span className="text-muted-foreground text-[10px]">{p.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-[10px]">{p.reason}</span>
                  <span className="text-[10px] text-success/80">{p.cvr} CVR</span>
                  <span className="bg-success/20 text-success text-[10px] px-1.5 py-0.5 rounded font-bold">{p.match}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimal Timing */}
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-success" />
            <h4 className="text-foreground text-sm font-semibold">Optimal Timing</h4>
          </div>
          <p className="text-muted-foreground text-xs mb-2">
            Peak conversion at <strong className="text-foreground">45–65 min</strong> into stream. Avoid first 10 min.
          </p>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(264, 100%, 64%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(264, 100%, 64%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="minute" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} interval={3} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="engagement" name="Engagement" stroke="hsl(264, 100%, 64%)" fill="url(#engGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-2 mt-2 text-[10px]">
            <span className="bg-twitch-purple/20 text-twitch-purple px-2 py-0.5 rounded">⬆ Peak: ~61 min</span>
            <span className="bg-success/15 text-success px-2 py-0.5 rounded">✓ Best: 45–55 min</span>
            <span className="bg-destructive/15 text-destructive px-2 py-0.5 rounded">✗ Avoid: 0–10 min</span>
          </div>
        </div>

        {/* Stream Discovery */}
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-twitch-purple" />
            <h4 className="text-foreground text-sm font-semibold">Stream Discovery</h4>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-2">
            <div className="bg-twitch-panel rounded-lg p-2 text-center">
              <p className="text-xl font-bold text-twitch-purple">1.35×</p>
              <p className="text-[10px] text-muted-foreground">Algo Boost</p>
            </div>
            <div className="bg-twitch-panel rounded-lg p-2 text-center">
              <p className="text-xl font-bold text-success">25.7%</p>
              <p className="text-[10px] text-muted-foreground">New Viewers via Commerce</p>
            </div>
            <div className="bg-twitch-panel rounded-lg p-2 text-center">
              <p className="text-xl font-bold text-foreground">+296</p>
              <p className="text-[10px] text-muted-foreground">Additional Viewers/mo</p>
            </div>
          </div>
          <p className="text-muted-foreground text-[10px]">
            Stream-level recommendation only — algorithm surfaces your stream, not specific products.
          </p>
        </div>

        {/* Algorithm Details (collapsible) */}
        <button
          onClick={() => setShowAlgoDetails(!showAlgoDetails)}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors w-full"
        >
          {showAlgoDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          AI / Algorithms Used
        </button>
        {showAlgoDetails && (
          <div className="bg-secondary rounded-lg p-3 text-[11px] text-muted-foreground space-y-1.5">
            <p><strong className="text-foreground">Audience Segmentation:</strong> K-Means clustering (k=4) on demographic vectors</p>
            <p><strong className="text-foreground">Product Recommendations:</strong> Cosine similarity (audience × product affinity) + Bayesian Wilson score + log-normal price-fit</p>
            <p><strong className="text-foreground">Optimal Timing:</strong> scipy find_peaks on chat velocity curves + bootstrap CI (n=1000, 20 streams)</p>
            <p><strong className="text-foreground">Real-time CVR:</strong> Beta-Binomial conjugate model — Prior Beta(2,20), same as Netflix/Amazon A/B testing</p>
            <p><strong className="text-foreground">Revenue Forecast:</strong> Exponential smoothing (α=0.3) on cumulative purchase timeline</p>
            <p><strong className="text-foreground">Stream Discovery:</strong> Multiplicative boost model calibrated against TikTok Shop engagement benchmarks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;
