import React from "react";

const Card1 = ({ user }) => {
  if (!user) return <div className="text-zinc-500">No profile data available.</div>;

  return (
    <div className="md:max-w-sm w-full p-6 rounded-xl shadow-xl bg-black border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 group">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-blue-600 text-white rounded-full mb-3">
          {user.rank || "N/A"}
        </span>
        <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
          {user.handle}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 py-4 border-y border-zinc-900 my-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Rating</p>
          <p className="text-xl font-mono text-white">{user.rating || 0}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Max Rating</p>
          <p className="text-xl font-mono text-zinc-400">{user.maxRating || 0}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-3">
          <img 
            src={user.avatar} 
            alt="avatar" 
            className="w-10 h-10 rounded-full border-2 border-zinc-800 group-hover:border-blue-500 transition-colors" 
          />
          <div className="flex flex-col">
            <span className="text-xs text-zinc-300 font-medium">Friends</span>
            <span className="text-xs text-zinc-500">{user.friendOfCount}</span>
          </div>
        </div>
        
        <div className="px-3 py-1 bg-zinc-900 rounded-md text-[10px] text-zinc-400 border border-zinc-800">
          Codeforces API
        </div>
      </div>
    </div>
  );
};

export default Card1;