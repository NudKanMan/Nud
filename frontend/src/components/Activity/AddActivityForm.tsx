// src/components/Activity/AddActivityForm.tsx
import React, { useState } from "react";

interface AddActivityFormProps {
  onAddActivity: (
    name: string,
    description: string,
    date: string,
    location: string,
  ) => void;
}

const AddActivityForm: React.FC<AddActivityFormProps> = ({ onAddActivity }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddActivity(name, description, date, location);
    setName("");
    setDescription("");
    setDate("");
    setLocation("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-neutral-light rounded-lg shadow-md mt-6"
    >
      <h3 className="text-xl text-primary font-semibold mb-4">
        Create a New Activity
      </h3>
      <input
        type="text"
        placeholder="Activity Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-500 bg-primary text-primary rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-500 bg-primary text-primary rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-500 bg-primary text-primary rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-500 bg-primary text-primary rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-accent text-primary font-semibold rounded hover:bg-pink-400 transition"
      >
        Add Activity
      </button>
    </form>
  );
};

export default AddActivityForm;
