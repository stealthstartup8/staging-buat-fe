import LoginForm from "@/components/Fragments/Form/loginForm";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
	const [credentials, setCredentials] = useState({});
	const [isFail, setIsFail] = useState(false);
	const [failMessage, setFailMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleChange = (e) => {
		setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await signIn("credentials", {
				redirect: false,
				...credentials,
			});
			if (res.ok == true) {
				router.push("/");
			} else {
				setIsFail(true);
				setFailMessage(res.error);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 place-content-center h-screen">
			<div className="hidden lg:block bg-gray-300 rounded-xl">
				{/* <Image
          className="max-w-full"
          src="/login.png"
          width={1000}
          height={1000}
          priority
        /> */}
			</div>
			<div className="h-full p-2 md:p-8">
				<LoginForm
					onSubmit={handleLogin}
					onChange={handleChange}
					isFail={isFail}
					failMessage={failMessage}
					setIsFail={setIsFail}
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default Login;

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
