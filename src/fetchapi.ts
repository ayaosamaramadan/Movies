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