import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

import { ReviewProps } from "@/types/types";

const ReviewCard: React.FC<ReviewProps> = ({ rating, comment }) => {
  const translateRating = (rating: number) => {
    switch (rating) {
      case 1:
        return "Bad";
      case 2:
        return "Okay";
      case 3:
        return "Average";
      case 4:
        return "Great";
      case 5:
        return "Amazing";
      default:
        return "No Rating";
    }
  };

  const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
      color: theme.palette.action.disabled,
    },
  }));

  const customIcons: {
    [index: string]: {
      icon: React.ReactElement<unknown>;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: "Dissatisfied",
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: "Satisfied",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: "Very Satisfied",
    },
  };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {translateRating(rating)}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <StyledRating
              name="highlight-selected-only"
              value={rating ? rating : 1}
              readOnly
              IconContainerComponent={IconContainer}
              getLabelText={(value: number) => customIcons[value].label}
              highlightSelectedOnly
            />
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment ? comment : "No comment"}
        </Typography>
      </Box>
    </Card>
  );
};

export default ReviewCard;
