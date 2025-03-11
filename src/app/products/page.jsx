import { ProductList } from "@/components/ProductList";

const ProductsPage = async () => {
  return (
    <div className="container mx-auto px-4 my-8">
      <h1>ProductsPage</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
