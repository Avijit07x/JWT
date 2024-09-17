import mongoose from "mongoose";

const connections = {};

export const connectToDb = async () => {
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
