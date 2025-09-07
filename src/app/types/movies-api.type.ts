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

export interface MovieDetailsApi {
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
  };
  saved_on: string; // ISO date string
  backdrop_path: string;
  imdb_id: string;
  original_language: string;
  popularity: number;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  budget: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  video: boolean;
}
