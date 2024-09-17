import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
const Logout = () => {
	const [message, setMessage] = useState("");
	const { updateUser } = useContext(AuthContext);

	const handleLogout = async () => {
		try {
			const res = await fetch(import.meta.env.VITE_API + "/auth/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});

			if (res.ok) {
				updateUser(null);
				const data = await res.json();
				setMessage(data.message);
			}
		} catch (error) {
			console.log(error.error);
		}
	};
	return (
		<div className="flex flex-col gap-4 justify-center items-center pt-10">
			<p className="text-red-500">{message}</p>
			<button
				onClick={handleLogout}
				className="bg-red-500 text-white py-2 px-4 rounded"
			>
				Logout
			</button>
		</div>
	);
};

export default Logout;
