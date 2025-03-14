"use server";

// ADD PRODUCT
export const addProduct = async () => {
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

// EDIT PRODUCT
// export const editProductById = async (id) => {
//   try {
//     const res = await fetch(`https://fakestoreapi.com/products/${id}`);
//     if (!res.ok) {
//       throw new Error("Failed to fetch product");
//     }
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error(err);
//     throw new Error("Show product failed");
//   }
// };

// DELETE PRODUCT
// export const deleteProductById = async (id) => {
//   try {
//     const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
//       method: "DELETE",
//       headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });

//     if (!response.ok) {
//       console.log("Something went wrong");
//       // throw new Error("Failed to delete product");
//     }
//   } catch (err) {
//     console.error(err);
//     throw new Error("Failed to delete product");
//   }
// };
