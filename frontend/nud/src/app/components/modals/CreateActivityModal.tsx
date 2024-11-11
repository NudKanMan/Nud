// /src/app/components/modals/CreateActivityModal.tsx
"use client";

import React, { useState } from "react";
import { useModal } from "@/app/contexts/ModalContext";
import { Button } from "@mui/material";

export default function CreateActivityModal() {
  const { activeModal, closeModal } = useModal();

  if (activeModal !== "createActivity") return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    console.log({ title, description, maxParticipants, startDate, endDate });
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-tinder-grey p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-6 text-center text-white">Create New Activity</h2>

        <div className="mb-4">
          <label className="block mb-1 text-white font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-white font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
            rows={3}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-white font-semibold">Max Participants</label>
          <input
            type="number"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg text-black"
            min="1"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-white font-semibold">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-white font-semibold">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={closeModal}
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "red",
              fontWeight: "bold",
              padding: "8px 24px",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#00FF00",
              fontWeight: "bold",
              padding: "8px 24px",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#00FF00",
                color: "white",
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