// src/components/Authentication/Register.tsx
import React, { useState } from "react";

interface RegisterProps {
  onRegister: (data: {
    email: string;
    password: string;
    name: string;
    bio: string;
  }) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <div className="flex flex-col items-center py-8 px-6 bg-neutral-light rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Register</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          placeholder="Bio"
          className="w-full p-3 border border-gray-500 bg-primary text-primary rounded focus:outline-none focus:ring focus:ring-accent"
          value={formData.bio}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-accent text-primary font-semibold py-2 rounded hover:bg-pink-400 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
