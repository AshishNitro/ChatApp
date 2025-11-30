import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
      <nav className="border-b border-gray-200 dark:border-gray-800 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">💬 ChatApp</h1>
          <div className="flex gap-4 items-center">
            <Link href="/signin" className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
              Sign In
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-8 w-full">
        <section className="text-center py-16 px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight dark:text-white">
            Connect and Chat in Real-Time
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Create rooms, invite friends, and experience seamless real-time messaging
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup" className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
              Start Chatting
            </Link>
            <Link href="/signin" className="px-8 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95">
              Sign In
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 py-16 px-8">
          <div className="text-center p-8 rounded-xl bg-gray-50 dark:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Real-Time Messaging</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Experience instant message delivery with WebSocket technology
            </p>
          </div>
          <div className="text-center p-8 rounded-xl bg-gray-50 dark:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your conversations are protected with industry-standard security
            </p>
          </div>
          <div className="text-center p-8 rounded-xl bg-gray-50 dark:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Group Rooms</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Create rooms and chat with multiple people simultaneously
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 px-8 py-8 text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 ChatApp. Built with Next.js and WebSockets.</p>
      </footer>
    </div>
  );
}
