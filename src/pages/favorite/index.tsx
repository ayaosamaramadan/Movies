"use client";
import { fetchAllMoviesAllPages } from "@/api/fetchapi";
import { Movie } from "@/types/movietype";
import { useEffect, useState } from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import "../../../styles/globals.css";
import { toast } from "react-toastify";
import Link from "next/link";
import Topnav from "@/components/TopNav";

const Favouritepage = () => {
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
      await axios.delete("/api/favorite/remove", { data: { movieId } });
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
      <div className="z-20 fixed mt-13">
        <Navbar />
      </div>
      <div className=" mb-6 mt-20 p-4 rounded">
        <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-[#7f00d4] via-[#9e0cff] to-[#00fff2] bg-clip-text text-transparent drop-shadow-lg tracking-widest uppercase font-orbitron text-center">
          Your Watchlist
        </h2>
        {user?.favorites && user.favorites.length > 0 ? (
          <div className="flex flex-col gap-8">
            {user.favorites.map((favId: string) => {
              const movie = allMovies.find(
                (m: Movie) => String(m.id) === favId
              );
              if (!movie) return null;
              return (
                <div
                  key={movie.id}
                  className="flex items-center justify-center px-2"
                >
                  <div className="flex w-full max-w-3xl rounded-3xl bg-gradient-to-br from-[#7f00d4] via-[#9e0cff85] to-[#ab42f1] shadow-2xl overflow-hidden min-h-[260px] transition-transform duration-300 hover:scale-105 hover:shadow-[0_8px_40px_10px_rgba(127,0,212,0.25)] group">
                    <div className="flex-shrink-0">
                      <Image
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/placeholder.png"
                        }
                        alt={movie.title}
                        width={180}
                        height={260}
                        className="rounded-l-3xl object-cover min-h-[260px] min-w-[180px] bg-black group-hover:brightness-110 group-hover:scale-105 transition-all duration-300"
                        priority
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col justify-center px-8 py-6 flex-grow min-w-0">
                      <p className="text-2xl font-bold tracking-wide text-white drop-shadow uppercase font-orbitron mb-2 truncate group-hover:text-[#00fff2] transition-colors duration-300">
                        {movie.title}
                      </p>
                      <span className="text-base text-gray-300 mb-2 truncate group-hover:text-white transition-colors duration-300">
                        {movie.release_date
                          ? `Release: ${movie.release_date}`
                          : "Release date unknown"}
                      </span>
                      <span className="text-base text-gray-300 mb-2 truncate group-hover:text-white transition-colors duration-300">
                        {movie.original_language
                          ? `Language: ${movie.original_language.toUpperCase()}`
                          : ""}
                      </span>
                      <span className="text-base text-gray-300 mb-2 truncate group-hover:text-white transition-colors duration-300">
                        {movie.genre_ids && movie.genre_ids.length > 0
                          ? `Genres: ${movie.genre_ids.join(", ")}`
                          : "Genres: N/A"}
                      </span>
                      <span className="text-2xl font-extrabold tracking-widest drop-shadow font-mono bg-gradient-to-r from-white via-white to-[#7f00d4] bg-clip-text text-transparent group-hover:from-[#00fff2] group-hover:to-[#7f00d4] transition-all duration-300">
                        Popular
                        <span className="text-[#00fff2]">
                          #{movie.popularity}
                        </span>
                      </span>
                      <span className="text-lg font-extrabold tracking-widest drop-shadow font-mono bg-gradient-to-r from-[#d3d3d3] via-white to-[#ffffff] bg-clip-text text-transparent group-hover:from-[#7f00d4] group-hover:to-[#00fff2] transition-all duration-300">
                        Movies
                      </span>
                      <p className="text-base text-white mt-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        {movie.overview || "No description available."}
                      </p>
                    </div>
                    <div className="flex flex-col justify-end pr-8 pb-8 gap-4">
                   <button
                        type="button"
                        className="bg-[#6716a1] text-white rounded-tl-2xl rounded-br-2xl border border-white px-0 cursor-pointer py-3 font-semibold shadow-lg hover:bg-[#7f00d4] hover:scale-105 hover:shadow-xl text-lg transition-all duration-300"
                      >   <Link
                        href={`/movie/${movie.id}`}
                     
                      
                     >
                        See Now
                      </Link>  </button>
                    
                      <button
                        onClick={() => handleRovWatchlist(String(movie.id))}
                        className="cursor-pointer bg-red-500 text-white rounded-tl-2xl rounded-br-2xl border border-white px-6 py-3 font-semibold shadow-lg hover:bg-red-600 hover:scale-105 hover:shadow-xl text-base transition-all duration-300"
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
            <div className="flex flex-col items-center mt-26">
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

export default Favouritepage;
