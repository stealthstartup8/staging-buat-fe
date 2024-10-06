import Input from "@/components/Elements/Input";
import { useState } from "react";
import UploadFile from "@/components/Elements/UploadFile";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import CustomSelect from "@/components/Elements/Input/custom-select";
import { useBody } from "@/utils/hooks/useBody";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import {
	changeButtonColor,
	changeButtonLabel,
	changeButtonShape,
	changeButtonStatus,
	changeButtonUrl,
	changeIcon,
	changeStrokeColor,
	changeTextColor,
	changeShowIcon,
} from "@store/body/buttonSlice";
import { buttonStatus } from "@store/body/bodySlice";
const ButtonSection = ({ selectSection }) => {
	const {
		colorPickerRef,
		setShowTextColorPicker,
		setShowButtonColorPicker,
		setShowStrokeColorPicker,
		buttonColorPicker,
	} = useColorPicker();
	const [showExternalLink, setShowExternalLink] = useState(false);
	const showTextColorPicker = buttonColorPicker.text;
	const showButtonColorPicker = buttonColorPicker.button;
	const showStrokeColorPicker = buttonColorPicker.stroke;
	const buttonSlices = useSelector((state) => state.persistedReducer.buttonHeroSlice);
	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);
	const { body_slice } = useBody();
	const [icon, setIcon] = useState();
	const dispatch = useDispatch();
	const handleSelectedOption = (option) => {
		dispatch(
			changeButtonShape({
				index: selectedComponent.item.choiceLabelIndex,
				button_shape: option,
			})
		);
	};

	const handleChangeTextColor = (color) => {
		dispatch(
			changeTextColor({
				index: selectedComponent.item.choiceLabelIndex,
				text_color: color,
			})
		);
	};

	const handleChangeButtonColor = (color) => {
		dispatch(
			changeButtonColor({
				index: selectedComponent.item.choiceLabelIndex,
				button_color: color,
			})
		);
	};

	const handleChangeStrokeColor = (color) => {
		dispatch(
			changeStrokeColor({
				index: selectedComponent.item.choiceLabelIndex,
				stroke_color: color,
			})
		);
	};

	const onChangeButtonLabel = (index, value) => {
		dispatch(
			changeButtonLabel({
				index: index,
				name: value,
			})
		);
	};

	const onChangeButtonUrl = (index, value) => {
		dispatch(
			changeButtonUrl({
				index: index,
				link: value,
			})
		);
	};

	const handleShowIcon = (index, value) => {
		dispatch(changeShowIcon({ index: index, show_icon: value }));
		// setShowChangeIcon(value);
	};

	const setButtonStatus = (index, value) => {
		dispatch(
			buttonStatus({
				index: index,
				show_button: value,
			})
		);
	};

	function handleChangeIcon({ file, url }) {
		setIcon(url);
		dispatch(
			changeIcon({
				index: selectedComponent.item.choiceLabelIndex,
				icon: url,
				icon_file: file,
			})
		);
	}

	const handleRemoveFile = () => {
		dispatch(
			changeIcon({
				index: selectedComponent.item.choiceLabelIndex,
				icon: "",
			})
		);
		setIcon("");
	};

	return (
		<div className="overflow-y-auto content-scrollbar mt-4 pr-1">
			<div className="">
				<h2 className="mb-2">
					<b>Button</b>
				</h2>
				<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
					{selectSection != "career" && (
						<div className="p-2">
							<div className="flex">
								{selectSection != "form" ? (
									<>
										<Input
											type="checkbox"
											className="mr-2"
											onChange={(e) =>
												setButtonStatus(
													selectedComponent.item.choiceLabelIndex,
													e.target.checked
												)
											}
											checked={
												body_slice.item[selectedComponent.item.choiceLabelIndex]
													?.components[0].show_button
											}
										/>
										<h2 className="">Add Button</h2>
									</>
								) : (
									<h2 className="">Submit Button Name</h2>
								)}
							</div>
							{body_slice.item[selectedComponent.item.choiceLabelIndex].components[0]
								.show_button == true && selectSection != "form" ? (
								<Input
									placeholder="Button Name/Text"
									value={buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.name}
									className="w-[100%]  border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
									onChange={(e) =>
										onChangeButtonLabel(
											selectedComponent.item.choiceLabelIndex,
											e.target.value
										)
									}
								/>
							) : selectSection == "form" ? (
								<Input
									placeholder="Button Name/Text"
									value={buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.name}
									className="w-[100%]  border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
									onChange={(e) =>
										onChangeButtonLabel(
											selectedComponent.item.choiceLabelIndex,
											e.target.value
										)
									}
								/>
							) : (
								""
							)}
						</div>
					)}
					{selectSection !== "form" && selectSection !== "career" && (
						<div className="p-2">
							<div className="flex">
								<Input
									type={"checkbox"}
									className="mr-2"
									onChange={(e) => setShowExternalLink(!showExternalLink)}
									checked={
										buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.link !==
											"" || showExternalLink
									}
								/>
								<h2 className="">Change to External Link</h2>
							</div>
							{buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.link !== "" ||
							showExternalLink ? (
								<Input
									placeholder="https://...."
									onChange={(e) =>
										onChangeButtonUrl(
											selectedComponent.item.choiceLabelIndex,
											e.target.value
										)
									}
									className="w-[100%] border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
									value={
										buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.link || ""
									}
								/>
							) : null}
						</div>
					)}
					<div className="p-2">
						<h2 className="mb-2 ">Button Shape</h2>
						<CustomSelect
							initialSelect={parseInt(
								buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.button_shape
							)}
							handleSelectedOption={handleSelectedOption}
						/>
					</div>
					<div className="p-2">
						<div className="flex">
							<Input
								type={"checkbox"}
								className="mr-2"
								checked={
									buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.show_icon
								}
								onChange={(e) => {
									handleShowIcon(selectedComponent.item.choiceLabelIndex, e.target.checked);
									handleRemoveFile();
								}}
							/>{" "}
							<h2 className="">Change Icon (PNG or GIF)</h2>
						</div>
						{buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.show_icon ? (
							<div className="pl-7">
								<UploadFile
									accept={".svg,.jpeg,.jpg,.png,.gif"}
									icon={buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.icon}
									handleChangeIcon={handleChangeIcon}
								/>
							</div>
						) : (
							""
						)}
						<hr className="mt-4 border-[#C8CDD0]"></hr>
					</div>
					<ColorPickerInput
						title="Button Text Color"
						ref={colorPickerRef}
						color={buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.text_color}
						showColorPicker={showTextColorPicker}
						setShowColorPicker={setShowTextColorPicker}
						handleColorChange={handleChangeTextColor}
					/>
					<hr className="mt-4 border-[#C8CDD0]"></hr>
					<ColorPickerInput
						title="Button Background Color"
						ref={colorPickerRef}
						color={buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.button_color}
						showColorPicker={showButtonColorPicker}
						setShowColorPicker={setShowButtonColorPicker}
						handleColorChange={handleChangeButtonColor}
					/>
					<hr className="mt-4 border-[#C8CDD0]"></hr>
					<ColorPickerInput
						title="Stroke Button Color"
						ref={colorPickerRef}
						color={buttonSlices.item[selectedComponent.item.choiceLabelIndex]?.stroke_color}
						showColorPicker={showStrokeColorPicker}
						setShowColorPicker={setShowStrokeColorPicker}
						handleColorChange={handleChangeStrokeColor}
					/>
				</div>
			</div>
		</div>
	);
};

export default ButtonSection;
