import Input from "@/components/Elements/Input";
import UploadFileBigPreview from "@/components/Elements/UploadFile/BigPreview";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import { MAX_FILE_SIZE } from "@/utils/constants/Constraints";
import Toast from "@/components/Elements/Toast/Toast";
import { changeBgColor, changeBgImages } from "@store/footer/companySlice";
const CompanyFooterSection = () => {
	const footerCompanySlice = useSelector((state) => state.persistedReducer.footerCompany);
	const { colorPickerRef, backgroundColorPicker, setShowBackgroundColorPicker } = useColorPicker();
	const showBackgroundColorPicker = backgroundColorPicker;
	const [backgroundImage, setBackgroundImage] = useState(
		footerCompanySlice.item.background_images == undefined ||
			footerCompanySlice.item.background_images == ""
			? false
			: true
	);
	const [backgroundColor, setBackgroundColor] = useState(
		footerCompanySlice.item.background_color == "" ? false : true
	);
	const dispatch = useDispatch();
	function handleSetFile({ file, url }) {
		dispatch(
			changeBgImages({
				background_images: url,
				background_images_file: file,
			})
		);
	}

	const handleRemoveFile = () => {
		dispatch(
			changeBgImages({
				background_images: "",
			})
		);
	};

	const handleBgColor = (value) => {
		dispatch(
			changeBgColor({
				background_color: value,
			})
		);
	};

	const handleRemoveBgColor = () => {
		dispatch(
			changeBgColor({
				background_color: "#333E48",
			})
		);
	};

	return (
		<div className="overflow-y-auto content-scrollbar mt-4 pr-1 ">
			<h2 className="mb-2">
				<b>Company Information</b>
			</h2>
			<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
				<div className="p-2">
					<div className="flex">
						<Input
							type={"checkbox"}
							checked={backgroundImage}
							className="mr-2"
							onChange={(e) => {
								setBackgroundImage(!backgroundImage);
								handleRemoveFile();
							}}
						/>{" "}
						<h2 className="">Background Image</h2>
					</div>
					{backgroundImage ? (
						<div className="mt-4">
							<UploadFileBigPreview
								accept={".svg,.jpeg,.jpg,.png,.gif"}
								file={footerCompanySlice.item.background_images.replace(/"/g, "")}
								handleSetFile={(image) => handleSetFile(image)}
								removeFile={(e) => {
									e.stopPropagation();
									handleRemoveFile();
								}}
							/>
							<hr className="border-[#C8CDD0]"></hr>
						</div>
					) : (
						""
					)}
				</div>
				<div className="p-2">
					<div className="flex">
						<Input
							type={"checkbox"}
							className="mr-2"
							checked={backgroundColor}
							onChange={(e) => {
								setBackgroundColor(!backgroundColor);
								handleRemoveBgColor();
							}}
						/>{" "}
						<h2 className="">Background Color</h2>
					</div>
					{backgroundColor ? (
						<ColorPickerInput
							title=""
							ref={colorPickerRef}
							color={footerCompanySlice.item.background_color}
							showColorPicker={showBackgroundColorPicker}
							setShowColorPicker={setShowBackgroundColorPicker}
							handleColorChange={handleBgColor}
						/>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default CompanyFooterSection;
