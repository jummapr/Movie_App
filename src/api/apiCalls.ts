const apiKey: string = "201dc539e1f960ea34b0ac74d9a7592f";
export const baseImagePath = (size: string, path: string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

export const nowPayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
export const upcomingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
export const popularMovie = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

export const searchMovies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;
};
  export const movieDetails = (id: number) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  };
  export const movieCastDetails = (id: number) => {
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
  };

