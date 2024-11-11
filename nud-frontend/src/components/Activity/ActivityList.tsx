// src/components/Activity/ActivityList.tsx
import React from "react";

interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
}

const activities: Activity[] = [
  {
    id: "1",
    name: "Yoga Class",
    description: "A relaxing yoga session for all skill levels.",
    date: "2024-11-20",
    location: "Community Center",
  },
  {
    id: "2",
    name: "Cooking Workshop",
    description: "Learn to make delicious meals from scratch.",
    date: "2024-11-25",
    location: "Downtown Kitchen Studio",
  },
  // Add more activities as needed
];

const ActivityList: React.FC = () => {
  return (
    <div className="p-6 bg-neutral-light rounded-lg shadow-md">
      <h2 className="text-2xl text-primary font-semibold mb-4">
        Upcoming Activities
      </h2>
      <ul>
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="mb-4 p-4 bg-primary rounded shadow text-primary"
          >
            <h3 className="text-xl font-semibold text-accent">
              {activity.name}
            </h3>
            <p className="text-neutral mt-1">{activity.description}</p>
            <p className="text-neutral mt-1">
              <strong>Date:</strong> {activity.date}
            </p>
            <p className="text-neutral">
              <strong>Location:</strong> {activity.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
