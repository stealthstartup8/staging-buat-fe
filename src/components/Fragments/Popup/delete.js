import Modal from "@/components/Elements/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Elements/Button";
import { useDispatch } from "react-redux";
import { deleteDataById } from "@store/job-vacancy";

const DeletePopup = ({ open, setOpen, onClick }) => {
	const dispatch = useDispatch();
	return (
		<Modal open={open} size="xs">
			<Modal.Header>
				<div className="relative w-[100%] h-[100%] mt-2">
					<div className="flex justify-between p-0 items-center">
						<div className="absolute left-0">
							<p>Delete Page</p>
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
					<p>Are you sure you want to delete the entire about page created?</p>
				</div>
				<div className="flex gap-2 w-full">
					<Button
						onClick={setOpen}
						className={`w-full px-3 py-2 text-[#000000] border border-1 border-[#000000] hover:bg-[#000000] hover:text-white rounded-md mb-2 mt-4`}
					>
						Back
					</Button>
					<Button
						onClick={onClick}
						className={`w-full px-3 py-2 text-[#ffffff] bg-[#F24B4B] border border-1 border-[#F24B4B] hover:bg-[#F24B4B]/90 hover:text-white rounded-md mb-2 mt-4`}
					>
						Delete
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default DeletePopup;
