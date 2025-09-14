"use client";
import * as React from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export function MovieCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const images = [
  "/movies/movie1.jpg",
  "/movies/movie2.jpg",
  "/movies/movie3.jpg",
  "/movies/movie4.jpg",
  "/movies/movie5.jpg",
  ];
  
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
      <Carousel setApi={setApi} className="">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div>
                <Card>
                  <CardContent className="relative flex aspect-video max-w-[1440px] max-h-[600px]  items-center justify-center p-6">
                    <Image
                      src={`/movies/movie${index + 1}.jpg`}
                      alt={`Movie ${index + 1}`}
                      fill
                      className="object-cover rounded-lg "
                    />
                    <span className="absolute text-white text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-13" />
        <CarouselNext className="right-13" />
      </Carousel>
      <div className="flex gap-2 justify-center ">
        {Array.from({ length: count }).map((_, index) => (
          <div
            onClick={() => {
              api?.scrollTo(index);
            }}
            key={index}
            className={`rounded-full size-4 ${index + 1 === current ? "bg-white" : "bg-gray-600"
              }`}
          ></div>
        ))}
      </div>
    </>
  );
}