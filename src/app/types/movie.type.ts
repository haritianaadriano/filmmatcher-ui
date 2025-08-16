export type Movie = {
  id: string;
  title: string;
  primary_title: string;
  original_title: string;
  description: string;
  image: {
    url: string;
    type: string;
  };
  start_year: number;
  end_year: number;
  duration_seconds: number;
  genres: string[];
  meta_critic: {
    scrore: number;
    review_count: number;
  };
};
