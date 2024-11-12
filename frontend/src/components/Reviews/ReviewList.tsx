// src/components/Review/ReviewList.tsx
import React, { useState } from "react";

interface Review {
  id: string;
  reviewer: string;
  rating: number;
  comment: string;
}

const initialReviews: Review[] = [
  {
    id: "1",
    reviewer: "Alice",
    rating: 5,
    comment: "Great activity, highly recommend!",
  },
  {
    id: "2",
    reviewer: "Bob",
    rating: 4,
    comment: "Enjoyed it, but could be improved.",
  },
];

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({
    reviewer: "",
    rating: 0,
    comment: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReviewEntry: Review = {
      id: (reviews.length + 1).toString(),
      reviewer: newReview.reviewer,
      rating: Number(newReview.rating),
      comment: newReview.comment,
    };
    setReviews([...reviews, newReviewEntry]);
    setNewReview({ reviewer: "", rating: 0, comment: "" });
  };

  return (
    <div className="p-6 bg-neutral-light rounded-lg shadow-md">
      <h2 className="text-2xl text-primary font-semibold mb-4">Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li
            key={review.id}
            className="mb-4 p-4 bg-primary rounded shadow text-primary"
          >
            <p className="text-accent font-semibold">{review.reviewer}</p>
            <p className="text-neutral">
              <strong>Rating:</strong> {review.rating} / 5
            </p>
            <p className="text-neutral">{review.comment}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-6">
        <h3 className="text-xl text-primary font-semibold mb-2">
          Add a Review
        </h3>
        <input
          type="text"
          name="reviewer"
          placeholder="Your name"
          value={newReview.reviewer}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border border-gray-500 bg-primary text-primary rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (0-5)"
          min="0"
          max="5"
          value={newReview.rating}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border border-gray-500 bg-primary text-primary rounded"
        />
        <textarea
          name="comment"
          placeholder="Your review"
          value={newReview.comment}
          onChange={handleInputChange}
          className="w-full p-2 mb-2 border border-gray-500 bg-primary text-primary rounded"
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-primary font-semibold rounded hover:bg-pink-400 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewList;
