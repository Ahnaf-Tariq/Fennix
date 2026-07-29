"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { ChatbotRobotFace } from "@/components/chatbot-robot-face";

interface ChatMessage {
  id: string;
  role: "ai" | "user";
  text: string;
}

const INDUSTRIES = [
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Retail & E-commerce",
  "Logistics & Supply Chain",
  "SaaS & Technology",
] as const;

type Industry = (typeof INDUSTRIES)[number];

const INDUSTRY_RESPONSES: Record<Industry, string> = {
  "Financial Services":
    "Fennix unifies portfolio data, revenue streams, and risk metrics across your banking, accounting, and compliance databases—giving you real-time visibility into margin risks and fraud signals without manual reporting.",
  Healthcare:
    "Fennix connects patient flow records, care capacity data, and operational cost metrics across your platforms into one layer—helping CFOs and administrators predict capacity bottlenecks and manage resources.",
  Manufacturing:
    "Fennix bridges your ERP, inventory, and supply chain data to monitor production output, track machine downtime, and match plant capacity directly with shifting market demand.",
  "Retail & E-commerce":
    "Fennix tracks sales velocity, inventory turnover, customer acquisition costs, and social sentiment in real time—alerting you to stockout risks before they impact revenue.",
  "Logistics & Supply Chain":
    "Fennix links warehouse management systems (WMS), vendor data, and external macroeconomic signals to give end-to-end visibility over lead times, delivery routes, and cost drivers.",
  "SaaS & Technology":
    "Fennix aggregates usage telemetry, churn risks, recurring revenue, and unit economics across your data warehouses into clear executive dashboards.",
};

const WELCOME_MESSAGE =
  "Hello! Welcome to Fennix — so what is your industry type?";

interface FennixChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FennixChat({ isOpen, onClose }: FennixChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef(0);
  const welcomeStartedRef = useRef(false);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) {
      if (messages.length === 0 && !hasSelected) {
        welcomeStartedRef.current = false;
        setIsTyping(false);
        window.clearTimeout(timeoutRef.current);
      }
      return;
    }

    if (welcomeStartedRef.current || messages.length > 0 || hasSelected) return;

    welcomeStartedRef.current = true;
    setIsTyping(true);

    const delay = 1000 + Math.random() * 1000;
    timeoutRef.current = window.setTimeout(() => {
      setIsTyping(false);
      setMessages([{ id: "welcome", role: "ai", text: WELCOME_MESSAGE }]);
      setShowOptions(true);
    }, delay);
  }, [isOpen, messages.length, hasSelected]);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  function handleSelectIndustry(industry: Industry) {
    if (hasSelected || isTyping || !showOptions) return;

    setHasSelected(true);
    setShowOptions(false);
    setMessages((prev) => [
      ...prev,
      { id: `user-${industry}`, role: "user", text: industry },
    ]);
    setIsTyping(true);

    const delay = 2000 + Math.random() * 1000;
    timeoutRef.current = window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${industry}`,
          role: "ai",
          text: INDUSTRY_RESPONSES[industry],
        },
      ]);
    }, delay);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-2 right-2 z-50 flex h-[min(460px,calc(100vh-3rem))] w-[min(330px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
      <header className="flex items-center gap-3 bg-primary-gradient px-4 py-3 text-white">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/15 p-0.5">
          <ChatbotRobotFace animated={false} className="h-full w-full" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Fennix</p>
          <p className="text-xs text-white/80">AI assistant</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="cursor-pointer rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/15"
        >
          <X size={18} />
        </button>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto bg-[#f7f8fa] px-4 py-4"
      >
        {messages.map((message) =>
          message.role === "ai" ? (
            <div key={message.id} className="flex items-end gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-gradient p-0.5">
                <ChatbotRobotFace animated={false} className="h-full w-full" />
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-gray-100 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-gray-700 shadow-sm">
                {message.text}
              </div>
            </div>
          ) : (
            <div key={message.id} className="flex items-end justify-end gap-2">
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-primary-gradient px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm">
                {message.text}
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-mid text-xs font-bold text-white">
                U
              </div>
            </div>
          ),
        )}

        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-gradient p-0.5">
              <ChatbotRobotFace animated={false} className="h-full w-full" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-gray-100 bg-white px-3.5 py-3 shadow-sm">
              <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-gray-400" />
              <span className="chat-typing-dot chat-typing-dot-delay-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
              <span className="chat-typing-dot chat-typing-dot-delay-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 bg-white px-3 pb-3 pt-2">
        {!hasSelected && showOptions && (
          <div className="mb-3 flex flex-wrap gap-2">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => handleSelectIndustry(industry)}
                disabled={isTyping}
                className="cursor-pointer rounded-full border border-[#c7d9f0] bg-[#eef5ff] px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary hover:bg-[#dbeafe] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {industry}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 rounded-xl border border-[#c7d9f0] bg-gray-50 px-3 py-2.5">
          <input
            type="text"
            disabled
            placeholder={
              hasSelected
                ? "Conversation complete"
                : showOptions
                  ? "Select an industry above"
                  : "Fennix is typing..."
            }
            className="w-full bg-transparent text-sm text-gray-400 outline-none placeholder:text-gray-400"
          />
          <span className="text-[#2a7ae8] opacity-40" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
