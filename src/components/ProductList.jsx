"use client";

import { Suspense, useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Loader } from "./Loader";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products?sort=${sortOrder}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        throw new Error("Show products failed");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="">
      <Button
        className="flex place-self-end my-4"
        variant="outline"
        onClick={toggleSortOrder}
      >
        Price:{" "}
        {sortOrder === "asc" ? (
          <>
            <ArrowUpDown className="mr-2 h-4 w-4" /> <span>Low to High</span>
          </>
        ) : (
          <>
            <ArrowDownUp className="mr-2 h-4 w-4" /> <span>High to Low</span>
          </>
        )}
      </Button>
      <Suspense fallback={<Loader />}>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-y-8 md:gap-x-6">
          {products.map((item) => (
            <div key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </Suspense>
    </section>
  );
};
