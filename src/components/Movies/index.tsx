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
import Topnav from "../TopNav";
import Navbar from "../Navbar";
import { toast } from "react-toastify";

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
    window.scrollTo(0, 0);
  }, [page]);

  const handleAddToWatchlater = async (movieId: string) => {
    try {
      await axios.post("/api/watchlaterr/add", { movieId: movieId });
      toast.success("Added to watch later!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add to watch later. Please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Topnav />
          <div className="mt-32">
            <Navbar />
          </div>

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl z-30 flex justify-between items-center rounded-xl shadow-lg px-6 py-3 bg-gradient-to-r from-[#ea00ffcc] via-[#7f00d4cc] to-[#281138cc] backdrop-blur-md">
            <button
              type="button"
              onClick={() => dispatch(prevPage())}
              className="border border-blue-500 text-white font-semibold hover:bg-blue-700 hover:text-yellow-300 transition px-5 py-2 rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed bg-[#501899b3]"
              disabled={page === 1}
              title="Go to previous page"
            >
              &#8592; Previous
            </button>
            <span className="text-lg font-bold text-white tracking-wide drop-shadow mx-4">
              Page {page}
            </span>
            <button
              type="button"
              onClick={() => dispatch(nextPage())}
              className="border bg-[#501899b3] border-pink-500 text-white font-semibold hover:bg-pink-700 hover:text-yellow-300 transition px-5 py-2 rounded-lg shadow"
              title="Go to next page"
            >
              Next &#8594;
            </button>
          </div>

          <ul className="mb-36 relative flex flex-wrap gap-8 justify-center ml-4">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="flex flex-col items-center w-56 bg-[#b004ff6e] border border-yellow-700 rounded-xl shadow-lg p-4 hover:shadow-2xl transition ml-4 group"
                title={movie.title}
              >
                <Link
                  href={`/movie/${movie.id}`}
                  className="w-full flex justify-center group relative"
                  title={`View details for ${movie.title}`}
                >
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={movie.title}
                    width={160}
                    height={240}
                    unoptimized
                    className="rounded-lg object-cover shadow group-hover:scale-105 group-hover:ring-4 group-hover:ring-[#ea00ff99] transition"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer pointer-events-none w-[170px] ml-[10px] mt-[-5.5px] h-[250px] rounded-lg">
                    <svg
                      className="w-12 h-12 text-[#00fff2] drop-shadow-lg group-hover:text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </Link>
                <span
                  className="mt-4 text-center font-semibold text-gray-200 text-base line-clamp-2 group-hover:text-yellow-200 transition"
                  title={movie.title}
                >
                  {movie.title}
                </span>
                <span
                  className="text-sm text-gray-300 mb-2 group-hover:text-yellow-100 transition"
                  title={`Release date: ${movie.release_date}`}
                >
                  {movie.release_date}
                </span>
                <button
                  disabled={user?.watchlist?.includes(movie.id)}
                  className="mt-2 w-full px-3 py-1 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 hover:scale-105 hover:shadow-xl transition disabled:bg-gray-300 disabled:text-gray-500 ml-2"
                  title={
                    user?.watchlist?.includes(movie.id)
                      ? "Already in Watchlater"
                      : "Mark as seen"
                  }
                >
                  {user?.watchlist?.includes(movie.id)
                    ? "In Watchlater"
                    : "Seen it"}
                </button>
                <button
                  onClick={() => handleAddToWatchlater(String(movie.id))}
                  disabled={user?.watchlist?.includes(movie.id)}
                  className="mt-2 w-full px-3 py-1 flex items-center justify-center gap-2 border border-yellow-400 text-yellow-600 rounded-lg font-medium hover:bg-yellow-50 hover:scale-105 hover:shadow-xl transition disabled:border-gray-300 disabled:text-gray-400 ml-2"
                  title={
                    user?.watchlist?.includes(movie.id)
                      ? "Already added to Watch Later"
                      : "Add to Watch Later"
                  }
                >
                  {user?.watchlist?.includes(movie.id) ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Added
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12H9m12 0A9 9 0 11 3 12a9 9 0 0118 0z"
                        />
                      </svg>
                      Watch Later
                    </>
                  )}
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
