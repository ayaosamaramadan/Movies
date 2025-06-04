"use client";
import Image from "next/image";
import { fetchAllMovies } from "@/api/fetchapi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { nextPage, prevPage } from "@/store/movieSlice";
import { Movie } from "@/types/movietype";
import useCurrentUser from "../../hooks/useCurrentUser";
import Link from "next/link";
import axios from "axios";

const Allmovie = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.movies.page);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const { currentUser: user } = useCurrentUser();

  useEffect(() => {
    setLoading(true);
    fetchAllMovies(page)
      .then((results: Movie[]) => setMovies(results))
      .finally(() => setLoading(false));
  }, [page]);

  const handleAddToWatchlist = async (movieId: string) => {
    try {
     await axios.post("/api/fav", { movieId:movieId });
      alert("Added to watchlist!");
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to add to watchlist");
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Welcome {user?.name}! Here are the movies available:</p>

          <div className="mb-6 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-bold mb-2">Your Watchlist</h2>
            {user?.favorites && user.favorites.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {user.favorites.map((favId: string) => {
                  const favMovie = movies.find((m) => String(m.id) === favId);
                  return (
                    <li
                      key={favId}
                      className="flex items-center gap-2 px-2 py-1 bg-white rounded shadow text-sm"
                    >
                      {favMovie && (
                      <>
                        <Image
                        src={
                          favMovie.poster_path
                          ? `https://image.tmdb.org/t/p/w92${favMovie.poster_path}`
                          : "/placeholder.png"
                        }
                        alt={favMovie.title}
                        width={32}
                        height={48}
                        unoptimized
                        className="rounded"
                        />
                        <span>{favMovie.title}</span>
                      </>
                      )}
                      {!favMovie && <span>Movie ID: {favId}</span>}
                      <button className="ml-auto px-2 py-1 bg-red-500 text-white rounded text-xs">
                      X
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">No movies in your watchlist yet.</p>
            )}
          </div>

          <div className="flex justify-between mb-4">
            <button
              onClick={() => dispatch(prevPage())}
              className="border px-4 py-2 rounded cursor-pointer"
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => dispatch(nextPage())}
              className="border px-4 py-2 rounded cursor-pointer"
            >
              Next
            </button>
          </div>
          <ul className="flex flex-wrap gap-4">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="flex flex-col items-center w-40 border rounded p-2"
              >
                <Link href={`/movie/${movie.id}`}>
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
                    className="rounded"
                  />
                </Link>
                <span className="mt-2 text-center font-semibold">
                  {movie.title} ({movie.release_date})
                </span>
                <button
                  onClick={() => handleAddToWatchlist(String(movie.id))}
                  disabled={user?.favorites?.includes(movie.id)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
                >
                  {user?.favorites?.includes(movie.id)
                    ? "In Watchlist"
                    : "Add to Watchlist"}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Allmovie;
