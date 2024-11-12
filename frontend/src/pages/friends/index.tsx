// src/pages/friends/index.tsx
import React from "react";
import FriendsList from "../../components/Friends/FriendsList";

const FriendsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <FriendsList />
    </div>
  );
};

export default FriendsPage;
