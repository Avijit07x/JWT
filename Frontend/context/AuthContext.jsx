import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const updateUser = (data) => {
		setCurrentUser(data);
	};

	useEffect(() => {
		verifyUser();
	}, []);
	const verifyUser = async () => {
		try {
			const res = await fetch(import.meta.env.VITE_API + "/auth/verify", {
				headers: {
					"Content-Type": "application/json",
				},
				cache: "no-cache",
				credentials: "include",
			});
			const data = await res.json();
			setCurrentUser(data.user);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{ currentUser, updateUser, isLoading, verifyUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
