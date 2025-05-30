"use client";

import { Rating } from "react-simple-star-rating";

export default function RatingInfo({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      <Rating
        readonly
        allowFraction
        initialValue={rating}
        size={20}
        SVGstyle={{ display: "inline" }}
      />
    </div>
  );
}
