import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const App = () => {
	const { isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div
			className="h-screen gap-5 w-full flex
		 justify-center items-center"
		>
			<Link className="bg-green-500 p-3 text-white rounded-xl" to="/dashboard">
				Dashboard
			</Link>
			<Link className="bg-green-500 p-3 text-white rounded-xl" to="/login">
				Login
			</Link>
			<Link className="bg-green-500 p-3 text-white rounded-xl" to="/register">
				Register
			</Link>
		</div>
	);
};

export default App;
