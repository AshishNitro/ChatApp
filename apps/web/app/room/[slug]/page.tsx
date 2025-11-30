'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '../../lib/api';
import { useWebSocket } from '../../lib/useWebSocket';

interface Message {
  message: string;
  userId?: string;
  timestamp?: number;
}

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const [token, setToken] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { isConnected, messages, joinRoom, sendMessage } = useWebSocket(token);

  useEffect(() => {
    const storedToken = api.getStoredToken();
    if (!storedToken) {
      router.push('/signin');
      return;
    }
    setToken(storedToken);
  }, [router]);

  useEffect(() => {
    if (!slug || !token) return;

    const loadRoom = async () => {
      const result = await api.getRoomBySlug(slug);
      if (result.error) {
        console.error('Failed to load room:', result.error);
      } else {
        setRoomData(result.data);
        if (result.data?.id) {
          // Join the room via WebSocket
          joinRoom(result.data.id);
          
          // Load chat history
          const chatsResult = await api.getChats(result.data.id);
          if (chatsResult.data) {
            setChatHistory(chatsResult.data);
          }
        }
      }
    };

    loadRoom();
  }, [slug, token, joinRoom]);

  useEffect(() => {
    // Add new WebSocket messages to chat
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage) {
        setChatHistory((prev) => [...prev, latestMessage]);
      }
    }
  }, [messages]);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !roomData?.id) return;

    sendMessage(roomData.id, messageInput);
    setMessageInput('');
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Room link copied to clipboard!');
  };

  const handleLogout = () => {
    api.logout();
    router.push('/');
  };

  if (!roomData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-800 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="dark:text-white">Loading room...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
      <header className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold dark:text-white">{roomData.name || 'Chat Room'}</h1>
            <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-xl transition-colors duration-200">
              {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={handleCopyLink} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95">
              📋 Copy Link
            </button>
            <button onClick={() => router.push('/dashboard')} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95">
              🏠 Dashboard
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
          {chatHistory.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            chatHistory.map((msg, idx) => (
              <div key={idx} className="flex flex-col gap-1 max-w-[70%] animate-[slideIn_0.2s_ease-out]">
                <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-3 rounded-xl break-words transition-all duration-200 hover:shadow-md">
                  <p className="leading-6 dark:text-white">{msg.message}</p>
                </div>
                {msg.timestamp && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 pl-2">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-3 px-6 py-6 border-t border-gray-200 dark:border-gray-800">
          <input
            type="text"
            className="flex-1 px-5 py-3.5 border border-gray-300 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-950 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            disabled={!isConnected}
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-blue-600 text-white rounded-3xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl whitespace-nowrap"
            disabled={!isConnected || !messageInput.trim()}
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
