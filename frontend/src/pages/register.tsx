// src/pages/register.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import Register from "../components/Authentication/Register";
import Typography from "@mui/material/Typography";

const RegisterPage = () => {
  const { register } = useAuth();

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    register(data);
  };
  return (
    <div className="flex flex-rows ">
      <div className="w-1/3">
        <div className="p-10">
          <Register onRegister={handleRegister} />
        </div>
      </div>
      <div className="w-2/3 flex items-center justify-center">
        <Typography variant="h1" className="italic font-bold antialiased">
          Nud✓
        </Typography>
      </div>
    </div>
  );
};

export default RegisterPage;
