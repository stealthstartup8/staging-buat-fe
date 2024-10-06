import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import Marquee from "react-fast-marquee";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
const PreviewLogo2 = ({
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
			className="z-20 bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center flex flex-col lg:justify-center md:w-screen min-h-screen py-24 relative"
		>
			<div className="z-10  mx-auto  w-full">
				<div className="p-4 container mx-auto text-center">
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
				<div className="w-full flex flex-col gap-4 mt-6 md:mt-10">
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
					<Marquee direction="right" autoFill>
						{value_component.logo_section.map((item, index) => (
							<div
								key={index}
								style={{
									"--image-url": `url(${item.logo_image})`,
								}}
								className={`  ${
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

export default PreviewLogo2;
