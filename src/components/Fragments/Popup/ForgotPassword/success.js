import Modal from "@/components/Elements/Modal";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Elements/Button";

const ResetSuccess = ({ open, setOpen }) => {
	return (
		<Modal open={open} size="xs">
			<Modal.Header>
				<div className="relative w-[100%] h-[100%] mt-2">
					<div className="flex justify-between p-0 items-center">
						<div className="absolute left-0">
							<p>Password Changed!</p>
						</div>
						<XMarkIcon
							onClick={() => setOpen(false)}
							className="ml-auto w-6 h-6 cursor-pointer hover:text-[#F24B4B]"
						/>
					</div>
				</div>
			</Modal.Header>
			<Modal.Body>
				<hr className="mb-2 mt-[-12px]" />
				<div className="text-center">
					<CheckCircleIcon className="w-40 h-40 text-[#082691] mx-auto" />
					<p className="leading-[20px] text-[14px] font-medium mt-4">
						Your password has been changed successfully. Please try to log in again!
					</p>
				</div>
				<div className="flex gap-2 w-full">
					<Button
						onClick={() => {
							setOpen(false);
						}}
						className={`w-full px-3 py-2 text-white bg-[#082691] hover:bg-[#082691] rounded-md mb-2 mt-4`}
					>
						Login
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ResetSuccess;
