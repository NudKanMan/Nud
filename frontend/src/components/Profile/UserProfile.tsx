// src/components/Profile/UserProfile.tsx
import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
}

interface UserProfileProps {
  user: User;
  onEditProfile: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onEditProfile }) => {
  return (
    <div className="flex flex-col items-center py-8 px-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {user.name}'s Profile
      </h2>
      <p className="text-gray-600 mb-2">Email: {user.email}</p>
      <p className="text-gray-600 mb-4">Bio: {user.bio}</p>
      <button
        onClick={onEditProfile}
        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfile;
