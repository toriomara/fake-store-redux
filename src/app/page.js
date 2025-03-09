import { ProductList } from "@/components/ProductList";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 my-6">
      <h1 className="flex justify-center text-4xl font-bold mb-8">
        Welcome to the Best Fake Store!
      </h1>
      <h2 className="text-2xl font-semibold text-sidebar mb-8">
        Your Shopping Just a Click Away
      </h2>
      <ProductList />
      {/* <Button>Don&rsquo;t click me now</Button> */}
    </div>
  );
}
