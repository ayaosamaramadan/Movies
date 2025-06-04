"use client";
import Image from "next/image";
import { fetchAllMovies } from "@/api/fetchapi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { nextPage, prevPage } from "@/store/movieSlice";
import { Movie } from "@/types/movietype";
import useCurrentUser from "../../hooks/useCurrentUser";
import Link from "next/link";


const Allmovie = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.movies.page);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const { currentUser: user } = useCurrentUser();

  useEffect(() => {
    setLoading(true);
    fetchAllMovies(page)
      .then((results: Movie[]) => setMovies(results))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <p>
          Welcome {user?.name}! Here are the movies available:
        </p>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => dispatch(prevPage())}
              className="tbtn tbtn-outline cursor-pointer"
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => dispatch(nextPage())}
              className="tbtn tbtn-outline cursor-pointer"
            >
              Next
            </button>
          </div>
          <ul className="flex flex-wrap gap-4">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="flex flex-col items-center w-40 tcard tcard-bordered"
              >
              <Link href={`/movie/${movie.id}`} className="tcard-link">
               <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={movie.title}
                  width={100}
                  height={150}
                  unoptimized
                  className="rounded tcard-img"
                />
                </Link>
                <span className="mt-2 text-center tcard-title">
                  {movie.title} ({movie.release_date})
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Allmovie;
