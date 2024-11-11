// src/pages/register.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import Register from "../components/Authentication/Register";

const RegisterPage = () => {
  const { register, error } = useAuth();

  const handleRegister = async (data: {
    email: string;
    password: string;
    name: string;
    bio: string;
  }) => {
    await register(data);
  };

  return (
    <div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Register onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
