import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext.jsx";
import App from "./App.jsx";
import CheckAuth from "./components/CheckAuth.jsx";
import "./index.css";
import Dashboard from "./routes/Dashboard.jsx";
import LoginRoute from "./routes/LoginRoute.jsx";
import RegistrationRoute from "./routes/RegistrationRoute.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: (
			<CheckAuth>
				<LoginRoute />
			</CheckAuth>
		),
	},
	{
		path: "/register",
		element: (
			<CheckAuth>
				<RegistrationRoute />,
			</CheckAuth>
		),
	},
	{
		path: "/dashboard",
		element: (
			<CheckAuth>
				<Dashboard />
			</CheckAuth>
		),
	},
]);
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	</StrictMode>
);
