
import express from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getCartProducts);
router.post("/", verifyToken, addToCart);
router.delete("/", verifyToken, removeAllFromCart);
router.put("/:id", verifyToken, updateQuantity);

export default router;
