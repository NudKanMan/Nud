// /src/app/components/CreateActivityModal.tsx
"use client";

import React, { useState } from "react";
import { useModal } from "../contexts/ModalContext";
import { Button } from "@mui/material";

export default function CreateActivityModal() {
  const { isOpen, closeModal } = useModal();

  const [activityName, setActivityName] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log({ activityName, location, time, description });
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-tinder-grey text-tinder-white p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Activity</h2>

        <div className="mb-4">
          <label className="block mb-1 text-tinder-white font-semibold">Activity Name</label>
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            className="w-full px-3 py-2 border border-tinder-orange rounded-xl text-tinder-grey"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-tinder-white font-semibold">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-tinder-orange rounded-xl text-tinder-grey"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-tinder-white font-semibold">Time</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-tinder-orange rounded-xl text-tinder-grey"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-tinder-white font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-tinder-orange rounded-xl text-tinder-grey"
            rows={3}
          ></textarea>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={closeModal}
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#424242",
              fontWeight: "bold",
              padding: "8px 24px",
              fontSize: "1rem",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "white",
                color: "#fd5564",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#fd5564",
              color: "white",
              fontWeight: "bold",
              padding: "8px 24px",
              fontSize: "1rem",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "white",
                color: "#fd5564",
              },
            }}
          >
            Create Activity
          </Button>
        </div>
      </div>
    </div>
  );
}