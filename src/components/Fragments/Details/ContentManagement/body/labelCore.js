import Input from "@/components/Elements/Input";
import UploadFile from "@/components/Elements/UploadFile";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import CustomSelect from "@/components/Elements/Input/custom-select";
import { useState } from "react";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import {
	changeBackgroundColor,
	changeIcon,
	changeShape,
	changeShowIcon,
	changeStrokeColor,
	changeTextColor,
} from "@store/body/labelSlice";
const LabelCoreSection = ({ selectSection }) => {
	const {
		colorPickerRef,
		setShowLabelTextColorPicker,
		setShowLabelButtonColorPicker,
		setShowLabelStrokeColorPicker,
		labelColorPicker,
	} = useColorPicker();

	const showTextColorPicker = labelColorPicker.text;
	const showButtonColorPicker = labelColorPicker.button;
	const showStrokeColorPicker = labelColorPicker.stroke;
	const labelSlice = useSelector((state) => state.persistedReducer.labelSlice);
	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);

	const [showChangeIcon, setShowChangeIcon] = useState(
		labelSlice.item[selectedComponent.item.choiceLabelIndex]?.show_icon || false
	);

	const dispatch = useDispatch();

	const handleSelectedOption = (option) => {
		dispatch(
			changeShape({
				index: selectedComponent.item.choiceLabelIndex,
				shape: option,
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
			changeBackgroundColor({
				index: selectedComponent.item.choiceLabelIndex,
				background_color: color,
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

	const handleShowIcon = (e) => {
		dispatch(
			changeShowIcon({
				index: selectedComponent.item.choiceLabelIndex,
				show_icon: e.target.checked,
			})
		);
		setShowChangeIcon(e.target.checked);
	};

	function handleChangeIcon({ file, url }) {
		dispatch(
			changeIcon({
				index: selectedComponent.item.choiceLabelIndex,
				icon: url,
				icon_file: file,
			})
		);
	}

	const handleRemoveIcon = () => {
		dispatch(
			changeIcon({
				index: selectedComponent.item.choiceLabelIndex,
				icon: "",
			})
		);
	};

	return (
		<>
			<div className="px-1.5 py-2.5">
				<h2 className="mb-1.5 ">Label Shape</h2>
				<CustomSelect
					initialSelect={parseInt(labelSlice.item[selectedComponent.item.choiceLabelIndex]?.shape)}
					handleSelectedOption={handleSelectedOption}
				/>
			</div>
			<div className="px-1.5 py-2.5">
				<div className="flex">
					<Input
						type={"checkbox"}
						className="mr-2"
						checked={showChangeIcon}
						onChange={(e) => {
							handleShowIcon(e);
							handleRemoveIcon();
						}}
					/>{" "}
					<h2 className="">Add Icon</h2>
				</div>
				{showChangeIcon ? (
					<div className="pl-7">
						<UploadFile
							accept={".svg,.jpeg,.jpg,.png,.gif"}
							icon={labelSlice.item[selectedComponent.item.choiceLabelIndex]?.icon}
							handleChangeIcon={handleChangeIcon}
							placeHolder="Change Icon"
						/>
					</div>
				) : (
					""
				)}
			</div>
			<ColorPickerInput
				title="Label Text Color"
				ref={colorPickerRef}
				showColorPicker={showTextColorPicker}
				setShowColorPicker={setShowLabelTextColorPicker}
				color={labelSlice.item[selectedComponent.item.choiceLabelIndex]?.text_color}
				handleColorChange={handleChangeTextColor}
			/>
			<ColorPickerInput
				title="Label Background Color"
				ref={colorPickerRef}
				showColorPicker={showButtonColorPicker}
				setShowColorPicker={setShowLabelButtonColorPicker}
				color={labelSlice.item[selectedComponent.item.choiceLabelIndex]?.background_color}
				handleColorChange={handleChangeButtonColor}
			/>
			<ColorPickerInput
				title="Label Stroke Color"
				ref={colorPickerRef}
				showColorPicker={showStrokeColorPicker}
				setShowColorPicker={setShowLabelStrokeColorPicker}
				color={labelSlice.item[selectedComponent.item.choiceLabelIndex]?.stroke_color}
				handleColorChange={handleChangeStrokeColor}
			/>
		</>
	);
};

export default LabelCoreSection;
