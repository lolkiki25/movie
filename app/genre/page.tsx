import { MovieCard } from "@/components/home";
import { movieResponseType } from "@/app/types";
import { getMoviesByGenreId } from "@/app/utils/get-data";
import { GenreDropdown } from "@/components";


type GenrePageProps = {
  searchParams: Promise<{ id: string; name: string; page: string }>;
};

const Genre = async ({ searchParams }: GenrePageProps) => {
  const params = await searchParams;
  const id = params.id;
  const name = params.name;
  const page = params.page || "1";

  const filteredMoviesResponse: movieResponseType = await getMoviesByGenreId(
    id,
    page
  );
  console.log("FILTERDSEN KINONUUD", filteredMoviesResponse);
  return (
    <div className="flex pt-30 pb-36 justify-center w-full m-auto">
      <div>
        
      </div>
      <div className="flex flex-wrap gap-3 max-w-[1280px] justify-center items-center">
        {filteredMoviesResponse.results.slice(0, 10).map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            score={movie.vote_average}
            image={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default Genre;