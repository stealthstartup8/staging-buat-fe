import AccordionTemp from "@/components/Elements/Accordion";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useFontSize } from "@/utils/constants/FontSize";
import { Button } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import { Fragment, useState } from "react";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";

function Icon({ id, open }) {
	return (
		<svg
			width="34"
			height="34"
			viewBox="0 0 34 34"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
		>
			<path
				d="M17 4.25C9.96094 4.25 4.25 9.96094 4.25 17C4.25 24.0391 9.96094 29.75 17 29.75C24.0391 29.75 29.75 24.0391 29.75 17C29.75 9.96094 24.0391 4.25 17 4.25Z"
				stroke="black"
				stroke-miterlimit="10"
			/>
			<path
				d="M23.375 14.3438L17 20.7188L10.625 14.3438"
				stroke="black"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}

const PreviewFAQ3 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	label_slices,
	sectionComponentHero,
	editable,
}) => {
	const { onClickInnerComponent } = useStyleManagement();
	const { getLabelFontSize, getTaglineFontSize } = useFontSize();

	const [open, setOpen] = useState(0);
	const handleOpen = (value) => setOpen(open === value ? 0 : value);

	return (
		<SectionWrapper
			section={section}
			className="z-20 bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center  md:w-screen h-[100%] lg:h-screen relative"
		>
			<div className="z-10 container mx-auto gap-4 items-center px-4 pt-10 md:p-20 md:pr-14 md:w-[50rem]">
				<div>
					<Headline
						font_slices={font_slices}
						section={section}
						title={value_component.components[0].title}
						idComponent={idComponent}
						sectionComponentHero={sectionComponentHero}
						componentValue={"faq-font"}
						editable={editable}
					/>
				</div>
				<div>
					{value_component.faq.map((item, index) => (
						<Accordion
							className="border-b"
							style={{
								borderColor: font_slices?.label?.color,
							}}
							open={open === index + 1}
							icon={<Icon id={index + 1} open={open} />}
						>
							<AccordionHeader
								style={{
									color: font_slices?.label?.color,
									fontFamily: font_slices?.label?.font_style,
									fontWeight: font_slices?.label?.bold == true ? "700" : "normal",
									textDecoration: font_slices?.label?.text_decoration,
									fontStyle: font_slices?.label?.italic == true ? "italic" : "",
									fontSize: getLabelFontSize(font_slices?.label?.font_size),
									textAlign: font_slices?.label?.align,
								}}
								className="!border-none"
								onClick={() => handleOpen(index + 1)}
							>
								{item.question}
							</AccordionHeader>
							<AccordionBody
								style={{
									color: font_slices?.tagline?.color,
									fontFamily: font_slices?.tagline?.font_style,
									fontWeight: font_slices?.tagline?.bold == true ? "700" : "normal",
									textDecoration: font_slices?.tagline?.text_decoration,
									fontStyle: font_slices?.tagline?.italic == true ? "italic" : "",
									fontSize: getTaglineFontSize(font_slices?.tagline?.font_size),
									textAlign: font_slices?.tagline?.align,
								}}
								className="!pt-0"
							>
								{item.answer}
							</AccordionBody>
						</Accordion>
					))}

					{value_component.components[0].show_button == true ? (
						<div className="flex justify-between mt-4 mb-4">
							<div className="spanner mt-4"></div>
							<Button
								button_slices={button_slices}
								font_slices={font_slices}
								onClickInnerComponent={onClickInnerComponent}
								editable={editable}
								section={section}
							/>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</SectionWrapper>
	);
};

export default PreviewFAQ3;
