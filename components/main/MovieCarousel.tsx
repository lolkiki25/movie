"use client";
import * as React from "react";
import Image from "next/image";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieType, TrailerResponseType } from "@/app/types";
import { getMovieTrailers } from "@/app/utils/get-data";
import { TrailerDialog } from "../trailer/TrailerDialog";
import { FaStar } from "react-icons/fa";

type MovieCarouselProps = {
  movies: MovieType[];
  score: number;
};

export function MovieCarousel({ movies, score }: MovieCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} className="max-w-[1440px] mt-[24px] flex justify-center items-end">
      <CarouselContent>
        {movies.map((movie, index) => (
          <MovieCarouselItem key={index} movie={movie} score={score} />
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-13" />
      <CarouselNext className="right-13" />
      <div className="flex gap-2 absolute p-6">
        {Array.from({ length: count }).map((_, index) => (
          <div
            onClick={() => {
              api?.scrollTo(index);
            }}
            key={index}
            className={`rounded-full size-3 ${index + 1 === current ? "bg-white" : "bg-gray-600"
              }`}
          ></div>
        ))}
      </div>
    </Carousel>
  );
}

const MovieCarouselItem = ({ movie, score }: { movie: MovieType; score: number }) => {
  const [trailerKey, setTrailerKey] = React.useState("");

  const getTrailerData = async () => {
    const trailerData: TrailerResponseType = await getMovieTrailers(
      movie.id.toString()
    );
    const trailer = trailerData.results.find((item) => item.type === "Trailer");
    setTrailerKey(trailer?.key || "");
  };

  React.useEffect(() => {
    getTrailerData();
  }, []);

  return (
    <CarouselItem className="w-screen">
      <div>
        <Card className="bg-secondary p-0 overflow-hidden">
          <CardContent className="flex aspect-video max-h-[600px] items-center p-0 w-full">
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              width={1440}
              height={600}
              className="object-cover rounded-lg w-full"
            />
            <div className="absolute ml-[140px] mt-10 w-[404px]">
              <p className="font-inter text-[16px]">Now Playing:</p>
              <span className="text-2xl font-semibold">{movie.title}</span>
              <div className="flex items-center gap-2 mt-4">
                <FaStar color="#FDE047" />
                <span>{movie.vote_average.toFixed(1)}/10</span>
              </div>
              <p className="mt-4 text-sm opacity-90 line-clamp-3">{movie.overview}</p>
              <div className="mt-4">
                <TrailerDialog youtubeKey={trailerKey} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};