"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { movieResponseType } from "@/app/types";
import { getSearchedMovies } from "@/app/utils/get-data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export const SearchSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [foundMovies, setFoundMovies] = useState<movieResponseType | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    if (value.trim().length > 0) {
      const foundData = await getSearchedMovies(value);
      setFoundMovies(foundData);
      setIsOpen(true);
    } else {
      setFoundMovies(null);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Input
        value={searchValue}
        onChange={handleChange}
        className="pl-10 w-80 mt-6"
        placeholder="Search.."
      />
      <div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button className=""></button>
          </PopoverTrigger>
          <PopoverContent align="start" className="flex justify-center w-120">
            <div className="flex flex-col gap-3">
              {foundMovies?.results.slice(0, 5).map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  {/* Зураг + мэдээлэл */}
                  <div className="flex gap-3 items-center">
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      width={75}
                      height={100}
                      className="rounded object-cover"
                    />
                    <div className="w-70">
                      <h3 className="font-medium text-sm">{movie.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FaStar color="#FDE047" />

                        <span>{movie.vote_average.toFixed(1)}/10</span>
                      </div>
                      <div className="font-inter text-sm mt-4">
                        <span>{movie.release_date?.slice(0, 4)}</span>
                      </div>
                    </div>
                  </div>

                  {/* See more линк */}
                  <Link
                    href={`/movie/${movie.id}`}
                    className="text-blue-500 text-xs"
                  >
                    See more →
                  </Link>
                </div>
              ))}

              {/* Доод линк */}
              {foundMovies && (
                <Link
                  href={`/search?value=${searchValue}`}
                  className="text-center text-blue-600 text-sm font-medium pt-2"
                >
                  See all results for "{searchValue}"
                </Link>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
