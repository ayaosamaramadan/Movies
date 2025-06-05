"use client";
import { fetchAllMovies } from "@/api/fetchapi";
import { Movie } from "@/types/movietype";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "@/store/store";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import axios from "axios";

const Moviedetails = () => {
  const page = useSelector((state: RootState) => state.movies.page);
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams() as { id?: Movie };

   const { currentUser: user } = useCurrentUser();


  useEffect(() => {
    fetchAllMovies(page).then((results: Movie[]) => {
      const found = results.find((m) => String(m.id) === String(id));
      setMovie(found || null);
    });
  }, [page, id]);

    const handleAddToWatchlist = async (movieId: string) => {
      try {
       await axios.post("/api/favorite/add", { movieId:movieId });
        alert("Added to watchlist!");
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert("Failed to add to watchlist");
      }
    };

  return (
    <>
      {movie && (
        <div>
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "/placeholder.png"
            }
            alt={movie.title ?? "Movie poster"}
            width={100}
            height={150}
            unoptimized
          />
          <span>
            {movie.title} ({movie.release_date})
          </span>

             <button
                  onClick={() => handleAddToWatchlist(String(movie.id))}
                  disabled={user?.favorites?.includes(movie.id)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
                >
                  {user?.favorites?.includes(movie.id)
                    ? "In favorites"
                    : "Add favorites"}
                </button>
        </div>
      )}
    </>
  );
};

export default Moviedetails;
