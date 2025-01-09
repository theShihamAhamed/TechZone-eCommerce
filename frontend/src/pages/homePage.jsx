import CategoryList from "../components/CategoryList";
import { motion } from "framer-motion";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchFeaturedProducts, products } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <motion.div
      className="bg-gray-50 min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Banner */}
      <motion.section
        className="w-full bg-gradient-to-r from-sky-800 to-blue-700 py-16 text-white text-center "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 mt-20">Discover Your Next Favorite Product</h1>
          <p className="text-lg sm:text-xl font-medium mb-6">
            Explore a wide range of categories and featured products handpicked just for you.
          </p>
          <button className="px-6 py-3 bg-white text-sky-700 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            Shop Now
          </button>
        </div>
      </motion.section>

      {/* Category Section */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.h2
          className="text-center text-3xl sm:text-4xl font-bold text-sky-900 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore Categories
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CategoryList />
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.h2
          className="text-center text-3xl sm:text-4xl font-bold text-sky-900 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Featured Products
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
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
      </section>
    </motion.div>
  );
};

export default HomePage;
