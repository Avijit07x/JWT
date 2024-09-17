import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
const router = express.Router();

// verify route
router.get("/verify", async (req, res) => {
	try {
		// get token from cookies
		const token = req.cookies.session_token;

		// check if token is empty
		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthorized User!" });
		}

		// verify token
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);

		// check if decoded token is empty
		if (!decoded) {
			return res.status(401).json({ success: false, error: "Invalid token" });
		}

		// check if user exists
		const verifyToken = await User.findOne({ email: decoded.user.email });

		// check if user exists
		if (!verifyToken) {
			return res.status(404).json({ success: false, error: "User not found" });
		}

		// check if token is valid
		if (verifyToken.token !== token) {
			return res.status(401).json({ success: false, error: "Invalid token" });
		}

		const user = decoded.user;

		return res
			.status(200)
			.json({ success: true, message: "User Verified!", user: user });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

export default router;
