import { useState } from "react";
import ResetPassword from "./resetPassword";
import Modal from "@/components/Elements/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "@/components/Elements/Input";
import Button from "@/components/Elements/Button";
import { usePassword } from "@/utils/hooks/usePassword";

const VerifyPin = ({ open, setOpen }) => {
	const [loading, setLoading] = useState(false);
	const [verified, setVerified] = useState(false);
	const [email, setEmail] = useState("");
	const [secretPin, setSecretPin] = useState("");
	const [token, setToken] = useState("");
	const [errorMessages, setErrorMessages] = useState("");

	const { handleVerify } = usePassword();

	return (
		<>
			<Modal open={open} size="xs">
				<Modal.Header>
					<div className="relative w-[100%] h-[100%] mt-2">
						<div className="flex justify-between p-0 items-center">
							<div className="absolute left-0">
								<p>Forget Password</p>
							</div>
							<XMarkIcon
								onClick={() => setOpen(false)}
								className="ml-auto w-6 h-6 cursor-pointer hover:text-[#F24B4B]"
							/>
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<hr className="mb-2 mt-[-10px]" />
					<div className="mt-6">
						<Input
							type="text"
							label="Admin Email"
							name="name"
							placeholder="Email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setErrorMessages("");
							}}
							className={`min-w-[100%] focus:outline-none px-3 py-2 border-2 rounded-md ${
								errorMessages != "" && "border-[#F24B4B]"
							}`}
						/>
					</div>
					<div className="mt-4">
						<Input
							type="text"
							label="Secret PIN"
							name="pin"
							placeholder="PIN"
							value={secretPin}
							onChange={(e) => {
								setSecretPin(e.target.value);
								setErrorMessages("");
							}}
							className={`min-w-[100%] focus:outline-none px-3 py-2 border-2 rounded-md ${
								errorMessages != "" && "border-[#F24B4B]"
							}`}
						/>
						{errorMessages != "" && (
							<span className="text-[12px] text-[#F24B4B]">{errorMessages}</span>
						)}
					</div>
					<div className="flex gap-2 w-full mt-2">
						<Button
							onClick={() => {
								handleVerify(
									email,
									secretPin,
									setToken,
									setLoading,
									setOpen,
									setVerified,
									setEmail,
									setSecretPin,
									setErrorMessages,
									setLoading
								);
							}}
							disabled={loading}
							className={`w-full px-3 py-2 text-white ${
								loading == true ? "bg-[#082691]/50" : "bg-[#082691] hover:bg-[#082691]"
							} rounded-md mb-2 mt-2`}
						>
							Reset Password
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
					</div>
				</Modal.Body>
			</Modal>
			<ResetPassword open={verified} setOpen={setVerified} token={token} setToken={setToken} />
		</>
	);
};

export default VerifyPin;
