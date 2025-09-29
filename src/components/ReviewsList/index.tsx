"use client";

import { Review } from "@/types/review";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReviewModalContent from "../Modals/ReviewModalContent";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => {
          console.log(review.reviewer_avatar);
          const uint8Array = new Uint8Array(review.reviewer_avatar);
          console.log(uint8Array, "ARRAY");
          const base64String = btoa(
            uint8Array.reduce(
              (acc, byte) => acc + String.fromCharCode(byte),
              ""
            )
          );
          console.log(base64String, "BASE64");
          return (
            <div
              key={review.review_id}
              className="bg-gray-800 p-4 rounded-lg shadow-sm flex items-start gap-4"
            >
              {/* Avatar */}
              <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={
                    review.reviewer_avatar
                      ? `data:image/png;base64,${base64String}`
                      : "/default-avatar.webp"
                  }
                  alt="Reviewer avatar"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Conteúdo */}
              <div className="flex-1">
                <h4 className="text-lg font-medium whitespace-nowrap">
                  {review.movie_title}
                </h4>
                <h4 className="text-md font-medium whitespace-nowrap text-blue-300">
                  Reviewed by:{" "}
                  {review.reviewer ? (
                    review.reviewer_name
                  ) : (
                    <em className="text-red-400">Anonymous</em>
                  )}
                </h4>

                <p className="text-gray-300 mb-2">{review.review_text}</p>
                <button
                  onClick={() => {
                    setSelectedReview(review);
                    setOpenModal(true);
                  }}
                  className="text-sm font-medium text-blue-400 hover:underline"
                >
                  See more →
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {openModal && selectedReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg relative w-full max-w-3xl">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              ×
            </button>

            <ReviewModalContent review={selectedReview} />
          </div>
        </div>
      )}
    </section>
  );
}
