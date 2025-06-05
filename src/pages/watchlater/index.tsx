"use client";
import { fetchAllMoviesAllPages } from "@/api/fetchapi";
import { Movie } from "@/types/movietype";
import { useEffect, useState } from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/components/Navbar";

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
      alert("Failed to remove from watchlist");
    }
  };
  return (
    <>
    <Navbar/>
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-bold mb-2">Your Watchlater</h2>
        {user?.watchlater && user.watchlater.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {user.watchlater.map((watchId: string) => {
              return (
                <li
                  key={watchId}
                  className="flex items-center gap-2 px-2 py-1 bg-white rounded shadow text-sm"
                >

                  <Image
                    src={
                      allMovies.find((m:Movie) => String(m.id) === watchId)
                        ?.poster_path
                        ? `https://image.tmdb.org/t/p/w200${
                            allMovies.find((m) => String(m.id) === watchId)
                              ?.poster_path
                          }`
                        : "/placeholder.png"
                    }
                    alt={
                      allMovies.find((m) => String(m.id) === watchId)?.title ??
                      "Movie poster"
                    }
                    width={50}
                    height={75}
                    unoptimized
                  />
                  <span className="text-blue-600 hover:underline">
                    {allMovies.find((m) => String(m.id) === watchId)?.title}
                  </span>

                  <button
                    onClick={() => handleRovWatchlist(String(watchId))}
                    className="ml-auto px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
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
    </>
  );
};

export default Watchlatepage;
