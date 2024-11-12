// src/components/Activity/ActivityList.tsx
import React, { useState } from "react";
import ActivityReviews from "./ActivityReviews";

interface Review {
  id: string;
  reviewer: string;
  rating: number;
  comment: string;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  owner: string; // The user who created the activity
  participants: string[]; // Array of user IDs of those who joined
  reviews: Review[]; // Array of reviews specific to this activity
}

const initialActivities: Activity[] = [
  {
    id: "1",
    name: "Yoga Class",
    description: "A relaxing yoga session for all skill levels.",
    date: "2024-11-20",
    location: "Community Center",
    owner: "user1",
    participants: ["user2", "user3"],
    reviews: [
      { id: "r1", reviewer: "Alice", rating: 5, comment: "Loved it!" },
      { id: "r2", reviewer: "Bob", rating: 4, comment: "Great session" },
    ],
  },
  // Add more activities as needed
];

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const joinActivity = (activityId: string, userId: string) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId
          ? { ...activity, participants: [...activity.participants, userId] }
          : activity,
      ),
    );
  };

  const addReview = (activityId: string, review: Review) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId
          ? { ...activity, reviews: [...activity.reviews, review] }
          : activity,
      ),
    );
  };

  return (
    <div className="p-6 bg-neutral-light rounded-lg shadow-md">
      <h2 className="text-2xl text-primary font-semibold mb-4">Activities</h2>
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
            <p className="text-neutral mt-2">
              <strong>Created by:</strong> {activity.owner}
            </p>
            <button
              className="mt-2 px-3 py-1 bg-accent text-primary font-semibold rounded hover:bg-pink-400 transition"
              onClick={() => joinActivity(activity.id, "currentUserId")}
            >
              Join Activity
            </button>
            <ActivityReviews
              reviews={activity.reviews}
              onAddReview={(review) => addReview(activity.id, review)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
