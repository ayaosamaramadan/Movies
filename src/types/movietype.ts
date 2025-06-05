export interface Movie {
  id: number;
  title: string;
  release_date: string;
 
  poster_path?: string;
  popularity?: number;
  overview?: string;
  original_language?: string;
  genre_ids?: string[];
  backdrop_path?: string;
  video?: boolean;
  vote_average?: number | undefined;
  vote_count?: number;
}