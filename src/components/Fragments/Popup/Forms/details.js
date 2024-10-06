import Button from "@/components/Elements/Button";
import Modal from "@/components/Elements/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import UpdateConfirmation from "../confirmation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "@/utils/hooks/useForm";
import Link from "next/link";

export const DetailsFormPopUp = ({
	open,
	handle,
	selectedBody,
	tableData,
	tableHeader,
	user_token,
	website_id,
}) => {
	const selectedItem = tableData.find((item) => item.id === selectedBody);
	const { deleteFormResponse, getImageUrl } = useForm();
	const [confirm, setConfirm] = useState(false);

	useEffect(() => {
		handle();
	}, [confirm]);
	return (
		<>
			<UpdateConfirmation
				open={confirm}
				setOpen={() => {
					setConfirm(false);
				}}
				handlerSubmit={() => deleteFormResponse(selectedItem, tableHeader, user_token, website_id)}
				confirmButton="Delete"
				header="Delete Confirmation"
				confirmationMessage="Are you sure you want to delete this data?"
			/>
			<Modal open={open} size="lg">
				<Modal.Header>
					<div className="relative w-[100%] h-[100%] mb-2">
						<div>
							<div className="absolute left-0">
								<p>Detail Form</p>
							</div>
							<div className="absolute right-0" onClick={handle}>
								<XMarkIcon className="w-5 h-5 mt-1 cursor-pointer hover:text-[#F24B4B]" />
							</div>
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<hr className="mb-2" />
					<div className="grid lg:grid-cols-2 gap-x-8 gap-y-4">
						{tableHeader.map((item, index) => (
							<div className="text-black text-[14px]" key={index}>
								<label className="font-bold uppercase">{item.label}</label>
								{selectedItem?.answer?.answers &&
								selectedItem?.answer?.answers?.[item.name] ? (
									<>
										{item.type == "images" || item.type == "document" ? (
											<div className="flex justify-between items-center">
												<p className="mt-2">
													{selectedItem?.answer?.answers?.[item.name]}
												</p>
												<Button
													onClick={() =>
														getImageUrl(
															selectedItem?.answer?.answers?.[item.name],
															selectedItem?.idCategory,
															user_token,
															website_id
														)
													}
													className="mt-2 text-[#082691] hover:text-[#1e43c7] outline-none"
												>
													View
												</Button>
											</div>
										) : (
											<p className="mt-2">
												{selectedItem?.answer?.answers?.[item.name]}
											</p>
										)}
									</>
								) : (
									<p className="mt-2">-</p>
								)}
								<hr className="mt-1" />
							</div>
						))}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex w-[100%] gap-4">
						<Button
							type="button"
							className="w-[100%] pt-1.5 pb-1.5 border border-2 bg-[#F24B4B] border-[#F24B4B] text-white hover:bg-[#bd2015] hover:border-[#bd2015] hover:text-white rounded-md"
							onClick={(e) => setConfirm(true)}
						>
							Delete
						</Button>
						<Button
							type="button"
							className="w-[100%] pt-1.5 pb-1.5 border border-2 border-[#082691] text-[#082691] hover:bg-[#082691] hover:text-white rounded-md"
							onClick={handle}
						>
							Close
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};
