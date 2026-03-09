import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2 } from "lucide-react";

/* ===================== COMPONENTS ===================== */

const MessageLoader = ({ isLeft }) => (
  <div className={`flex gap-1.5 px-4 py-3 rounded-2xl w-fit ${isLeft ? "bg-slate-100" : "bg-blue-600 ml-auto"}`}>
    {[0, 0.15, 0.3].map((delay, i) => (
      <motion.div
        key={i}
        className={`w-1.5 h-1.5 rounded-full ${isLeft ? "bg-slate-400" : "bg-blue-100"}`}
        animate={{ opacity: [0.4, 1, 0.4], y: [0, -4, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, delay }}
      />
    ))}
  </div>
);

const LinkBadge = ({ text, href = "#" }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium transition-colors border rounded-md bg-white/10 hover:bg-white/20 border-white/20"
  >
    <Link2 size={12} className="opacity-70" />
    {text}
  </a>
);

const MessageBubble = ({ message, isLeft }) => {
  const isSystem = message.sender === "system";

  // Dynamic bubble styles
  const bubbleStyles = isLeft 
    ? "bg-slate-100 text-slate-800 rounded-bl-none" 
    : "bg-blue-600 text-white rounded-br-none ml-auto";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`relative max-w-[85%] p-3.5 rounded-2xl shadow-sm ${bubbleStyles}`}
    >
      <div className="text-sm leading-relaxed">
        {message.type === "loading" ? (
          <MessageLoader isLeft={isLeft} />
        ) : (
          <>
            <p>{message.content}</p>
            {message.links && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message.links.map((link, i) => (
                  <LinkBadge key={i} text={link.text} href={link.url} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
    </motion.div>
  );
};


export default function ChatInterface({ messages = [], isLoading = false }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  return (
    <div 
      ref={scrollRef}
      className="flex flex-col h-full overflow-y-auto overflow-x-hidden p-4 space-y-4"
    >
      <AnimatePresence mode="popLayout">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.sender === "left" ? "justify-start" : "justify-end"}`}
          >
            <MessageBubble 
              message={msg} 
              isLeft={msg.sender === "left"} 
            />
          </div>
        ))}
        
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <MessageLoader isLeft={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}