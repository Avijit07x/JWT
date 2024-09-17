import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import RegistrationForm from "../components/RegistrationForm";

const RegistrationRoute = () => {
	const { isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<RegistrationForm />
		</div>
	);
};

export default RegistrationRoute;
