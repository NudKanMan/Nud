// src/pages/activities/index.tsx
import React from "react";
import ActivityList from "../../components/Activity/ActivityList";

const ActivitiesPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <ActivityList />
    </div>
  );
};

export default ActivitiesPage;
