import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Logout from "../components/Logout";

const Dashboard = () => {
	const { isLoading, currentUser } = useContext(AuthContext);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!currentUser) {
		return <div>Please login</div>;
	}

	return (
		<div>
			<h1 className="text-3xl font-bold underline text-center">
				Welcome {currentUser?.email}
			</h1>
			<Logout />
		</div>
	);
};

export default Dashboard;
