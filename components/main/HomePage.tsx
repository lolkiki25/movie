import { MoviesContainer } from "@/components/home";
import { MovieCarousel } from "@/components/main/";
import { movieResponseType } from "@/app/types";
import { getMoviesList } from "@/app/utils/get-data";

export async function HomePage() {
  const upcomingMovies: movieResponseType = await getMoviesList("upcoming");
  const popularMovies: movieResponseType = await getMoviesList("popular");
  const topRatedMovies: movieResponseType = await getMoviesList("top_rated");
  const nowPlayingMovies: movieResponseType = await getMoviesList(
    "now_playing"
  );

  console.log(upcomingMovies);

  return (
    <div>
      <MovieCarousel movies={nowPlayingMovies.results} />
      <MoviesContainer movies={upcomingMovies.results} title="Upcoming" />
      <MoviesContainer movies={popularMovies.results} title="Popular" />
      <MoviesContainer movies={topRatedMovies.results} title="Top Rated" />
    </div>
  );
}