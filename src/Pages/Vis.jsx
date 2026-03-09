import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import Visout from "@/components/Visout";
import VisIde from "@/components/VisIde";
import { Component } from "@/components/ai-loader";
import { useEditorStore, Visualization } from "@/store";

const Vis = () => {
  const [loading, setLoading] = useState(true);
  const { code, inp ,language} = useEditorStore();
  const [error, setError] = useState(null);
  const { setSteps } = Visualization();


useEffect(() => {
  if (language === "javascript") {
    setLoading(false);
    return;
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://codesphere-backend-7g1g.onrender.com/vis/", {
        code,
        input: inp,
      });
      setSteps(response.data.steps);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [code, inp]); 
  
  if (loading) {
    return <Component />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-[#060707]">
      <div className="relative w-full">
        <Navbar />
      </div>

      <div className="flex flex-1 w-full py-3 px-2 gap-2 overflow-hidden">
        <div className="w-1/2 h-full border border-gray-700 rounded-lg overflow-hidden">
          <VisIde />
        </div>

        <div className="w-1/2 h-full border border-gray-700 rounded-lg overflow-hidden">
          <Visout />
        </div>
      </div>
    </div>
  );
};

export default Vis;
