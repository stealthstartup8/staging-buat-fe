import { useFontSize } from "@/utils/constants/FontSize";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/helpers/ClassName";

const Button = ({
	button_slices,
	font_slices,
	onClickInnerComponent,
	editable,
	section,
	classNameButton,
	styleButton,
	largerFont = false,
}) => {
	const { getButtonFontSize, getLargerButtonFontSize } = useFontSize();
	return (
		<>
			{["1", "2", "3"].includes(button_slices?.button_shape) ? (
				<button
					onClick={
						editable == true
							? (e) => {
									e.stopPropagation();
									onClickInnerComponent(e, 1, "button", "button", section);
								}
							: () => window.open(button_slices?.link, "_blank")
					}
					style={{
						backgroundColor: button_slices?.button_color,
						color: button_slices?.text_color,
						borderWidth: ["2", "3"].includes(button_slices?.button_shape) ? "2px" : "0px",
						borderRadius:
							button_slices?.button_shape == "2"
								? "9999px"
								: button_slices?.button_shape == "3"
									? "4px"
									: "",
						borderColor: button_slices?.stroke_color,
						textDecoration: font_slices?.button?.text_decoration,
						fontFamily: font_slices?.button?.font_style,
						fontWeight: font_slices?.button?.bold == true ? "700" : "normal",
						fontSize: largerFont
							? getLargerButtonFontSize(font_slices?.button?.font_size)
							: getButtonFontSize(font_slices?.button?.font_size),
						fontStyle: font_slices?.button?.italic == true ? "italic" : "",
						...styleButton,
					}}
					className={cn(
						`whitespace-nowrap flex items-center w-fit`,
						button_slices?.button_shape == "1" ? "" : "px-8 py-2",
						classNameButton
					)}
				>
					{button_slices?.name}
					{button_slices?.show_icon ? (
						button_slices?.icon == "" ? (
							<ArrowRightCircleIcon className="h-5 w-5 ml-2" />
						) : (
							<img src={button_slices?.icon} className="h-5 w-5 ml-2" />
						)
					) : null}
				</button>
			) : (
				<button
					onClick={
						editable == true
							? (e) => {
									e.stopPropagation();
									onClickInnerComponent(e, 1, "button", "button", section);
								}
							: () => window.open(button_slices?.link, "_blank")
					}
					style={{
						backgroundColor: button_slices?.button_color,
						color: button_slices?.text_color,
						textDecoration: font_slices?.button?.text_decoration,
						fontFamily: font_slices?.button?.font_style,
						fontWeight: font_slices?.button?.bold == true ? "700" : "normal",
						fontSize: getButtonFontSize(font_slices?.button?.font_size),
						fontStyle: font_slices?.button?.italic == true ? "italic" : "",
					}}
					className={cn("p-2 flex flex-col justify-center items-center", classNameButton)}
				>
					<div
						style={{
							backgroundImage: `url(${button_slices?.icon})`,
						}}
						className="bg-gray-200 aspect-square size-12 bg-cover bg-center bg-no-repeat"
					/>
					<p className="whitespace-nowrap">{button_slices?.name}</p>
				</button>
			)}
		</>
	);
};

export default Button;
