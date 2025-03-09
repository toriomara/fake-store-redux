"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getProductById } from "@/lib/data";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        <div className="relative bg-white rounded-md h-[400px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="space-y-6">
          <p className="text-sm text-gray-500 uppercase">{product.category}</p>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-3xl font-bold text-primary">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex gap-4">
            <Button variant="default">Add to Cart</Button>
            <Button variant="outline">Buy Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

{
  /* <div className="container mx-auto p-4 my-6">
      <h1 className="text-2xl font-bold mb-6">Single Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-[2fr,4fr,1fr] gap-6">
        <div className="relative bg-white rounded-lg h-96">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-bold text-primary">${product.price}</p>
        </div>

        <div className="flex flex-col space-y-4">
          <Button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
            Add to Cart
          </Button>
          <Button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors">
            Add to Wishlist
          </Button>
        </div>
      </div>
    </div> */
}
