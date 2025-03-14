"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getProductById } from "@/lib/data";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { addToCart } from "@/features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (!id) return;
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    console.log("CLICK!! ===>>", product.title);
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast("Success!", {
      title: "Item added",
      description: `${product.title} has been added to your cart`,
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4 my-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative bg-white rounded-xl h-[400px] border border-input shadow-md">
          <Image
            src={product.image || "/images/placeholderImage.svg"}
            alt={product.title}
            fill
            objectFit="contain"
            className="p-4"
          />
        </div>
        <div className="space-y-6">
          <Badge className="text-sm text-gray-500 uppercase">
            {product.category}
          </Badge>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-3xl font-bold text-primary">${product.price}</p>
          <p className="text-foreground">{product.description}</p>
          <div className="grid sm:flex gap-4">
            <Button variant="default" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline">Buy Now</Button>
            <Button
              variant="outline"
              // className="flex-1 sm:flex-none"
            >
              <Heart className="mr-2 h-4 w-4" /> Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
