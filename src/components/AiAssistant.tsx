import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Sparkles, Send, X, HelpCircle, Bot, User } from "lucide-react";

// Highly bulletproof and clean regex-based custom markdown rendering system
export const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  const lines = content.split("\n");
  const renderedElements: React.JSX.Element[] = [];

  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushTable = (key: string) => {
    if (tableHeaders.length > 0) {
      renderedElements.push(
        <div key={`table-wrapper-${key}`} className="my-3 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 shadow-xs">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-205 dark:border-slate-800">
              <tr>
                {tableHeaders.map((h, idx) => (
                  <th key={idx} className="p-3 font-bold border-r last:border-0 border-slate-200 dark:border-slate-800">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-350">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  {row.map((col, cIdx) => (
                    <td key={cIdx} className="p-3 border-r last:border-0 border-slate-200 dark:border-slate-800 select-all font-semibold">{col}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableHeaders = [];
    tableRows = [];
    inTable = false;
  };

  const formatText = (text: string) => {
    // Escape standard tokens and replace bold
    let formatted = text;
    
    // Bold matcher **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(formatted)) !== null) {
      if (match.index > lastIndex) {
        parts.push(formatted.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index} className="font-extrabold text-slate-950 dark:text-white">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }
    
    if (lastIndex < formatted.length) {
      parts.push(formatted.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Markdown Table Parser
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      inTable = true;
      const cols = trimmed.split("|").map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
      
      if (trimmed.includes("---")) {
        // Table separator line, ignore
        return;
      }
      
      if (tableHeaders.length === 0) {
        tableHeaders = cols;
      } else {
        tableRows.push(cols);
      }
      return;
    } else if (inTable) {
      flushTable(`table-${index}`);
    }

    // Markdown Headers
    if (trimmed.startsWith("###")) {
      renderedElements.push(<h4 key={index} className="font-display font-bold text-sm tracking-tight text-slate-900 mt-4 mb-2 dark:text-white select-text uppercase">{formatText(trimmed.replace("###", "").trim())}</h4>);
    } else if (trimmed.startsWith("##")) {
      renderedElements.push(<h3 key={index} className="font-display font-extrabold text-base tracking-tight text-slate-950 mt-5 mb-2.5 dark:text-white border-b pb-1 dark:border-slate-850 select-text leading-tight">{formatText(trimmed.replace("##", "").trim())}</h3>);
    } else if (trimmed.startsWith("#")) {
      renderedElements.push(<h2 key={index} className="font-display font-extrabold text-lg tracking-tight text-blue-900 mt-6 mb-3 dark:text-blue-400 select-text leading-snug uppercase border-l-3 border-blue-900 pl-3 dark:border-blue-400">{formatText(trimmed.replace("#", "").trim())}</h2>);
    } 
    // Bullet Items
    else if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
      renderedElements.push(
        <ul key={index} className="list-disc pl-5 my-1.5 space-y-1 font-sans text-xs text-slate-700 dark:text-slate-350 select-text">
          <li className="font-medium">{formatText(trimmed.substring(1).trim())}</li>
        </ul>
      );
    } 
    // Standard Paragraphs
    else if (trimmed !== "") {
      renderedElements.push(
        <p key={index} className="font-sans text-xs/relaxed font-medium text-slate-650 tracking-normal text-slate-700 dark:text-slate-350 select-text my-2">
          {formatText(trimmed)}
        </p>
      );
    }
  });

  if (inTable) {
    flushTable("final");
  }

  return <div className="space-y-1 max-w-full text-slate-800 dark:text-slate-200">{renderedElements}</div>;
};

interface AiAssistantProps {
  activeTab: "chatbot" | "admissions";
  setActiveTab: (tab: "chatbot" | "admissions") => void;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  
  // Chat History States
  const [chats, setChats] = useState<Record<string, Message[]>>({
    chatbot: [
      { id: "wel-1", sender: "bot", text: "Welcome to the JNS SmartCampus Advisor. Ask anything about admissions or academic programs." }
    ],
    admissions: [
      { id: "wel-2", sender: "bot", text: "Hello, I am the JNS Admissions Advisor. Ask about seat intake, fee schedules, or application status." }
    ]
  });

  const [inputMessage, setInputMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth scroll message window whenever chats update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats, isReplying]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isReplying) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: inputMessage
    };

    setChats(prev => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), userMsg]
    }));

    setInputMessage("");
    setIsReplying(true);

    // REST server post dispatcher
    fetch("/api/gemini/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: userMsg.text,
        category: activeTab
      })
    })
      .then(res => res.json())
      .then(data => {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.text || "Pardon, connections timeout on intelligence loops. Local caches mapped safely."
        };
        setChats(prev => ({
          ...prev,
          [activeTab]: [...(prev[activeTab] || []), botMsg]
        }));
        setIsReplying(false);
      })
      .catch((err) => {
        console.error(err);
        setIsReplying(false);
      });
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md md:max-w-xl h-full border-l border-white/10 bg-white/10 dark:bg-slate-950/40 backdrop-blur-md shadow-2xl animate-in slide-in-from-right duration-250 flex flex-col justify-between" id="ai-assistant-drawer">
      
      {/* Drawer Title Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/5 text-slate-900 dark:text-white">
        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 p-2 flex items-center justify-center animate-bounce">
            <Sparkles className="h-5 w-5 fill-blue-500 text-blue-500" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-sm sm:text-base tracking-tight select-none">JNS Academic Advisor</h3>
            <p className="text-[10px] font-bold tracking-widest text-blue-500 uppercase select-none">Powered by Gemini AI Engine</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-slate-800 dark:text-white hover:bg-white/20 border border-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Segment Navigation Controllers */}
      <div className="grid grid-cols-5 border-b border-white/10 text-center bg-white/5 p-1 gap-1">
        {[
          { id: "chatbot", label: "Advisor Chat", icon: MessageSquare },
          { id: "admissions", label: "Admissions", icon: HelpCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "chatbot" | "admissions")}
              className={`rounded-lg py-2 flex flex-col items-center gap-1 transition ${
                activeTab === tab.id
                  ? "bg-white/15 text-blue-600 shadow-md dark:bg-white/[0.04] dark:text-blue-400 border border-white/10"
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/[0.01]"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="text-[9px] font-bold font-sans tracking-wide truncate max-w-[50px] sm:max-w-none">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main interactive viewport container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5" id="ai-tab-viewports">
        
        {/* CHAT CHANNELS (GENERAL, ADMISSION, FAQ) */}
        {(activeTab === "chatbot" || activeTab === "admissions") && (
          <div className="h-full flex flex-col justify-between" id="chatbot-module-container">
            {/* Scroll view of text chunks */}
            <div 
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto max-h-[calc(100vh-270px)] pr-1"
            >
              {(chats[activeTab] || []).map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex items-start space-x-3 text-xs ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div className={`rounded-xl p-2.5 ${msg.sender === "user" ? "bg-blue-900 text-white dark:bg-blue-600" : "bg-slate-100 border border-slate-200/50 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-200"}`}>
                    {msg.sender === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl p-4 sm:p-5 shadow-xs ${msg.sender === "user" ? "bg-blue-50 border-r-4 border-blue-900 dark:bg-blue-950 dark:border-blue-500" : "bg-white border dark:bg-slate-900 dark:border-slate-800"}`}>
                    <MarkdownRenderer content={msg.text} />
                  </div>
                </div>
              ))}
              
              {isReplying && (
                <div className="flex items-start space-x-3 text-xs animate-pulse">
                  <div className="rounded-xl p-2.5 bg-slate-100 dark:bg-slate-900 text-slate-400">
                    <Bot className="h-4 w-4 animate-bounce" />
                  </div>
                  <div className="rounded-2xl p-4 bg-white border dark:bg-slate-900 dark:border-slate-850">
                    <p className="text-slate-400 font-mono text-[10px] tracking-widest flex items-center gap-1.5 font-bold">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin text-teal-500" /> THINKING DEEP VIA GEMINI 3.5...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Input post form */}
            <form onSubmit={handleSendMessage} className="mt-4 pt-4 border-t border-slate-150 dark:border-slate-850 flex gap-2">
              <input
                type="text"
                required
                disabled={isReplying}
                placeholder="Query degrees, syllabus, fees checkouts, QR logs..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 rounded-2xl border border-slate-205 bg-slate-50 py-3 pl-4 pr-4 text-xs font-semibold outline-hidden focus:border-blue-900 focus:bg-white dark:border-slate-850 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950"
              />
              <button 
                type="submit"
                disabled={isReplying}
                className="rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-850 px-5 text-white hover:opacity-90 dark:from-blue-600 dark:to-indigo-500 flex items-center justify-center shrink-0 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}


      </div>
    </div>
  );
};
