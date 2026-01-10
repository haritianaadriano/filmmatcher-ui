export class GiveSavedMedia {
  saved_on: Date | null = null;
  tmdb_movie_id: string | null = null;
  tmdb_tv_show_id: string | null = null;

  constructor() {}
}

export interface SavedMovie {
  id: string;
  media_source: 'IMDB' | string;
  imdb_token: string;
  primary_title: string;
  original_title: string;
  description: string;
  image: ImageBody | null;
  start_year: number | null;
  end_year: number | null;
  release_date: string | null;
  is_adult: boolean;
  duration_seconds: number | null;
  genres: string[];
  saved_on: Date | null;
  meta_critic: MetaCriticBody | null;
}

export interface ImageBody {
  url: string;
  type: string;
}

export interface MetaCriticBody {
  score: number | null;
  review_count: number | null;
}
