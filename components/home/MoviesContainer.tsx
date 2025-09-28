import { MovieType } from "@/app/types";
import { MovieCard } from "./MovieCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type MoviesContainerProps = {
  movies: MovieType[];
  title: string;
  link: string;
};

export const MoviesContainer = ({ movies, title, link }: MoviesContainerProps) => {
  return (
    <div className="flex justify-center items-center mt-[52px] mb-[51px] ">
      <div>
        <div className="flex items-center mb-[36px] justify-between ">
          <h2 className="text-[24px] font-bold">{title}</h2>
          <Link className="flex items-center gap-2" href={`/more?title=${link}`}>
           <span>See more</span> <ChevronRight/>
          </Link>
        </div>
        <div className="flex gap-4 flex-wrap max-w-[1280px] justify-center items-center">
          {movies.slice(0, 10).map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
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