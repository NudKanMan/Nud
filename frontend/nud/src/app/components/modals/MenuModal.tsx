// /src/app/components/modals/MenuModal.tsx
"use client";

import React from "react";
import { useModal } from "../../contexts/ModalContext";
import { Button } from "@mui/material";

export default function MenuModal() {
  const { activeModal, closeModal } = useModal();

  if (activeModal !== "menu") return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-tinder-grey p-6 rounded-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-6 text-white">Menu</h2>

        <div className="flex flex-col gap-4">
          <Button 
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#fd5564",
              fontWeight: "bold",
              fontSize: "1rem", // Increased font size
              padding: "12px 24px", // Increased padding
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#fd5564",
                color: "white",
              },
            }}
            onClick={() => (window.location.href = "/home")}
          >
            Home
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#fd5564",
              fontWeight: "bold",
              fontSize: "1rem", // Increased font size
              padding: "12px 24px", // Increased padding
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#fd5564",
                color: "white",
              },
            }}
            onClick={() => (window.location.href = "/my-activities")}
          >
            My Activities
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#fd5564",
              fontWeight: "bold",
              fontSize: "1rem", // Increased font size
              padding: "12px 24px", // Increased padding
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#fd5564",
                color: "white",
              },
            }}
            onClick={() => (window.location.href = "/my-friends")}
          >
            My Friends
          </Button>
        </div>

        <div className="mt-6">
          <Button
            variant="contained"
            onClick={closeModal}
            sx={{
              backgroundColor: "white",
              color: "#424242",
              fontWeight: "bold",
              fontSize: "1rem", // Increased font size
              padding: "10px 26px", // Increased padding
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