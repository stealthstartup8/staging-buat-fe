import { forwardRef } from "react";

// props:
// containerStyle --> The style of the container
// activeSlide --> The currently showing slide index
// darkMode --> Determine if the template is dark which included in the arr_selected_template_preview
const SwiperPagination = forwardRef(({ containerStyle, activeSlide, darkMode = false }, ref) => {
	const border = darkMode ? "border-white" : "border-black";
	const activeBackground = darkMode ? "bg-black" : "bg-white";
	const defaultBackground = darkMode ? "bg-white" : "bg-black";
	return (
		<div className={containerStyle}>
			{ref.current &&
				ref.current.slides.length > 1 &&
				ref.current.slides.map((slide, index) => (
					<button
						key={index}
						className={`w-3 h-3  rounded-full border ${border} ${
							index === activeSlide ? activeBackground : defaultBackground
						}`}
						onClick={() => ref.current.slideTo(index)}
					></button>
				))}
		</div>
	);
});

export default SwiperPagination;
