// src/components/Authentication/Register.tsx
import Button, { ButtonProps } from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { LoginProps, RegisterProps } from "@/types/types";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(red["A200"]),
  backgroundColor: red["A200"],
  "&:hover": {
    backgroundColor: red[400],
  },
}));

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({ name, email, password });
  };

  return (
    <div className="p-">
      <div className="py-10">
        <Typography variant="h6">Welcome to Nud✓</Typography>
        <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
          Start matching your activities for free
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
        <TextField onChange={(e) => setName(e.target.value)} label="username" />
        <TextField onChange={(e) => setEmail(e.target.value)} label="Email" />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="password"
          type="password"
        />
        <ColorButton type="submit" variant="contained">
          Register
        </ColorButton>
        <div className="flex flex-row gap-x-1">
          <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
            Already have an account?
          </Typography>
          <a href="/login">
            <Typography
              variant="caption"
              gutterBottom
              sx={{ display: "block" }}
              color={"#ff5252"}
            >
              Sign In!
            </Typography>
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
