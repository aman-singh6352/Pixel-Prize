import jwt from "jsonwebtoken";
import 'dotenv/config';
import User from "../model/user.model.js";

export const protectedRoute = async(req, res) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.redirect("/api/auth/login");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.redirect("/api/auth/login");

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return res.redirect("/api/auth/login");

        req.user = user;
        next();
    } catch(err) {
        console.log("Error in :: protected route middleware:", err.message);
    }
}