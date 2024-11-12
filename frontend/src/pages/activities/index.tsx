import React, { useEffect } from "react";
import ActivityList from "../../components/Activity/ActivityList";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ActivitiesPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <Typography variant="h2">All Activities</Typography>
        <div className="">
          <Button
            onClick={() => router.push("/activities/create")}
            variant="contained"
            color="success"
          >
            Create activity
          </Button>
        </div>
      </div>

      {/* <ReviewCard
        rating={5}
        comment="Very good! I enjoyed the activity so much"
      /> */}
      <ActivityList />
    </div>
  );
};

export default ActivitiesPage;
