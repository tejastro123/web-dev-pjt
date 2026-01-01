import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
        <p className="text-gray-500 mb-8">Enter your phone number or email to continue</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-primary transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-red-600 transition">
            Send OTP
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          New to Zomato? <Link to="/signup" className="text-primary font-medium">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
