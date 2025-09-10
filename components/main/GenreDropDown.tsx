import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

const GENRES = [
  {
    name: "Action",
  },
  {
    name: "Adventure",
  },
  {
    name: "Comedy",
  },
  {
    name: "Horror",
  },
  {
    name: "Sci-fi",
  },
];

export function GenreDropdown() {
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
        <DropdownMenuItem className="hover:!bg-transparent">
          {GENRES.map((genre) => (
            <Link href="/genre">
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
