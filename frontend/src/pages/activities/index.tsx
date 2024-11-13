import React, { useEffect } from "react";
import ActivityList from "../../components/Activity/ActivityList";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const ActivitiesPage: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [token, router]);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Typography variant="h2">All Activities</Typography>
        <div>
          <Button
            onClick={() => router.push("/activities/create")}
            variant="contained"
            color="success"
          >
            Create activity
          </Button>
        </div>
      </div>
      <ActivityList />
    </div>
  );
};

export default ActivitiesPage;
