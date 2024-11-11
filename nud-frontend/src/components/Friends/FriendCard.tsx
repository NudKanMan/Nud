// src/components/Friends/FriendCard.tsx
import React from "react";

interface Friend {
  id: string;
  name: string;
  email: string;
}

interface FriendCardProps {
  friend: Friend;
  onRemoveFriend: (id: string) => void;
  onMessageFriend: (id: string) => void;
}

const FriendCard: React.FC<FriendCardProps> = ({
  friend,
  onRemoveFriend,
  onMessageFriend,
}) => {
  return (
    <div className="p-4 bg-neutral-light rounded-lg shadow-md flex justify-between items-center mb-4">
      <div>
        <h3 className="text-xl font-semibold text-primary">{friend.name}</h3>
        <p className="text-neutral text-sm">{friend.email}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onMessageFriend(friend.id)}
          className="px-3 py-1 bg-accent text-primary font-semibold rounded hover:bg-pink-400 transition"
        >
          Message
        </button>
        <button
          onClick={() => onRemoveFriend(friend.id)}
          className="px-3 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
