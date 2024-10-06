import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import Modal from "@/components/Elements/Modal";

const PagesEditPopup = ({ open, newNamePage, setNewNamePage, setOpen, updatPage, loading }) => {
	return (
		<Modal open={open} size="xs">
			<Modal.Header>
				<div className="relative w-[100%] h-[100%] mb-2">
					<div>
						<div className="absolute left-0">
							<p>Edit Page</p>
						</div>
					</div>
				</div>
			</Modal.Header>
			<Modal.Body>
				<hr className="mb-2" />
				<p className="text-sm text-black leading-5 mb-6 mt-4">
					Are you sure you want to change information about this page?
				</p>
				<Input
					type="text"
					label="Input your new page name"
					name="name"
					placeholder="Name page..."
					value={newNamePage}
					onChange={(e) => setNewNamePage(e.target.value.replace(" ", "-").toLowerCase())}
					className={`min-w-[100%] focus:outline-none px-3 py-2 border-2 rounded-md`}
				/>
				<div className="flex gap-2 w-full mt-2">
					<Button
						onClick={(e) => {
							setOpen(false);
							setNewNamePage("");
						}}
						className="w-full px-3 py-2 border border-1 border-[#333] text-[#333] hover:bg-[#333] hover:text-white rounded-md mb-2 mt-2"
					>
						Back
					</Button>
					<Button
						onClick={updatPage}
						disabled={newNamePage.length > 2 || loading == true ? false : true}
						className={`w-full px-3 py-2 text-white ${
							newNamePage.length > 2 || loading == true
								? "bg-[#082691]/90 hover:bg-[#082691]"
								: "bg-[#082691]/50"
						} rounded-md mb-2 mt-2`}
					>
						Update
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

export default PagesEditPopup;
