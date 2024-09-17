import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import loginRoute from "./routes/loginRoute.js";
import logoutRoute from "./routes/logoutRoute.js";
import registerRoute from "./routes/registerRoute.js";
import verifyRoute from "./routes/verify.js";
import { connectToDb } from "./utils/connectToDb.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: ["http://localhost:5173", "https://jwt-rho-dusky.vercel.app/"],
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
await connectToDb();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// login and register routes
app.use("/auth", loginRoute);
app.use("/auth", registerRoute);
app.use("/auth", logoutRoute);
app.use("/auth", verifyRoute);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
