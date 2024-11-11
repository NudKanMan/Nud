// src/pages/index.tsx
import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="text-center py-16 px-4 bg-neutral-light">
      <h1 className="text-4xl font-bold text-primary mb-8">
        Welcome to Nud Platform
      </h1>
      <p className="text-lg text-neutral mb-12">
        Connect, engage, and explore activities with friends.
      </p>
      <div className="flex justify-center space-x-8">
        <Link href="/activities" passHref>
          <div className="p-6 bg-primary text-accent rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition">
            <h2 className="text-2xl font-semibold mb-2">Activities</h2>
            <p className="text-neutral">View and join upcoming activities.</p>
          </div>
        </Link>
        <Link href="/friends" passHref>
          <div className="p-6 bg-primary text-accent rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition">
            <h2 className="text-2xl font-semibold mb-2">Friends</h2>
            <p className="text-neutral">Manage your friend list and connect.</p>
          </div>
        </Link>
        <Link href="/reviews" passHref>
          <div className="p-6 bg-primary text-accent rounded-lg shadow-lg cursor-pointer hover:bg-gray-800 transition">
            <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
            <p className="text-neutral">Read and add reviews for activities.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
