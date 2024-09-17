import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
	const { updateUser, isLoading } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const { email, password } = Object.fromEntries(formData);

		try {
			const res = await fetch(import.meta.env.VITE_API + "/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await res.json();
			if (!res.ok) {
				toast.error(data.error);
				return;
			}
			updateUser(data.user);
			toast.success(data.message);
		} catch (error) {
			console.log(error);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex items-center justify-center w-full">
			<Toaster position="bottom-right" richColors />
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center mb-6">Login</h2>

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
