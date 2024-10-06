import Button from "@/components/Elements/Button";
import { ArrowUpCircleIcon, ArrowDownCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Input from "@/components/Elements/Input";
import { useSelector, useDispatch } from "react-redux";
import {
	addLogo,
	addSubInformation,
	changeAbout,
	changeFooterNote,
	changeInformation,
	changeInformationType,
	changeTitle,
	deleteSubInformation,
} from "@store/footer/informationSlice";
import { useState } from "react";
import UploadFileBigPreview from "@/components/Elements/UploadFile/BigPreview";
import axios from "axios";

const InformationFooterSection = ({ user_token }) => {
	const dispatch = useDispatch();
	const information = useSelector((state) => state.persistedReducer.informationFooterSlice);
	const [logo, setLogo] = useState(information.item.logo == "" ? false : true);

	const handleChangeTitle = (title) => {
		dispatch(
			changeTitle({
				title: title,
			})
		);
	};

	const handleChangeAbout = (about) => {
		dispatch(
			changeAbout({
				about: about,
			})
		);
	};

	const handleAddInformation = () => {
		dispatch(
			addSubInformation({
				id: null,
				information_type: "",
				information: "",
			})
		);
	};

	const handleDeleteSubInformation = async (index) => {
		if (information.item.information[index].id != null) {
			const deleteSubInformation = await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					`/information-component/` +
					information.item.information[index].id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}
		dispatch(
			deleteSubInformation({
				index: index,
			})
		);
	};

	const handleInformationType = (index, value) => {
		dispatch(
			changeInformationType({
				index: index,
				information_type: value,
			})
		);
	};

	const handleInformation = (index, value) => {
		dispatch(
			changeInformation({
				index: index,
				information: value,
			})
		);
	};

	function handleSetFile({ file, url }) {
		dispatch(
			addLogo({
				logo: url,
				logo_file: file,
			})
		);
	}

	return (
		<div className="overflow-y-auto content-scrollbar mt-4 pr-1 ">
			<h2 className="mb-2">
				<b>Information</b>
			</h2>
			<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
				<div className="p-2">
					<div className="flex">
						<Input
							type={"checkbox"}
							className="mr-2"
							checked={logo}
							onChange={(e) => {
								setLogo(!logo);
								if (logo == true) {
									dispatch(
										addLogo({
											logo: "",
										})
									);
								}
							}}
						/>{" "}
						<h2 className="">Logo Image</h2>
					</div>
					{logo == true ? (
						<div className="mt-4">
							<UploadFileBigPreview
								accept={".svg,.jpeg,.jpg,.png,.gif"}
								file={information.item.logo}
								handleSetFile={(image) => handleSetFile(image)}
								removeFile={(e) => {
									e.stopPropagation();
									if (logo == true) {
										dispatch(
											addLogo({
												logo: "",
											})
										);
									}
								}}
							/>
							<hr className="border-[#C8CDD0]"></hr>
						</div>
					) : (
						""
					)}
				</div>
				<div className="p-2">
					<h2 className="mb-2 ">Title</h2>
					<Input
						onChange={(e) => handleChangeTitle(e.target.value)}
						value={information.item.title}
						placeholder="Input Title"
						className="w-[100%] border border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
					/>
				</div>
				<div className="p-2">
					<h2 className="mb-2 ">About</h2>
					<textarea
						onChange={(e) => handleChangeAbout(e.target.value)}
						value={information.item.about}
						placeholder="Input Text"
						className="w-[100%] border border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
					/>
				</div>
				<div className="p-2">
					<h2 className="mb-2 ">Footer Note</h2>
					<textarea
						onChange={(e) => {
							dispatch(
								changeFooterNote({
									footer_note: e.target.value,
								})
							);
						}}
						value={information.item.footer_note}
						placeholder="Input Text"
						className="w-[100%] border border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
					/>
				</div>

				{information.item.information.length > 0 ? (
					<>
						{information.item.information.map((item, index) => (
							<div className="subnav" key={index}>
								<hr className="border-[#C8CDD0] mt-2 mb-2"></hr>
								<div className="p-2">
									<div className="flex gap-2">
										<div className="mt-[1px]">
											<p className="font-bold">{index + 1}.</p>
										</div>
										<div className="w-[100%]">
											<div className="flex justify-between">
												<h2 className="">Information Type</h2>
												<div>
													<TrashIcon
														className="h-5 w-5 mt-[1px] text-[#FF0000] cursor-pointer hover:text-[#BA1818]"
														onClick={(e) => handleDeleteSubInformation(index)}
													/>
												</div>
											</div>
											<select
												name="information-type"
												id="information-type"
												className="w-[100%] py-2 focus:outline-none mt-2 rounded-md border border-2 border-[#C8CDD0] text-[#082691] bg-white"
												onChange={(e) => handleInformationType(index, e.target.value)}
											>
												<option value="">Select Information Type</option>
												<option
													value="email"
													selected={item.information_type == "email" ? true : false}
												>
													Email
												</option>
												<option
													value="phone"
													selected={item.information_type == "phone" ? true : false}
												>
													Phone
												</option>
												<option
													value="address"
													selected={
														item.information_type == "address" ? true : false
													}
												>
													Address
												</option>
											</select>
										</div>
									</div>
								</div>
								<div className="p-2 ml-5">
									<h2 className="mb-2 ">Information</h2>
									<Input
										onChange={(e) => handleInformation(index, e.target.value)}
										value={item.information}
										placeholder="Input Information"
										className="w-[100%] border border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
									/>
								</div>
							</div>
						))}
					</>
				) : (
					""
				)}

				<div className="p-2">
					<Button
						onClick={handleAddInformation}
						className="w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white"
					>
						Add Information
					</Button>
				</div>
			</div>
		</div>
	);
};

export default InformationFooterSection;
