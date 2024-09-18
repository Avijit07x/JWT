const mongoose = require("mongoose");

const connections = {};

const connectToDb = async () => {
	try {
		if (connections.isConnected) {
			return;
		}
		const db = await mongoose.connect(process.env.MONGO_URI);
		connections.isConnected = db.connections[0].readyState;
	} catch (error) {
		console.log(error);
	}
};

module.exports = { connectToDb };
