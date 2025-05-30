"use client";

import Image from "next/image";
import { Review } from "@/types/review";

import RatingInfo from "../RatingInfo";

export default function ReviewModalContent({ review }: { review: Review }) {
  const createdDate = review.review_date
    ? new Date(review.review_date).toLocaleDateString("en-US")
    : "--/--/--";

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">{review?.movie_title}</h1>

      <div className="flex items-start gap-4">
        <Image
          src={
            review.reviewer_avatar
              ? `data:image/png;base64,${review.reviewer_avatar}`
              : "/default-avatar.webp"
          }
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover"
          width={64}
          height={64}
        />

        <div className="flex-1 space-y-4">
          <p className="text-gray-300 break-all">{review.review_text}</p>
          <div className="text-sm text-gray-400 space-y-1">
            <p>
              <strong>Review by:</strong>{" "}
              {review.reviewer ? (
                review.reviewer_name
              ) : (
                <em className="text-red-400">Anonymous</em>
              )}
            </p>
            <div className="flex items-center gap-2">
              <strong>Rating:</strong>
              <RatingInfo rating={review.rating} />
            </div>
            <p>
              <strong>Review date:</strong> {createdDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
