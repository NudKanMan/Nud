// src/pages/profile/edit.tsx
import React from "react";
import EditProfile from "../../components/Profile/EditProfile";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const EditProfilePage: React.FC = () => {
  const { user, login } = useAuth();
  const router = useRouter();

  if (!user)
    return (
      <p className="text-center mt-10">Please log in to edit your profile</p>
    );

  const handleSaveProfile = (updatedData: { name: string; bio: string }) => {
    login({ ...user, ...updatedData }); // Update user state in context
    router.push("/profile"); // Redirect to profile page
  };

  return <EditProfile user={user} onSaveProfile={handleSaveProfile} />;
};

export default EditProfilePage;
