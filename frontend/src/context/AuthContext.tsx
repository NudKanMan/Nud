import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Define the types for the context
interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  logout: () => void;
  token: string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const router = useRouter();

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8765/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token); // Save token to localStorage
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      router.push("/profile"); // Redirect to profile after login
      return null;
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  // Register function
  const register = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:8765/users/register",
        data
      );
      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token); // Save token to localStorage
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      router.push("/profile"); // Redirect to profile after registration
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); // Remove token from localStorage
    delete axios.defaults.headers.common["Authorization"]; // Remove token from axios headers
    router.push("/login"); // Redirect to login page after logout
  };

  // Set the token in axios headers when token state changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ login, register, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook for easier access to AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
