"use client";
import Image from "next/image";
import { fetchAllMovies } from "@/fetchapi";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path?: string;
}

const Allmovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllMovies()
      .then((results: Movie[]) => setMovies(results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        
          <ul className="flex flex-wrap gap-4">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="flex flex-col items-center w-40 tcard tcard-bordered"
              >
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={movie.title}
                  width={100}
                  height={150}
                  unoptimized
                  className="rounded tcard-img"
                />
                <span className="mt-2 text-center tcard-title">
                  {movie.title} ({movie.release_date})
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Allmovie;
