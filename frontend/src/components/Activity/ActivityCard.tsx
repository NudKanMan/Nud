import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
}) => {
  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8765/users/getmyprofile"
      );
      console.log(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoin = () => {
    alert(`You have successfully joined the activity: ${title}!`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title={title}
      />
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
