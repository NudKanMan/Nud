import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "@/components/Authentication/Login";

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    login(email, password);
  };

  return (
    <>
      <Login onLogin={handleLogin} />
    </>
  );
};

export default LoginPage;
