export interface Database {
  account: AccountTable;
  movies: MoviesTable;
  reviews: ReviewsTable;
}

export interface AccountTable {
  user_id: string;
  username: string;
  email: string;
  created_at: Date;
  last_login: Date;
  avatar?: string;
  favorite_genres: string[];
}

export interface MoviesTable {
  movie_id: string;
  title: string;
  synopsis: string;
  directed_by: string;
  duration: number;
  rating: number;
}

export interface ReviewsTable {
  review_id: string;
  movie_id: string;
  review_text: string;
  reviewer: string;
  rating: number;
  review_created: Date;
}
