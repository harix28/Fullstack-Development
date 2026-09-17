import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Send, User, Trash2, AlertCircle, Sparkles, 
  ArrowRight, CheckCircle2, MessageSquare, FileText, Briefcase,
  Mic, MicOff, Volume2, ShieldCheck, Zap
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button, Card, Badge } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { sendMessage } from '@/services/assistant';
import ROUTES from '@/constants/routes';

const PROMPT_CHIPS = [
  { label: '🎯 Am I eligible for PM-KISAN or MUDRA?', query: 'Am I eligible for PM-KISAN or MUDRA loan?' },
  { label: '💼 Find SSC & Railway jobs for my degree', query: 'Show me government jobs that match an MCA graduate.' },
  { label: '📁 Required documents for OBC certificate', query: 'What documents do I need in my vault for an OBC certificate?' },
  { label: '📝 How to report bad road conditions?', query: 'I want to file a civic complaint about road potholes in my area.' },
  { label: '💰 Check higher education scholarship schemes', query: 'Which government scholarship schemes can I apply for?' },
];

export default function AssistantPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<any[]>([
    {
      id: 'welcome_1',
      role: 'assistant',
      content: `Namaste, **${user?.name || 'Citizen'}**! 🙏 

I am **Ask Sarkar**, your personal AI assistant for government welfare schemes, recruitment opportunities, and citizen grievance resolution. 

I have loaded your verified citizen profile:
• **Education:** ${user?.education || 'Post Graduate / MCA'}
• **Domicile State:** ${user?.state || 'Delhi'}
• **Category:** ${user?.category || 'General'}
• **Active Profile Skills:** ${(user?.skills || ['Python', 'SQL', 'React']).slice(0, 3).join(', ')}

How may I assist you today? Click any prompt below or type your question in any Indian language.`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Which schemes am I eligible for?',
        'Show government jobs for my qualifications',
        'Help me draft a civic grievance'
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const botReply = await sendMessage(text, [...messages, userMsg]);
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, I encountered a temporary simulation issue. Please try asking your question again.',
          timestamp: new Date().toISOString(),
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const simulateVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setTimeout(() => {
      setInputValue('Which central government schemes am I eligible for?');
      setIsListening(false);
    }, 1800);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        role: 'assistant',
        content: `Chat history cleared. Ask Sarkar AI is ready to help you with welfare schemes, public jobs, or civic complaints!`,
        timestamp: new Date().toISOString(),
        suggestions: [
          'Which schemes am I eligible for?',
          'What documents do I need for a scholarship?',
          'How can I report a water supply issue?'
        ]
      }
    ]);
  };

  const handleActionClick = (actionType?: string) => {
    if (actionType === 'navigate_grievance') {
      navigate(ROUTES.GRIEVANCE_NEW);
    } else if (actionType === 'navigate_schemes') {
      navigate(ROUTES.SCHEMES);
    } else if (actionType === 'navigate_jobs') {
      navigate(ROUTES.JOBS);
    } else {
      navigate(ROUTES.SCHEMES);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[850px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden font-sans">
      
      {/* ── HEADER ── */}
      <div className="flex-none px-5 py-3.5 border-b border-slate-200/90 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/90 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0f1740] via-[#1a2f8a] to-[#0d9488] flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg text-[#0f1740] dark:text-white leading-tight">
                Ask Sarkar AI Assistant
              </h1>
              <span className="bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-[10px] font-extrabold py-0.5 px-2 rounded-full">
                AI Copilot
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Personalized for {user?.name || 'Citizen'} ({user?.education || 'MCA'}, {user?.state || 'Delhi'})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-600 text-[11px] text-slate-600 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Profile Context Linked</span>
          </div>

          <button 
            onClick={clearChat} 
            title="Clear Chat History"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── ASSISTIVE NOTICE ── */}
      <div className="bg-amber-50/80 dark:bg-amber-950/40 px-4 py-2 border-b border-amber-200/60 dark:border-amber-800/60 flex items-center justify-center gap-2 text-xs text-amber-800 dark:text-amber-300">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        <span>Ask Sarkar is an assistive prototype. Always verify critical requirements on official government portals.</span>
      </div>

      {/* ── MESSAGES AREA ── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#f8f9fc] dark:bg-slate-950">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}
          >
            <div className={cn("flex max-w-[90%] sm:max-w-[80%] gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              
              {/* Avatar */}
              <div className="flex-none mt-1">
                {msg.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-[#1a2f8a] flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {user?.name?.slice(0, 2).toUpperCase() || 'U'}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0f1740] to-[#1a2f8a] flex items-center justify-center shadow-md">
                    <Bot className="w-4 h-4 text-teal-300" />
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex flex-col space-y-2">
                <div className={cn(
                  "p-4 text-sm whitespace-pre-wrap leading-relaxed shadow-xs rounded-2xl",
                  msg.role === 'user' 
                    ? "bg-[#1a2f8a] text-white rounded-tr-xs" 
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-xs"
                )}>
                  {msg.content}
                </div>

                {/* Optional Action Button */}
                {msg.actionType && (
                  <div className="pt-1">
                    <Button
                      size="sm"
                      onClick={() => handleActionClick(msg.actionType)}
                      className="bg-[#0d9488] hover:bg-teal-600 text-white font-bold text-xs shadow gap-1.5 cursor-pointer rounded-xl"
                    >
                      {msg.actionLabel || 'Explore Further'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}

                {/* Quick suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestions.map((sug: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug)}
                        className="text-[11px] font-bold px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-[#1a2f8a] dark:text-blue-300 rounded-xl border border-slate-200/80 dark:border-slate-700 transition-colors shadow-xs cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}

                <span className={cn("text-[10px] text-slate-400 px-1", msg.role === 'user' ? "text-right" : "text-left")}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex w-full justify-start">
            <div className="flex max-w-[80%] gap-3 flex-row">
              <div className="flex-none mt-1">
                <div className="w-8 h-8 rounded-full bg-[#0f1740] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-teal-300" />
                </div>
              </div>
              <div className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">Ask Sarkar is evaluating schemes & guidelines</span>
                <div className="w-1.5 h-1.5 bg-[#1a2f8a] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-[#1a2f8a] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-[#1a2f8a] rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── 1-CLICK PROMPT PREVIEW BAR ── */}
      {!isTyping && (
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" /> Quick Prompts:
          </span>
          {PROMPT_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip.query)}
              className="text-xs text-left px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-[#0f1740] dark:text-slate-200 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 whitespace-nowrap font-medium cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* ── INPUT AREA WITH VOICE SIMULATION ── */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="relative flex items-center gap-2">
          
          {/* Voice Input Mic Button */}
          <button
            type="button"
            onClick={simulateVoiceInput}
            className={`p-2.5 rounded-full transition-all cursor-pointer ${
              isListening
                ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
            title={isListening ? "Listening... Speak now" : "Speak your query (Simulated Voice Assistant)"}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening to your voice input..." : "Ask in English or Hindi (e.g. Which scholarship can I get?)..."}
              className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1a2f8a] text-sm text-[#0f1740] dark:text-white font-medium"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-[#1a2f8a] text-white rounded-full disabled:opacity-40 hover:bg-[#0f1740] transition-colors cursor-pointer shadow-sm"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-center mt-2">
          <span className="text-[10px] text-slate-400">
            Ask Sarkar AI • Contextual Citizen Intelligence Layer
          </span>
        </div>
      </div>
    </div>
  );
}
