import { Button, TextField, Typography } from "@mui/material";
import React from "react";

const createActivity: React.FC = () => {
  return (
    <div className="text-black w-1/3 flex flex-col justify-center items-center">
      <Typography variant="h4" className="py-4">
        Create Activity
      </Typography>
      <form className="w-full flex flex-col gap-y-4" action="">
        <TextField variant="outlined" label="title" />
        <TextField variant="outlined" label="description" />
        <TextField variant="outlined" label="maxParticipants" />
        <TextField variant="outlined" label="startDate" />
        <TextField variant="outlined" label="endDate" />
        <Button type="submit" variant="contained">
          Create
        </Button>
      </form>
    </div>
  );
};

export default createActivity;
