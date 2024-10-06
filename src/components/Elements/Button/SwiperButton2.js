import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
// named SwiperButton2 to open for design variation
// props:
// loop --> Determine if the swiper is looped, if true the button will always be enabled
// activeIndex --> The currently showing slide index, not used if loop is true
// totalSlides --> The total number of slides, not used if loop is true
// containerStyle --> The style of the container
// onPrev --> Function to go to the previous slide
// onNext --> Function to go to the next slide
// darkMode --> Determine if the template is dark which included in the arr_selected_template_preview
const SwiperButton2 = ({
	loop = false,
	activeIndex = 0,
	totalSlides = 0,
	containerStyle,
	onPrev,
	onNext,
	darkMode = false,
}) => {
	const hoverColor = darkMode ? "hover:bg-gray-200" : "hover:bg-white";
	return (
		<div className={containerStyle}>
			<button
				onClick={onPrev}
				disabled={activeIndex === 0 && !loop}
				className={`p-2 md:p-4 bg-white rounded-full  ${
					activeIndex === 0 && !loop ? "opacity-50" : hoverColor
				} `}
			>
				<ArrowLeftIcon className={`w-6 h-6  cursor-pointer   `} />
			</button>
			<button
				onClick={onNext}
				disabled={activeIndex === totalSlides - 1 && !loop}
				className={`p-2 md:p-4 bg-white rounded-full ${
					activeIndex === totalSlides - 1 ? "opacity-50" : hoverColor
				}`}
			>
				<ArrowRightIcon
					className={`w-6 h-6  cursor-pointer   ${
						activeIndex === totalSlides - 1 && !loop ? "opacity-50" : hoverColor
					}`}
				/>
			</button>
		</div>
	);
};

export default SwiperButton2;
