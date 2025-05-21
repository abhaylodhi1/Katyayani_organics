import { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, username: loggedInUsername } = await login({ username, password }).unwrap();
      localStorage.setItem("token", accessToken);
      localStorage.setItem("username", loggedInUsername);
      onLogin(); 
      navigate("/home");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-96 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Welcome Back</h2>

        <input
          type="text"
          placeholder="👤 Username"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="🔒 Password"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-sm text-red-500 text-center">Invalid credentials</p>
        )}

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Use a valid DummyJSON user like <code>jamesd</code> / <code>jamesdpass</code>
        </p>
      </form>
    </div>
  );
}
