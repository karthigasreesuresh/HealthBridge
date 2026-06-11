import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, MessageSquare } from 'lucide-react';
import { getChatbotResponse, getResponseByPayload } from '../utils/chatbotDb';

const SmartAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'bot',
      text: "Welcome to HealthBridge! I am your AI Support Assistant. Feel free to type a question or select one of the topics below to learn more about our healthcare coordination.",
      quickReplies: [
        { text: 'How do I request support?', payload: 'request_support' },
        { text: 'How do I volunteer?', payload: 'become_volunteer' },
        { text: 'What services do you offer?', payload: 'services_info' }
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Listen for global open-chat requests
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setHasUnread(false);
    };
    window.addEventListener('healthbridge-open-chat', handleOpenChat);
    return () => window.removeEventListener('healthbridge-open-chat', handleOpenChat);
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const handleSendMessage = (text, payload = null) => {
    if (!text.trim()) return;

    // Append User Message
    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: text
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      let result;
      if (payload) {
        result = getResponseByPayload(payload);
      } else {
        result = getChatbotResponse(text);
      }

      const botMsg = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: result.response,
        quickReplies: result.quickReplies || []
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleSendMessage(inputText);
  };

  return (
    <div className="chatbot-widget animate-fade-in">
      {/* Floating Toggle Button */}
      <button 
        className={`chatbot-toggle-btn ${isOpen ? 'open' : ''}`} 
        onClick={toggleOpen}
        aria-label="Toggle support assistant chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {hasUnread && !isOpen && <span className="chatbot-unread-dot"></span>}
      </button>

      {/* Chatbox Panel */}
      <div className={`chatbot-box ${isOpen ? 'open-anim' : 'closed'}`}>
        <div className="chatbot-header">
          <div className="chatbot-bot-info">
            <div className="chatbot-avatar">
              <Bot size={20} color="white" />
            </div>
            <div className="chatbot-name">
              <h4>HealthBridge Assistant</h4>
              <p>Online | Smart Assistant</p>
            </div>
          </div>
          <button className="chatbot-close-btn" onClick={toggleOpen} aria-label="Close Chat">
            <X size={18} />
          </button>
        </div>

        {/* Message List */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender}`}>
              <div className="chat-bubble-avatar">
                {msg.sender === 'bot' ? <Bot size={14} /> : 'U'}
              </div>
              <div className="chat-bubble">
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble-wrapper bot">
              <div className="chat-bubble-avatar">
                <Bot size={14} />
              </div>
              <div className="chat-bubble">
                <div className="chatbot-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies Panel */}
        {!isTyping && messages[messages.length - 1]?.quickReplies?.length > 0 && (
          <div className="chatbot-quick-replies animate-fade-in">
            {messages[messages.length - 1].quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleSendMessage(reply.text, reply.payload)}
              >
                {reply.text}
              </button>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form className="chatbot-input-area" onSubmit={handleInputSubmit}>
          <input
            type="text"
            className="chatbot-input"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" className="chatbot-send-btn" disabled={isTyping} aria-label="Send message">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SmartAssistant;
