import { notFound } from "next/navigation";
import Link from "next/link";
import { getReviewDetail } from "../getReviewDetail";
import Image from "next/image";

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { review, movie } = await getReviewDetail(id);

  if (!review) {
    notFound();
  }

  const createdDate = review.review_date
    ? new Date(review.review_date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  return (
    <div className="p-6 text-white max-w-3xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-block text-sm text-blue-400 hover:underline"
      >
        ← Back
      </Link>

      <h1 className="text-3xl font-bold">{movie.title}</h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow space-y-4">
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
            <p className="text-gray-300">{review.review_text}</p>

            <div className="text-sm text-gray-400 space-y-1">
              <p>
                <strong>Review by:</strong>{" "}
                {review.reviewer_name ?? (
                  <em className="text-red-400">Anonymous</em>
                )}
              </p>
              <p>
                <strong>Rating:</strong> {review.rating} / 5
              </p>
              <p>
                <strong>Review date:</strong> {createdDate || "--/--/--"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
