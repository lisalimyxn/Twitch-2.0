import { TrendingUp, DollarSign, Eye, ShoppingCart, Users, Brain, Clock, Sparkles } from "lucide-react";

const monthlyData = [
  { month: "Apr '25", revenue: 89, sales: 34 },
  { month: "May '25", revenue: 124, sales: 48 },
  { month: "Jun '25", revenue: 156, sales: 61 },
  { month: "Jul '25", revenue: 203, sales: 78 },
  { month: "Aug '25", revenue: 178, sales: 69 },
  { month: "Sep '25", revenue: 245, sales: 95 },
  { month: "Oct '25", revenue: 312, sales: 121 },
  { month: "Nov '25", revenue: 487, sales: 189 },
  { month: "Dec '25", revenue: 623, sales: 241 },
  { month: "Jan '26", revenue: 534, sales: 207 },
  { month: "Feb '26", revenue: 478, sales: 185 },
  { month: "Mar '26", revenue: 567, sales: 220 },
];

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

const CreatorDashboard = () => {
  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const totalSales = monthlyData.reduce((s, d) => s + d.sales, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-foreground text-2xl font-bold">Commerce Analytics</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Revenue (1Y)", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-success" },
          { label: "Total Sales (1Y)", value: totalSales.toLocaleString(), icon: ShoppingCart, color: "text-twitch-purple" },
          { label: "Avg. Conversion Rate", value: "4.8%", icon: TrendingUp, color: "text-amazon-orange" },
          { label: "Unique Buyers", value: "1,247", icon: Users, color: "text-foreground" },
        ].map((stat, i) => (
          <div key={i} className="bg-twitch-panel border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-muted-foreground text-xs">{stat.label}</span>
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-twitch-panel border border-border rounded-lg p-4">
        <h3 className="text-foreground font-semibold text-sm mb-4">Monthly Revenue — Last 12 Months</h3>
        <div className="flex items-end gap-1 h-40">
          {monthlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-muted-foreground text-[9px]">${d.revenue}</span>
              <div
                className="w-full bg-twitch-purple/60 rounded-t hover:bg-twitch-purple transition-colors cursor-pointer"
                style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                title={`${d.month}: $${d.revenue} revenue, ${d.sales} sales`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
          {monthlyData.map((d, i) => (
            <span key={i} className="flex-1 text-center">{d.month.split(" ")[0]}</span>
          ))}
        </div>
      </div>

      {/* Top products */}
      <div className="bg-twitch-panel border border-border rounded-lg p-4">
        <h3 className="text-foreground font-semibold text-sm mb-3">Top Performing Products</h3>
        {[
          { name: "SteelSeries Arctis Nova Pro", sales: 312, revenue: "$1,247.50", cvr: "5.2%" },
          { name: "Lisa Lim Logo Hoodie", sales: 287, revenue: "$892.00", cvr: "8.1%" },
          { name: "Elgato Stream Deck MK.2", sales: 198, revenue: "$594.00", cvr: "4.3%" },
          { name: "LisaLim Mousepad XL", sales: 156, revenue: "$312.00", cvr: "7.6%" },
          { name: "Razer DeathAdder V3 Pro", sales: 134, revenue: "$402.00", cvr: "3.9%" },
        ].map((p, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs font-mono w-5">#{i + 1}</span>
              <span className="text-foreground text-sm">{p.name}</span>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <span className="text-muted-foreground">{p.sales} sales</span>
              <span className="text-foreground font-semibold">{p.revenue}</span>
              <span className="text-success font-semibold">{p.cvr} CVR</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-twitch-panel border border-twitch-purple/30 rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-twitch-purple" />
          <h3 className="text-foreground font-semibold text-sm">AI Insights</h3>
          <span className="bg-twitch-purple/20 text-twitch-purple text-[10px] px-2 py-0.5 rounded-full font-medium">Powered by AI</span>
        </div>

        <div className="space-y-3">
          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-twitch-purple" />
              <h4 className="text-foreground text-sm font-semibold">Audience Demographics</h4>
            </div>
            <p className="text-muted-foreground text-xs">Your audience is <strong className="text-foreground">70% male, 18-25</strong>, primarily interested in <strong className="text-foreground">gaming peripherals and tech</strong>. They're most responsive to products in the $50-$150 range.</p>
          </div>

          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amazon-orange" />
              <h4 className="text-foreground text-sm font-semibold">Recommended Products</h4>
            </div>
            <p className="text-muted-foreground text-xs mb-2">Based on your audience, these trending products would perform well:</p>
            <div className="space-y-1">
              {[
                { name: "Razer Kraken V4", match: "94%", reason: "Top seller in your audience segment" },
                { name: "Keychron Q1 Pro", match: "89%", reason: "Trending in gaming keyboards" },
                { name: "BenQ Zowie XL2546K", match: "85%", reason: "Popular with competitive gamers" },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between bg-twitch-panel rounded p-2">
                  <span className="text-foreground text-xs">{r.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-[10px]">{r.reason}</span>
                    <span className="bg-success/20 text-success text-[10px] px-1.5 py-0.5 rounded font-semibold">{r.match} match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-success" />
              <h4 className="text-foreground text-sm font-semibold">Optimal Timing</h4>
            </div>
            <p className="text-muted-foreground text-xs">
              Your highest conversion rates happen <strong className="text-foreground">45-60 minutes into stream</strong> when engagement peaks. Feature your top product then. Avoid featuring products in the first 10 minutes — viewers are still settling in.
            </p>
          </div>

          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-foreground" />
              <h4 className="text-foreground text-sm font-semibold">Stream Discovery</h4>
            </div>
            <p className="text-muted-foreground text-xs">
              Twitch's algorithm surfaces your commerce-enabled streams to viewers interested in products you feature. Last month, <strong className="text-foreground">23% of new viewers</strong> discovered your stream through commerce recommendations. This is stream-level recommendation — viewers see "you might like this creator's stream," not "buy this keyboard."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
