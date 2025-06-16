"use client";
import Image from "next/image";
import { fetchAllMovies } from "@/api/fetchapi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { nextPage, prevPage } from "@/store/movieSlice";
import { Movie } from "@/types/movietype";
import useCurrentUser from "../../../hooks/useCurrentUser";
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



  const handleAddToWatchlater = async (movieId: string) => {
    try {
      await axios.post("/api/watchlaterr/add", { movieId: movieId });
      alert("Added to watch later!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to add to watch later");
    }
  };
  

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
               

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
                  // onClick={() => handleAddToWatchlater(String(movie.id))}
                  disabled={user?.watchlist?.includes(movie.id)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
                >
                  {user?.watchlist?.includes(movie.id)
                    ? "In Watchlater"
                    : "Seen it"}
                </button>

                <button
                  onClick={() => handleAddToWatchlater(String(movie.id))}
                  disabled={user?.watchlist?.includes(movie.id)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
                >
                  {user?.watchlist?.includes(movie.id)
                    ? "In Watchlater"
                    : "Want to See"}
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
