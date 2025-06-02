"use client";
import { fetchAllMovies } from "@/fetchapi";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path?: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllMovies()
      .then((results: Movie[]) => setMovies(results))
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
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "/placeholder.png"
                }
                alt={movie.title}
                width={100}
                height={150}
                unoptimized  />
              {movie.title} ({movie.release_date})
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
