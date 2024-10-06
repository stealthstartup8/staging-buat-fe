import Link from "next/link";
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import { useState } from "react";

const RegisterForm = (props) => {
	const {
		onSubmit = () => {},
		setEmail,
		setPassword,
		setRePassword,
		setSecretPin,
		setName,
		name,
		email,
		password,
		repassword,
		secretPin,
		loading,
		error,
		setError,
	} = props;
	const [isSame, setIsSame] = useState(false);
	const [isRegex, setIsRegex] = useState(false);
	const [isLength, setIsLength] = useState(false);
	const [isCapital, setIsCapital] = useState(false);
	const handleChangePassword = (e) => {
		setPassword(e.target.value);
		const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
		const numberRegex = /\d/;
		const capitalLetterRegex = /[A-Z]/;

		if (!specialCharacterRegex.test(e.target.value) || !numberRegex.test(e.target.value)) {
			setIsRegex(false);
		} else {
			setIsRegex(true);
		}
		if (e.target.value.length < 8) {
			setIsLength(false);
		} else {
			setIsLength(true);
		}
		if (!capitalLetterRegex.test(e.target.value)) {
			setIsCapital(false);
		} else {
			setIsCapital(true);
		}
		if (e.target.value == "" || e.target.value != repassword) {
			setIsSame(false);
		} else {
			setIsSame(true);
		}
	};
	const handleChangeRepassword = (e) => {
		setRePassword(e.target.value);
		if (e.target.value == "" || password != e.target.value) {
			setIsSame(false);
		} else {
			setIsSame(true);
		}
	};

	return (
		<div className="flex w-[100%] max-w-[100%] bg-white md:place-content-center p-4">
			<form onSubmit={onSubmit} className="login-form border border-1 border-[#DCDCDC] p-8">
				<div className="bg-gray-300 rounded-xl h-[100px] mb-4">
					{/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="221"
            height="60"
            viewBox="0 0 221 60"
            fill="none"
            className="mx-auto mt-4"
          >
            <path
              d="M166.597 59.5919C159.647 59.5919 154.401 57.4457 150.926 53.2185C147.45 48.9262 145.68 44.1787 145.68 39.0409V38.6507C145.745 33.513 147.581 28.7655 150.991 24.4081C154.401 20.1809 159.516 17.9047 166.138 17.6445C172.827 17.7096 177.745 19.7256 181.22 23.8879L181.351 24.0179C181.548 24.213 182.86 25.969 182.86 25.969C182.86 25.969 182.86 23.8228 182.86 23.4326V18.8152H193.81L207.58 39.8213C207.712 40.0815 209.154 42.1626 209.154 42.1626C209.154 42.1626 209.154 39.7563 209.154 39.3661V18.8152H220.105V58.1611H208.761L194.99 36.6997C194.859 36.4395 193.417 34.2284 193.417 34.2284C193.417 34.2284 193.417 36.7647 193.417 37.1549L193.351 58.1611H182.86V54.5192C182.86 54.194 182.86 53.1535 182.86 52.1779C182.401 52.8933 181.548 53.8038 181.351 53.9339C178.007 57.7059 173.024 59.5919 166.597 59.5919ZM166.532 26.5543C164.106 26.6193 162.073 27.6599 160.368 29.6759C158.729 31.692 157.876 34.6836 157.876 38.6507C157.876 42.6829 158.663 45.8045 160.171 47.8856C161.745 50.0968 163.909 51.2024 166.532 51.2024C169.286 51.2024 171.45 49.9668 172.892 47.6255C174.269 45.3493 174.925 42.2276 174.925 38.1955C174.925 34.6836 174.204 31.9522 172.761 30.1312C171.319 28.3102 169.745 27.1396 167.974 26.7494C167.974 26.7494 167.974 26.7494 167.909 26.7494C167.647 26.6843 167.384 26.6843 167.188 26.6193C167.056 26.6193 166.925 26.6193 166.794 26.6193C166.794 26.5543 166.663 26.5543 166.532 26.5543Z"
              fill="#243E87"
            />
            <path
              d="M145.68 12.8958C142.204 12.8958 139.385 10.0993 139.385 6.65251C139.385 3.20567 142.204 0.40918 145.68 0.40918C149.155 0.40918 151.975 3.20567 151.975 6.65251C151.975 10.0993 149.155 12.8958 145.68 12.8958Z"
              fill="#243E87"
            />
            <path
              d="M14.7309 58.2253L0.89502 18.9443H13.4194L19.78 44.568C19.8456 44.9582 20.5669 47.7547 20.5669 47.7547C20.5669 47.7547 21.3538 44.9582 21.4193 44.568L28.3045 18.9443H40.3699L26.5996 58.2253H14.7309Z"
              fill="#243E87"
            />
            <path
              d="M127.582 58.2253L113.877 36.7638C113.746 36.5037 112.303 34.4226 112.303 34.4226C112.303 34.4226 112.238 36.8289 112.238 37.2191V58.2253H101.68H100.894H88.8282C88.6315 57.1847 88.5659 56.2092 88.5003 55.2987C88.4347 54.1281 88.4347 53.0875 88.4347 52.177C88.3692 50.4211 88.238 48.9903 87.9757 47.8848C87.7134 46.5841 86.7954 45.6085 85.3528 45.0883C84.8282 44.8281 84.2381 44.6981 83.5168 44.568C82.861 44.503 82.1397 44.4379 81.484 44.4379C81.0906 44.4379 80.6971 44.4379 80.3037 44.4379C79.9758 44.4379 79.5824 44.4379 79.189 44.4379H78.9267C78.5332 44.4379 78.1398 44.4379 77.8119 44.503C77.4841 44.503 77.1562 44.503 76.8283 44.503C76.566 44.503 75.9759 44.503 75.9759 44.503C75.9759 44.503 75.9759 45.0883 75.9759 45.3484V58.1602H57.1565L56.0417 53.4777C55.9762 53.2826 55.845 52.8274 55.845 52.8274C55.845 52.8274 55.386 52.8274 55.1893 52.8274H42.0747C41.878 52.8274 41.419 52.8274 41.419 52.8274C41.419 52.8274 41.2878 53.2826 41.2878 53.4777L40.0419 58.1602H28.4355L42.2059 18.9443H54.927L62.4023 42.9421C62.5334 43.3323 64.0416 48.0799 64.0416 48.0799C64.0416 48.0799 64.0416 43.1372 64.0416 42.747V18.9443H84.1725C89.9429 19.0094 94.074 20.115 96.3035 22.1961C98.533 24.3422 99.7788 26.6835 99.8444 29.1548V29.6751C99.8444 32.0163 99.1887 34.1624 98.0084 36.1135C96.8281 37.9995 95.5822 38.975 94.2051 39.1051C93.8117 39.1701 91.5822 39.4953 91.5822 39.4953C91.5822 39.4953 93.615 40.5358 93.9428 40.7309C96.9592 42.0967 98.992 44.3729 100.041 47.4946C100.172 47.8197 101.615 51.9169 101.615 51.9169C101.615 51.9169 101.68 47.6246 101.68 47.2344V18.9443H112.631L126.336 39.9505C126.467 40.2107 127.844 42.2918 127.844 42.2918C127.844 42.2918 127.91 39.8205 127.91 39.4953L127.975 18.9443H138.926V58.2903H127.582V58.2253ZM47.7795 31.6911L43.8452 45.1533C43.7796 45.4134 43.5173 46.2589 43.5173 46.2589C43.5173 46.2589 44.3698 46.2589 44.632 46.2589H52.4352C52.6975 46.2589 53.55 46.2589 53.55 46.2589C53.55 46.2589 53.3532 45.4134 53.2877 45.1533L49.4189 31.6911C49.2877 31.3009 48.5664 29.0247 48.5664 29.0247C48.5664 29.0247 47.8451 31.3009 47.7795 31.6911ZM84.1725 36.3736C84.2381 36.3736 84.3036 36.3736 84.3692 36.3736C85.7462 36.3736 86.7954 35.9184 87.5823 35.0079C88.3692 34.0974 88.7626 33.1219 88.7626 32.0163V31.6911V31.6261C88.6315 30.5855 88.1724 29.61 87.3856 28.7646C86.5331 27.9191 85.2872 27.4639 83.7791 27.4639L76.4349 27.3988C76.2382 27.3988 75.5825 27.3988 75.5825 27.3988C75.5825 27.3988 75.5825 28.0492 75.5825 28.2443V35.5282C75.5825 35.7233 75.5825 36.3736 75.5825 36.3736C75.5825 36.3736 76.1726 36.3736 76.4349 36.3736H84.1725Z"
              fill="#243E87"
            />
            <path
              d="M150.795 18.9443H140.631V58.2903H150.795V18.9443Z"
              fill="#243E87"
            />
          </svg>
          <p className="text-center mb-4">WEB CMS</p>
          <hr className="mb-8"></hr> */}
				</div>
				<Input
					type="text"
					label="Name"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Input your name"
					className="lg:w-[24rem] min-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-sm mb-4"
				/>
				<div className="mb-4">
					<Input
						type="email"
						label="Admin Email"
						name="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setError({
								formatEmail: "",
								statusEmail: "",
							});
						}}
						placeholder="Input your email"
						className={`lg:w-[24rem] min-w-[100%] px-3 py-2 border-2 rounded-sm ${
							error.formatEmail != ""
								? `border-red-500`
								: error.statusEmail != ""
									? `border-red-500`
									: "border-gray-200"
						}`}
						required={true}
					/>
					{error.formatEmail != "" && (
						<p className="text-red-500 text-[12px] mt-1">{error.formatEmail}</p>
					)}
					{error.statusEmail != "" && (
						<p className="text-red-500 text-[12px] mt-1">Your email already registered.</p>
					)}
				</div>
				<div className="lg:flex gap-4 max-w-[100%]">
					<div className="lg:w-[50%]">
						<Input
							type="password"
							name="password"
							label="Password"
							placeholder="Password"
							value={password}
							onChange={handleChangePassword}
							className="w-[100%] lg:w-[16.5rem] max-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-sm mb-4"
						/>
					</div>
					<div className="lg:w-[50%]">
						<Input
							type="password"
							name="password"
							label="Re-Password"
							placeholder="Re-Password"
							value={repassword}
							onChange={handleChangeRepassword}
							className="w-[100%] lg:w-[16.5rem] max-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-sm mb-4"
						/>
					</div>
				</div>
				<div
					className={`w-full ${
						isSame && isLength && isRegex && isCapital
							? "bg-green-50 border-green-300"
							: "bg-red-50 border-red-300"
					}   p-5 mb-4 border-t-4 `}
				>
					<h2 className="mb-2 text-md font-semibold text-gray-900 dark:text-white">
						Password requirements:
					</h2>
					<ul className="list-disc list-inside">
						<li className={`text-[13px] ${isSame ? "text-[green]" : "text-[red]"} `}>
							Password and re-password must be the same
						</li>
						<li className={`text-[13px] ${isLength ? "text-[green]" : "text-[red]"} `}>
							Password must be minimal 8 character
						</li>
						<li className={`text-[13px] ${isRegex ? "text-[green]" : "text-[red]"} `}>
							Passwords must be a combination of numbers, letters, and special characters.
						</li>
						<li className={`text-[13px] ${isCapital ? "text-[green]" : "text-[red]"} `}>
							Password must contain at least 1 capital letter
						</li>
					</ul>
				</div>
				<div className="mb-4">
					<Input
						type="text"
						name="secretpin"
						label="Secret Pin"
						placeholder="secret pin"
						required={true}
						value={secretPin}
						onChange={(e) => {
							const input = e.target.value;
							const onlyNumbers = input.replace(/\D/g, "");
							const trimmed = onlyNumbers.slice(0, 6);
							setSecretPin(trimmed);
						}}
						className={`lg:w-[24rem] min-w-[100%] px-3 py-2 border-2 rounded-sm ${
							secretPin.length < 6 && secretPin != "" ? `border-red-500` : "border-gray-200"
						}`}
					/>
					{secretPin.length < 6 && secretPin != "" ? (
						<p className="text-red-500 text-[12px] mt-1">The secret PIN must be 6 digits long.</p>
					) : (
						""
					)}
				</div>
				<div>
					<Button
						disabled={
							(!isCapital &&
								!isLength &&
								!isRegex &&
								!isSame &&
								secretPin.length != 6 &&
								email == "" &&
								name == "") ||
							loading
						}
						type="submit"
						className={`${
							isCapital &&
							isLength &&
							isRegex &&
							isSame &&
							secretPin.length == 6 &&
							email != "" &&
							name != ""
								? "bg-[#082691]"
								: "bg-[#082691] opacity-50 pointer-events-none"
						} lg:w-[24rem] min-w-[100%] px-3 py-2  text-white rounded-sm mb-4 mt-2 ${
							loading == true ? "bg-[#082691]/50" : "bg-[#082691] hover:bg-[#1e43c7]"
						}`}
					>
						Register
						{loading == true && (
							<div
								className="ml-1 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
								role="status"
							>
								<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
									Loading...
								</span>
							</div>
						)}
					</Button>
					<hr className="mb-2"></hr>
					<p className="font-semibold text-[#082691] mb-2">Already have account?</p>
					<Link href={"/login"}>
						<Button
							type="submit"
							className="lg:w-[24rem] min-w-[100%] px-3 py-2 border-2 border-gray-200 hover:bg-gray-200 rounded-sm mb-4"
						>
							Sign In
						</Button>
					</Link>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
