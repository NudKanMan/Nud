// src/components/Friends/AddFriendForm.tsx
import React, { useState } from "react";

interface AddFriendFormProps {
  onAddFriend: (name: string, email: string) => void;
}

const AddFriendForm: React.FC<AddFriendFormProps> = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onAddFriend(name, email);
      setName("");
      setEmail("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 bg-neutral-light rounded-lg shadow-md"
    >
      <h3 className="text-xl text-primary font-semibold mb-4">Add a Friend</h3>
      <input
        type="text"
        placeholder="Friend's Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-500 bg-primary text-primary rounded"
      />
      <input
        type="email"
        placeholder="Friend's Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-500 bg-primary text-primary rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-accent text-primary font-semibold rounded hover:bg-pink-400 transition"
      >
        Add Friend
      </button>
    </form>
  );
};

export default AddFriendForm;
