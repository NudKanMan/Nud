// src/components/Activity/ActivityReviews.tsx
import React, { useState } from "react";

interface Review {
  id: string;
  reviewer: string;
  rating: number;
  comment: string;
}

interface ActivityReviewsProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

const ActivityReviews: React.FC<ActivityReviewsProps> = ({
  reviews,
  onAddReview,
}) => {
  const [newReview, setNewReview] = useState({
    reviewer: "",
    rating: 0,
    comment: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: `r${reviews.length + 1}`,
      reviewer: newReview.reviewer,
      rating: Number(newReview.rating),
      comment: newReview.comment,
    };
    onAddReview(review);
    setNewReview({ reviewer: "", rating: 0, comment: "" });
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg text-primary font-semibold mb-2">Reviews</h4>
      <ul className="mb-4">
        {reviews.map((review) => (
          <li key={review.id} className="p-2 bg-neutral-light rounded mb-2">
            <p className="text-accent font-semibold">{review.reviewer}</p>
            <p className="text-neutral">Rating: {review.rating} / 5</p>
            <p className="text-neutral">{review.comment}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="reviewer"
          placeholder="Your name"
          value={newReview.reviewer}
          onChange={handleInputChange}
          className="w-full p-2 bg-primary text-primary rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={newReview.rating}
          onChange={handleInputChange}
          className="w-full p-2 bg-primary text-primary rounded"
        />
        <textarea
          name="comment"
          placeholder="Your review"
          value={newReview.comment}
          onChange={handleInputChange}
          className="w-full p-2 bg-primary text-primary rounded"
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-primary font-semibold rounded hover:bg-pink-400 transition"
        >
          Add Review
        </button>
      </form>
    </div>
  );
};

export default ActivityReviews;
