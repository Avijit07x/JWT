import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		// validate request
		const { username, email, password } = req.body;
		
		if (!(username && email && password)) {
			return res.status(400).json({ success: false, error: "All fields are required" });
		}

		// check if user already exists
		const oldUser = await User.findOne({ email });
		if (oldUser) {
			return res.status(409).json({ success: false, error: "User already exists" });
		}

		//Encrypt password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// create new user
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		// create token
		const token = jwt.sign(
			{ id: user._id, email },
			process.env.TOKEN_KEY, // Replace this with process.env.TOKEN_KEY for security in production
			{ expiresIn: "2h" }
		);

		// save user token
		user.token = token;

		// remove password
		user.password = undefined;

		// return new user
		res.status(201).json({ success: true, user, message: "User created successfully" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

export default router;
