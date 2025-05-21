import React, { useEffect, useRef, useState } from 'react';
import { useEchoWebSocket } from '../features/chat/echoSocket';
import { useTheme } from '../context/ThemeContext';

export default function ChatSidebar({ onClose }) {
  const sidebarRef = useRef();
  const { theme } = useTheme();

  const { sendMessage, lastMessage } = useEchoWebSocket();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (lastMessage) {
      setMessages((prev) => [...prev, { text: lastMessage, sender: 'other' }]);
    }
  }, [lastMessage]);

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setMessages((prev) => [...prev, { text: input, sender: 'self' }]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 h-full w-80 shadow-lg z-50 flex flex-col transition-colors duration-300
        ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
    >
 
      <button
        onClick={onClose}
        className="self-end p-3 m-2 text-gray-600 hover:text-red-500 dark:text-gray-300"
        aria-label="Close chat"
      >
        ✕
      </button>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
  {messages.map((msg, i) => (
    <div
      key={i}
      className={`flex ${msg.sender === 'self' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`rounded-xl px-4 py-2 max-w-[70%] break-words
          ${msg.sender === 'self'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
      >
        {msg.text}
      </div>
    </div>
  ))}
</div>


      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className={`w-full rounded-md p-2 resize-none border focus:outline-none
            ${theme === 'dark'
              ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500'
              : 'bg-white border-gray-300 placeholder-gray-600 text-gray-900 focus:border-blue-600'}`}
        />
        <button
          onClick={handleSend}
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
