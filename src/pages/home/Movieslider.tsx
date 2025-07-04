/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { fetchAllMovies } from "@/api/fetchapi";
import { RootState } from "@/store/store";
import { Movie } from "@/types/movietype";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import useCurrentUser from "../../../hooks/useCurrentUser";
import Link from "next/link";
import { toast } from "react-toastify";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const Movieslider = () => {
  const page = useSelector((state: RootState) => state.movies.page);
  const { currentUser: user, mutate } = useCurrentUser();

  const [, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchAllMovies(page)
      .then((results: Movie[]) => setMovies(results))
      .finally(() => setLoading(false));
  }, [page]);

  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // Function to check if a specific movie is favorite
  const isMovieFavorite = (movieId: number) => {
    return user?.favorites?.includes(String(movieId)) || false;
  };

  const handleAddToWatchlist = async (movieId: string) => {
    try {
      await axios.post("/api/favorite/add", { movieId });
      toast.success("Added to watchlist!");
      if (typeof mutate === "function") await mutate();
    } catch (error) {
      toast.error("Failed to add to watchlist. Please try again.");
    }
  };

  const handleRemoveFromWatchlist = async (movieId: string) => {
    try {
      await axios.post("/api/favorite/remove", { movieId });
      toast.success("Removed from watchlist!");
      if (typeof mutate === "function") await mutate();
    } catch (error) {
      toast.error("Failed to remove from watchlist. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mt-10 mb-[-25px] w-[90%]">
        <p className="text-2xl font-bold text-white tracking-wide [font-family:'Orbitron',sans-serif]">
          Recent Movies
        </p>

        <Link href="/movies" className="group relative">
          <span className="flex items-center gap-1 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
            <span className="text-white text-sm mr-2 mt-[-10px] group-hover:text-purple-400 transition-colors duration-300">
              see more
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white animate-bounce group-hover:text-purple-400 transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded"></span>
          </span>
        </Link>
      </div>

      <div className="flex justify-left items-center w-[93%]">
        <Slider
          ref={sliderRef}
          {...settings}
          className="mt-10 max-w-4xl w-full"
        >
          {movies.slice(0, 4).map((movie) => {
            const isFavorite = isMovieFavorite(movie.id); // Check per movie

            return (
              <div
                key={movie.id}
                className="flex flex-col items-center group relative"
              >
                <div className="relative w-[170px] h-[300px]">
                  <Link href={`/movie/${movie.id}`}>
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/placeholder.png"
                      }
                      alt={movie.title}
                      fill
                      unoptimized
                      className="cursor-pointer rounded-xl shadow-2xl object-cover"
                      priority
                    />
                  </Link>

                  <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-[#9036cc] via-[#9036ccbb] to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end items-center transition-opacity duration-300 rounded-b-xl overflow-hidden p-4 shadow-lg">
                    <p className="text-white font-semibold text-center px-2 truncate text-base w-full max-w-full break-words drop-shadow-md">
                      {movie.title}
                    </p>
                    <div className="flex justify-between items-center w-full mt-3">
                      <span className="flex items-center gap-1 text-yellow-400 text-sm font-medium bg-black/30 px-2 py-1 rounded-full shadow">
                        <IoStarSharp className="text-lg" />
                        {movie.vote_average ?? "N/A"}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          isFavorite
                            ? handleRemoveFromWatchlist(String(movie.id))
                            : handleAddToWatchlist(String(movie.id))
                        }
                        aria-label={
                          isFavorite
                            ? "Remove from watchlist"
                            : "Add to watchlist"
                        }
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        {isFavorite ? (
                          <IoIosHeart className="cursor-pointer text-red-500 text-2xl drop-shadow" />
                        ) : (
                          <IoIosHeartEmpty className="cursor-pointer text-gray-300 text-2xl drop-shadow" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default Movieslider;
