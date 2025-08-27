// Image utilisée pour titres et personnes
export interface MediaImage {
  url: string;
  width: number;
  height: number;
  type: string;
}

// Date (année, mois, jour)
export interface SimpleDate {
  year: number;
  month: number;
  day: number;
}

// Classement (ranking, différence, direction)
export interface MeterRanking {
  currentRank: number;
  changeDirection: string;
  difference: number;
}

// Personne (directors, writers, stars)
export interface Person {
  id: string;
  displayName: string;
  alternativeNames: string[];
  primaryImage: MediaImage;
  primaryProfessions: string[];
  biography: string;
  birthName: string;
  birthDate: SimpleDate;
  birthLocation: string;
  deathDate: SimpleDate;
  deathLocation: string;
  deathReason: string;
  meterRanking: MeterRanking;
}

// Pays ou langues
export interface NamedCode {
  code: string;
  name: string;
}

// Notation IMDB
export interface Rating {
  aggregateRating: number;
  voteCount: number;
}

// Critique Metacritic
export interface Metacritic {
  url: string;
  score: number;
  reviewCount: number;
}

// Objet Title (film, série, etc.)
export interface Title {
  id: string;
  type: string;
  isAdult: boolean;
  primaryTitle: string;
  originalTitle: string;
  primaryImage: MediaImage;
  startYear: number;
  endYear: number;
  runtimeSeconds: number;
  genres: string[];
  rating: Rating;
  metacritic: Metacritic;
  plot: string;
  directors: Person[];
  writers: Person[];
  stars: Person[];
  originCountries: NamedCode[];
  spokenLanguages: NamedCode[];
}

// Racine (contient un tableau de titres)
export interface TitlesResponse {
  titles: Title[];
}
