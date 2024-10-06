import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import Marquee from "react-fast-marquee";

const PreviewLogo3 = ({
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
			className="z-20 bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center flex flex-col lg:justify-center md:w-screen h-[100%]  lg:h-screen relative pt-10 md:pt-0"
		>
			<div className="container mx-auto z-10  w-full md:flex justify-between items-center">
				<div className="md:w-[40%] pl-10">
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
				<div className="md:w-7/12 mt-6 md:mt-0 logo-slider">
					<Marquee autoFill>
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
									item.logo_image ? "bg-[image:var(--image-url)]" : "bg-[#D9D9D9]"
								} w-52 h-52 aspect-square  rounded-md bg-no-repeat bg-cover bg-center relative my-slide-content mx-2`}
							>
								{item.background_type === "video" && (
									<video
										src={item.logo_image.replace(/^"|"$/g, "")}
										autoPlay
										loop
										muted
										className="w-[100%] h-[100%] object-cover bgVideo z-0"
									></video>
								)}
							</div>
						))}
					</Marquee>
				</div>
			</div>
		</SectionWrapper>
	);
};

export default PreviewLogo3;
