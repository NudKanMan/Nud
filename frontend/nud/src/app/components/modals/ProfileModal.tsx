// /src/app/components/modals/ProfileModal.tsx
"use client";

import React from "react";
import { useModal } from "../../contexts/ModalContext";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

interface ProfileModalProps {
  session: Session | null;
}

export default function ProfileModal({ session }: ProfileModalProps) {
  const { activeModal, closeModal } = useModal();

  if (activeModal !== "profile") return null;

  const handleLogout = () => {
    signOut();
    closeModal();
  };

  const handleProfileClick = () => {
    window.location.href = "/profile";
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-tinder-grey p-6 rounded-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-6 text-white">User Profile</h2>
        
        {session ? (
          <div className="text-center text-white mb-6">
            <p className="text-lg font-semibold">{session.user?.name}</p>
            <p className="text-gray-300">{session.user?.email}</p>
          </div>
        ) : (
          <p className="text-center text-gray-300 mb-6">Guest</p>
        )}

        {session && (
          <div className="flex flex-col gap-4 mt-6">
            <Button
              variant="contained"
              onClick={handleProfileClick}
              sx={{
                backgroundColor: "white",
                color: "#fd5564",
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "10px 26px",
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: "#fd5564",
                  color: "white",
                },
              }}
            >
              My Profile
            </Button>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                backgroundColor: "white",
                color: "#fd5564",
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "10px 26px",
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: "#fd5564",
                  color: "white",
                },
              }}
            >
              Logout
            </Button>
          </div>
        )}

        <div className="mt-4">
          <Button
            variant="contained"
            onClick={closeModal}
            sx={{
              backgroundColor: "white",
              color: "#424242",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "10px 26px",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}