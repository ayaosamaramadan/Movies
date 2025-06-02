"use client";
import { fetchAllMovies } from "@/fetchapi";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllMovies()
      .then((results: any[]) => setMovies(results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Movie Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.release_date})
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
