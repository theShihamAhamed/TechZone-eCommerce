import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { motion } from "framer-motion";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";

const ProductDetailsPage = () => {
  const { productID } = useParams();
  const { getProductDetail, product, products, fetchRecommendedProducts } =
    useProductStore();

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
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getProductDetail(productID);
  }, [getProductDetail, productID]);

  useEffect(() => {
    fetchRecommendedProducts();
  }, [fetchRecommendedProducts]);

  useEffect(() => {
    console.log("rec", products);
  }, [products]);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 bg-white shadow rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={product?.image}
            alt={product?.name}
            className="rounded-lg shadow-lg h-96 w-96 object-contain cursor-pointer "
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="flex flex-col justify-center">
            <motion.p
              className="bg-sky-100 text-sky-900 px-3 py-1 rounded-full w-fit uppercase font-medium text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {product?.brand}
            </motion.p>

            <motion.h1
              className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {product?.name}
            </motion.h1>

            <motion.p
              className="text-gray-500 text-sm capitalize mt-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Category: {product?.category}
            </motion.p>

            <motion.p
              className="text-sky-900 text-lg font-semibold mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              $ {product?.price}
            </motion.p>

            <motion.div
              className="flex gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <button className="px-6 py-2 bg-sky-900 text-white rounded-lg shadow-sm hover:bg-sky-800 transition">
                Buy Now
              </button>
              <button
                className="px-6 py-2 bg-white text-sky-800 border border-sky-800 rounded-lg shadow-sm hover:bg-sky-900 hover:text-white transition"
                onClick={(e) => handleAddToCart(e)}
              >
                Add to Cart
              </button>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <h2 className="text-gray-800 text-sm font-medium mb-2">
                Description
              </h2>
              <p className="text-gray-600 text-sm">{product?.description}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <motion.h1
        className="text-center text-2xl sm:text-5xl font-bold text-sky-900 mb-4 mt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Recommended
      </motion.h1>
      <motion.div
        className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {products?.length === 0 && (
          <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
            No products found
          </h2>
        )}

        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </motion.div>
    </div>
  );
};

export default ProductDetailsPage;
