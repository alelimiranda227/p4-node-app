import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
