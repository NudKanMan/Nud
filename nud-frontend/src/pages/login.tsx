import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "@/components/Authentication/Login";

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Login onLogin={handleLogin} />
    </>
  );
};

export default LoginPage;
