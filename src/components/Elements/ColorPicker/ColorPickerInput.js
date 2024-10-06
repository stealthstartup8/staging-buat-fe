import React, { forwardRef } from "react";
import Portal from "@/components/Portals/Portal";
import ColorPicker from "./ColorPicker";
import ColorPickerButton from "./ColorPickerButton";
import { cn } from "@/utils/helpers/ClassName";
// props:
// title --> The title of the color picker
// showColorPicker --> The state of the color picker
// setShowColorPicker --> The function to set the state of the color picker
// color --> The color value of the color picker
// handleColorChange --> The function to handle the color value change
// custom --> False if the color picker is used for the content management
// customClassname --> The custom class name for the color picker (only available if custom is true)
const ColorPickerInput = forwardRef(
	(
		{
			title,
			showColorPicker,
			setShowColorPicker,
			color,
			handleColorChange,
			custom = false,
			customClassname,
			pickerCustomClassname,
			size = "normal",
		},
		ref
	) => {
		return (
			<div className={cn(custom ? customClassname : "px-1.5 py-2.5")}>
				<h2
					className={cn(
						"mb-1.5 ",
						size == "small" ? "text-sm" : size == "normal" ? "text-[14px]" : ""
					)}
				>
					{title}
				</h2>
				<ColorPickerButton
					onClick={() => setShowColorPicker(true)}
					active={showColorPicker}
					color={color}
					size={size}
				/>
				{showColorPicker &&
					(!custom ? (
						<Portal wrapperID="colorPicker" isOpen={showColorPicker}>
							<div className="absolute top-1/3 right-[20%] mr-5" ref={ref}>
								<ColorPicker
									rgbaCode={color}
									onChange={handleColorChange}
									onClose={() => setShowColorPicker(false)}
								/>
							</div>
						</Portal>
					) : (
						<div className={pickerCustomClassname} ref={ref}>
							<ColorPicker
								rgbaCode={color}
								onChange={handleColorChange}
								onClose={() => setShowColorPicker(false)}
							/>
						</div>
					))}
			</div>
		);
	}
);

export default ColorPickerInput;
