import RegisterForm from "@/components/Fragments/Form/registerForm";
import axios from "axios";
import { useState } from "react";

import { Alert } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { getSession } from "next-auth/react";
//tes
const Register = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [repassword, setRePassword] = useState("");
	const [secretPin, setSecretPin] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({
		formatEmail: "",
		statusEmail: "",
	});

	const handleRegister = async (e) => {
		e.preventDefault();

		setLoading(true);
		try {
			if (password != repassword) {
				throw new Error("Password tidak sama");
			}
			const res = await axios.post(process.env.NEXT_PUBLIC_API_KEY + `/auth/registration`, {
				email: email,
				name: name,
				password: password,
				secretPin: secretPin,
			});
			setIsOpen(true);
			setEmail("");
			setName("");
			setSecretPin("");
			setRePassword("");
			setPassword("");
			setTimeout(() => {
				window.location.href = "/login";
				setLoading(false);
			}, 1500);
		} catch (error) {
			setError({
				formatEmail: error?.response?.data?.errors?.[0].msg,
				statusEmail: error?.response?.data?.message,
			});
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
			<div className="hidden lg:inline-block mt-8 bg-gray-300 rounded-xl max-h-[90vh] img-sticky">
				{/* <Image
          className="max-w-full img-sticky"
          src="/login.png"
          width={1000}
          height={1000}
          priority
        /> */}
			</div>
			<div className="h-full p-2 md:p-8">
				{isOpen == true && (
					<Alert
						onClose={() => setIsOpen(false)}
						className="items-center fixed z-40 top-5 right-0 w-[400px] rounded-none border-l-4 border-[#039c1b] bg-[#2ec946] font-medium text-[#ffffff]"
						icon={<CheckCircleIcon className="text-[#ffffff]" width={40} />}
					>
						Registration Success!<br></br>{" "}
						<i className="text-[12px]">Please wait, We will redirect you to login page</i>
					</Alert>
				)}
				<RegisterForm
					onSubmit={handleRegister}
					setEmail={setEmail}
					name={name}
					email={email}
					password={password}
					repassword={repassword}
					secretPin={secretPin}
					setPassword={setPassword}
					setRePassword={setRePassword}
					setSecretPin={setSecretPin}
					setName={setName}
					loading={loading}
					error={error}
					setError={setError}
				/>
			</div>
		</div>
	);
};

export default Register;

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

	if (session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}
