const API_KEY = "83c437f23d049f7508f2cd6fc5285263";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchAllMovies(page: number = 1) {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error`);
  }

  const data = await response.json();
  return data.results;
}

export async function searchMovies(query: string) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error`);
  }

  const data = await response.json();
  return data.results;
}

export async function fetchMovieDetails(id: number) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error`);
  }

  const data = await response.json();
  return data;
}

export async function fetchAllMoviesAllPages() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allMovies: any[] = [];
  const totalPages = 100;

  for (let page = 1; page <= totalPages; page++) {
    const movies = await fetchAllMovies(page);
    allMovies.push(...movies);
  }

  return allMovies;
}

export async function fetchMovieTrailer(movieId: string | number) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch trailer");
  const data = await response.json();

  const trailer = data.results.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
  );
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}

export async function fetchMovieById(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  return await res.json();
}
