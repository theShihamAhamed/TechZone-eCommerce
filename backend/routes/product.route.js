import express from "express";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductDetail, getProductsByCategory, getRecommendedProducts, getSellerProducts, toggleFeaturedProduct } from "../controllers/product.controller.js";
import { adminOrSellerRoute, adminRoute, sellerRoute, verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",verifyToken, adminRoute, getAllProducts);
router.get("/sellerProducts",verifyToken, sellerRoute, getSellerProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductDetail);
router.post("/",verifyToken, sellerRoute, createProduct);
router.patch("/:id",verifyToken, adminRoute, toggleFeaturedProduct);
router.delete("/:id",verifyToken, adminOrSellerRoute, deleteProduct);

export default router;