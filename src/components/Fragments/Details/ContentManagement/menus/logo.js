import Input from "@/components/Elements/Input";
import UploadFileBigPreview from "@/components/Elements/UploadFile/BigPreview";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import { changeBackgroundColor, addCompanyLogo } from "@store/menu/logoSlice";

const LogoNavbarSection = () => {
	const dispatch = useDispatch();
	const { colorPickerRef, backgroundColorPicker, setShowBackgroundColorPicker } = useColorPicker();
	const showBackgroundColorPicker = backgroundColorPicker;

	const logo_style = useSelector((state) => state.persistedReducer.navigationLogoSlice);

	const [backgroundColor, setBackgroundColor] = useState(
		logo_style.item.background_color == "transparent" ? "transparent" : "color"
	);
	const [logo, setLogo] = useState(logo_style.item.logo_image ? true : false);

	const handleChangeBackground = (color) => {
		dispatch(
			changeBackgroundColor({
				background_color: color,
			})
		);
	};

	const handleBgTransparent = (color) => {
		dispatch(
			changeBackgroundColor({
				background_color: color,
			})
		);
	};

	function handleSetFile({ file, url }) {
		dispatch(
			addCompanyLogo({
				logo_image: url,
				logo_file: file,
			})
		);
	}

	const handleRemoveFile = () => {
		dispatch(
			addCompanyLogo({
				logo_image: "",
			})
		);
	};

	return (
		<>
			<div className="mt-4 ">
				<h2 className="mb-2">
					<b>Company Information</b>
				</h2>
				<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
					<div className="p-2">
						<div className="flex">
							<Input
								type={"checkbox"}
								className="mr-2"
								onChange={(e) => {
									handleRemoveFile();
									setLogo(!logo);
								}}
								checked={logo}
							/>{" "}
							<h2 className="">Logo Image</h2>
						</div>
						{logo == true ? (
							<div className="mt-4">
								<UploadFileBigPreview
									accept={".svg,.jpeg,.jpg,.png,.gif"}
									file={logo_style.item.logo_image}
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
						<h2 className="">Background Color</h2>
						<label>
							<input
								type="radio"
								value="option1"
								className="mr-2"
								checked={backgroundColor == "transparent"}
								onChange={(e) => {
									setBackgroundColor("transparent");
									handleBgTransparent("rgba(0,0,0,0)");
								}}
							/>
							Transparent
						</label>
						<br />
						<label>
							<input
								type="radio"
								value="option2"
								className="mr-2"
								checked={backgroundColor == "color"}
								onChange={(e) => {
									setBackgroundColor("color");
								}}
							/>
							Add Color
						</label>
						<br />
						{backgroundColor == "color" ? (
							<ColorPickerInput
								title=""
								ref={colorPickerRef}
								color={logo_style.item.background_color}
								showColorPicker={showBackgroundColorPicker}
								setShowColorPicker={setShowBackgroundColorPicker}
								handleColorChange={handleChangeBackground}
							/>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default LogoNavbarSection;
