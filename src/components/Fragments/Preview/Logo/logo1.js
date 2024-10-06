import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
const PreviewLogo1 = ({
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
			className="z-20  bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center flex flex-col lg:justify-center md:w-screen md:min-h-[100%] lg:min-h-screen relative pb-16"
		>
			<div className="container mx-auto z-10 p-4 w-full overflow-x-hidden pt-24">
				<div className="text-center w-96 mx-auto md:w-full ">
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
				<div className="flex items-center justify-center flex-wrap hide-scrollbar mt-4">
					{value_component.logo_section.map((item, index) => (
						<div className="mt-2">
							<div
								onClick={(e) => {
									e.stopPropagation();
									onClickInnerComponent(e, 2, "logo", "", section);
								}}
								key={index}
								style={{
									"--image-url": `url("${item.logo_image}")`,
								}}
								className={`my-2 h-32 md:h-48 aspect-square ${
									item.logo_image ? "bg-[image:var(--image-url)]" : "bg-[#D9D9D9]"
								} rounded-md bg-no-repeat bg-cover bg-center relative my-slide-content mx-2`}
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
						</div>
					))}
				</div>
			</div>
		</SectionWrapper>
	);
};

export default PreviewLogo1;
