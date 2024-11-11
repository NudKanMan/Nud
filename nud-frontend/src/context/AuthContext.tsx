import React, { createContext, useContext, useState, ReactNode } from "react";
import api from "../utils/api";
import { useRouter } from "next/router";

interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    bio: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      setUser(response.data.user);
      router.push("/profile"); // Redirect to the profile page
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    bio: string;
  }) => {
    try {
      const response = await api.post("/auth/register", data);
      setUser(response.data.user);
      router.push("/profile"); // Redirect to the profile page
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
    router.push("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
