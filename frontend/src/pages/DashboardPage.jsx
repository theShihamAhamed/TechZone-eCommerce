import { PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../store/useProductStore";
import { useUserStore } from "../store/useUserStore";

const Dashboard = () => {
  const { user } = useUserStore();

  useEffect(() => {
    console.log("User dasboard:", user);
  }, [user]);

  const isSeller = user?.role === "seller";
  const isAdmin = user?.role === "admin";

  const tabs = isSeller
    ? [
        { id: "create", label: "Create Product", icon: PlusCircle },
        { id: "products", label: "Products", icon: ShoppingBasket },
      ]
    : [{ id: "products", label: "All Products", icon: ShoppingBasket }];

  const [activeTab, setActiveTab] = useState(isSeller? "create" : "products");
  const { fetchSellerProducts, fetchAllProducts} = useProductStore();

  useEffect(() => {
    if (!isSeller) return;
    fetchSellerProducts();
  }, [fetchSellerProducts, isSeller]);

  useEffect(() => {
    if (!isAdmin) return;
    fetchAllProducts();
  }, [fetchAllProducts, isAdmin]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mt-4 mb-8 text-sky-900 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {isAdmin? "Admin Dashboard" : "Seller Dashboard"}
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-sky-900 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
      </div>
    </div>
  );
};
export default Dashboard;
