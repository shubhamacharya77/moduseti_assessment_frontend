import React from 'react';
import { Bot, User, ShieldCheck } from 'lucide-react';
import { CitationBadge } from './CitationBadge';

export interface ChatMessageData {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: any[];
  priority?: string;
}

interface ChatMessageProps {
  message: ChatMessageData;
  onSelectCitation: (citation: any) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSelectCitation }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-600/20">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-600/20'
            : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-xl'
        }`}
      >
        <div className="whitespace-pre-line">{message.text}</div>

        {/* Render Citations if Assistant Message */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Evidence Citations ({message.citations.length}):
            </span>
            <div className="flex flex-wrap">
              {message.citations.map((cit, idx) => (
                <CitationBadge key={idx} citation={cit} onClick={onSelectCitation} />
              ))}
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
