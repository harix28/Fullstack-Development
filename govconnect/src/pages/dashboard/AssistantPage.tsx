import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Send, User, Trash2, AlertCircle, Sparkles, 
  ArrowRight, CheckCircle2, MessageSquare, FileText, Briefcase 
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button, Card, Badge } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { sendMessage } from '@/services/assistant';
import ROUTES from '@/constants/routes';

const PROMPT_CHIPS = [
  'Which schemes am I eligible for?',
  'What documents do I need for a scholarship?',
  'How can I apply for a government job?',
  'I want to complain about garbage.',
  'Where should I file a complaint about street lights?',
  'Explain this scheme in simple language.',
];

export default function AssistantPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<any[]>([
    {
      id: 'welcome_1',
      role: 'assistant',
      content: `Namaste, ${user?.name || 'Citizen'}! 🙏 

I am **Ask Sarkar**, your GovConnect AI assistant for government schemes, sarkari jobs, and grievance resolution. 

My answers are personalized using your profile: **${user?.education || 'MCA Graduate'}**, **${user?.state || 'Delhi'}**, skills in **${(user?.skills || ['Python', 'SQL']).slice(0, 3).join(', ')}**.

How can I assist you today? Feel free to ask about any scheme, job exam, or public issue.`,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Which schemes am I eligible for?',
        'What documents do I need for a scholarship?',
        'I want to complain about garbage.'
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  const clearChat = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        role: 'assistant',
        content: `Chat cleared. Ask Sarkar is ready to assist you with government schemes, job updates, or complaint drafts!`,
        timestamp: new Date().toISOString(),
        suggestions: PROMPT_CHIPS.slice(0, 3)
      }
    ]);
  };

  const handleActionClick = (actionType?: string, payload?: any) => {
    if (actionType === 'navigate_grievance') {
      navigate(ROUTES.GRIEVANCE_NEW);
    } else if (actionType === 'navigate_schemes') {
      navigate(ROUTES.SCHEMES);
    } else if (actionType === 'navigate_jobs') {
      navigate(ROUTES.JOBS);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-h-[850px] bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden font-sans">
      
      {/* Header */}
      <div className="flex-none px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 flex justify-between items-center backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0f1740] to-[#1a2f8a] flex items-center justify-center shadow">
            <Bot className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-[#0f1740] dark:text-white leading-tight">
                Ask Sarkar
              </h1>
              <Badge className="bg-teal-50 text-teal-700 border-teal-200 text-[10px] py-0 px-1.5">
                AI Assistant
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your AI assistant for government services and citizen welfare.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-600 text-[11px] text-slate-600 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Active Profile: <strong className="text-[#0f1740] dark:text-white">{user?.name} ({user?.education})</strong>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearChat} 
            title="Clear Chat History"
            className="text-slate-400 hover:text-slate-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Indicative Disclaimer Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/40 px-4 py-2 border-b border-amber-200/60 dark:border-amber-800/60 flex items-center justify-center gap-2 text-xs text-amber-800 dark:text-amber-300">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        <span>Ask Sarkar is an assistive prototype. Always verify critical requirements on official government portals.</span>
      </div>

      {/* Messages Area */}
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
                  <div className="w-8 h-8 rounded-full bg-[#1a2f8a] flex items-center justify-center text-white text-xs font-bold shadow">
                    {user?.name?.slice(0, 2).toUpperCase() || 'U'}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0f1740] to-[#1a2f8a] flex items-center justify-center shadow">
                    <Bot className="w-4 h-4 text-teal-300" />
                  </div>
                )}
              </div>

              {/* Message Body */}
              <div className="flex flex-col space-y-2">
                <div className={cn(
                  "p-4 text-sm whitespace-pre-wrap leading-relaxed shadow-sm rounded-2xl",
                  msg.role === 'user' 
                    ? "bg-[#1a2f8a] text-white rounded-tr-sm" 
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-sm"
                )}>
                  {msg.content}
                </div>

                {/* Optional Action Button inside bot response */}
                {msg.actionType && (
                  <div className="pt-1">
                    <Button
                      size="sm"
                      onClick={() => handleActionClick(msg.actionType, msg.actionPayload)}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow gap-1.5"
                    >
                      {msg.actionLabel || 'Proceed'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}

                {/* Suggestion Chips attached to this bot message */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestions.map((sug: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug)}
                        className="text-[11px] font-medium px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-[#1a2f8a] dark:text-blue-400 rounded-full border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
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
              <div className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">Ask Sarkar is thinking</span>
                <div className="w-1.5 h-1.5 bg-[#1a2f8a] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-[#1a2f8a] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-[#1a2f8a] rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions Bar */}
      {messages.length <= 4 && !isTyping && (
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Try Asking:
          </span>
          {PROMPT_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-xs text-left px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-[#0f1740] dark:text-slate-200 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about schemes, sarkari jobs, document checklists, or describe an issue..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1a2f8a] text-sm text-[#0f1740] dark:text-white"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-1.5 p-2 bg-[#1a2f8a] text-white rounded-full disabled:opacity-40 hover:bg-[#0f1740] transition-colors"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] text-slate-400">
            Powered by GovConnect Citizen Engine • Assisted Preparation Layer
          </span>
        </div>
      </div>
    </div>
  );
}
