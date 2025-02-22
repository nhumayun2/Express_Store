import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <img
        src={product.images[0].secure_url}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
        loading="lazy"
      />
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500">{product.category.name}</p>
        <p className="text-blue-600 font-bold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
