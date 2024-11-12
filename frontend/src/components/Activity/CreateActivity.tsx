import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import router from "next/router";

const CreateActivity: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    maxParticipants: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8765/activities", {
        title: formData.title,
        description: formData.description,
        maxParticipants: parseInt(formData.maxParticipants),
        startDate: formData.startDate,
        endDate: formData.endDate,
      });
      router.push("/activities");
      console.log("Activity created:", response.data);
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  return (
    <div className="text-black w-1/3 flex flex-col justify-center items-center">
      <Typography variant="h4" className="py-4">
        Create Activity
      </Typography>
      <form className="w-full flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          label="Max Participants"
          name="maxParticipants"
          value={formData.maxParticipants}
          onChange={handleChange}
          type="number"
        />
        <TextField
          variant="outlined"
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          variant="outlined"
          label="End Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateActivity;
