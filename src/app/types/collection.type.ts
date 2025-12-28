export interface CollectionApi {
  id: string;
  name: string;
  title: string;
  description: string;
  genre: string;
  posters: string[];
}

export class CreateCollection {
  name: string | null = null;
  id: string | null = null;
  creation_datetime: Date | null = null;
  updated_at: Date | null = null;
  movies_id: string[] = [];
  user_id: string | null = null;
  description: string | null = null;
  genre: string | null = null;

  constructor() {}
}

export interface Collection {
  name: string | null;
  id: string | null;
  creation_datetime: Date | null;
  updated_at: Date | null;
  movies_id: string[];
  user_id: string | null;
  description: string | null;
  genre: string | null;
}
