// /src/app/components/ProfileModal.tsx
"use client";

import React from "react";
import { useModal } from "../contexts/ModalContext";
import { Session } from "next-auth";
import { Button } from "@mui/material";

interface ProfileModalProps {
  session: Session | null;
}

export default function ProfileModal({ session }: ProfileModalProps) {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">User Profile</h2>
        
        {session ? (
          <div className="text-center">
            <p className="text-lg font-semibold">{session.user?.name}</p>
            <p className="text-gray-500">{session.user?.email}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Guest</p>
        )}

        <div className="flex justify-center mt-6">
          <Button
            variant="contained"
            onClick={closeModal}
            sx={{
              backgroundColor: "#FF5864",
              color: "white",
              fontWeight: "bold",
              padding: "8px 24px",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "white",
                color: "#FF5864",
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