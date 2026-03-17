import { Ripple } from "@/components/ui/ripple";
import { useUserStore } from "@/store";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileLayout from "@/components/ProfileLayout";
import { User, Trophy, Lightbulb, BarChart3 } from "lucide-react";
import { FeaturesSectionWithHoverEffects } from "@/components/feature-section-with-hover-effects";
import { TagDashboard } from "@/components/Tag";
import PerformanceChart from "@/components/PerformanceChart";

const Analysis = () => {
  const [analytics, setAnalytics] = useState({ tag_stats: {} });
  const [data, setData] = useState(null);
  const [ratingChartData, setRatingChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useUserStore();
  const [verdictChartData, setVerdictChartData] = useState([]);
  const [contestStats, setContestStats] = useState(null);
  const [contestView, setContestView] = useState("recent");
   const activeContestStats = contestStats?.[contestView] ?? null;
  const IQRExplanation = ({ ratio }) => {
    const getConsistency = (r) => {
      if (r <= 0.3)
        return {
          label: "High",
          color: "text-green-400",
          desc: "Very stable performance.",
        };
      if (r <= 0.6)
        return {
          label: "Moderate",
          color: "text-yellow-400",
          desc: "Standard fluctuations.",
        };
      return {
        label: "Low",
        color: "text-red-400",
        desc: "High volatility in ranks.",
      };
    };

    const status = getConsistency(ratio);

    return (
      <div className="mt-12 p-8 bg-zinc-900/50 rounded-3xl border border-white/5 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Understanding Your Consistency
            </h3>
            <p className="text-zinc-400 text-sm">
              Based on Interquartile Range (IQR) Analysis
            </p>
          </div>
          <div className="bg-black/40 px-6 py-3 rounded-2xl border border-white/10">
            <span className="text-zinc-500 text-xs uppercase tracking-widest block">
              Consistency Level
            </span>
            <span className={`text-xl font-mono font-bold ${status.color}`}>
              {status.label} ({ratio})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="text-blue-400 font-semibold italic">What is IQR?</h4>
            <p className="text-zinc-300 text-sm leading-relaxed">
              It measures the "middle 50%" of your performance. Unlike a simple
              average, it ignores lucky peaks and unlucky crashes to see your
              true reliable rank range.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-purple-400 font-semibold italic">The Math</h4>
            <p className="text-zinc-300 text-sm leading-relaxed">
              We calculate{" "}
              <code className="bg-white/10 px-1 rounded">
                IQR / Average Rank
              </code>
              . A lower ratio means your ranks are tightly clustered around your
              average.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-emerald-400 font-semibold italic">
              The Verdict
            </h4>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {status.desc}{" "}
              {ratio > 0.6
                ? "Try to minimize 'outlier' contests where you solve significantly fewer problems than usual."
                : "Keep maintaining this steady rhythm!"}
            </p>
          </div>
        </div>
      </div>
    );
  };
  const [activeItem, setActiveItem] = useState("profile");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: "profile", name: "Profile", icon: <User size={20} />, badge: null },
    {
      id: "contests",
      name: "Contests",
      icon: <Trophy size={20} />,
      badge: null,
    },
    { id: "tips", name: "Tips", icon: <Lightbulb size={20} />, badge: null },
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart3 size={20} />,
      badge: null,
    },
  ];
  useEffect(() => {
  const fetchAllData = async () => {
    if (!userId ) return;
    setLoading(true);
    setError(null);
    try {
      const infoRes = await axios.get("https://manas28.pythonanywhere.com/info/", {
        params: { userId },
      });

      setData(infoRes.data?.result || []);

      const subRes = await axios.get("https://manas28.pythonanywhere.com/sub/", {
        params: { userId },
      });

      const subData = subRes.data || {};

      setAnalytics(subData);

      const ratingBucket = subData.rating_bucket || {};

      const transformed = Object.entries(ratingBucket)
        .map(([rating, count]) => ({
          rating,
          count,
        }))
        .sort((a, b) => Number(a.rating) - Number(b.rating));

      setRatingChartData(transformed);

      setVerdictChartData(
        Object.entries(subData.verdicts || {}).map(([verdict, count]) => ({
          verdict,
          count,
        }))
      );

      const conRes = await axios.get("https://manas28.pythonanywhere.com/con/", {
        params: { userId },
      });

      const [lifetime = null, recent = null] = conRes.data || [];

      setContestStats({
        lifetime,
        recent,
      });
    } catch (e) {
      setError(e.response?.data?.error || e.message || "Something went wrong");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  fetchAllData();
}, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Ripple />
        <p className="z-10 text-white/50 animate-pulse">Fetching Analysis...</p>
      </div>
    );
  }

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-black text-white p-4 gap-6">
      {/* --- SIDEBAR --- */}
      <aside
        className={`${isCollapsed ? "w-20" : "w-64"} transition-all duration-300 bg-zinc-900 rounded-2xl p-4 flex-shrink-0 flex flex-col border border-white/5`}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          {!isCollapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              {userId || "Loading..."}{" "}
            </h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <svg
              className={`w-5 h-5 transform transition-transform ${isCollapsed ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                activeItem === item.id
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:bg-white/5"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>

              {!isCollapsed && (
                <span className="font-medium flex-1 text-left">
                  {item.name}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto pr-2">
  {activeItem === "profile" && (
    <ProfileLayout
      userData={data ? data[0] : null}
      ratingChartData={ratingChartData}
      verdictChartData={verdictChartData}
    />
  )}

  {activeItem === "contests" && (
    <div className="animate-in fade-in duration-500">
      {activeContestStats ? (
        <>
          <div className="flex gap-2 mb-6">
            {["lifetime", "recent"].map((type) => (
              <button
                key={type}
                onClick={() => setContestView(type)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                  contestView === type
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                {type === "lifetime" ? "Lifetime" : "Recent (Last 5)"}
              </button>
            ))}
          </div>

          <FeaturesSectionWithHoverEffects
            stats={{
              totalContests: activeContestStats.total_contests,
              bestRank: activeContestStats.best_rank,
              worstRank: activeContestStats.worst_rank,
              avgRank: activeContestStats.avg_rank,
              avgDelta: activeContestStats.avg_delta,
              positiveRatio: activeContestStats.positive_ratio + "%",
              longestStreak: activeContestStats.longest_streak,
              stability: activeContestStats.rank_stability,
            }}
          />

          <IQRExplanation ratio={activeContestStats.iqr_ratio} />
          {contestStats.lifetime?.graphData && (
          <PerformanceChart data={contestStats.lifetime.graphData} />
        )}
        </>
      ) : (
        <p className="text-zinc-500">No contest data available.</p>
      )}
    </div>
  )}

  {activeItem === "analytics" && analytics?.tag_stats ? (
   <TagDashboard tag_stats={analytics.tag_stats} />
) : activeItem === "analytics" && (
   <div className="p-8 text-zinc-500 text-center">Loading Analytics...</div>
)}

  {activeItem === "tips" && (
    <div className="h-full flex items-center justify-center bg-zinc-900/50 rounded-3xl border border-white/5 text-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">TIPS</h1>
        <p className="text-zinc-500">Section coming soon.</p>
      </div>
    </div>
  )}
</main>
    </div>
  );
};

export default Analysis;
