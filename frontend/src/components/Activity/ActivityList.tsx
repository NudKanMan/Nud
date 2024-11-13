import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActivityProps } from "@/types/types";
import ActivityCard from "./ActivityCard";

const ActivityList: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8765/activities");
        console.log(response.data.activities);
        setActivities(response.data.activities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [activities, setActivities] = useState<ActivityProps[]>();

  return (
    <div className="p-6 bg-neutral-light rounded-lg shadow-md">
      <h2 className="text-2xl text-primary font-semibold mb-4">Activities</h2>
      {activities && activities.length > 0 ? (
        <ul className="grid grid-cols-4 gap-2">
          {activities.map((activity) => (
            <ActivityCard
              title={activity.title}
              description={activity.description}
              maxParticipants={activity.maxParticipants}
              startDate={activity.startDate}
              endDate={activity.endDate}
              id={activity.id}
            />
          ))}
        </ul>
      ) : (
        <div>No activities found.</div>
      )}
    </div>
  );
};

export default ActivityList;
