import { MovieCard } from "@/components/home";
import { movieResponseType } from "@/app/types";
import { getMoviesList } from "@/app/utils/get-data";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"



type MorePageProps = {
  searchParams: Promise<{ title: string, page: string }>;
};

const MorePage = async ({ searchParams }: MorePageProps) => {
  const params = await searchParams;
  const title = params.title;
  const page = params.page || "1";

  const moviesRes: movieResponseType = await getMoviesList(title, page);

  const currentUrl = `/more?title=${title}&`;

  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    <div className="flex w-screen justify-center mt-[52px]">
      <div>
        <div className="pb-2 max-w-[1280px]">
           {/* Гарчиг */}
          <h1 className=" text-2xl font-bold">{formattedTitle}</h1>
          <div className="flex gap-4 flex-wrap justify-center mt-10 pb-2">
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
        </div>
        {/* Pagination */}
        <Pagination  className="pt-4 flex">
          <PaginationContent>
            {page !== "1" && (
              <>
                <PaginationItem>
                  <PaginationPrevious
                    href={`${currentUrl}page=${Number(page) - 1}`}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={`${currentUrl}page=${Number(page) - 1}`}>
                    {Number(page) - 1}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationLink isActive href="#">
                {page}
                 </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href={`${currentUrl}page=${Number(page) + 1}`}>
                {Number(page) + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={`${currentUrl}page=${Number(page) + 1}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default MorePage;