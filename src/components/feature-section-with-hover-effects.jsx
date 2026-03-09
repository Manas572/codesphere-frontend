import { cn } from "@/lib/utils";
import {
  Trophy,
  Medal,
  TrendingDown,
  BarChart3,
  Zap,
  PieChart,
  Flame,
  Activity,
} from "lucide-react";

export function FeaturesSectionWithHoverEffects({stats}) {
  const features = [
    {
      title: "Total Contests",
      description: `${stats.totalContests || 0} sessions of competitive coding completed.`,
      icon: <Trophy className="w-6 h-6" />,
    },
    {
      title: "Best Rank",
      description: `Your peak performance reached rank #${stats.bestRank || 0}.`,
      icon: <Medal className="w-6 h-6" />,
    },
    {
      title: "Worst Rank",
      description: `Your lowest standing was rank #${stats.worstRank || 0}.`,
      icon: <TrendingDown className="w-6 h-6" />,
    },
    {
      title: "Average Rank",
      description: `Maintaining a steady average rank of ${stats.avgRank || 0}.`,
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Avg Rating Delta",
      description: `${stats.avgDelta > 0 ? "+" : ""}${stats.avgDelta || 0} points gained per contest on average.`,
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Positive Ratio",
      description: `${stats.positiveRatio || "0%"} of contests resulted in a rating increase.`,
      icon: <PieChart className="w-6 h-6" />,
    },
    {
      title: "Improvement Streak",
      description: `Best run of ${stats.longestStreak || 0} consecutive rating gains.`,
      icon: <Flame className="w-6 h-6" />,
    },
    {
      title: "Rank Stability",
      description: `Standard deviation of ${Number(stats.stability || 0).toFixed(2)} in your performance.`,
      icon: <Activity className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 ? (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      ) : (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};