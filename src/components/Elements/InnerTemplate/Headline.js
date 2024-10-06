import { useFontSize } from "@/utils/constants/FontSize";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useDispatch } from "react-redux";
import { inputTitle } from "@store/body/bodySlice";
import { cn } from "@/utils/helpers/ClassName";
import { ARR_SELECTED_TEMPLATE_PREVIEW } from "@/utils/constants";

// props
// smaller --> smaller headline font size
// componentValue --> menu management to open when the textarea is clicked
const Headline = ({
	editable,
	font_slices,
	section,
	title,
	className,
	style,
	idComponent,
	sectionComponentHero,
	smaller = false,
	lineHeight = "75px",
	componentValue = "font",
}) => {
	const { getHeadlineFontSize, getSmallerHeadlineFontSize } = useFontSize();
	const { onClickInnerComponent } = useStyleManagement();
	const dispatch = useDispatch();
	const handleChangedTitle = async (value) => {
		dispatch(
			inputTitle({
				idComponent: idComponent,
				indexSection: sectionComponentHero,
				title: value,
			})
		);
	};
	return editable ? (
		<textarea
			onClick={(e) => {
				e.stopPropagation();
				onClickInnerComponent(e, 1, componentValue, "headline", section);
			}}
			onChange={(e) => handleChangedTitle(e.target.value)}
			style={{
				color: font_slices?.headline?.color,
				fontFamily: font_slices?.headline?.font_style,
				fontWeight: font_slices?.headline?.bold == true ? "700" : "normal",
				textDecoration: font_slices?.headline?.text_decoration,
				fontStyle: font_slices?.headline?.italic == true ? "italic" : "",
				fontSize: smaller
					? getSmallerHeadlineFontSize(font_slices?.headline?.font_size)
					: getHeadlineFontSize(font_slices?.headline?.font_size),
				textAlign: font_slices?.headline?.align,
				lineHeight: smaller ? 1.5 : lineHeight,
				...style,
			}}
			value={title}
			rows={1}
			className={cn(
				` px-2 w-full border-2 border-dashed  bg-transparent outline-none `,
				ARR_SELECTED_TEMPLATE_PREVIEW.includes(Number(section.id_template))
					? "border-[#C8CDD0]"
					: "border-[#4B4B4B]", // different border color for dark template,
				className
			)}
		/>
	) : (
		<h1
			style={{
				color: font_slices?.headline?.color,
				fontFamily: font_slices?.headline?.font_style,
				fontWeight: font_slices?.headline?.bold == true ? "700" : "normal",
				textDecoration: font_slices?.headline?.text_decoration,
				fontStyle: font_slices?.headline?.italic == true ? "italic" : "",
				fontSize: smaller
					? getSmallerHeadlineFontSize(font_slices?.headline?.font_size)
					: getHeadlineFontSize(font_slices?.headline?.font_size),
				textAlign: font_slices?.headline?.align,
				lineHeight: smaller ? 1.5 : lineHeight,
			}}
			className={cn("!leading-[4rem]", className)}
		>
			{title}
		</h1>
	);
};

export default Headline;
