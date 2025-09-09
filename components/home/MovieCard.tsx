import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { FaStar } from "react-icons/fa";

interface MovieCardProps {
  title: string;
  rating: number;
  image: string;
}

export const MovieCard = ({ title, rating, image }: MovieCardProps) => {
  return (
    <Card className="w-[230px] hover:scale-105 transition-transform shadow-md">
      <CardContent className="p-0">
        <Image
          src={image}
          alt={title}
          width={230}
          height={340}
          className="object-cover rounded-t-2xl"
        />
      </CardContent>

      <CardFooter className="flex flex-col items-start p-2">
        <CardDescription className="flex items-center gap-2 text-sm">
          <FaStar color="#FDE047" />
          <span>{rating}/10</span>
        </CardDescription>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardFooter>
    </Card>
  );
};