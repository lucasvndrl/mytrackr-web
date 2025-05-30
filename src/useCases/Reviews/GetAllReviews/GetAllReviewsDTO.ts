export interface GetAllReviewsDTO {
  review_id: string;
  movie_id: string;
  review_text: string;
  reviewer: string;
  rating: number;
  movie_title: string;
  reviewer_name: string;
  reviewer_avatar: string;
  review_date: Date;
}
