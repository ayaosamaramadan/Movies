"use client";
import { fetchMovieById, fetchMovieTrailer } from "@/api/fetchapi";
import { Movie } from "@/types/movietype";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import axios from "axios";
import Nav from "@/components/Navbar/comp/nav";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import Comments from "@/components/Comments";
import { toast } from "react-toastify";
import Topnav from "@/components/TopNav";

const Moviedetails = () => {
  const { id } = useParams() as { id?: string };
  const { currentUser: user, mutate } = useCurrentUser();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchMovieById(id).then((data) => setMovie(data));
  }, [id]);

  useEffect(() => {
    if (movie?.id) {
      fetchMovieTrailer(movie.id).then(setTrailerUrl);
    }
  }, [movie?.id]);

  useEffect(() => {
    if (user && movie) {
      setIsFavorite(user.favorites?.includes(String(movie.id)) || false);
    }
  }, [user, movie]);

  const handleAddToWatchlist = async (movieId: string) => {
    try {
      await axios.post("/api/favorite/add", { movieId });
      setIsFavorite(true);
      toast.success("Added to watchlist!");
      if (typeof mutate === "function") await mutate();
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      toast.error("Failed to add to watchlist. Please try again.");
    }
  };

  const handleRemoveFromWatchlist = async (movieId: string) => {
    try {
      await axios.delete("/api/favorite/remove", {
        data: { movieId },
      });
      setIsFavorite(false);
      toast.success("Removed from watchlist!");
      if (typeof mutate === "function") await mutate();
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      toast.error("Failed to remove from watchlist. Please try again.");
    }
  };

  return (
    <>
      <Topnav />
      <div className="z-50 fixed mt-12">
        <Nav />
      </div>

      {movie && (
        <section className="mt-24 flex flex-col md:flex-row items-start justify-center min-h-screen p-6">
          <div className="relative w-72 h-96 md:w-80 md:h-[32rem] shadow-2xl rounded-3xl overflow-hidden border-4 border-yellow-500 bg-gray-400/90 flex-shrink-0 transition-transform hover:scale-105 duration-300">
            <Image
              src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.png"
              }
              alt={movie.title ?? "Movie poster"}
              fill
              className="object-cover"
              unoptimized
              priority
            />
            <span className="absolute top-3 left-3 bg-black/80 text-yellow-300 text-xs px-3 py-1 rounded-full shadow-lg tracking-widest font-semibold border border-yellow-400">
              {movie.original_language?.toUpperCase()}
            </span>
            <span className="absolute bottom-3 right-3 bg-yellow-400 text-gray-900 text-sm px-3 py-1 rounded-full font-bold shadow-lg border border-yellow-300">
              ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-8 md:ml-16 mt-10 md:mt-0 max-w-2xl overflow-auto max-h-full rounded-3xl p-10 shadow-2xl border border-yellow-900/40 bg-gray-900/80 backdrop-blur-lg">
            {trailerUrl && (
              <div className="w-full rounded-xl overflow-hidden shadow-lg border-2 border-yellow-700 mb-6">
          <iframe
            className="w-full aspect-video"
            src={
              trailerUrl.includes("embed/")
                ? trailerUrl
                : trailerUrl.replace("watch?v=", "embed/") +
            "?autoplay=1&mute=1"
            }
            title={`${movie.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
              </div>
            )}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full">
              <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-xl tracking-tight flex-1">
          {movie.title}
              </h2>
              <div className="flex items-center gap-3 mt-2 md:mt-0">
          <button
            onClick={() =>
              isFavorite
                ? handleRemoveFromWatchlist(String(movie.id))
                : handleAddToWatchlist(String(movie.id))
            }
            aria-label={
              isFavorite ? "Remove from watchlist" : "Add to watchlist"
            }
            className="focus:outline-none transition-transform hover:scale-125 duration-200"
          >
            {isFavorite ? (
              <IoIosHeart className="text-red-500 text-3xl md:text-4xl drop-shadow" />
            ) : (
              <IoIosHeartEmpty className="text-yellow-200 text-3xl md:text-4xl drop-shadow" />
            )}
          </button>
          {movie.release_date && (
            <span className="text-base md:text-xl font-semibold text-yellow-200 bg-gray-800 px-3 py-1 rounded-lg shadow border border-yellow-400">
              {movie.release_date.slice(0, 4)}
            </span>
          )}
              </div>
            </div>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed font-medium border-l-4 border-yellow-500 pl-4 bg-gray-900/80 rounded-lg py-2 shadow-inner">
              {movie.overview?.trim() || "No description available."}
            </p>

            <div className="mt-10">
              <Comments movieId={String(movie?.id ?? "")} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Moviedetails;
