// src/pages/profile/edit.tsx
import React from "react";
import EditProfile from "../../components/Profile/EditProfile";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const EditProfilePage: React.FC = () => {
  const { token } = useAuth();
  const router = useRouter();

  if (!token)
    return (
      <p className="text-center mt-10">Please log in to edit your profile</p>
    );

  const handleSaveProfile = (updatedData: { name: string; bio: string }) => {
    router.push("/profile"); // Redirect to profile page
  };

  return <EditProfile onSaveProfile={handleSaveProfile} />;
};

export default EditProfilePage;
