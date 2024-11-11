// src/components/Friends/FriendsList.tsx
import React, { useState } from "react";
import FriendCard from "./FriendCard";

interface Friend {
  id: string;
  name: string;
  email: string;
}

const initialFriends: Friend[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com" },
  { id: "2", name: "Bob Smith", email: "bob@example.com" },
  { id: "3", name: "Carol White", email: "carol@example.com" },
];

const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>(initialFriends);

  const handleRemoveFriend = (id: string) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  const handleMessageFriend = (id: string) => {
    alert(`Message to friend with ID: ${id}`);
  };

  return (
    <div className="p-6 bg-neutral-light rounded-lg shadow-md">
      <h2 className="text-2xl text-primary font-semibold mb-4">My Friends</h2>
      <div>
        {friends.map((friend) => (
          <FriendCard
            key={friend.id}
            friend={friend}
            onRemoveFriend={handleRemoveFriend}
            onMessageFriend={handleMessageFriend}
          />
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
