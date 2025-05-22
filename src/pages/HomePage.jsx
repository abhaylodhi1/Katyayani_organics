import React, { useState, useEffect, useRef } from 'react';
import { useGetPostsQuery } from '../features/posts/postsApi';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import ChatSidebar from '../components/ChatSidebar';

export default function HomePage() {
  const username = localStorage.getItem('username') || 'User';
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const limit = 10;

  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const { data, isFetching, isError } = useGetPostsQuery({ limit, skip: page * limit });

  useEffect(() => {
    if (data?.posts) {
      setPosts((prev) => [...prev, ...data.posts]);
    }
  }, [data]);

  const loader = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [isFetching]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = '/'; // Forces full page reload and redirects to login
  };
  

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Navbar */}
      <nav
        className={`p-4 shadow-md sticky top-0 z-10 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">📰 Posts App</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">👤 {username}</span>
            <button
              onClick={toggleTheme}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                theme === 'dark'
                  ? 'bg-yellow-300 text-black hover:bg-yellow-400'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Posts */}
      <main className="p-4 max-w-3xl mx-auto">
        {posts.map((post, index) => (
          <div
            key={`${post.id}-${index}`} // fix: ensure unique key
            className={`p-5 mb-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2
              className={`text-lg font-semibold mb-2 ${
                theme === 'dark' ? 'text-yellow-300' : 'text-blue-600'
              }`}
            >
              {post.title}
            </h2>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
              {post.body}
            </p>
          </div>
        ))}

        {isFetching && (
          <p
            className={`text-center text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Loading more posts...
          </p>
        )}

        {isError && (
          <p className="text-center text-red-500 font-medium">
            Error loading posts. Please try again.
          </p>
        )}

        <div ref={loader} className="h-10" />
      </main>

      {/* Chat toggle button */}
      <button
        onClick={() => setShowChat((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg z-50"
      >
        💬 Chat
      </button>

      {/* Chat Sidebar */}
      {showChat && <ChatSidebar onClose={() => setShowChat(false)} />}
    </div>
  );
}
