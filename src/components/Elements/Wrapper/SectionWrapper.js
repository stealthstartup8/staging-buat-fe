import { useStyleManagement } from "@/utils/hooks/useStyleManagement";

// props:
// children --> the wrapped component
// className --> the class name of the section
// section --> the section object
// video --> determine if the section could have a video background
const SectionWrapper = ({ children, className, section, video = true }) => {
	const { onClickInnerComponent } = useStyleManagement();
	return (
		<section
			style={{
				"--image-url": `url("${section.background_image}")`,
				backgroundColor: section.background_color,
			}}
			className={`${className}`}
			onClick={(e) => {
				e.stopPropagation();
				onClickInnerComponent(e, 2, "background", "", section);
			}}
		>
			{video && section.background_type == "video" && (
				<video
					src={section.background_image}
					autoPlay
					loop
					muted
					className="w-[100%] h-[100%] object-cover bgVideo z-[-1]"
				></video>
			)}
			{children}
		</section>
	);
};

export default SectionWrapper;
