import { motion } from "framer-motion";

const BannerProduct = () => {
    return (
      <motion.div
        className="px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-56 md:h-72 w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg relative">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    );
  };
  
  export default BannerProduct;
  