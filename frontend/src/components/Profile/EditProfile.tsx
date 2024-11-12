// src/components/Profile/EditProfile.tsx
import React, { useState } from "react";

interface User {
  name: string;
}

interface EditProfileProps {
  user: User;
  onSaveProfile: (data: User) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onSaveProfile }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
  };

  return (
    <div className="flex flex-col items-center py-8 px-6 bg-neutral-light rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
