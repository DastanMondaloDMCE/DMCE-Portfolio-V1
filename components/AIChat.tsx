import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage, MessageSender } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: "Hi! I'm SterlingAI. Ask me anything about Alex's skills, projects, or experience.",
      sender: MessageSender.Bot,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: MessageSender.User,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsThinking(true);

    let fullResponse = "";
    
    // Create a temporary bot message id
    const botMsgId = (Date.now() + 1).toString();
    
    // Add placeholder bot message
    setMessages(prev => [...prev, {
      id: botMsgId,
      text: "",
      sender: MessageSender.Bot,
      timestamp: new Date()
    }]);

    try {
      const generator = sendMessageToGemini(userMsg.text);
      
      for await (const chunk of generator) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId 
            ? { ...msg, text: fullResponse }
            : msg
        ));
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I encountered a glitch in the matrix. Please try again.",
        sender: MessageSender.Bot,
        timestamp: new Date()
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-premium-dark/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right">
          {/* Header */}
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-blue-400 animate-pulse" />
              <span className="font-semibold text-white">SterlingAI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === MessageSender.User ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === MessageSender.User 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-white/10 text-gray-200 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-sm flex items-center space-x-2">
                   <Loader2 size={14} className="animate-spin text-blue-400" />
                   <span className="text-xs text-gray-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 bg-black/20">
            <div className="flex items-center space-x-2 bg-white/5 rounded-full p-1 border border-white/10 focus-within:border-blue-500/50 transition-colors">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about my experience..."
                className="flex-1 bg-transparent border-none text-white text-sm px-4 focus:outline-none placeholder-gray-500"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isThinking}
                className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-[10px] text-center text-gray-600 mt-2">
              Powered by Gemini 2.5 Flash
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-110 active:scale-95 ${
          !isOpen ? 'animate-float' : ''
        }`}
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
        )}
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        
        {!isOpen && (
          <div className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Ask AI about me
          </div>
        )}
      </button>
    </div>
  );
};