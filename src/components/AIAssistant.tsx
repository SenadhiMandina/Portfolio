import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { generateAIResponse, suggestedPrompts, type AIMessage } from "../lib/aiBrain";

const WELCOME: AIMessage = {
  id: "welcome",
  role: "ai",
  text: "Hey! I'm NEXUS — Senadhi's AI assistant. Ask me about her skills, projects, journey or how to get in touch!",
  time: Date.now(),
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hint, setHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHint(true), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: AIMessage = { id: `u-${Date.now()}`, role: "user", text: trimmed, time: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setHint(false);
    setTyping(true);

    // Simulate AI "thinking" delay
    const delay = 500 + Math.min(1400, trimmed.length * 18);
    setTimeout(() => {
      const reply = generateAIResponse(trimmed);
      setMessages((m) => [
        ...m,
        { id: `a-${Date.now()}`, role: "ai", text: reply, time: Date.now() },
      ]);
      setTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Launcher button */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3">
        <AnimatePresence>
          {hint && !open && (
            <motion.button
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              onClick={() => {
                setOpen(true);
                setHint(false);
              }}
              className="flex items-center gap-2 rounded-full glass-strong px-4 py-2.5 text-sm font-medium text-white shadow-xl"
            >
              <Sparkles size={15} className="text-cyan-300" />
              Ask NEXUS about Senadhi
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen((o) => !o)}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500 text-black shadow-2xl glow-violet"
          aria-label="Toggle AI assistant"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Bot size={24} />
              </motion.span>
            )}
          </AnimatePresence>
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-cyan-400 ring-2 ring-[#05050c]" />
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-5 z-[100] flex h-[30rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl glass-strong shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 p-4">
              <div className="relative">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500 text-black">
                  <Bot size={20} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#0a0a18]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 font-display text-sm font-semibold text-white">
                  NEXUS
                  <span className="rounded bg-cyan-400/15 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300">AI</span>
                </div>
                <div className="text-[11px] text-emerald-400">● Online · usually replies instantly</div>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white" aria-label="Close">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-black">
                    <Bot size={14} />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white/5 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-cyan-400/50"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-black transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }: { message: AIMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {!isUser && (
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-black">
          <Bot size={14} />
        </div>
      )}
      <div
        className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-gradient-to-br from-cyan-400 to-violet-500 text-black"
            : "rounded-bl-sm bg-white/5 text-white/85"
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
}
