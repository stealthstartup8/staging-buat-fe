import tinycolor from "tinycolor2";
import { cn } from "@/utils/helpers/ClassName";
// props
// onOpen --> triggers onclick
// active --> the status of the button, active means the button is clicked and the colorpicker modal is open
// color --> the color code in rgba format 'rgba(r,g,b,a)'
const ColorPickerButton = ({ onClick, active, color, size = "normal" }) => {
	const colorInstance = tinycolor(color);
	return (
		<button className={`flex gap-2 w-full items-center ${active && "bg-gray-300"}`} onClick={onClick}>
			<div
				className="h-full min-w-10 aspect-square rounded-lg border border-[#DCDCDC] "
				style={{
					backgroundColor: color,
				}}
			></div>
			<div
				className={cn(
					"flex justify-between w-full ",
					size == "small" ? "text-sm" : size == "normal" ? "text-[14px]" : ""
				)}
			>
				<p>{colorInstance.toHexString().toUpperCase()}</p>
				<p>{parseInt(colorInstance.getAlpha() * 100) + "%"}</p>
			</div>
		</button>
	);
};

export default ColorPickerButton;
