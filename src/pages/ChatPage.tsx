import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, Trash2, Download, Settings, RefreshCw, ArrowLeft } from 'lucide-react';
import { sendMessage } from '../lib/gemini';
import { ChatMessage } from '../components/ChatMessage';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { text: userMessage, isBot: false, timestamp: new Date() }]);
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage);
      setMessages(prev => [...prev, { text: response, isBot: true, timestamp: new Date() }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      setMessages(prev => [...prev, { 
        text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', 
        isBot: true, 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('Sohbet geçmişini silmek istediğinize emin misiniz?')) {
      setMessages([]);
      setError(null);
    }
  };

  const downloadChat = () => {
    const chatContent = messages
      .map(m => `${m.isBot ? 'Asistan' : 'Siz'} (${m.timestamp.toLocaleString()}): ${m.text}`)
      .join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sohbet-gecmisi.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const goBack = () => {
    window.location.reload();
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-navy-900 to-navy-950 text-white' 
        : 'bg-gradient-to-b from-navy-50 to-navy-100'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`rounded-xl shadow-2xl overflow-hidden ${
          theme === 'dark' ? 'bg-navy-800' : 'bg-white'
        }`}>
          {/* Header */}
          <div className={`${
            theme === 'dark' ? 'bg-navy-900' : 'bg-navy-800'
          } p-6`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={goBack}
                  className="p-2 rounded-lg hover:bg-navy-700 transition-colors text-white"
                  title="Ana sayfaya dön"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">AI Asistan</h1>
                  <p className="text-navy-200 mt-1">Gemini AI ile Güçlendirilmiştir</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearChat}
                  className="p-2 rounded-lg hover:bg-navy-700 transition-colors text-white"
                  title="Sohbeti temizle"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={downloadChat}
                  className="p-2 rounded-lg hover:bg-navy-700 transition-colors text-white"
                  title="Sohbeti indir"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-navy-700 transition-colors text-white"
                  title="Temayı değiştir"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className={`h-[500px] overflow-y-auto p-6 space-y-4 ${
            theme === 'dark' ? 'bg-navy-800' : 'bg-white'
          }`}>
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
                theme={theme}
              />
            ))}
            {messages.length === 0 && (
              <div className="text-center mt-20">
                <Bot className={`w-12 h-12 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-navy-400' : 'text-navy-600'
                }`} />
                <p className={theme === 'dark' ? 'text-navy-400' : 'text-gray-500'}>
                  AI asistanla sohbete başlayın
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Error Message */}
          {error && (
            <div className={`px-6 py-2 ${
              theme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-50 text-red-600'
            } border-t border-red-100`}>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className={`p-4 border-t ${
            theme === 'dark' ? 'border-navy-700' : 'border-gray-200'
          }`}>
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-navy-700 border-navy-600 text-white placeholder-navy-400'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-navy-600 hover:bg-navy-500'
                    : 'bg-navy-600 hover:bg-navy-700'
                } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;