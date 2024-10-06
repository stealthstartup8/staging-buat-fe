import Label from "@/components/Elements/Input/label";
import UploadFile from "@/components/Elements/UploadFile";
import Input from "@/components/Elements/Input";
import Button from "@/components/Elements/Button";
import { useState } from "react";
import axios from "axios";
import { MagnifyingGlassCircleIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { MAX_FILE_SIZE } from "@/utils/constants/Constraints";
import Toast from "@/components/Elements/Toast/Toast";

const CreateWebsite = (props) => {
	const {
		setWebTitle,
		setWebDesc,
		setCustomDomain,
		setFavicon,
		onSubmit,
		customDomain,
		userToken,
		validation,
		setValidation,
		webTitle,
		loading,
	} = props;

	const [file, setFile] = useState();
	const [message, setMessage] = useState("");

	function handleChange({ file, url }) {
		// if (!e.target.files[0]) {
		// 	setOpen(!open);
		// 	return;
		// }
		// if (e.target.files[0]?.size > MAX_FILE_SIZE) {
		// 	setOpen(!open);
		// 	return false;
		// }
		setFile(url);
		setFavicon(file);
		if (webTitle != "") {
			setValidation({
				...validation,
				emptyImageOrTitle: false,
			});
		}
	}

	const checkSubDomain = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + `/access-domain/find-domain`,
				{
					domain: customDomain.replace(" ", "-"),
				},
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);

			setValidation({
				...validation,
				domainAvailable: res.data.available,
				emptyDomain: false,
			});
			if (res.data.message === "your sub domain is available.") {
				setMessage(`${customDomain}.${process.env.NEXT_PUBLIC_DOMAIN_URL} is available!`);
			} else {
				setMessage(`${customDomain}.${process.env.NEXT_PUBLIC_DOMAIN_URL} is not available!`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="grid grid-cols-1 text-black">
				<form onSubmit={onSubmit}>
					<div className="grid lg:grid-cols-1">
						<div>
							<div className="mb-0">
								<Label>Web-icon & Web Name</Label>
								<div className="flex gap-2 items-center mb-4 -mt-2">
									<UploadFile
										accept=".svg,.jpeg,.jpg,.png"
										setFavicon={setFavicon}
										handleChangeIcon={handleChange}
										icon={file}
										className={validation.emptyImageOrTitle && "border-[#F24B4B] shake"}
									/>
									<div className="w-[100%] mt-2">
										<Input
											type="text"
											name="favicon"
											placeholder="Website Title"
											className={`lg:w-[100%] min-w-[100%] px-3 py-2 border-2 rounded-sm ${
												validation.emptyImageOrTitle
													? "border-[#F24B4B] shake"
													: "border-gray-200"
											}`}
											onChange={(e) => {
												setWebTitle(e.target.value);
												if (file != undefined) {
													setValidation({
														...validation,
														emptyImageOrTitle: false,
													});
												}
											}}
										/>
									</div>
								</div>
								{validation.emptyImageOrTitle && (
									<p className="text-[12px] text-[#F24B4B] mt-[-10px] mb-4">
										Can’t leave empty
									</p>
								)}
							</div>
							<div className="mb-2">
								<Input
									type="text"
									label="Web Description"
									name="description"
									placeholder="Web Description"
									onChange={(e) => {
										setWebDesc(e.target.value);
										setValidation({
											...validation,
											emptyDesc: false,
										});
									}}
									className={`lg:w-[100%] min-w-[100%] px-3 py-2 border-2 rounded-sm ${
										validation.emptyDesc ? "border-[#F24B4B] shake" : "border-gray-200"
									}`}
								/>
								{validation.emptyDesc && (
									<p className="text-[12px] text-[#F24B4B] mt-3">Can’t leave empty</p>
								)}
							</div>
						</div>
						<div className="mt-2">
							<label htmlFor="sub-domain" className="cursor-pointer">
								Sub Domain
							</label>
							<br />
							<p className="text-[11px] text-[#767676] mt-[-5px]">
								Input & try to make your sub-domain unique.
							</p>
							<div className="flex mt-2">
								<div
									className={`flex w-full items-center px-3 py-2 border-2 rounded-sm justify-between ${
										validation.emptyDomain ? "border-[#F24B4B] shake" : "border-gray-200"
									}`}
								>
									<Input
										type="text"
										name="domain"
										placeholder="www.yourdomain.com"
										value={customDomain}
										onChange={(e) => {
											setCustomDomain(
												e.target.value
													.replace(/[^a-zA-Z\s-]/g, "")
													.replace(" ", "-")
													.toLowerCase()
											);
											setValidation({
												...validation,
												domainAvailable: undefined,
												emptyDomain: false,
											});
										}}
										className=" w-full outline-none"
									/>
									<p className="font-bold ">.varnion.tech</p>
								</div>
								<Button
									onClick={checkSubDomain}
									className="ml-2 px-3 py-[10px] bg-[#082691] text-white  rounded-md hover:bg-[#1e43c7]"
								>
									<MagnifyingGlassCircleIcon className="w-6 h-6" />
								</Button>
							</div>
							{validation.emptyDomain && (
								<p className="text-[12px] text-[#F24B4B]">Click search icon</p>
							)}
							{customDomain != "" &&
								(validation.domainAvailable == true ? (
									<p className="text-[12px] text-[#767676] mt-1 flex gap-1">
										<CheckCircleIcon className="w-4 h-4 mt-[1px] text-white bg-[#5ABA47] rounded-[50px]" />{" "}
										{message}
									</p>
								) : validation.domainAvailable == false ? (
									<p className="text-[12px] text-[#767676] mt-1 flex gap-1">
										<XCircleIcon className="w-4 h-4 mt-[1px] text-white bg-[#de1b1b] rounded-[50px]" />{" "}
										{message}
									</p>
								) : (
									""
								))}
						</div>
					</div>
					<div className="grid grid-cols-1 gap-2 mt-4">
						<div>
							<Button
								disabled={loading}
								type="submit"
								className={`hover:bg-[#1e43c7] bg-[#082691] lg:w-[100%] min-w-[100%] px-3 py-2 border-2 text-white rounded-lg mb-4 ${
									loading == true ? "bg-[#082691]/50" : "bg-[#082691] hover:bg-[#1e43c7]"
								}`}
							>
								Make Your Home Page
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
							<p className="mt-[-12px] text-[14px]">
								<b className="font-bold">Note:</b> You can always make changes later.
							</p>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateWebsite;
