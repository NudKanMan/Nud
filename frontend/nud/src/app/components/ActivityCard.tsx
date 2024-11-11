// /src/app/components/ActivityCard.tsx
"use client";

import React from "react";
import { useActivity } from "../hooks/useActivity";

interface ActivityCardProps {
  id: string;
}

export default function ActivityCard({ id }: ActivityCardProps) {
  const { activity, error } = useActivity(id);

  return (
    <div className="col-span-1 bg-gray-600 rounded-lg p-4 flex flex-col justify-center items-center">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : activity ? (
        <>
          <p className="text-white text-lg font-bold">{activity.title}</p>
          <p className="text-gray-300 mt-2 text-center">{activity.description}</p>
          <p className="text-gray-400 mt-2 text-center">
            Max Participants: {activity.maxParticipants}
          </p>
          <p className="text-gray-400 mt-2 text-center">
            Start Date: {activity.startDate} - End Date: {activity.endDate}
          </p>
        </>
      ) : (
        <p className="text-white text-center">Loading...</p>
      )}
    </div>
  );
}