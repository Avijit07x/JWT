const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const registerRoute = require("./routes/registerRoute");
const verifyRoute = require("./routes/verify");
const { connectToDb } = require("./utils/connectToDb");

const app = express();
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: "https://jwt-lrb4.vercel.app",
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

connectToDb();

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
