import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Send, User, Trash2, AlertCircle, Sparkles, 
  ArrowRight, CheckCircle2, MessageSquare, FileText, Briefcase,
  Mic, MicOff, Volume2, ShieldCheck, Zap, Server, RotateCcw
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button, Card, Badge } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { sendMessage } from '@/services/assistant';
import ROUTES from '@/constants/routes';
import { RecommendationCards, SourceCitations, AdminDataStatusModal } from '@/components/common/AiResponseWidgets';
import type { ChatMessage } from '@/types';

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

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      role: 'assistant',
      content: `Namaste, **${user?.name || 'Citizen'}**! 🙏 

I am **Ask Sarkar**, your AI assistant for Indian government welfare schemes, recruitment vacancies, and civic grievance resolution powered by Google Gemini and official-source government data.

I have loaded your GovConnect profile:
• **Education:** ${user?.education || 'Post Graduate / MCA'}
• **Domicile State:** ${user?.state || 'Delhi'}
• **Category:** ${user?.category || 'General'}
• **Active Profile Skills:** ${(user?.skills || ['Python', 'SQL', 'React']).slice(0, 3).join(', ')}

How may I assist you today? Click any prompt below or type your question in English, Hindi, or Hinglish.`,
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
  const [isAdminStatusOpen, setIsAdminStatusOpen] = useState(false);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);
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

    setLastFailedQuery(null);
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const botReply = await sendMessage(text, [...messages, userMsg], {
        page: 'ask-sarkar',
        user: user || undefined,
      });
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setLastFailedQuery(text);
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content: 'Service is temporarily busy. Showing available GovConnect official-source information. Click below to retry.',
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

  const handleActionClick = (actionType?: string, payload?: any) => {
    if (actionType === 'navigate_grievance' || actionType === 'create_grievance') {
      navigate(ROUTES.GRIEVANCE_NEW, { state: payload });
    } else if (actionType === 'navigate_schemes' || actionType === 'view_scheme') {
      if (payload?.id) navigate(`/schemes/${payload.id}`);
      else navigate(ROUTES.SCHEMES);
    } else if (actionType === 'navigate_jobs' || actionType === 'view_job') {
      if (payload?.id) navigate(`/jobs/${payload.id}`);
      else navigate(ROUTES.JOBS);
    } else if (actionType === 'navigate_vault' || actionType === 'view_vault') {
      navigate(ROUTES.DOCUMENTS);
    } else if (actionType === 'apply_official' && payload?.url) {
      window.open(payload.url, '_blank', 'noopener,noreferrer');
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
                Gemini RAG
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Personalized for {user?.name || 'Citizen'} ({user?.education || 'MCA'}, {user?.state || 'Delhi'})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* SIH Live Data Status Trigger */}
          <button
            onClick={() => setIsAdminStatusOpen(true)}
            title="Inspect Official Sources & Live Pipeline"
            className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full border border-slate-200 dark:border-slate-600 text-[11px] text-slate-700 dark:text-slate-200 transition-colors shadow-xs cursor-pointer"
          >
            <Server className="w-3 h-3 text-teal-600 dark:text-teal-400" />
            <span className="font-bold">51 Official Sources</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

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
        <span>Ask Sarkar is grounded on official government sources. Final eligibility should always be verified on official portals.</span>
      </div>

      {/* ── MESSAGES AREA ── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#f8f9fc] dark:bg-slate-950">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}
          >
            <div className={cn("flex max-w-[95%] sm:max-w-[85%] gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              
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
              <div className="flex flex-col space-y-2 max-w-full">
                <div className={cn(
                  "p-4 text-sm whitespace-pre-wrap leading-relaxed shadow-xs rounded-2xl",
                  msg.role === 'user' 
                    ? "bg-[#1a2f8a] text-white rounded-tr-xs" 
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-xs"
                )}>
                  {msg.content}

                  {/* Recommendation Cards */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <RecommendationCards recommendations={msg.recommendations} onAction={handleActionClick} />
                  )}

                  {/* Source Citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <SourceCitations sources={msg.sources} />
                  )}
                </div>

                {/* Primary Action Button (e.g. Grievance Review or Portal Launch) */}
                {msg.actionType && (
                  <div className="pt-1">
                    <Button
                      size="sm"
                      onClick={() => handleActionClick(msg.actionType, msg.actionPayload)}
                      className="bg-[#0d9488] hover:bg-teal-600 text-white font-bold text-xs shadow gap-1.5 cursor-pointer rounded-xl"
                    >
                      {msg.actionLabel || 'Review & Proceed'}
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

        {/* Retry prompt if failed */}
        {lastFailedQuery && (
          <div className="flex justify-center">
            <button
              onClick={() => handleSend(lastFailedQuery)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry last query</span>
            </button>
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex w-full justify-start">
            <div className="flex max-w-[80%] gap-3 flex-row">
              <div className="flex-none mt-1">
                <div className="w-8 h-8 rounded-full bg-[#0f1740] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-teal-300" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-xs border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1a2f8a] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-500 ml-1">Searching official sources with Gemini...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── QUICK PROMPTS CHIPS BAR ── */}
      <div className="flex-none px-4 py-2 bg-slate-100/70 dark:bg-slate-800/40 border-t border-slate-200/70 dark:border-slate-800 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-teal-500" />
            Quick:
          </span>
          {PROMPT_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip.query)}
              className="shrink-0 px-3 py-1 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-300 font-medium text-[11px] transition-colors shadow-2xs cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── INPUT BAR ── */}
      <div className="flex-none p-4 bg-white dark:bg-slate-900 border-t border-slate-200/90 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={simulateVoiceInput}
            title="Speech Input (Voice Assistant)"
            className={cn(
              "p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0",
              isListening 
                ? "bg-red-500 text-white border-red-600 animate-pulse" 
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
            )}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question in Hindi, English or Hinglish..."
            disabled={isTyping}
            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a2f8a]/20 focus:border-[#1a2f8a] transition-all disabled:opacity-50"
          />

          <Button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            className="bg-[#1a2f8a] hover:bg-[#0f1740] text-white p-2.5 rounded-xl transition-transform hover:scale-105 disabled:opacity-50 cursor-pointer shadow-md shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 mt-2">
          <span>Grounded with 51 official portal sources via robots.txt compliant crawler</span>
          <span>Press Enter ↵ to send</span>
        </div>
      </div>

      {/* Admin SIH Diagnostic Modal */}
      <AdminDataStatusModal
        isOpen={isAdminStatusOpen}
        onClose={() => setIsAdminStatusOpen(false)}
      />
    </div>
  );
}
