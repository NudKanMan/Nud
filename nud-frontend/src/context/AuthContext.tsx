// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { login as loginUser, registerUser } from "../utils/api";

interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    bio: string;
  }) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      setUser(response.data.user); // Assuming the response has a user object
      setError(null); // Clear previous errors
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    bio: string;
  }) => {
    try {
      const response = await registerUser(data);
      setUser(response.data.user); // Assuming the response has a user object
      setError(null); // Clear previous errors
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError(
          "Registration endpoint not found. Please check the backend route."
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
