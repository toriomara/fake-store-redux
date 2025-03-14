import { AmazonStyleCarousel } from "@/components/AmazonStyleCarousel";
import { ProductList } from "@/components/ProductList";

const ProductsPage = async () => {
  return (
    <div>
      <div className="page-container">
        <h1 className="text-5xl font-bold mb-6 text-center">Products Page</h1>
      </div>
      <AmazonStyleCarousel />
      <div className="page-container">
        <div className="relative -top-60">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
