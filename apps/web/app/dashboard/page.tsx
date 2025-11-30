'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '../lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = api.getStoredToken();
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await api.createRoom({ name: roomName });

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.data?.slug) {
      router.push(`/room/${result.data.slug}`);
    }
  };

  const handleLogout = () => {
    api.logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
      <nav className="border-b border-gray-200 dark:border-gray-800 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">💬 ChatApp</h1>
          <button onClick={handleLogout} className="px-5 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-8 py-8 w-full">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-3 dark:text-white">Welcome to Your Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Create a room to start chatting with friends</p>
        </div>

        <div className="flex justify-center my-8">
          <button
            onClick={() => setShowCreateRoom(!showCreateRoom)}
            className="px-8 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            {showCreateRoom ? '✕ Cancel' : '+ Create Room'}
          </button>
        </div>

        {showCreateRoom && (
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 my-8 max-w-lg mx-auto transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Create New Room</h2>
            <form onSubmit={handleCreateRoom} className="flex flex-col gap-5">
              {error && <div className="p-3.5 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg text-red-600 dark:text-red-400 text-sm">{error}</div>}
              
              <div className="flex flex-col gap-2">
                <label htmlFor="roomName" className="font-medium text-sm dark:text-white">
                  Room Name
                </label>
                <input
                  id="roomName"
                  type="text"
                  className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 dark:text-white focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                  placeholder="My Awesome Room"
                />
              </div>

              <button
                type="submit"
                className="py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Room'}
              </button>
            </form>
          </div>
        )}

        <div className="mt-12">
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 transition-all duration-300">
            <h3 className="text-xl mb-4 dark:text-white">🚀 Quick Start</h3>
            <ol className="pl-6 list-decimal leading-8 text-gray-600 dark:text-gray-400">
              <li>Create a new chat room</li>
              <li>Share the room link with friends</li>
              <li>Start chatting in real-time!</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
