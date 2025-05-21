import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const onStorageChange = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <LoginPage onLogin={() => setToken(localStorage.getItem('token'))} />} />
        <Route path="/home" element={token ? <HomePage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
