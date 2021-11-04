const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '1a4768bd62313a9ba272b58353515c76';

export const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchWithErrorHandling(url = '', config = {}) {
    const response = await fetch(url, config);
    return response.ok
        ? await response.json()
        : Promise.reject(new Error('Not Found'));
}

export function fetchTrendingMovies() {
    return fetchWithErrorHandling(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
    );
}

export function fetchMoviesByName(name) {
    return fetchWithErrorHandling(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${name}&language=en-US&page=1&include_adult=false`,
    );
}

export function fetchMovieDetails(id) {
    return fetchWithErrorHandling(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieCast(id) {
    return fetchWithErrorHandling(
        `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    );
}

export function fetchMovieReviews(id) {
    return fetchWithErrorHandling(
        `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`,
    );
}