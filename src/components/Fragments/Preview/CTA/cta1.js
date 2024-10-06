import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Button } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";

const PreviewCTA1 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	label_slices,
	font_slices,
	sectionComponentHero,
	editable,
}) => {
	const { onClickInnerComponent } = useStyleManagement();

	return (
		<SectionWrapper
			section={section}
			className="z-20 p-4 relative md:w-screen h-[100%] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10"
		>
			{value_component.components.map((item, index) => (
				<div
					className="flex flex-col justify-center md:w-screen h-[100%] relative bg-no-repeat bg-cover bg-center"
					key={index}
				>
					<div className="p-2">
						<div className="container mx-auto mb-7">
							<Headline
								font_slices={font_slices}
								section={section}
								title={item.title}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
							/>
							<Tagline
								font_slices={font_slices}
								section={section}
								tagline={item.tagline}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
							/>
						</div>
						<div className="container mx-auto">
							{value_component.components[0].show_button == true ? (
								<Button
									button_slices={button_slices}
									font_slices={font_slices}
									onClickInnerComponent={onClickInnerComponent}
									editable={editable}
									section={section}
								/>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			))}
		</SectionWrapper>
	);
};

export default PreviewCTA1;
