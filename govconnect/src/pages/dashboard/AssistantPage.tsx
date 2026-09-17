import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Trash2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui';
import { initialChatMessages, suggestedPrompts } from '@/data/mockChatMessages';
import { sendMessage } from '@/services/assistant';

export default function AssistantPage() {
  const [messages, setMessages] = useState(initialChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const newUserMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const astMsg = await sendMessage(newUserMsg.content, [...messages, newUserMsg]);
      setMessages(prev => [...prev, astMsg]);
    } catch (error) {
      console.error(error);
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
    setMessages([{
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your GovConnect AI Assistant. How can I help you with government services, schemes, or applications today?',
      timestamp: new Date().toISOString(),
    }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px] bg-white rounded-xl shadow-sm border overflow-hidden">
      {/* Header */}
      <div className="flex-none p-4 border-b bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1a2f8a] flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-[#0f1740]">GovConnect AI Assistant</h1>
            <p className="text-xs text-gray-500">Ask questions about government services and processes.</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={clearChat} title="Clear conversation">
          <Trash2 className="w-4 h-4 text-gray-500" />
        </Button>
      </div>

      <div className="bg-amber-50 px-4 py-2 border-b border-amber-100 flex items-center justify-center gap-2 text-xs text-amber-800">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>AI responses are informational. Always verify with official sources.</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#f8f9fc]">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn("flex max-w-[80%] gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              
              <div className="flex-none mt-1">
                {msg.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#1a2f8a] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <div className={cn(
                  "px-4 py-3 text-sm whitespace-pre-wrap shadow-sm",
                  msg.role === 'user' 
                    ? "bg-[#1a2f8a] text-white rounded-2xl rounded-tr-sm" 
                    : "bg-white text-gray-800 border rounded-2xl rounded-tl-sm"
                )}>
                  {msg.content}
                </div>
                <span className={cn("text-[10px] text-gray-400 mt-1", msg.role === 'user' ? "text-right" : "text-left")}>
                  {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex w-full justify-start">
            <div className="flex max-w-[80%] gap-3 flex-row">
              <div className="flex-none mt-1">
                <div className="w-8 h-8 rounded-full bg-[#1a2f8a] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="px-4 py-4 bg-white border rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length < 3 && !isTyping && (
        <div className="p-4 bg-white border-t border-b grid grid-cols-2 md:grid-cols-3 gap-2">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setInputValue(prompt)}
              className="text-xs text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 text-[#1a2f8a] rounded-lg transition-colors border border-blue-100 truncate"
              title={prompt}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            className="w-full pl-4 pr-12 py-3 bg-gray-50 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#1a2f8a] focus:bg-white transition-all text-sm"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-1.5 p-2 bg-[#1a2f8a] text-white rounded-full disabled:opacity-50 hover:bg-[#0f1740] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] text-gray-400">GovConnect AI can make mistakes. Verify important info.</span>
        </div>
      </div>
    </div>
  );
}
