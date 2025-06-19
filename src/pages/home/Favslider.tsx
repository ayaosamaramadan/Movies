"use client";
import { fetchAllMoviesAllPages } from "@/api/fetchapi";
import { Movie } from "@/types/movietype";
import { useEffect, useRef, useState } from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
// import axios from "axios";
import Image from "next/image";
import "../../../styles/globals.css"
import Slider from "react-slick";
import Link from "next/link";

const Favslider = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  const { currentUser: user } = useCurrentUser();

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

 

   const sliderRef = useRef<Slider>(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (
    <>
 
   





    <div className="flex items-center justify-between mb-[-25px] mt-8 w-[89%]">
  <p className="text-2xl font-bold text-white tracking-wide [font-family:'Orbitron',sans-serif]">
    Your Favorites
  </p>

  

  <span className="flex items-center gap-2">
    <div className="flex flex-col justify-end pb-5 pl-40 h-full">
      <Link href="/favorite">
      <button
        className="cursor-pointer bg-[#6716a185] text-white rounded-tl-2xl rounded-br-2xl border-2 border-white px-4 py-2 font-semibold shadow transition-all duration-300 ease-in-out
        hover:bg-gradient-to-r hover:from-[#7f00d4] hover:to-[#00fff2] hover:shadow-2xl
        hover:border-[#00fff2] hover:ring-4 hover:ring-[#00fff2]/40 relative overflow-hidden group"
      >
        <span className="relative z-10">More</span>
        <span className="absolute inset-0 bg-gradient-to-br from-[#00fff2]/30 to-[#7f00d4]/30 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-tl-2xl rounded-br-2xl blur-sm"></span>
      </button>
      </Link>
    </div>

  </span>
</div>

      <div className="flex justify-left items-center w-[93%]">

        <Slider
          ref={sliderRef}
          {...settings}
          className="mt-8 w-full max-w-4xl"
        >
          {user && Array.isArray(user.favorites) && allMovies.length > 0 && user.favorites.length > 0 ? (
            user.favorites.slice(0, 4).map((favId: string) => {
              const movie = allMovies.find((m) => String(m.id) === String(favId));
              if (!movie) return null;
              return (
                <div key={movie.id} className="flex items-center justify-center px-2">
                  <div className="flex w-full max-w-md rounded-2xl bg-gradient-to-br from-[#7f00d4] via-[#9e0cff85] to-[#ab42f1] shadow-xl overflow-hidden min-h-[170px]">
                    <div className="flex-shrink-0">
                      <Image
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                            : "/placeholder.png"
                        }
                        alt={movie.title}
                        width={100}
                        height={150}
                        className="rounded-l-2xl object-cover min-h-[150px] min-w-[100px] bg-black"
                        priority
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col justify-center px-4 py-3 flex-grow min-w-0">
                      <p className="text-base font-bold tracking-wide text-white drop-shadow uppercase font-orbitron mb-1 truncate">
                        {movie.title}
                      </p>
                      <span className="text-xs text-gray-300 mb-1 truncate">
                        {movie.release_date ? `Release: ${movie.release_date}` : "Release date unknown"}
                      </span>
                      <span className="text-xs text-gray-300 mb-1 truncate">
                        {movie.original_language ? `Language: ${movie.original_language.toUpperCase()}` : ""}
                      </span>
                      <span className="text-xs text-gray-300 mb-1 truncate">
                        {movie.genre_ids && movie.genre_ids.length > 0
                          ? `Genres: ${movie.genre_ids.join(", ")}`
                          : "Genres: N/A"}
                      </span>
                      <span className="text-lg font-extrabold tracking-widest drop-shadow font-mono bg-gradient-to-r from-white via-white to-[#7f00d4] bg-clip-text text-transparent">
                        Popular <span className="text-[#00fff2]">#{movie.popularity}</span>
                      </span>
                      <span className="text-sm font-extrabold tracking-widest drop-shadow font-mono bg-gradient-to-r from-[#d3d3d3] via-white to-[#ffffff] bg-clip-text text-transparent">
                        Movies
                      </span>
                      <p className="text-xs text-white mt-2 line-clamp-2">
                        {movie.overview || "No description available."}
                      </p>
                    </div>
                    <div className="flex flex-col justify-end pr-4 pb-4">
                      <button
                        type="button"
                        className="bg-[#6716a1] text-white rounded-tl-xl rounded-br-xl border border-white px-3 py-1.5 font-semibold shadow hover:bg-[#7f00d4] text-sm transition"
                      >
                        See Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center w-full h-40">
              <p className="text-gray-400 text-lg">No movies in your watchlist yet.</p>
            </div>
          )}
        </Slider>
      </div>


    </>
  );
};

export default Favslider;
