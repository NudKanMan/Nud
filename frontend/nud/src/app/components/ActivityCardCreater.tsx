// /src/app/components/ActivityCardCreater.tsx
"use client";

import { Button } from "@mui/material";
import React from "react";
import { useModal } from "../contexts/ModalContext";

export default function ActivityCardCreater() {
  const { openModal } = useModal();

  const handleCreate = (): void => {
    console.log("hello");
    openModal();
  };

  return (
    <div className="col-span-1 bg-gray-600 rounded-lg p-4 flex flex-col justify-center items-center">
      <p className="text-white text-lg font-bold">Start your own activity!</p>
      <Button
        className="bg-[#FF5864] text-white font-bold py-2 px-10 rounded-full text-xl mt-4 transition hover:bg-white hover:text-[#FF5864]"
        onClick={handleCreate}
      >
        Create
      </Button>
    </div>
  );
}