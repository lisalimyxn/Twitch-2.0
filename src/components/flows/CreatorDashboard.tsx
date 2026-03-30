import { useState } from "react";
import { TrendingUp, DollarSign, ShoppingCart, Users, Brain, Clock, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

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

const ageData = [
  { group: "13–17", percent: 8 },
  { group: "18–24", percent: 42 },
  { group: "25–34", percent: 31 },
  { group: "35–44", percent: 13 },
  { group: "45+", percent: 6 },
];

const genderData = [
  { name: "Male", value: 70.8, color: "hsl(200, 100%, 68%)" },
  { name: "Female", value: 22.4, color: "hsl(330, 80%, 65%)" },
  { name: "Other", value: 6.8, color: "hsl(145, 63%, 52%)" },
];

const recommendedProducts = [
  { name: "Logitech G Pro X Superlight 2", price: "$79.99", match: 83, reason: "Top match for your audience" },
  { name: "Elgato Stream Deck MK.2", price: "$99.99", match: 83, reason: "Trending in gaming" },
  { name: "Blue Yeti USB Microphone", price: "$129.99", match: 81, reason: "Strong price-point fit" },
  { name: "Razer Kraken V4 Headset", price: "$129.99", match: 79, reason: "Top seller in segment" },
  { name: "Razer Chroma Mousepad XL", price: "$49.99", match: 78, reason: "Highest conversion potential" },
];

const topProducts = [
  { name: "SteelSeries Arctis Nova Pro", sales: 312, revenue: "$1,247", cvr: "5.2%" },
  { name: "Lisa Lim Logo Hoodie", sales: 287, revenue: "$892", cvr: "8.1%" },
  { name: "Elgato Stream Deck MK.2", sales: 198, revenue: "$594", cvr: "4.3%" },
  { name: "LisaLim Mousepad XL", sales: 156, revenue: "$312", cvr: "7.6%" },
  { name: "Razer DeathAdder V3 Pro", sales: 134, revenue: "$402", cvr: "3.9%" },
];

const engagementData = Array.from({ length: 24 }, (_, i) => {
  const min = i * 5;
  const peak = 60;
  const engagement = Math.exp(-0.5 * Math.pow((min - peak) / 25, 2)) * 100;
  return { minute: `${min}m`, engagement: Math.round(engagement) };
});

const GENDER_COLORS = ["hsl(200, 100%, 68%)", "hsl(330, 80%, 65%)", "hsl(145, 63%, 52%)"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-background border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-foreground font-semibold">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-muted-foreground">
          {p.name}: <span className="text-foreground font-medium">{typeof p.value === "number" && p.name?.includes("evenue") ? `$${p.value}` : p.value}{typeof p.value === "number" && p.name !== "Revenue" ? "%" : ""}</span>
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
          { label: "Total Revenue", sub: "Last 12 months", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-success" },
          { label: "Total Sales", sub: "Last 12 months", value: totalSales.toLocaleString(), icon: ShoppingCart, color: "text-twitch-purple" },
          { label: "Conversion Rate", sub: "Viewers → Buyers", value: "4.8%", icon: TrendingUp, color: "text-amazon-orange" },
          { label: "Unique Buyers", sub: "Distinct customers", value: "1,247", icon: Users, color: "text-foreground" },
        ].map((s, i) => (
          <div key={i} className="bg-twitch-panel border border-border rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              <span className="text-muted-foreground text-[10px]">{s.label}</span>
            </div>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-muted-foreground text-[9px] mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-twitch-panel border border-border rounded-lg p-4">
        <h3 className="text-foreground font-semibold text-sm mb-1">Monthly Revenue</h3>
        <p className="text-muted-foreground text-[10px] mb-3">Revenue from product sales per month ($)</p>
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
        <h3 className="text-foreground font-semibold text-sm mb-1">Top Selling Products</h3>
        <p className="text-muted-foreground text-[10px] mb-2">Your best performers by units sold. CVR = % of viewers who bought.</p>
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-3 gap-y-0 text-[10px] text-muted-foreground font-semibold mb-1 px-1">
          <span>#</span><span>Product</span><span>Sales</span><span>Revenue</span><span>CVR</span>
        </div>
        {topProducts.map((p, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-3 items-center py-1.5 border-b border-border last:border-0 px-1">
            <span className="text-muted-foreground font-mono text-xs w-4">#{i + 1}</span>
            <span className="text-foreground text-sm">{p.name}</span>
            <span className="text-muted-foreground text-xs">{p.sales}</span>
            <span className="text-foreground text-xs font-semibold">{p.revenue}</span>
            <span className="text-success text-xs font-semibold">{p.cvr}</span>
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

        {/* Demographics: Age + Gender side by side */}
        <div className="grid grid-cols-2 gap-4">
          {/* Age Distribution */}
          <div className="bg-secondary rounded-lg p-3">
            <h4 className="text-foreground text-sm font-semibold mb-1">Viewer Age</h4>
            <p className="text-muted-foreground text-[10px] mb-2">% of your audience by age group</p>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData}>
                  <XAxis dataKey="group" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip formatter={(v: number) => `${v}%`} />
                  <Bar dataKey="percent" name="Viewers" fill="hsl(264, 100%, 64%)" radius={[3, 3, 0, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gender Split */}
          <div className="bg-secondary rounded-lg p-3">
            <h4 className="text-foreground text-sm font-semibold mb-1">Viewer Gender</h4>
            <p className="text-muted-foreground text-[10px] mb-2">Gender breakdown of your audience</p>
            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={genderData} cx="50%" cy="50%" innerRadius={25} outerRadius={48} dataKey="value" paddingAngle={3}>
                    {genderData.map((_, i) => <Cell key={i} fill={GENDER_COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-1">
              {genderData.map((g, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: GENDER_COLORS[i] }} />
                    <span className="text-foreground">{g.name}</span>
                  </div>
                  <span className="text-muted-foreground">{g.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amazon-orange" />
            <h4 className="text-foreground text-sm font-semibold">Recommended for Your Audience</h4>
          </div>
          <p className="text-muted-foreground text-[10px] mb-2">Products AI thinks your viewers are most likely to buy. Match % = fit score.</p>
          <div className="space-y-1">
            {recommendedProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-twitch-panel rounded p-2">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-xs font-medium">{p.name}</span>
                  <span className="text-muted-foreground text-[10px]">{p.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-[10px]">{p.reason}</span>
                  <span className="bg-success/20 text-success text-[10px] px-1.5 py-0.5 rounded font-bold">{p.match}% match</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimal Timing */}
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-success" />
            <h4 className="text-foreground text-sm font-semibold">Best Time to Feature Products</h4>
          </div>
          <p className="text-muted-foreground text-[10px] mb-2">
            When viewers are most likely to buy during your stream (based on past 20 streams)
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
                <Area type="monotone" dataKey="engagement" name="Buy Intent" stroke="hsl(264, 100%, 64%)" fill="url(#engGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-2 mt-2 text-[10px]">
            <span className="bg-success/15 text-success px-2 py-0.5 rounded">✓ Best window: 45–65 min</span>
            <span className="bg-destructive/15 text-destructive px-2 py-0.5 rounded">✗ Avoid first 10 min</span>
          </div>
        </div>

        {/* Stream Discovery */}
        <div className="bg-secondary rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-twitch-purple" />
            <h4 className="text-foreground text-sm font-semibold">Discovery Boost</h4>
          </div>
          <p className="text-muted-foreground text-[10px] mb-2">Commerce activity helps Twitch's algorithm recommend your stream to new viewers</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-twitch-panel rounded-lg p-2 text-center">
              <p className="text-xl font-bold text-twitch-purple">1.35×</p>
              <p className="text-[10px] text-muted-foreground">Algorithm boost</p>
            </div>
            <div className="bg-twitch-panel rounded-lg p-2 text-center">
              <p className="text-xl font-bold text-success">25.7%</p>
              <p className="text-[10px] text-muted-foreground">New viewers from commerce</p>
            </div>
            <div className="bg-twitch-panel rounded-lg p-2 text-center">
              <p className="text-xl font-bold text-foreground">+296</p>
              <p className="text-[10px] text-muted-foreground">Extra viewers / month</p>
            </div>
          </div>
        </div>

        {/* Algorithm Details (collapsible) */}
        <button
          onClick={() => setShowAlgoDetails(!showAlgoDetails)}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors w-full"
        >
          {showAlgoDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          How does the AI work?
        </button>
        {showAlgoDetails && (
          <div className="bg-secondary rounded-lg p-3 text-[11px] text-muted-foreground space-y-1.5">
            <p><strong className="text-foreground">Audience Segments:</strong> K-Means clustering on viewer demographics</p>
            <p><strong className="text-foreground">Product Matching:</strong> Cosine similarity between audience profile and product categories</p>
            <p><strong className="text-foreground">Timing Analysis:</strong> Peak detection on chat activity across your last 20 streams</p>
            <p><strong className="text-foreground">Conversion Tracking:</strong> Bayesian model updating in real-time as viewers buy</p>
            <p><strong className="text-foreground">Discovery Boost:</strong> Engagement-based algorithm multiplier (similar to TikTok Shop)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;
