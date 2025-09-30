import Image from "next/image";
import { TrailerDialog } from "@/components/trailer/TrailerDialog";
import { TrailerResponseType, MovieType } from "@/app/types";
import { getMovieDetail, getMovieTrailers, getMovieCredits, getMovieSimilar } from "@/app/utils/get-data";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { MovieCard } from "@/components/home/MovieCard";
import { ChevronRight } from "lucide-react";
import { link } from "fs";

type DetailDynamicPageProps = {
  params: Promise<{ id: string }>;
  movies: MovieType[];
  score: number;
};

export const generateMetadata = async ({ params }: DetailDynamicPageProps) => {
  const dynamicParams = await params;
  const id = dynamicParams.id;
  const movieDetailData = await getMovieDetail(id);

  return {
    title: `MovieZ | ${movieDetailData.title}`,
  };
};

const DetailDynamicPage = async ({ params }: DetailDynamicPageProps) => {
  const dynamicParams = await params;
  const id = dynamicParams.id;
  const movieDetailData = await getMovieDetail(id);

  const trailerData: TrailerResponseType = await getMovieTrailers(id);
  const trailer = trailerData.results.find((item) => item.type === "Trailer");


  const creditsData = await getMovieCredits(id);
  const director = creditsData.crew.find((c: any) => c.job === "Director");
  const writers = creditsData.crew.filter(
    (c: any) => c.job === "Writer" || c.job === "Screenplay"
  );
  const stars = creditsData.cast.slice(0, 3);

  const similarMovies = await getMovieSimilar(id);

  return (
    <div className="flex w-screen justify-center">
      <div className="max-w-[1080px] mt-[52px]">
        {/* Киноны гарчиг */}
        <div className="flex justify-between">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{movieDetailData.title}</h1>
            <div className="text-[28px] text-gray-500 mt-1 flex gap-2">
              {/* Он, сар, өдөр */}
              <span>{new Date(movieDetailData.release_date).toISOString().slice(0, 10).replace(/-/g, ".")}</span>

              {/* Rating */}
              <span>{movieDetailData.certification || "· PG ·"}</span>

              {/* Runtime */}
              <span>
                {Math.floor(movieDetailData.runtime / 60)}h {movieDetailData.runtime % 60}m
              </span>
            </div>

          </div>
          <div className="max-w-[1080px]">
            <p className="text-xs text-gray-500">Rating:</p>
            <div className="flex gap-2">
              <div className="pt-2">
                <FaStar size={18} color="#FDE047" />
              </div>
              <div className="m-auto">
                <div className="">
                  {movieDetailData.vote_average.toFixed(1)}/10
                </div>
                <div className="ml-2 text-xs font-inter text-gray-500">
                  {Math.round(movieDetailData.vote_count * 1)}k
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Киноны зураг */}
        <div className="flex gap-2 max-w-[1080px]">
          <div>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movieDetailData.poster_path}`}
              alt={movieDetailData.title}
              width={290}
              height={428}
              className=" shadow-lg"
              priority
            />
          </div>
          <div className="relative aspect-video ml-6">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movieDetailData.backdrop_path}`}
              alt={movieDetailData.title}
              width={760}
              height={428}
              className="shadow-lg "
            />
            {/* Трейлер товч */}
            <div className="absolute inset-0 flex items-end  p-8 ">
              <TrailerDialog youtubeKey={trailer?.key} />
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-[1080px]">

          {/* Genres товчлуурууд */}
          <div className="flex flex-wrap gap-2 mt-6">
            {movieDetailData.genres?.map((genre) => (
              <button
                key={genre.id}
                className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
              >
                {genre.name}
              </button>
            ))}
          </div>
          {/* Description */}
          <p className="mt-4 text-sm opacity-90 line-clamp-3 max-w-[1080px]">
            {movieDetailData.overview}</p>
          {/* 🎬 Staff info */}
          <div className="mt-6 pt-4 text-sm">
            <div className="flex gap-6 border-b">
              <span className="font-semibold w-20">Director</span>
              <span>{director ? director.name : "Unknown"}</span>
            </div>
            <div className="flex gap-6 mt-6 border-b">
              <span className="font-semibold w-20">Writers</span>
              <span>
                {writers.length > 0
                  ? writers.map((w: any, idx: number) => (
                    <span key={w.id}>
                      {w.name}
                      {idx < writers.length - 1 && " · "}
                    </span>
                  ))
                  : "Unknown"}
              </span>
            </div>
            <div className="flex mt-6 gap-6 border-b">
              <span className="font-semibold max-w-20">Stars</span>
              <span>
                {stars.map((s: any, idx: number) => (
                  <span key={s.id}>
                    {s.name}
                    {idx < stars.length - 1 && " · "}
                  </span>
                ))}
              </span>
            </div>
            {/* 🎬 More like this */}
            <div className="mt-10 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">More like this</h2>
                <Link
                  className="flex items-center gap-2 hover:underline"
                  href={`/more?title=${link}`}>
                  <span>See more</span> <ChevronRight />
                </Link>
              </div>

              <div className="flex gap-4 mt-10">
                {similarMovies.results.slice(0, 5).map((movie: any) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    score={movie.vote_average.toFixed(1)}
                    image={movie.poster_path}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDynamicPage;