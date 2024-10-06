import React from "react";
import { useDispatch } from "react-redux";
import { useTemplate } from "@/utils/hooks/useTemplate";
import ColorPicker from "@/components/Elements/ColorPicker/ColorPicker";
import { backgroundColor } from "@store/sections";
const BackgroundSection = () => {
	const { section_slice } = useTemplate();
	const dispatch = useDispatch();

	const handleChangeComplete = (color) => {
		dispatch(
			backgroundColor({
				index: 0,
				background_color: color,
			})
		);
	};
	const handleCloseColorPicker = () => {
		console.log("close picker, not implemented yet");
	};
	return (
		<div>
			<p className="text-[14px] font-bold">Background Color</p>
			<div className="flex justify-center mt-4">
				<ColorPicker
					rgbaCode={section_slice?.item?.[0]?.background_color}
					onChange={handleChangeComplete}
					onClose={handleCloseColorPicker}
				/>
			</div>
			<p className="text-[12px] mt-4">
				<b>Note:</b> If you're using a dark theme/background for the blog detail page, you might want
				to adjust the font color in the blog edit page.
			</p>
		</div>
	);
};

export default BackgroundSection;
