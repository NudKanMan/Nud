import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

import { ActivityProps } from "@/types/types";

const ActivityCard: React.FC<ActivityProps> = ({
  title,
  description,
  maxParticipants,
  startDate,
  endDate,
  id,
}) => {
  const handleJoin = async () => {
    try {
      console.log(id);
      const response = await axios.put(
        "http://localhost:8765/activities/join",
        {
          id,
        }
      );
      alert("Joining activity successful!");
      console.log(response.data);
    } catch (error) {
      alert("Error joining activity");
      console.log(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Max Participants: {maxParticipants}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Start Date: {startDate}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          End Date: {endDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleJoin}>
          Join
        </Button>
        <Button size="small">View Review </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityCard;
