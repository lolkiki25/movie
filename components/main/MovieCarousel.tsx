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
import { MovieType } from "@/app/types";
import { getMovieTrailers } from "@/app/utils/get-data";
import { FaStar } from "react-icons/fa";

type MovieCarouselProps = {
  movies: MovieType[];
  title: string;
  score: number;
  image: string;
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
    <>
      <Carousel setApi={setApi} className="w-screen mt-[24px] flex justify-center items-end">
        <CarouselContent>
          {movies.map((movie, index) => (
            <CarouselItem key={index}>
              <div>
                <Card className="bg-secondary p-0 overflow-hidden">
                  <CardContent className="flex aspect-video w-full overflow-hidden p-0 items-center">
                    <Image
                      src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                      alt={movie.title}
                      width={1440}
                      height={600}
                      className="object-cover rounded-lg w-full"
                    />
                    <div className="absolute ml-[140px] w-[404px] mt-10">
                      <p className="font-inter text-[16px] text-white">Now Playing:</p>
                      <span className="font-semibold text-2xl  text-white">
                        {movie.title}
                      </span>
                      <CardDescription className="flex gap-2 items-center">
                        <FaStar color="#FDE047" />
                        <span>{score}/10</span>
                      </CardDescription>
                      <p className="mt-4 text-sm opacity-90 line-clamp-3 text-white">{movie.overview}</p>
                      <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 font-medium hover:bg-gray-200 transition">
                        ▶ Watch Trailer
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-13" />
        <CarouselNext className="right-13" />
        <div className="flex gap-2 absolute p-2">
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
    </>
  );
}