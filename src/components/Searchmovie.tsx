"use client";
import { useState, useEffect } from "react";
import { searchMovies } from "@/api/fetchapi";
import { Movie } from "@/types/movietype";
import Image from "next/image";
const Searchmovie = () => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      const movies = await searchMovies(query);
      setResults(movies);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <div>
        <div className="w-full max-w-md">
          <form
            className="flex items-center mb-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search for a movie..."
              className="input input-bordered w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
         <div className="fixed p-4 rounded-lg shadow-md mt-4">
          {loading ? (
            <span className="text-gray-400">Searching...</span>
          ) : results.length > 0 ? (
            <ul>
              {results.map((movie: Movie) => (
              <li key={movie.id} className="flex items-center mb-2">
                {movie.poster_path ? (
                <Image
                  width={92}
                  height={136}
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "/placeholder.png"}
                  alt={movie.title || "Movie poster"}
                  unoptimized
                />
                ) : (
                <div className="w-12 h-16 bg-gray-200 rounded mr-3 flex items-center justify-center text-xs text-gray-400">
                  No Image
                </div>
                )}
                <span>{movie.title}</span>
              </li>
              ))}
            </ul>
          ) : query.trim().length > 1 ? (
            <span className="text-gray-400">No results</span>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Searchmovie;
