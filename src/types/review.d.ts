export type Review = {
  review_id: string;
  movie_id: string;
  review_text: string;
  reviewer: string;
  rating: number;
  movie_poster: ImageSourcePropType;
  movie_title: string;
  reviewer_name: string;
  reviewer_avatar: SupabaseBuffer;
  review_date?: string;
};

type SupabaseBuffer = { type: "Buffer"; data: number[] };
