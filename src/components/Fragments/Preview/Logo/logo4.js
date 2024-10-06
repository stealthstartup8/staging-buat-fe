import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
const PreviewLogo4 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	sectionComponentHero,
	editable,
}) => {
	const { onClickInnerComponent } = useStyleManagement();

	return (
		<SectionWrapper
			section={section}
			className="z-20 bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center flex flex-col lg:justify-center md:w-screen min-h-screen py-10 md:py-20 relative px-4 md:px-0"
		>
			<div className="container mx-auto z-10  mx-auto  w-full">
				<div className="text-center">
					<Headline
						font_slices={font_slices}
						section={section}
						title={value_component.components[0].title}
						idComponent={idComponent}
						sectionComponentHero={sectionComponentHero}
						editable={editable}
					/>
					<Tagline
						font_slices={font_slices}
						section={section}
						tagline={value_component.components[0].tagline}
						idComponent={idComponent}
						sectionComponentHero={sectionComponentHero}
						editable={editable}
					/>
				</div>
				<div
					className={`w-full mt-6 md:mt-10 grid grid-cols-1 place-items-center gap-4 ${
						value_component.logo_section.length == 1
							? ""
							: value_component.logo_section.length == 2
								? "md:grid-cols-2"
								: "md:grid-cols-3"
					}`}
				>
					{value_component.logo_section.map((item, index) => (
						<div
							onClick={(e) => {
								e.stopPropagation();
								onClickInnerComponent(e, 2, "logo", "", section);
							}}
							key={index}
							style={{
								"--image-url": `url(${item.logo_image})`,
							}}
							className={` ${
								item.logo_image ? "bg-[image:var(--image-url)]" : "bg-[#D9D9D9] "
							} w-full md:w-96 h-96 aspect-square  rounded-md bg-no-repeat bg-cover bg-center relative my-slide-content mx-2 my-4`}
						></div>
					))}
				</div>
			</div>
		</SectionWrapper>
	);
};

export default PreviewLogo4;
