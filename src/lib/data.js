"use server";

export const getProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      throw new Error("Fetch products failed");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Show product failed");
  }
};
