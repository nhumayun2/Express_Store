import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const fetchProducts = async () => {
  const response = await axios.get(
    "https://glore-bd-backend-node-mongo.vercel.app/api/product"
  );
  return response.data.data;
};

const ProductList = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60000,
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading products...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load products.</p>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Product List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
