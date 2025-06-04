"use client";
import { fetchAllMovies } from "@/api/fetchapi";
import { Movie } from "@/types/movietype";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "@/store/store";

const Moviedetails = () => {
  const page = useSelector((state: RootState) => state.movies.page);
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams() as { id?: Movie };

  useEffect(() => {
    fetchAllMovies(page).then((results: Movie[]) => {
      const found = results.find((m) => String(m.id) === String(id));
      setMovie(found || null);
    });
  }, [page, id]);

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
        </div>
      )}
    </>
  );
};

export default Moviedetails;
