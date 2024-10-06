import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
// named SwiperButton1 to open for design variation
// props:
// loop --> Determine if the swiper is looped, if true the button will always be enabled
// activeIndex --> The currently showing slide index, not used if loop is true
// totalSlides --> The total number of slides, not used if loop is true
// containerStyle --> The style of the container
// onPrev --> Function to go to the previous slide
// onNext --> Function to go to the next slide
// darkMode --> Determine if the template is dark which included in the arr_selected_template_preview
const SwiperButton1 = ({
	loop = false,
	activeIndex = 0,
	totalSlides = 0,
	containerStyle,
	onPrev,
	onNext,
	darkMode = false,
}) => {
	const defaultColor = darkMode ? "text-[#6B6B6B]" : "text-[#6F6868]";
	const hoverColor = darkMode ? "hover:text-black" : "hover:text-white";
	return (
		<div className={containerStyle}>
			<button
				onClick={(e) => {
					e.stopPropagation();
					onPrev();
				}}
				disabled={activeIndex === 0 && !loop}
			>
				<ArrowLeftCircleIcon
					className={`w-9 h-9  cursor-pointer ${defaultColor}  ${
						activeIndex === 0 && !loop ? "opacity-50" : hoverColor
					}`}
				/>
			</button>
			<button
				onClick={(e) => {
					e.stopPropagation();
					onNext();
				}}
				disabled={activeIndex === totalSlides - 1 && !loop}
			>
				<ArrowRightCircleIcon
					className={`w-9 h-9  cursor-pointer ${defaultColor}  ${
						activeIndex === totalSlides - 1 && !loop ? "opacity-50" : hoverColor
					}`}
				/>
			</button>
		</div>
	);
};

export default SwiperButton1;
