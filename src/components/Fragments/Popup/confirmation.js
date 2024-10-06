import Modal from "@/components/Elements/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Elements/Button";

const UpdateConfirmation = ({
	open,
	setOpen,
	handlerSubmit,
	confirmationMessage,
	header,
	confirmButton,
	loading,
}) => {
	return (
		<Modal open={open} size="xs">
			<Modal.Header>
				<div className="relative w-[100%] h-[100%] mt-2">
					<div className="flex justify-between p-0 items-center">
						<div className="absolute left-0">
							<p>{header}</p>
						</div>
						<XMarkIcon
							onClick={setOpen}
							className="ml-auto w-6 h-6 cursor-pointer hover:text-[#F24B4B]"
						/>
					</div>
				</div>
			</Modal.Header>
			<Modal.Body>
				<hr className="mb-2 mt-[-12px]" />
				<div>
					<p className="leading-[20px] text-[14px] font-medium mt-4 mb-2">{confirmationMessage}</p>
				</div>
				<div className="flex gap-2 w-full">
					<Button
						onClick={setOpen}
						className={`w-full px-3 py-2 text-[#000000] border border-1 border-[#000000] hover:bg-[#000000] hover:text-white rounded-md mb-2 mt-4`}
					>
						Back
					</Button>
					<Button
						onClick={handlerSubmit}
						disabled={loading == true ? true : false}
						className={`w-full px-3 py-2 text-white rounded-md mb-2 mt-4  ${
							loading == true ? "bg-[#082691]/50" : "bg-[#082691] hover:bg-[#042cbf]"
						}`}
					>
						{confirmButton}
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
	);
};

export default UpdateConfirmation;
