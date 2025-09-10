
import { MovieCard } from "../components/home/MovieCard";
import { MovieCarousel } from "@/components/main";
import { mockMovies } from "@/lib/constants";

export default function Home() {
  return (
    <div>
      <MovieCarousel 
      >
      </MovieCarousel>
      <MovieCard
       title="Dear santa"
       rating={6.9}
       image="https://upload.wikimedia.org/wikipedia/en/b/bb/Dear_Santa_%282024_film%29_poster.jpg"
       >

       </MovieCard>
    </div>
  );
}