// src/components/Authentication/Register.tsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Register: React.FC = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData); // Register using the API
  };

  return (
    <div className="flex flex-col items-center py-8 px-6 bg-neutral-light rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-accent">Register</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
        />
        <button type="submit" className="button button-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
