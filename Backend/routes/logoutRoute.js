import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/logout", async (req, res) => {
	try {
		const token = req.cookies.session_token;

		if (!token) {
			return res.status(401).json({ error: "No token provided" });
		}

		const decoded = jwt.verify(token, process.env.TOKEN_KEY);

		if (!decoded) {
			return res.status(401).json({ error: "Invalid token" });
		}

		const user = await User.findOne({ email: decoded.user.email });

		if (user.token !== token) {
			return res.status(401).json({ error: "Invalid token" });
		}

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		// Update user's token to null
		user.token = null;
		await user.save();

		return res
			.status(200)
			.clearCookie("session_token", { httpOnly: true, path: "/" })
			.json({ message: "User logged out successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
