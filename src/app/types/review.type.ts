export interface Author {
  name: string;
  username: string;
  avatar_path: string;
  author_credibility_average: number;
}

export interface TmdbReview {
  id: string;
  author: Author;
  content: string;
  url: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  source: 'IMDB' | string; // si d'autres sources possibles, tu peux ajouter
  media_type: 'REVIEW' | string; // idem, si d'autres types media existent
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  registered_datetime: string; // ISO date string
  sex: 'M' | 'F' | string; // si d'autres valeurs possibles
  liked_genres: string[]; // ex: ["COMEDY"]
}

export interface InstantCrushReview {
  id: string;
  author: User;
  content: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  media_type: 'REVIEW' | string;
}

export interface CreateReview {
  id: string;
  author: string; // id ou username de l'auteur
  content: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  media_type: 'REVIEW' | string;
}
