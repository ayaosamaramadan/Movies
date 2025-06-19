"use client";
import { useState, useEffect } from "react";
import { searchMovies } from "@/api/fetchapi";
import { Movie } from "@/types/movietype";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import { SiSecurityscorecard } from "react-icons/si";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaYoutube } from "react-icons/fa6";
import Link from "next/link";
const Nav = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUser: user } = useCurrentUser();

  const [score, setScore] = useState(0);

  useEffect(() => {
    if (user && user.favorites) {
      setScore(user.favorites.length);
    } else {
      setScore(0);
    }
  }, [user]);

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
      <button
        title="Logout"
        onClick={() => {
          signOut();
          console.log("Logged out");
        }}
        className="fixed bottom-4 left-3 z-50 p-3 rounded-full bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 border-2 border-white/80"
        aria-label="Logout"
      >
        <MdLogout className="text-2xl text-white drop-shadow" />
      </button>

      <div className=" flex items-center justify-between p-4 bg-[#fc9eff07] bg-opacity-80 backdrop-blur-md shadow-md fixed top-0 w-full left-0 z-50">
        <Link href="/">
          <div className="cursor-pointer flex items-center gap-3 group transition-all duration-300">
            <Image
              src="/logo.webp"
              alt="MovieApp Logo"
              width={40}
              height={40}
              className="rounded-full shadow group-hover:scale-110 group-hover:ring-4 group-hover:ring-purple-400 transition-all duration-300"
              unoptimized
            />
            <span className="text-xl font-bold text-white tracking-wide group-hover:text-purple-300 group-hover:drop-shadow-lg transition-all duration-300">
              Movies
            </span>
          </div>
        </Link>

        <div className="relative flex-1 max-w-md">
          <form
            className="flex items-center relative"
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
              <IoSearchSharp />
            </span>
            <input
              type="text"
              placeholder="Search for movie..."
              className="py-2 pl-10 pr-4 w-full rounded-full bg-[#fc9eff57] bg-opacity-80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search for movie"
            />
          </form>
          {query.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-[#f9b7ffda] bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-white text-center font-semibold drop-shadow">
                  {" "}
                  Searching ...
                </div>
              ) : results.length > 0 ? (
                <ul className="bg-gradient-to-br from-[#642c69] via-[#40174270] to-[#b7eaff] bg-opacity-80 rounded-lg shadow-lg">
                  {results.map((movie: Movie) => (
                    <li
                      key={movie.id}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-purple-100/80 transition cursor-pointer group"
                      tabIndex={0}
                      aria-label={movie.title}
                    >
                      {movie.poster_path ? (
                        <Image
                          width={40}
                          height={60}
                          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          alt={movie.title || "Movie poster"}
                          className="rounded shadow bg-gray-100"
                          unoptimized
                        />
                      ) : (
                        <div className="w-10 h-14 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="truncate font-medium text-white drop-shadow group-hover:text-black">
                          {movie.title}
                        </span>
                        {movie.release_date && (
                          <span className="text-xs text-purple-200 drop-shadow group-hover:text-black">
                            {movie.release_date}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-white text-center font-semibold drop-shadow">
                  No results
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center mr-5 gap-5">
          <SiSecurityscorecard className="text-[#39ff14] text-xl [filter:drop-shadow(0_0_6px_currentColor)_drop-shadow(0_0_12px_currentColor)]" />
          <span className="text-[#39ff14] font-bold text-lg [filter:drop-shadow(0_0_6px_currentColor)_drop-shadow(0_0_12px_currentColor)]">
            {score}
          </span>
          <FaYoutube className="text-[#ff073a] text-2xl [filter:drop-shadow(0_0_6px_currentColor)_drop-shadow(0_0_12px_currentColor)]" />
          <IoMdNotifications className="text-[#00eaff] text-2xl [filter:drop-shadow(0_0_6px_currentColor)_drop-shadow(0_0_12px_currentColor)]" />
        </div>
      </div>
    </>
  );
};

export default Nav;
