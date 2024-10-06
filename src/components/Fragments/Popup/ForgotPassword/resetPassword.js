import Input from "@/components/Elements/Input";
import Modal from "@/components/Elements/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "@/components/Elements/Button";
import ResetSuccess from "./success";
import { usePassword } from "@/utils/hooks/usePassword";

const ResetPassword = ({ open, setOpen, token, setToken }) => {
	const [loading, setLoading] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const [validateMessage, setValidateMessage] = useState({
		password: "",
		confirmPassword: "",
	});
	const { onChangePassword, onChangeConfirmPassword, handleResetPassword } = usePassword();

	return (
		<>
			<Modal open={open} size="xs">
				<Modal.Header>
					<div className="relative w-[100%] h-[100%] mt-2">
						<div className="flex justify-between p-0 items-center">
							<div className="absolute left-0">
								<p>Reset Password</p>
							</div>
							<XMarkIcon
								onClick={() => setOpen(setOpen)}
								className="ml-auto w-6 h-6 cursor-pointer hover:text-[#F24B4B]"
							/>
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<hr className="mb-2 mt-[-10px]" />
					<div className="mt-6">
						<Input
							type="password"
							label="New Password"
							name="name"
							placeholder="New Password"
							value={newPassword}
							onChange={(e) =>
								onChangePassword(
									e,
									setNewPassword,
									setValidateMessage,
									validateMessage,
									setOpenConfirmPassword
								)
							}
							className={`min-w-[100%] focus:outline-none px-3 py-2 border-2 rounded-md ${
								validateMessage.password != "" && newPassword != "" ? "border-[#F24B4B]" : ""
							}`}
						/>
						{validateMessage.password != "" && newPassword != "" && (
							<span className="text-[12px] text-[#F24B4B]">{validateMessage.password}</span>
						)}
					</div>
					<div className="mt-4">
						<Input
							type="password"
							label="New Password"
							name="name"
							placeholder="New Password"
							readOnly={!openConfirmPassword}
							value={confirmPassword}
							onChange={(e) =>
								onChangeConfirmPassword(
									e,
									setConfirmPassword,
									setValidateMessage,
									validateMessage,
									newPassword
								)
							}
							className={`min-w-[100%] focus:outline-none px-3 py-2 border-2 rounded-md ${
								openConfirmPassword == false && "opacity-50 bg-gray-200 cursor-not-allowed"
							} ${
								validateMessage.confirmPassword != "" &&
								confirmPassword != "" &&
								openConfirmPassword == true
									? "border-[#F24B4B]"
									: ""
							}`}
						/>
						{validateMessage.confirmPassword != "" &&
							confirmPassword != "" &&
							openConfirmPassword == true && (
								<span className="text-[12px] text-[#F24B4B]">
									{validateMessage.confirmPassword}
								</span>
							)}
					</div>
					<div className="flex gap-2 w-full mt-2">
						<Button
							onClick={() =>
								handleResetPassword(
									token,
									newPassword,
									confirmPassword,
									setLoading,
									setOpen,
									setSuccess,
									setConfirmPassword,
									setNewPassword,
									setToken
								)
							}
							disabled={
								loading == true ||
								validateMessage.password != "" ||
								validateMessage.confirmPassword != ""
							}
							className={`w-full px-3 py-2 text-white ${
								loading == true ||
								validateMessage.password != "" ||
								(validateMessage.confirmPassword != "") == true
									? "bg-[#082691]/50"
									: "bg-[#082691] hover:bg-[#0833cf]"
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
			<ResetSuccess open={success} setOpen={setSuccess} />
		</>
	);
};

export default ResetPassword;
