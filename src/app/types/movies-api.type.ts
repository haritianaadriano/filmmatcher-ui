export interface MovieApi {
  id: string;
  primary_title: string;
  original_title: string;
  description: string;
  image: {
    url: string;
    type: string;
  };
  start_year: number;
  end_year: number;
  release_date: string;
  is_adult: boolean;
  duration_seconds: number;
  genres: string[];
  meta_critic: {
    score: number;
    review_count: number;
  } | null;
  saved_on: string; // ou Date si tu veux convertir en Date
}
