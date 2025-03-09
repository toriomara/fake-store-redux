"use server";

// GET ALL PRODUCTS
export const getAllProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Show products failed");
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Show product failed");
  }
};
