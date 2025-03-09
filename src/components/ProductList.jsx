"use server";

import React from "react";
import { ProductCard } from "./ProductCard";
import { getAllProducts } from "@/lib/data";

export const ProductList = async () => {
  const products = await getAllProducts();
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-y-8 md:gap-x-6">
      {products.map((item) => (
        <div key={item.id} className="">
          <ProductCard product={item} />
        </div>
      ))}
    </div>
  );
};
