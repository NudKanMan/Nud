// src/pages/activities/index.tsx
import React from "react";
import ActivityList from "../../components/Activity/ActivityList";
import ActivityCard from "@/components/Activity/ActivityCard";
import ReviewCard from "@/components/Activity/ReviewCard";

const ActivitiesPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <ReviewCard
        rating={5}
        comment="Very good! I enjoyed the activity so much"
      />
      <ActivityCard />
      {/* <ActivityList /> */}
    </div>
  );
};

export default ActivitiesPage;
