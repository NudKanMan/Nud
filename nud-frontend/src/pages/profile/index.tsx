// src/pages/profile/index.tsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user)
    return (
      <p className="text-center mt-10 text-primary">
        Please log in to view your profile
      </p>
    );

  return (
    <div className="flex flex-col items-center py-8 px-6 bg-neutral-light rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        {user.name}'s Profile
      </h2>
      <p className="text-neutral mb-2">Email: {user.email}</p>
      <p className="text-neutral mb-4">Bio: {user.bio}</p>
      <button
        onClick={() => router.push("/profile/edit")}
        className="bg-accent text-primary py-2 px-6 rounded hover:bg-pink-400 font-semibold transition duration-200"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfilePage;
