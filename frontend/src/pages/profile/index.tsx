// src/pages/profile/index.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import { UserProfile } from "@/types/types";
import Typography from "@mui/material/Typography";

const ProfilePage: React.FC = () => {
  const { token } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8765/users/getmyprofile"
        );
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!token)
    return (
      <p className="text-center mt-10 text-primary">
        Please log in to view your profile
      </p>
    );

  return (
    <div className="flex flex-col items-center py-8 px-6 bg-neutral-light rounded-lg shadow-lg max-w-md mx-auto">
      <Typography
        variant="h2"
        className="text-2xl font-semibold mb-4 text-black"
      >
        {user?.name}'s Profile
      </Typography>
      <Typography variant="h6" className=" mb-2 text-black">
        Email: {user?.email}
      </Typography>
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
