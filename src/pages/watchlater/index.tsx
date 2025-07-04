"use client";
import { fetchAllMoviesAllPages } from "@/api/fetchapi";
import { Movie } from "@/types/movietype";
import { useEffect, useState } from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { toast } from "react-toastify";
import Topnav from "@/components/TopNav";

const Watchlatepage = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  const { currentUser: user, mutate } = useCurrentUser();

  useEffect(() => {
    const fetchAllMoviesData = async () => {
      try {
        const allMoviesData = await fetchAllMoviesAllPages();
        setAllMovies(allMoviesData);
      } catch (error) {
        console.error("Failed to fetch all movies:", error);
      }
    };

    fetchAllMoviesData();
  }, []);

  const handleRovWatchlist = async (movieId: string) => {
    try {
      await axios.delete("/api/watchlaterr/remove", { data: { movieId } });
      mutate();
    } catch (error) {
      console.error("Failed to remove from watchlist:", error);
     toast.error(
        "Failed to remove from watchlist. Please try again."
      );
    }
  };
  return (
    <>
      <Topnav />
      <div className="z-20 fixed">
        <Navbar />
      </div>
      <div className="mt-32 mx-auto max-w-4xl p-8 rounded-2xl bg-[#18122B] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-[#635985] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#00fff2]/30 via-[#7f00d4]/20 to-transparent rounded-full blur-2xl pointer-events-none" />
        <h2 className="text-4xl font-black mb-8 text-center text-[#00fff2] font-orbitron tracking-widest drop-shadow-lg flex items-center justify-center gap-4">
          <svg
            className="w-10 h-10 text-[#7f00d4] animate-spin-slow"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2a10 10 0 0 1 10 10"
            />
          </svg>
          Watchlater Vault
        </h2>
        {user?.watchlater && user.watchlater.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {user.watchlater.map((watchId: string, idx: number) => {
              const movie = allMovies.find(
                (m: Movie) => String(m.id) === watchId
              );
              if (!movie) return null;
              return (
                <div
                  key={movie.id}
                  className="relative group bg-[#393053]/80 rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden border-2 border-[#00fff2]/30 hover:border-[#7f00d4] transition"
                >
                  <div className="relative flex-shrink-0 group">
                    <div className="w-full flex justify-center mt-4 mb-2">
                      <Link
                        href={`/movie/${movie.id}`}
                        className="pointer-events-auto"
                      >
                        <Image
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "/placeholder.png"
                          }
                          alt={movie.title}
                          width={120}
                          height={180}
                          className="z-1000 object-cover min-h-[180px] min-w-[120px] bg-black"
                          priority
                          unoptimized
                        />
                      </Link>
                    </div>
                    <span className="absolute top-2 left-2 bg-[#7f00d4] text-white text-xs px-2 py-1 rounded font-bold shadow">
                      {movie.vote_average ? `★ ${movie.vote_average}` : "New"}
                    </span>
                    <span className="absolute bottom-2 left-2 bg-[#00fff2] text-[#18122B] text-xs px-2 py-1 rounded font-bold shadow">
                      #{idx + 1}
                    </span>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer pointer-events-none">
                      <svg
                        className="w-12 h-12 text-[#00fff2] drop-shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-5 flex-grow min-w-0">
                    <div>
                      <h3 className="text-xl font-bold text-[#00fff2] truncate font-orbitron mb-1">
                        {movie.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs text-[#7f00d4] font-semibold mb-2">
                        <span>
                          {movie.release_date
                            ? `Release: ${movie.release_date}`
                            : "Release date unknown"}
                        </span>
                        <span>
                          {movie.original_language
                            ? `| ${movie.original_language.toUpperCase()}`
                            : ""}
                        </span>
                        <span>
                          {movie.genre_ids && movie.genre_ids.length > 0
                            ? `| Genres: ${movie.genre_ids.join(", ")}`
                            : "| Genres: N/A"}
                        </span>
                      </div>
                      <p className="text-sm text-white/80 line-clamp-3 italic">
                        {movie.overview || "No description available."}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        className="bg-gradient-to-r from-[#00fff2] to-[#7f00d4] text-[#18122B] rounded px-4 py-2 font-bold shadow hover:from-[#7f00d4] hover:to-[#00fff2] hover:text-white hover:scale-105 transition"
                      >
                        See Now
                      </button>
                      <button
                        onClick={() => handleRovWatchlist(String(movie.id))}
                        className="bg-red-600 text-white rounded px-4 py-2 font-bold shadow hover:bg-red-800 hover:scale-105 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-16">
            <svg
              className="w-20 h-20 text-[#00fff2] mb-6 animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z"
              />
            </svg>
            <p className="text-[#00fff2] text-2xl font-bold text-center">
              No movies in your Watchlater Vault.
              <br />
              Start adding your favorites!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Watchlatepage;
