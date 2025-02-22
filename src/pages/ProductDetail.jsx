import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductMedia from "../components/ProductMedia";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          "https://glore-bd-backend-node-mongo.vercel.app/api/product"
        );
        const productData = response.data.data.find((p) => p._id === id);
        productData ? setProduct(productData) : setError("Product not found.");
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading)
    return <div className="text-center mt-10">Loading product details...</div>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
        {product.name}
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2 space-y-6">
          <ProductMedia images={product.images} video={product.video} />
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-500 mb-2">
              <span className="font-semibold">Category:</span>{" "}
              {product.category.name}
            </p>
            <p className="text-blue-600 text-2xl font-bold mb-6">
              ${product.price}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/products")}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition flex-1 text-center"
              >
                Back to Products
              </button>
              <button className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition flex-1 text-center">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
