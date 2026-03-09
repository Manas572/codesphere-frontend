import ProgressBar from "./Pro";

export function TagDashboard({ tag_stats }) {
     if (!Object.keys(tag_stats).length) {
    return (
      <div className="p-8 text-zinc-400">
        No tag data available
      </div>
    );
}
    
  return (
    <div className="p-8 bg-white dark:bg-black rounded-xl border border-zinc-800">
      <h2 className="text-xl font-bold mb-6 text-white">Topic Mastery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {Object.entries(tag_stats).map(([tagName, data]) => (
          <ProgressBar
            key={tagName}
            topic={tagName}
            solved={data.solved}
            attempted={data.attempted}
            submissions={data.submissions}
          />
        ))}
      </div>
    </div>
  );
}