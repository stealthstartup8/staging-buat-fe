import { useFontSize } from "@/utils/constants/FontSize";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useDispatch } from "react-redux";
import { inputTagline } from "@store/body/bodySlice";
import { cn } from "@/utils/helpers/ClassName";
import { ARR_SELECTED_TEMPLATE_PREVIEW } from "@/utils/constants";
const Tagline = ({
	font_slices,
	section,
	tagline,
	className,
	idComponent,
	sectionComponentHero,
	editable,
}) => {
	const { getTaglineFontSize } = useFontSize();
	const { onClickInnerComponent } = useStyleManagement();
	const dispatch = useDispatch();
	const handleChangeTagline = async (value) => {
		dispatch(
			inputTagline({
				idComponent: idComponent,
				indexSection: sectionComponentHero,
				tagline: value,
			})
		);
	};
	return editable ? (
		<textarea
			onClick={(e) => {
				e.stopPropagation();
				onClickInnerComponent(e, 1, "font", "tagline", section);
			}}
			onChange={(e) => handleChangeTagline(e.target.value)}
			style={{
				color: font_slices?.tagline?.color,
				fontFamily: font_slices?.tagline?.font_style,
				fontWeight: font_slices?.tagline?.bold == true ? "700" : "normal",
				textDecoration: font_slices?.tagline?.text_decoration,
				fontStyle: font_slices?.tagline?.italic == true ? "italic" : "",
				fontSize: getTaglineFontSize(font_slices?.tagline?.font_size),
				textAlign: font_slices?.tagline?.align,
			}}
			value={tagline}
			rows={1}
			className={cn(
				`w-full px-2 border-2 border-dashed border-[#4B4B4B] bg-transparent outline-none `,
				ARR_SELECTED_TEMPLATE_PREVIEW.includes(Number(section.id_template))
					? "border-[#C8CDD0]"
					: "border-[#4B4B4B]", // different border color for dark template
				className
			)}
		/>
	) : (
		<p
			style={{
				color: font_slices?.tagline?.color,
				fontFamily: font_slices?.tagline?.font_style,
				fontWeight: font_slices?.tagline?.bold == true ? "700" : "normal",
				textDecoration: font_slices?.tagline?.text_decoration,
				fontStyle: font_slices?.tagline?.italic == true ? "italic" : "",
				fontSize: getTaglineFontSize(font_slices?.tagline?.font_size),
				textAlign: font_slices?.tagline?.align,
			}}
			className={cn(`mt-4`, className)}
		>
			{tagline}
		</p>
	);
};

export default Tagline;
