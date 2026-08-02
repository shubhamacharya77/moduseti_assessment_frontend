import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Navbar } from '@/components/Navbar';
import { DynamicChatChart, ChartDataPayload } from '@/charts/DynamicChatChart';
import {
  Bot,
  Send,
  Sparkles,
  Loader2,
  TrendingUp,
  BarChart3,
  FileText,
  Globe,
  CheckCircle2,
  User,
  Trash2,
  DollarSign,
  Users,
  Search,
} from 'lucide-react';

const BACKEND_URL = 'http://localhost:8000';

interface ChatMessageItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: any[];
  chartData?: ChartDataPayload | null;
  strategicIssues?: string[];
  priority?: string;
  expectedOutcome?: string;
}

const WELCOME_MESSAGE: ChatMessageItem = {
  id: 'welcome',
  sender: 'assistant',
  text: 'Good morning, Executive Leader. I am your Grounded AI Strategy Analyst. Ask me any question regarding your sales velocity, customer churn vectors, HR policies, or strategic transformation plays.',
};

export default function ChatPage() {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeChartData, setActiveChartData] = useState<ChartDataPayload | null>(null);
  const [activeCitations, setActiveCitations] = useState<any[]>([]);
  const [selectedCitationIndex, setSelectedCitationIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessageItem[]>([WELCOME_MESSAGE]);

  // Automatic smooth scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setActiveChartData(null);
    setActiveCitations([]);
    setSelectedCitationIndex(null);
  };

  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userText = queryText.trim();
    setInputQuery('');

    const userMsg: ChatMessageItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) throw new Error('Failed to get answer from server');

      const data = await res.json();
      const assistantMsg: ChatMessageItem = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'No specific recommendation generated.',
        citations: data.evidence_citations || [],
        chartData: data.chart_data || null,
        strategicIssues: data.strategic_issues || [],
        priority: data.priority,
        expectedOutcome: data.expected_outcome,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (data.chart_data) {
        setActiveChartData(data.chart_data);
      } else {
        setActiveChartData(null);
      }

      if (data.evidence_citations) {
        setActiveCitations(data.evidence_citations);
        setSelectedCitationIndex(0);
      }
    } catch (err: any) {
      const errorMsg: ChatMessageItem = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: `Error connecting to AI chat backend: ${err.message || 'Server error'}. Please ensure FastAPI backend is running.`,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatValue = (key: string, val: any) => {
    if (val === null || val === undefined) return 'N/A';
    if (typeof val === 'number') {
      const kLower = key.toLowerCase();
      // Check percentage & margin FIRST
      if (
        kLower.includes('pct') ||
        kLower.includes('margin') ||
        kLower.includes('rate') ||
        kLower.includes('ratio')
      ) {
        return `${val}%`;
      }
      // Then check currency amounts
      if (
        kLower.includes('revenue') ||
        kLower.includes('profit') ||
        kLower.includes('spend') ||
        kLower.includes('size') ||
        kLower.includes('price')
      ) {
        return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
      }
      return val.toLocaleString('en-IN');
    }
    return String(val);
  };

  const formatKeyName = (key: string) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const getSourceIcon = (category?: string, source?: string) => {
    const catLower = (category || '').toLowerCase();
    const srcLower = (source || '').toLowerCase();
    if (srcLower.includes('sales') || catLower.includes('sales'))
      return <DollarSign className="w-3.5 h-3.5 text-indigo-400" />;
    if (srcLower.includes('customer') || catLower.includes('customer'))
      return <Users className="w-3.5 h-3.5 text-emerald-400" />;
    if (srcLower.includes('knowledge') || srcLower.includes('pdf') || catLower.includes('document'))
      return <FileText className="w-3.5 h-3.5 text-purple-400" />;
    return <Globe className="w-3.5 h-3.5 text-blue-400" />;
  };

  const QUICK_PROMPTS = [
    { label: '📈 Sales Trends', query: 'Show monthly revenue trend over time' },
    { label: '📊 Category Revenue', query: 'What is our product category revenue breakdown?' },
    { label: '🚨 Churn Risk Vectors', query: 'What is our customer churn risk vector analysis?' },
    { label: '🌍 Regional Sales', query: 'Show regional revenue distribution' },
    { label: '📄 HR Policy', query: 'What does our HR policy say about leave and work guidelines?' },
  ];

  // Identify document citations for RAG mode
  const docCitations = activeCitations.filter(
    (item) => typeof item.details === 'object' && item.details !== null && 'text_chunk' in item.details
  );

  return (
    <>
      <Head>
        <title>AI Strategy Chat - MODUS Platform</title>
        <meta name="description" content="Split-Screen Executive AI Chat with Live Dynamic Graph Generation" />
      </Head>

      <div className="h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col overflow-hidden">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Split-Screen Layout */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 overflow-hidden">
          {/* LEFT HALF: INTERACTIVE CHAT PANEL */}
          <div className="glass-card rounded-2xl border border-slate-800 bg-slate-950/80 p-5 flex flex-col min-h-0 h-full shadow-2xl overflow-hidden">
            {/* Header with Clear Chat Button */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    Executive AI Strategy Chat <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  </h2>
                  <span className="text-xs text-slate-400">Grounded in company PDFs, Sales & Customer metrics</span>
                </div>
              </div>

              <button
                onClick={handleClearChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 text-xs font-semibold transition-all shadow-sm"
                title="Clear chat message history"
              >
                <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-400" />
                <span>Clear Chat</span>
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="py-2.5 flex flex-wrap gap-2 border-b border-slate-800/80 shrink-0">
              {QUICK_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.query)}
                  disabled={isLoading}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-all disabled:opacity-50"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Message Stream with Smooth Auto-Scroll & Custom Scrollbar */}
            <div className="flex-1 overflow-y-auto min-h-0 py-4 space-y-4 pr-2">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-600/20">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[88%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                        isUser
                          ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-600/20'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-xl'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Strategic Issues if present */}
                      {!isUser && msg.strategicIssues && msg.strategicIssues.length > 0 && (
                        <div className="pt-2 border-t border-slate-800">
                          <span className="text-[11px] font-bold text-amber-400 block mb-1">
                            ⚠️ Strategic Issues:
                          </span>
                          <ul className="space-y-1 pl-1">
                            {msg.strategicIssues.map((issue, idx) => (
                              <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span>{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Citations Footer */}
                      {!isUser && msg.citations && msg.citations.length > 0 && (
                        <div className="pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                          {msg.citations.map((cit, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (msg.chartData) setActiveChartData(msg.chartData);
                                if (msg.citations) {
                                  setActiveCitations(msg.citations);
                                  setSelectedCitationIndex(idx);
                                }
                              }}
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-all cursor-pointer shadow-sm"
                              title="Click to inspect source fact details in right panel"
                            >
                              <Search className="w-3 h-3 text-indigo-400" />
                              <span>[{cit.source}]</span>
                            </button>
                          ))}
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
              })}

              {isLoading && (
                <div className="flex items-center space-x-2 text-xs text-indigo-400 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>Analyzing evidence & generating dynamic visualization...</span>
                </div>
              )}

              {/* Scroll Anchor Target */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputQuery);
              }}
              className="pt-3 border-t border-slate-800 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask executive data or policy question..."
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

          {/* RIGHT HALF: DYNAMIC GRAPH & RAG EVIDENCE INSPECTOR PANEL */}
          <div className="glass-card rounded-2xl border border-slate-800 bg-slate-950/80 p-5 pb-8 flex flex-col min-h-0 h-full shadow-2xl overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                <span>Dynamic Live Visualizer & Fact Inspector</span>
              </h3>
              <span className="text-[11px] font-semibold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Live Data Sync
              </span>
            </div>

            {/* Render Live Recharts Graph if chartData present */}
            {activeChartData ? (
              <DynamicChatChart chartData={activeChartData} />
            ) : docCitations.length > 0 ? (
              /* PDF Document RAG Fact Card for Document Q&A */
              <div className="glass-card p-6 rounded-2xl border border-purple-500/30 bg-slate-900/90 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Document RAG Fact Citation
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium">Vector Similarity Match</span>
                </div>
                <h4 className="text-sm font-bold text-white">{docCitations[0].title}</h4>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 italic leading-relaxed">
                  <span className="text-[10px] text-purple-400 font-semibold block not-italic mb-1">
                    📄 Document: {docCitations[0].details.doc_name} (Page {docCitations[0].details.page || 1})
                  </span>
                  "{docCitations[0].details.text_chunk}"
                </div>
              </div>
            ) : (
              <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60 h-64 flex flex-col items-center justify-center text-slate-400 text-center space-y-2">
                <TrendingUp className="w-8 h-8 text-indigo-400 mb-1" />
                <span className="text-xs font-semibold text-white">Ask a data query or click a prompt above</span>
                <span className="text-[11px] text-slate-400 max-w-xs">
                  The panel will dynamically generate live interactive charts (Bar, Area Trend, Pie) matching your exact query.
                </span>
              </div>
            )}

            {/* Render Supporting Citations with Expanded Structured Metric Details */}
            {activeCitations.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-800/80 shrink-0 pb-4">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-indigo-400" /> Supporting Grounded Citations ({activeCitations.length})
                </h4>
                <div className="space-y-3">
                  {activeCitations.map((item, idx) => {
                    const isDoc =
                      typeof item.details === 'object' && item.details !== null && 'text_chunk' in item.details;
                    const isDict = typeof item.details === 'object' && item.details !== null && !isDoc;
                    const isSelected = selectedCitationIndex === idx;

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedCitationIndex(idx)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 text-xs shadow-lg ${
                          isSelected
                            ? 'bg-slate-900/90 border-indigo-500/80 ring-1 ring-indigo-500/60'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                            {getSourceIcon(item.category, item.source)}
                            <span>{item.source}</span>
                          </span>
                          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {item.confidence}
                          </span>
                        </div>

                        <h5 className="font-bold text-white text-xs">{item.title}</h5>

                        {/* Structured Fact Details (No raw JSON!) */}
                        <div>
                          {isDoc ? (
                            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-200 italic leading-relaxed">
                              <span className="text-[10px] text-purple-400 font-semibold block not-italic mb-1">
                                📄 Document: {item.details.doc_name || 'Uploaded PDF'} (Page {item.details.page || 1})
                              </span>
                              "{item.details.text_chunk}"
                            </div>
                          ) : isDict ? (
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(item.details).map(([k, v], i) => {
                                if (typeof v === 'object' && v !== null && !Array.isArray(v)) return null;
                                return (
                                  <div key={i} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex flex-col justify-between">
                                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block truncate">
                                      {formatKeyName(k)}
                                    </span>
                                    <span className="text-xs font-bold text-slate-100 block truncate mt-0.5">
                                      {formatValue(k, v)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="p-2.5 rounded-lg bg-slate-950 text-slate-200 text-xs">
                              {String(item.details)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
