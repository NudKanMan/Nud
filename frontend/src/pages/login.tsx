import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "@/components/Authentication/Login";
import Typography from "@mui/material/Typography";

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    login(email, password);
  };

  return (
    <div className="flex flex-rows ">
      <div className="w-1/3">
        <div className="p-10">
          <Login onLogin={handleLogin} />
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

export default LoginPage;
