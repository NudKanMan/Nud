// src/pages/register.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import Register from "../components/Authentication/Register";

const RegisterPage = () => {
  const { register } = useAuth();

  const handleRegister = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    await register(data);
  };

  return (
    <div>
      <Register />
    </div>
  );
};

export default RegisterPage;
