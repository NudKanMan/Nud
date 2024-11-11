// ActivityCard.tsx
"use client";

import React from "react";

export default function ActivityCard() {
  return (
    <div className="col-span-1 bg-gray-600 rounded-lg p-4 flex flex-col justify-center items-center">
      <p className="text-white text-lg font-bold">Sample Activity Data</p>
      <p className="text-gray-300 mt-2 text-center">This is a placeholder for activity data from the database.</p>
    </div>
  );
}