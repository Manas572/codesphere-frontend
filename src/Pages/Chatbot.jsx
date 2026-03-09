import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "@/components/Chatinterface";
import { Navbar } from "@/components/Navbar";
import RuixenQueryBox from "@/components/ruixen-query-box";
import { conversation } from "@/store";

const Chatbot = () => {
  const { messages, isLoading } = conversation();

  const isGreeting = messages.length === 0;

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
        <AnimatePresence>
          {isGreeting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              className="flex flex-col items-center gap-4 mb-10"
            >
             
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10">
                <code className="text-2xl font-bold">{"</>"}</code>
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-semibold tracking-tight">I am Code Aware</h2>
                <p className="text-zinc-400 mt-1">Ready to debug, refactor, or build.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 w-full overflow-y-auto px-4 pb-28">
          <ChatInterface messages={messages} isLoading={isLoading} />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <RuixenQueryBox />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;