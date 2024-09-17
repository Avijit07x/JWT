import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const RegistrationForm = () => {
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const { username, email, password, confirmPassword } =
			Object.fromEntries(formData);

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			const res = await fetch(import.meta.env.VITE_API + "/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					email,
					password,
				}),
			});
			const data = await res.json();
			if (!data.success) {
				toast.error(data.error);
			}
			if (data.success) {
				toast.success(data.message);
				navigate("/login");
			}
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-1/2 mx-auto p-4 bg-white shadow-lg">
			<Toaster position="bottom-right" richColors />
			<h2 className="text-2xl font-bold mb-4">User Registration</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700">Username</label>
					<input
						type="text"
						name="username"
						className="w-full border border-gray-300 p-2"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Email</label>
					<input
						type="email"
						name="email"
						className="w-full border border-gray-300 p-2"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700">Password</label>
					<input
						type="password"
						name="password"
						className="w-full border border-gray-300 p-2"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-gray-700">Confirm Password</label>
					<input
						type="password"
						name="confirmPassword"
						className="w-full border border-gray-300 p-2"
					/>
				</div>

				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded w-full"
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default RegistrationForm;
