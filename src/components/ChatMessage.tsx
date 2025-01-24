import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
  theme: 'light' | 'dark';
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp, theme }) => {
  return (
    <div className={`flex gap-4 p-4 rounded-lg ${
      theme === 'dark'
        ? isBot ? 'bg-navy-700/50' : 'bg-navy-700/30'
        : isBot ? 'bg-navy-50/50' : 'bg-transparent'
    }`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isBot 
          ? theme === 'dark' ? 'bg-navy-500' : 'bg-navy-600'
          : theme === 'dark' ? 'bg-navy-600' : 'bg-navy-800'
      }`}>
        {isBot ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <p className={`leading-relaxed ${
          theme === 'dark' ? 'text-navy-100' : 'text-gray-800'
        }`}>
          {message}
        </p>
        <p className={`text-xs ${
          theme === 'dark' ? 'text-navy-400' : 'text-gray-500'
        }`}>
          {timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};