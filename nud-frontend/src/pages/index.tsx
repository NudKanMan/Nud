// src/pages/index.tsx
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="text-center py-16 px-4 bg-neutral-light">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Welcome to Nud Platform
      </h1>
      <p className="text-lg text-neutral">
        Connect, engage, and explore activities with like-minded people.
      </p>
    </div>
  );
};

export default HomePage;
