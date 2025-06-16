"use client";
import { fetchAllMovies, fetchMovieTrailer } from "@/api/fetchapi";
import { Movie } from "@/types/movietype";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "@/store/store";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import axios from "axios";
import Nav from "@/components/Navbar/comp/nav";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const Moviedetails = () => {
  const page = useSelector((state: RootState) => state.movies.page);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const { id } = useParams() as { id?: Movie };

  const { currentUser: user } = useCurrentUser();

  useEffect(() => {
    fetchAllMovies(page).then((results: Movie[]) => {
      const found = results.find((m) => String(m.id) === String(id));
      setMovie(found || null);
    });
  }, [page, id]);

  useEffect(() => {
    if (movie?.id) {
      fetchMovieTrailer(movie.id).then(setTrailerUrl);
    }
  }, [movie?.id]);

  const handleAddToWatchlist = async (movieId: string) => {
    try {
      await axios.post("/api/favorite/add", { movieId: movieId });
      alert("Added to watchlist!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to add to watchlist");
    }
  };

  return (
    <>
      <Nav />
      {movie && (
        <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen p-6">
          <div className="relative w-72 h-96 md:w-80 md:h-[32rem] shadow-2xl rounded-xl overflow-hidden border-4 border-gray-200">
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

            <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {movie.original_language?.toUpperCase()}
            </span>
            <span className="absolute bottom-3 right-3 bg-yellow-400 text-gray-900 text-sm px-3 py-1 rounded-full font-bold shadow">
              ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-6 md:ml-12 mt-8 md:mt-0 max-w-xl">
            {trailerUrl && (
              <div className="mt-8 w-full rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200">
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
            <h2 className="text-4xl font-extrabold text-gray-100 drop-shadow-lg flex items-center gap-3">
              {movie.title}
              {movie.release_date && (
                <span className="text-lg font-medium text-gray-300 ml-2">
                  ({movie.release_date.slice(0, 4)})
                </span>
              )}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {movie.overview?.trim() || "No description available."}
            </p>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => handleAddToWatchlist(String(movie.id))}
                disabled={!!user?.favorites?.includes(movie.id)}
                aria-label={
                  user?.favorites?.includes(movie.id)
                    ? "Remove from watchlist"
                    : "Add to watchlist"
                }
                className="focus:outline-none"
              >
                {user?.favorites?.includes(movie.id) ? (
                  <IoIosHeart className="text-red-500 text-2xl transition" />
                ) : (
                  <IoIosHeartEmpty className="text-gray-400 text-2xl transition hover:text-red-400" />
                )}
              </button>
              <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium shadow">
                ID: {movie.id}
              </span>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Moviedetails;
