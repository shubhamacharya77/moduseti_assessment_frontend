import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage, ChatMessageData } from './ChatMessage';

interface GroundedChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCitation: (citation: any) => void;
  backendUrl?: string;
}

export const GroundedChatDrawer: React.FC<GroundedChatDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCitation,
  backendUrl = 'http://localhost:8000',
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Good morning, Executive Leader. I am your Grounded AI Strategy Analyst. Ask me any question regarding your sales velocity, customer churn vectors, HR policies, or strategic transformation plays.',
    },
  ]);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const userMsg: ChatMessageData = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(`${backendUrl}/api/chat/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) {
        throw new Error('Failed to get answer from server');
      }

      const data = await res.json();
      const assistantMsg: ChatMessageData = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'No recommendation returned.',
        citations: data.evidence_citations || [],
        priority: data.priority,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessageData = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: `Error connecting to AI chat backend: ${err.message || 'Server error'}. Please ensure FastAPI backend is running.`,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-slate-950 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Grounded Executive AI Chat <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              </h3>
              <span className="text-xs text-slate-400">Powered by Groq LLM & Evidence Collector</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2 pr-1">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} onSelectCitation={onSelectCitation} />
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-indigo-400 py-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing evidence package and citing sources...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="pt-4 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask executive strategy question..."
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-indigo-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
