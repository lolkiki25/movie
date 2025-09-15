import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { getMovieGenres } from "@/app/utils/get-data";
import { GenreResponseType } from "@/app/types";

export async function GenreDropdown() {
  const genresResponse: GenreResponseType = await getMovieGenres();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <ChevronDown /> Genre
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="start">
        <DropdownMenuLabel className="text-2xl font-bold">
          Genres
        </DropdownMenuLabel>
        <p className="px-2">See list of movies by genre</p>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:!bg-transparent max-w-[400px] flex flex-wrap">
          {genresResponse.genres.map((genre) => (
            <Link key={genre.id} href={`/genre?id=${genre.id}&name=${genre.name}`}>
              <Badge variant="outline">
                {genre.name}
                <ChevronRight />
              </Badge>
            </Link>
          ))}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}