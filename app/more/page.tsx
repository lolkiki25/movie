import { MovieCard } from "@/components/home";
import { movieResponseType } from "@/app/types";
import { getMoviesList } from "@/app/utils/get-data";

type MorePageProps = {
  searchParams: Promise<{ title: string }>;
};

const MorePage = async ({ searchParams }: MorePageProps) => {
  const params = await searchParams;
  const title = params.title;

  const moviesRes: movieResponseType = await getMoviesList(title);
  return (
    <div className="flex gap-4 flex-wrap">
      {moviesRes.results.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          score={movie.vote_average}
          image={movie.poster_path}
        />
      ))}
    </div>
  );
};

export default MorePage;