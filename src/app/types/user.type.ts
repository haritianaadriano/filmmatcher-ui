export interface UserProfile {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  registered_datetime: string;
  sex: 'M' | 'F';
  liked_genres: string[];
}
