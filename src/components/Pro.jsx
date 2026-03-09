"use client";

export default function ProgressBar({ topic, solved, attempted, submissions }) {
  const progress = attempted > 0 ? Math.round((solved / attempted) * 100) : 0;
  const accuracy = submissions > 0 ? Math.round((solved / submissions) * 100) : 0;

  let progressColor = "bg-blue-600";
  let accuracyColor = accuracy < 50 ? "bg-red-400" : accuracy < 75 ? "bg-yellow-400" : "bg-emerald-400";
  let tip = "";

  if (accuracy > 55 && attempted > 30) {
    progressColor = "bg-green-500";
    tip = "Comfortable with it! Try higher rating problems for this tag.";
  } else if (accuracy < 50) {
    progressColor = "bg-yellow-500";
    tip = "Focus on accuracy. Test edge cases before submitting.";
  } else if (progress < 70) {
    progressColor = "bg-red-500";
    tip = "Difficulty finishing. Review the core logic of this topic.";
  }

  return (
    <div className="mb-8 w-full bg-white dark:bg-black p-4 rounded-lg border border-transparent hover:border-zinc-800 transition-all">
      <div className="flex justify-between mb-3 items-end">
        <div>
          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">
            {topic}
          </span>
          {tip && (
            <p className="text-[10px] text-gray-500 dark:text-zinc-500 mt-1 italic">
              {tip}
            </p>
          )}
        </div>
        <div className="text-right flex flex-col">
          <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
            {solved}/{attempted} Solved
          </span>
          <span className={`text-[10px] font-mono font-bold ${accuracy < 50 ? 'text-red-400' : 'text-zinc-500'}`}>
            {accuracy}% Accuracy
          </span>
        </div>
      </div>

  <div className="space-y-1">
    <div className="flex justify-between text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">
      <span>Accuracy</span>
      <span>{accuracy}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-zinc-800/50 rounded-full h-1 overflow-hidden">
      <div 
        className={`${accuracyColor} h-full rounded-full transition-all duration-500 ease-in-out opacity-80`}
        style={{ width: `${accuracy}%` }}
      ></div>
    </div>
  </div>
</div>
    
  );
}