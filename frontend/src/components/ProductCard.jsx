import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log("addcart", user);
    if (user === null) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <Link
      to={`/product/${product?._id}`}
      className="w-full min-w-[280px] md:min-w-[300px] max-w-[320px] bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="bg-gray-100 h-52 flex justify-center items-center rounded-t-xl overflow-hidden relative">
        <img
          src={product?.image}
          alt={product?.name}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-2 left-2 bg-sky-900 text-white text-xs px-3 py-1 rounded-full uppercase">
          {product.brand}
        </span>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-lg text-gray-900 truncate">
          {product?.name}
        </h2>
        <p className="text-2xl font-bold text-sky-900">$ {product.price}</p>
        <button
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-900 to-sky-700 px-6 py-2 text-sm font-medium text-white hover:from-sky-800 hover:to-sky-600 focus:ring-2 focus:ring-sky-500 transition-transform duration-300 transform hover:scale-105"
          onClick={(e) => handleAddToCart(e)}
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
