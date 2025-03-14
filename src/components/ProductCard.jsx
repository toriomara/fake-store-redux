"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";

export const ProductCard = ({ product }) => {
  const { id, image, title, category, price } = product;
  const dispatch = useDispatch();
  // console.log("Product ===>>", product);

  const handleAddToCart = () => {
    if (!product) return;
    console.log("CLICK!! ===>>", product.title);
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast("Success!", {
      title: "Item added",
      description: `${title} has been added to your cart`,
    });
  };

  return (
    <Card className="overflow-hidden flex-1 h-full shadow-lg hover:shadow-xl transition-shadow duration-300 p-0">
      <CardHeader className="p-0">
        <Link href={`/products/${id}`}>
          <div className="relative h-60 bg-white">
            <Image
              src={image || "/images/placeholderImage.svg"}
              alt={title}
              fill
              className="object-contain p-4"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="grid gap-4 px-4">
        <CardTitle className="h-14 leading-6 line-clamp-2 text-lg font-semibold">
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
        <Button
          variant="default"
          className="flex-1 mr-2 text-lg font-semibold"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
