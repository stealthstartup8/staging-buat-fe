import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useState } from "react";
import axios from "axios";
import UploadFileBigPreview from "@/components/Elements/UploadFile/BigPreview";
import { MAX_FILE_SIZE } from "@/utils/constants/Constraints";
import { addLogo, addLogoImage, deleteLogo, logoName } from "@store/body/bodySlice";

const LogoManagementSection = ({ user_token, website_id }) => {
	const dispatch = useDispatch();
	const bodySlice = useSelector((state) => state.persistedReducer.bodySlice.item);
	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);
	const [selectLogo, setSelectLogo] = useState(0);

	const addContent = () => {
		dispatch(
			addLogo({
				index: selectedComponent.item.choiceLabelIndex,
				orderIndex: bodySlice[selectedComponent.item.choiceLabelIndex]?.logo_section.length,
				id: null,
			})
		);
		setSelectLogo(bodySlice[selectedComponent.item.choiceLabelIndex]?.logo_section.length);
	};

	const handleTitle = (value) => {
		dispatch(
			logoName({
				index: selectedComponent.item.choiceLabelIndex,
				indexLogo: selectLogo,
				name: value,
			})
		);
	};

	function handleSetFile({ file, url }) {
		dispatch(
			addLogoImage({
				index: selectedComponent.item.choiceLabelIndex,
				logo_image: url,
				logo_file: file,
				indexLogo: selectLogo,
			})
		);
	}

	const handleRemoveFile = () => {
		dispatch(
			addLogoImage({
				index: selectedComponent.item.choiceLabelIndex,
				logo_image: "",
				indexLogo: selectLogo,
			})
		);
	};

	const handleDeleteContent = () => {
		if (bodySlice[selectedComponent.item.choiceLabelIndex]?.logo_section[selectLogo]?.id != null) {
			const deleteDBLogo = axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					"/section-logo/" +
					bodySlice[selectedComponent.item.choiceLabelIndex]?.logo_section[selectLogo]?.id +
					`/${website_id}`,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}
		dispatch(
			deleteLogo({
				index: selectedComponent.item.choiceLabelIndex,
				indexLogo: selectLogo,
			})
		);
		setSelectLogo(0);
	};

	return (
		<div className="mt-4 overflow-y-auto content-scrollbar pr-1 overflow-x-hidden">
			<h2 className="mb-2">
				<b>Content Label</b>
			</h2>
			<div className="flex flex-nowrap gap-2 overflow-auto pb-4">
				{bodySlice[selectedComponent.item.choiceLabelIndex]?.logo_section?.map((item, index) => (
					<Fragment key={index}>
						<Button
							key={index}
							onClick={(e) => setSelectLogo(index)}
							className={`text-[14px] flex gap-1 border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691]  ${
								selectLogo == index ? "bg-[#082691] text-white" : "bg-white text-[#082691]"
							}`}
						>
							{index + 1}
						</Button>
					</Fragment>
				))}
			</div>
			{bodySlice[selectedComponent.item.choiceLabelIndex]?.logo_section?.length > 0 ? (
				<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
					<div className="p-2">
						<h2 className="mb-2 ">Logo Name</h2>
						<Input
							onChange={(e) => handleTitle(e.target.value)}
							value={
								bodySlice[selectedComponent.item.choiceLabelIndex]?.logo_section[selectLogo]
									?.name == undefined
									? ""
									: bodySlice[selectedComponent.item.choiceLabelIndex]?.logo_section[
											selectLogo
										]?.name
							}
							placeholder="name/title"
							className="w-[100%] border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
						/>
					</div>
					<div className="p-2">
						<h2 className="mb-2 ">Logo Image</h2>
						<div className="mt-4">
							<UploadFileBigPreview
								accept={".svg,.jpeg,.jpg,.png,.gif"}
								file={
									bodySlice[selectedComponent.item.choiceLabelIndex].logo_section[
										selectLogo
									]?.logo_image
								}
								handleSetFile={(image) => handleSetFile(image)}
								removeFile={(e) => {
									e.stopPropagation();
									handleRemoveFile();
								}}
							/>
							<hr className="border-[#C8CDD0]"></hr>
						</div>
					</div>
				</div>
			) : (
				""
			)}

			<div className="flex gap-2 mb-2">
				{bodySlice[selectedComponent.item.choiceLabelIndex]?.logo_section?.length > 1 && (
					<Button
						onClick={handleDeleteContent}
						className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#F11010] text-[#F11010] bg-white hover:bg-[#F11010] hover:text-white"
					>
						Delete Logo
					</Button>
				)}
				<Button
					onClick={addContent}
					className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white"
				>
					Add New Logo
				</Button>
			</div>
		</div>
	);
};

export default LogoManagementSection;
