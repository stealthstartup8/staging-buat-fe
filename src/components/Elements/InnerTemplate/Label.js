import { useFontSize } from "@/utils/constants/FontSize";
import { cn } from "@/utils/helpers/ClassName";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { inputLabel } from "@store/body/bodySlice";
import ContentEditable from "react-contenteditable";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const Label = ({
	label_slices,
	font_slices,
	onClickInnerComponent,
	editable,
	section,
	item,
	className,
	onClick,
	children,
	idComponent,
	sectionComponentHero,
}) => {
	const dispatch = useDispatch();
	const { getLabelFontSize } = useFontSize();

	const handleChangedLabel = (value) => {
		dispatch(
			inputLabel({
				idComponent: idComponent,
				indexSection: sectionComponentHero,
				label: value,
			})
		);
	};
	const styles = {
		backgroundColor: label_slices?.background_color,
		color: label_slices?.text_color,
		fontFamily: font_slices?.label?.font_style,
		fontWeight: font_slices?.label?.bold ? "700" : "normal",
		textDecoration: font_slices?.label?.text_decoration,
		fontStyle: font_slices?.label?.italic ? "italic" : "",
		fontSize: getLabelFontSize(font_slices?.label?.font_size),
		textAlign: font_slices?.label?.align,
		borderWidth: ["2", "3"].includes(label_slices?.shape) ? "2px" : "0px",
		borderRadius: label_slices?.shape == "2" ? "9999px" : label_slices?.shape == "3" ? "4px" : "",
		borderColor: label_slices?.stroke_color,
	};

	const textLabel = useRef("");

	const handleChange = (evt) => {
		textLabel.current = evt.target.value;
		handleChangedLabel(evt.target.value);
	};

	const renderIcon = () => {
		if (label_slices?.show_icon) {
			return label_slices?.icon ? (
				<img src={label_slices?.icon} className="h-5 w-5 ml-2" />
			) : (
				<ArrowRightCircleIcon className="h-5 w-5 ml-2" />
			);
		}
		return null;
	};

	const handleClick = (e) => {
		e.stopPropagation();
		onClickInnerComponent ? onClickInnerComponent(e, 1, "font", "label", section) : null;
		onClick ? onClick() : null;
	};

	return (
		<button
			onClick={handleClick}
			style={styles}
			className={cn(
				`w-fit flex items-center gap-2`,
				label_slices?.shape == "1" ? "" : "px-8 py-2",
				className
			)}
		>
			{label_slices?.shape === "4" && (
				<div
					style={{
						backgroundImage: `url(${label_slices?.icon})`,
						backgroundColor: label_slices?.icon ? "transparent" : "#D9D9D9",
					}}
					className=" aspect-square size-12 bg-cover bg-center bg-no-repeat"
				/>
			)}
			<ContentEditable
				html={item ? item?.label : children ? children : textLabel.current}
				onChange={handleChange}
				className="focus:outline-none bg-transparent border-dashed hover:border focus:border-2 border-gray-300 mb-0.5"
				tagName="span"
			/>
			{label_slices?.shape !== "4" && renderIcon()}
		</button>
	);
};

export default Label;
