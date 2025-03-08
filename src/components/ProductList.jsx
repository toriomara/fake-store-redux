"use server";
import React from "react";
import { ProductCard } from "./ProductCard";
import { getProducts } from "@/lib/data";

export const ProductList = async () => {
  const products = await getProducts();
  return (
    <div className="container mx-auto px-4 py-6">
      <div>
        {products.map((item) => (
          <div key={item.id} className="">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};
