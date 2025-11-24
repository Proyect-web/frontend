"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from 'ai';
import { useChatContext } from "@/lib/chat-context";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  ChevronDown,
  Droplets,
  ClipboardList,
  ShoppingBag,
} from "lucide-react";

export default function Chatbot() {
  const { isChatOpen, openChat, closeChat, toggleChat } = useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    sendMessage,
    status,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "streaming";

  // Auto scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  // Quick replies
  const handleQuickReply = (text: string) => {
    sendMessage({
      role: "user",
      parts: [{ type: "text", text }],
    });
  };

  const [input, setInput] = useState("");

  const submitLocal = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({
      role: "user",
      parts: [{ type: "text", text: input }],
    });

    setInput("");
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40"
            onClick={closeChat}
          />

          <motion.div
            key="chatbox"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 left-32 z-50 w-[90vw] md:w-[380px] h-[600px] max-h-[75vh] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="p-4 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-b border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg ring-2 ring-white/10">
                <Bot className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">GOH2 AI Assistant</h3>
                <span className="text-[10px] text-cyan-300 flex items-center gap-1 font-medium">
                  <Sparkles size={10} />AI Assistant
                </span>
              </div>
            </div>

            {/* MESSAGES */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role !== "user" && (
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 mt-1 border border-cyan-500/30">
                      <Bot size={12} className="text-cyan-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white/10 text-gray-100 border border-white/5 rounded-bl-none"
                    }`}
                  >
                    {/* m.parts (v4 format) */}
                    {m.parts.map((part, i) =>
                      part.type === "text" ? (
                        <p key={i} className="whitespace-pre-wrap">
                          {part.text}
                        </p>
                      ) : null
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mr-2 mt-1 border border-cyan-500/30">
                    <Bot size={12} className="text-cyan-400" />
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center border border-white/5">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* QUICK REPLIES */}
            {!isLoading && messages.length < 5 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide pt-2">
                <button
                  onClick={() => handleQuickReply("Calcula mi meta de agua")}
                  className="flex-shrink-0 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-[11px] text-gray-300 hover:text-cyan-300 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Droplets size={12} /> Meta Diaria
                </button>

                <button
                  onClick={() => handleQuickReply("Quiero un plan de hidratación")}
                  className="flex-shrink-0 bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 text-[11px] text-gray-300 hover:text-purple-300 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <ClipboardList size={12} /> Crear Plan
                </button>

                <button
                  onClick={() => handleQuickReply("Dudas sobre su producto")}
                  className="flex-shrink-0 bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/30 text-[11px] text-gray-300 hover:text-green-300 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <ShoppingBag size={12} /> Producto
                </button>
              </div>
            )}

            {/* INPUT */}
            <form
              onSubmit={submitLocal}
              className="p-3 border-t border-white/10 bg-black/20"
            >
              <div className="relative flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe aquí..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg disabled:opacity-50 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
