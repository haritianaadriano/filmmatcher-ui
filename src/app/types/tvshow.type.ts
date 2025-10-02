export interface TvShowApi {
  id: string;
  original_name: string;
  genres: string[];
  name: string;
  first_air_date: string;
  description: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  meta_critic: {
    score: number;
    review_count: number;
  } | null;
}

export interface TvShowDetailsApi {
  id: string;
  original_name: string;
  genres: string[];
  name: string;
  first_air_date: string;
  description: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  home_page: string;
  in_production: boolean;
  languages: string[];
  last_episode_to_air: Episode | null;
  next_episode_to_air: Episode | null;
  total_number_of_episodes: number;
  total_number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  meta_critic: MetaCritic;
}

export interface Episode {
  id: string;
  name: string;
  description: string;
  meta_critic: MetaCritic;
  air_date: string;
  episode_position_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_position_number: number;
  show_id: number;
  still_path: string;
}

export interface MetaCritic {
  score: number;
  review_count: number;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  id: string;
  air_date: string;
  episode_count: number;
  name: string;
  description: string;
  poster_path: string;
  season_position_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
