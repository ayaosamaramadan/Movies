"use client";
import { fetchAllMovies } from "@/api/fetchapi";
import { RootState } from "@/store/store";
import { Movie } from "@/types/movietype";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import { FaRegHeart } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Link from "next/link";
import { toast } from "react-toastify";

const Movieslider = () => {
  const page = useSelector((state: RootState) => state.movies.page);

  const { currentUser: user } = useCurrentUser();

  const [, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchAllMovies(page)
      .then((results: Movie[]) => setMovies(results))
      .finally(() => setLoading(false));
  }, [page]);
  const sliderRef = useRef<Slider>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

    const handleAddToWatchlist = async (movieId: string) => {
      try {
       await axios.post("/api/favorite/add", { movieId:movieId });
        toast.success("Added to watchlist!");
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to add to watchlist. Please try again.");
      }
    };
  return (
    <>
    <div className="flex items-center justify-between mt-10 mb-[-25px] w-[90%]">
  <p className="text-2xl font-bold text-white tracking-wide [font-family:'Orbitron',sans-serif]">
    Recent Movies
  </p>

  

<Link
  href="/movies"
  className="group relative"
>
  <span className="flex items-center gap-1 transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-1">
    <span className="text-white text-sm mr-2 mt-[-10px] group-hover:text-purple-400 transition-colors duration-300">see more</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white animate-bounce group-hover:text-purple-400 transition-colors duration-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
          {movies.slice(0, 4).map((movie) => (
            <div key={movie.id} className="flex flex-col items-center group relative">
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
                  {/* Hover overlay */}
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#9036ccbd] bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300 rounded-b-xl overflow-hidden">
                    <p className="text-white font-bold text-center px-4 truncate text-base w-full max-w-full break-words">{movie.title}</p>
                    <div className="flex gap-3 mt-4">
                      <p className="text-yellow-400 flex text-sm mt-1">
                        <IoStarSharp className="text-yellow-400 text-xl" />
                        {movie.vote_average ?? "N/A"}
                      </p>
                      <button
                        onClick={() => handleAddToWatchlist(String(movie.id))}
                        disabled={user?.favorites?.includes(movie.id)}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
                      >
                        {user?.favorites?.includes(movie.id)
                          ? <FaHeart className="text-red-500" />
                          : <FaRegHeart className="text-white" />}
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Movieslider;
