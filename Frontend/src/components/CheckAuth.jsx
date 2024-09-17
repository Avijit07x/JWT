import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CheckAuth = ({ children }) => {
	const location = useLocation();
	const { currentUser } = useContext(AuthContext);

	if (currentUser && location.pathname === "/") {
		return <Navigate to="/dashboard" />;
	}

	if (currentUser && location.pathname === "/login") {
		return <Navigate to="/dashboard" />;
	}

	if (currentUser && location.pathname === "/register") {
		return <Navigate to="/dashboard" />;
	}

	if (!currentUser && location.pathname === "/dashboard") {
		return <Navigate to="/login" />;
	}

	return <div>{children}</div>;
};

export default CheckAuth;
