import React, { useState } from "react";
import { useEditorStore } from "@/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { runAndTrace } from "@/lib/jstracer";
import { Visualization } from "@/store";
import { 
  Play, Terminal, Zap, Box, CheckCircle2, 
  XCircle, AlertCircle, Eye, Cpu, Clock 
} from "lucide-react";
const API = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

const Out = () => {
  const navigate = useNavigate();
  const { language, code, inp, setInp } = useEditorStore();
  const [activeTab, setActiveTab] = useState("testcase");
  const [output, setOutput] = useState(null); 
  const [isLoad, setIsLoading] = useState(false);
  const [ftc, setftc] = useState(false);
  const [results, setResults] = useState(null);
  const [expectedOutput, setExpectedOutput] = useState("");

  function handlevis() {
    if (!code || !code.trim()) return;
    if (language === "python") { navigate("/visualize"); return; }
    if (language === "javascript") {
      try {
        const steps = runAndTrace(code, inp);
        Visualization.getState().setSteps(steps);
        navigate("/visualize");
      } catch (e) { setOutput("JS Vis Error: " + e.message); }
      return;
    }
    alert("Visualization not supported for this language.");
  }

  async function Runit() {
    setIsLoading(true);
    setResults(null);
    try {
      const response = await axios.post(`${API}/execute/`, {
        language, code,
        testCases: [{ input: inp, expectedOutput: expectedOutput }]
      });
      setResults(response.data);
      setActiveTab("result");
    } catch (error) { console.error(error); } finally { setIsLoading(false); }
  }

  async function findtc() {
    if (!code || !code.trim()) return;
    setftc(true);
    setActiveTab("result"); 
    try {
      const response = await axios.post(`${API}/TC/`, { code });
      const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setOutput(answer || "Could not analyze complexity.");
    } catch (error) {
      setOutput("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setftc(false);
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] text-gray-200">
      <div className="flex items-center justify-between bg-[#262626] px-4 py-2 border-b border-gray-800">
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab("testcase")}
            className={`text-xs font-medium py-1 border-b-2 transition-all ${activeTab === 'testcase' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500'}`}
          >
            Testcase
          </button>
          <button 
            onClick={() => setActiveTab("result")}
            className={`text-xs font-medium py-1 border-b-2 transition-all ${activeTab === 'result' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500'}`}
          >
            Verdict
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handlevis}
            className="p-1.5 hover:bg-gray-700 rounded-md text-gray-400 hover:text-blue-400 transition-colors"
            title="Visualize Logic"
          >
            <Eye size={16}/>
          </button>

          <button 
            onClick={findtc}
            disabled={ftc}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all border ${ftc ? 'bg-purple-900/20 border-purple-500/30 text-purple-400' : 'bg-transparent border-gray-700 text-gray-400 hover:border-purple-500 hover:text-purple-400'}`}
          >
            <Clock size={14}/> {ftc ? "Analyzing..." : "Complexity"}
          </button>

          <button 
            onClick={Runit} 
            disabled={isLoad}
            className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-1.5 rounded-md flex items-center gap-2 font-bold transition-all disabled:opacity-50"
          >
            <Play size={14} fill="currentColor"/> {isLoad ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === "testcase" ? (
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-1 flex flex-col">
              <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 flex items-center gap-2">
                <Terminal size={12}/> Standard Input
              </label>
              <textarea 
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                className="w-full flex-1 bg-[#0f0f0f] rounded-lg p-3 font-mono text-sm border border-gray-800 focus:border-gray-600 outline-none resize-none"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 flex items-center gap-2">
                <CheckCircle2 size={12}/> Expected Output
              </label>
              <textarea 
                value={expectedOutput}
                onChange={(e) => setExpectedOutput(e.target.value)}
                className="w-full flex-1 bg-[#0f0f0f] rounded-lg p-3 font-mono text-sm border border-gray-800 focus:border-gray-600 outline-none resize-none"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {output && (
              <div className="p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg animate-in fade-in zoom-in duration-300">
                <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                  <Cpu size={14}/> Complexity Analysis
                </div>
                <div className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  {output}
                </div>
              </div>
            )}

            {results?.results?.[0] ? (
              <div className="animate-in slide-in-from-bottom-2 duration-300">
                <div className={`p-4 rounded-lg border flex items-center justify-between ${results.summary?.allPassed ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <div className="flex items-center gap-3">
                    {results.summary?.allPassed ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />}
                    <div>
                      <h3 className={`font-bold ${results.summary?.allPassed ? 'text-green-500' : 'text-red-500'}`}>
                        {results.results[0].message || (results.summary?.allPassed ? "Accepted" : "Wrong Answer")}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Actual Output</label>
                  <div className="bg-[#0f0f0f] rounded-lg border border-gray-800 p-3">
                    <pre className="font-mono text-sm text-gray-300">{results.results[0].actualOutput || "No output"}</pre>
                  </div>
                </div>
              </div>
            ) : !output && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-600">
                <AlertCircle className="mb-2 opacity-20" size={48} />
                <p className="text-sm">Run code or check complexity to see results</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Out;