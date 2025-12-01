'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '../lib/api';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await api.signup(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-red-400 via-pink-400 to-rose-500 dark:from-red-900 dark:via-pink-900 dark:to-rose-900">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 w-full max-w-md shadow-2xl transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Join ChatApp and start messaging</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="p-3.5 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-sm">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:border-red-500 dark:focus:border-pink-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-pink-900 transition-all duration-200"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-medium text-sm">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:border-red-500 dark:focus:border-pink-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-pink-900 transition-all duration-200"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              placeholder="johndoe"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:border-red-500 dark:focus:border-pink-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-pink-900 transition-all duration-200"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="py-3.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl mt-2"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
          Already have an account?{' '}
          <Link href="/signin" className="text-red-600 dark:text-pink-400 font-semibold hover:underline transition-colors duration-200">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
