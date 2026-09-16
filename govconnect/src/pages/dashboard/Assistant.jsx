import React, { useState } from 'react';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function Assistant() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I am the GovConnect AI Assistant. How can I help you navigate government services today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { id: Date.now(), role: 'user', content: input }]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: 'assistant', 
        content: 'I understand you are looking for help. As a prototype, my responses are currently simulated, but in the future, I will connect to a secure LLM to answer specific questions about schemes, documents, and grievances.'
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-brand-navy p-4 text-white flex items-center gap-3">
        <Bot className="h-6 w-6 text-brand-teal" />
        <div>
          <h2 className="font-semibold">GovConnect AI Assistant</h2>
          <p className="text-xs text-gray-300">Ask questions about government services and processes.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start max-w-[80%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-navy text-white' : 'bg-brand-teal text-white'}`}>
                {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-brand-navy text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about schemes, documents, or processes..."
            className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal"
          />
          <Button type="submit" disabled={!input.trim()} className="px-3 gap-2">
            <Send className="h-4 w-4" /> Send
          </Button>
        </form>
      </div>
    </div>
  );
}
