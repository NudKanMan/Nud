// src/pages/reviews/index.tsx
import React from "react";
import ReviewList from "../../components/Reviews/ReviewList";

const ReviewsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <ReviewList />
    </div>
  );
};

export default ReviewsPage;
