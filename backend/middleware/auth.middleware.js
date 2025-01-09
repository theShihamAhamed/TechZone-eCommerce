import jwt from "jsonwebtoken";
import User  from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
        } else {
            console.log("Error in verification", error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    }
};

export const adminRoute = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        return res.status(403).json({ success: false, message: "Access denied - ADMIN ONLY" });
    }
};

export const sellerRoute = (req, res, next) => {
    if(req.user && req.user.role === "seller"){
        next();
    }else{
        return res.status(403).json({ success: false, message: "Access denied - SELLER ONLY" });
    }
};

export const adminOrSellerRoute  = (req, res, next) => {
    if(req.user && (req.user.role === "seller" || req.user.role === "admin")){
        next();
    }else{
        return res.status(403).json({ success: false, message: "Access denied - Admin or Seller only" });
    }
};
