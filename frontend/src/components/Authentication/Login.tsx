// src/components/Authentication/Login.tsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password); // Login using the API
  };

  return (
    <div className="flex flex-col items-center py-8 px-6 bg-neutral-light rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-accent">Login</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
        />
        <button type="submit" className="button button-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
