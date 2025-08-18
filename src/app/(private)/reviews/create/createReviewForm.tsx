"use client";

import { useForm, Controller } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUserData } from "@/hooks/userData";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { useEffect } from "react";

type ReviewFormProps = {
  movieId: string;
  token: string;
};

type FormData = {
  review: string;
  rating: number;
};

export default function ReviewForm({ movieId, token }: ReviewFormProps) {
  const { user, updateUserData } = useUserData();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await getAccessToken();
      await updateUserData(token);
    };
    if (!user) {
      fetchUserData();
    }
  }, []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      review: "",
      rating: 0,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error(
        "User not authenticated, redirecting to check your credentials."
      );
      router.push("/credentialscheck");
      return;
    }
    try {
      const response = await fetch("/api/reviews/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie_id: movieId,
          review_text: data.review,
          rating: data.rating,
          reviewer: user?.user_id,
        }),
      });

      if (!response.ok) {
        const resJson = await response.json();
        const error = new Error(resJson.message || "Unknown error");
        (error as any).status = response.status;
        (error as any).details = resJson;
        throw error;
      }

      toast.success("Review created!");
      router.push(`/movies/${movieId}`);
    } catch (error: any) {
      if (error.status === 400) {
        toast.error(error.details.message);
      } else {
        toast.error("Error creating review");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col items-center">
        <p className="mb-2 text-gray-300">Rating:</p>
        <Controller
          control={control}
          name="rating"
          rules={{
            validate: (value) => value > 0 || "Rating required",
          }}
          render={({ field: { onChange, value } }) => (
            <Rating
              onClick={onChange}
              size={30}
              transition
              fillColor="#facc15"
              emptyColor="#4b5563"
              initialValue={value}
              SVGstyle={{ display: "inline" }}
            />
          )}
        />
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
        )}
      </div>

      {/* Campo de Texto para a Review */}
      <div>
        <label className="block mb-2 text-gray-300">Your review</label>
        <textarea
          {...register("review", { required: "Review required" })}
          rows={6}
          placeholder="..."
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        ></textarea>
        {errors.review && (
          <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
        )}
      </div>

      {/* Botão de Envio */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition"
        >
          Send review
        </button>
      </div>
    </form>
  );
}
