import Link from "next/link";
import { ArrowLeftCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useBlogStyle } from "@/utils/hooks/blog-and-product/useBlogStyle";
import { useTemplate } from "@/utils/hooks/useTemplate";
import { useFontSize } from "@/utils/constants/FontSize";
import { changeButtonLabel } from "@store/body/buttonSlice";
import { useDispatch, useSelector } from "react-redux";

const BlogDetails = ({ editable, selectManagement }) => {
	const { setBackButtonText, backButtonText } = useBlogStyle();
	const { section_slice, font_slice } = useTemplate();
	const dispatch = useDispatch();
	const buttonSlices = useSelector((state) => state.persistedReducer.buttonHeroSlice);

	const onChangeButtonLabel = (index, value) => {
		dispatch(
			changeButtonLabel({
				index: index,
				name: value,
			})
		);
	};

	return (
		<section
			style={{ backgroundColor: section_slice?.item?.[0]?.background_color }}
			className={`${
				selectManagement == 1 && "border border-2 border-dashed border-[#C91717] "
			} h-full pb-10 w-[100vw] text-black pt-20`}
		>
			<div className="container mx-auto lg:p-0 p-4">
				{editable ? (
					<div className="flex items-center">
						<ArrowLeftCircleIcon className="w-5 h-5 mr-2" />
						<input
							value={buttonSlices.item[0]?.name}
							// onChange={(e) => setBackButtonText(e.target.value)}
							onChange={(e) => onChangeButtonLabel(0, e.target.value)}
							className="border border-dashed border-1 border-black pl-2 focus:outline-none bg-transparent"
							// value={backButtonText}
						/>
					</div>
				) : (
					<Link href={"#"} className="flex items-center">
						<ArrowLeftCircleIcon className="w-5 h-5 mr-2" />
						{backButtonText}
					</Link>
				)}
				<div className="flex justify-center">
					<div className="lg:w-7/12">
						<h1
							style={{
								color: font_slice?.item?.[0]?.headline?.color,
								fontFamily: font_slice?.item?.[0]?.headline?.font_style,
							}}
							className="font-bold text-[42px] leading-[3rem]"
						>
							Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.
						</h1>
						<p
							className="flex mt-4"
							style={{
								color: font_slice?.item?.[0]?.label?.color,
								fontFamily: font_slice?.item?.[0]?.label?.font_style,
							}}
						>
							Label 1 | <CalendarDaysIcon className="w-5 h-5 ml-2 mr-2" /> 25/09/2023 9:20 AM
						</p>
						<h2 className="font-bold text-[16px] mt-4">Heading1</h2>
						<p className="text-[12px] mt-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus
							bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque,
							lorem.{" "}
						</p>
						<div className="w-full h-[400px] bg-[#D9D9D9] mt-8 rounded-xl"></div>
						<p className="text-[12px] mt-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus
							bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque,
							lorem.{" "}
						</p>
						.......
					</div>
				</div>
			</div>
		</section>
	);
};

export default BlogDetails;
