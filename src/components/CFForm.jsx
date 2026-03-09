import React, { useState } from 'react';
import { Component } from './glowing-button';
import { useUserStore } from '@/store';
import { useNavigate } from "react-router-dom"

const CFForm = () => {
  const [handle, setHandle] = useState('');
  const navigate = useNavigate();
  const setUserId = useUserStore((state) => state.setUserId);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handle.trim()) {
      alert("Please enter a valid handle!");
      return;
    }
    setUserId(handle);
    console.log("Submitted Handle:", handle);
    // You can replace this alert with your API logic later

    navigate("/Analysis")
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm shadow-2xl">
      <h3 className="text-2xl font-semibold text-white mb-6">Codeforces Profile Finder</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cf-handle" className="block text-sm font-medium text-zinc-400 mb-2">
            Enter Codeforces Handle
          </label>
          <input
            id="cf-handle"
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="e.g. manaskumar10"
            className="w-full px-4 py-3 bg-zinc-950 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-600"
          />
        </div>
        
        
        <div className="flex justify-start">
          <Component
            glowColor="#ec4899" 
            onClick={handleSubmit}
            className="w-full md:w-auto"
          >
            Submit Handle
          </Component>
        </div>
      </form>
    </div>
  );
};

export default CFForm;