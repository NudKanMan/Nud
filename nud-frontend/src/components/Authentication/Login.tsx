// src/components/Authentication/Login.tsx
import React, { useState } from "react";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="flex flex-col items-center py-8 px-6 bg-neutral-light rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Login</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-accent text-primary py-2 rounded hover:bg-pink-400 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
