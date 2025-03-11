import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({ product }) => {
  const { id, image, title, category, price } = product;

  return (
    <Card className="overflow-hidden flex-1 h-full shadow-lg hover:shadow-xl transition-shadow duration-300 p-0">
      <CardHeader className="p-0">
        <Link href={`/products/${id}`}>
          <div className="relative h-60 bg-white">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain p-4"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="grid gap-4 px-4">
        <CardTitle className="text-lg font-semibold h-12 line-clamp-2 leading-6">
          <Link href={`/products/${id}`}>{title}</Link>
        </CardTitle>
        <CardDescription className="flex justify-between mt-2 text-xl font-bold text-primary">
          ${price}
          <Badge variant="secondary" className="">
            {category}
          </Badge>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between p-4 py-6">
        <Button variant="default" className="flex-1 mr-2 text-lg font-semibold">
          Add to Cart
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
