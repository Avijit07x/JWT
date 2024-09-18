const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validate request
		if (!(email && password)) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Check if password is correct
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (user && isPasswordCorrect) {
			// Create token
			const token = jwt.sign(
				{ user: { id: user._id, email } },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);

			// Save user token and remove password
			user.token = token;

			await user.save();

			user.password = undefined;
			user.token = undefined;

			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
				secure: true,
				sameSite: "Lax",
			};

			// Set cookie and return response
			return res.status(200).cookie("session_token", token, options).json({
				status: "success",
				user,
				message: "Login successful",
			});
		} else {
			return res.status(400).json({ error: "Invalid credentials" });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

module.exports = router;
