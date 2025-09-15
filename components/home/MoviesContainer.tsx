import { MovieType } from "@/app/types";
import { MovieCard } from "./MovieCard";

type MoviesContainerProps = {
  movies: MovieType[];
  title: string;
};

export const MoviesContainer = ({ movies, title }: MoviesContainerProps) => {
  return (
    <div className="flex justify-center items-center mt-[52px] mb-[51px]">
      <div>
        <h2 className="text-[24px] font-bold mb-[36px]">{title}</h2>
        <div className="flex gap-4 flex-wrap max-w-[1280px] justify-center items-center">
          {movies.slice(0, 10).map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              score={movie.vote_average}
              image={movie.poster_path}
             />
          ))}
        </div>
      </div>
    </div>
  );
};