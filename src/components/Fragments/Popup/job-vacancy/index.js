import Modal from "@/components/Elements/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Elements/Button";

const ValidationPopup = ({ open, setOpen }) => {
	return (
		<Modal open={open} size="xs">
			<Modal.Header>
				<div className="relative w-[100%] h-[100%] mt-2">
					<div className="flex justify-between p-0 items-center">
						<div className="absolute left-0">
							<p>Caution!</p>
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
				<div className="leading-[20px] text-[14px] font-medium mt-4 mb-2">
					<p>You need to add:</p>
					<ul className="ml-4 list-none">
						<li>1. Vacancy Category/Label/Department</li>
						<li>2. Job Name</li>
					</ul>
				</div>
				<div className="flex gap-2 w-full">
					<Button
						onClick={setOpen}
						className={`w-full px-3 py-2 text-[#000000] border border-1 border-[#000000] hover:bg-[#000000] hover:text-white rounded-md mb-2 mt-4`}
					>
						Back
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ValidationPopup;
