import React, { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

import AccordionTemp from "@/components/Elements/Accordion";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useFontSize } from "@/utils/constants/FontSize";
import { Button } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import { Fragment } from "react";
import Headline from "@/components/Elements/InnerTemplate/Headline";

function Icon({ id, open }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
		</svg>
	);
}

const PreviewFAQ1 = ({
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
	const { getLabelFontSize, getTaglineFontSize } = useFontSize();

	const [open, setOpen] = useState(0);
	const handleOpen = (value) => setOpen(open === value ? 0 : value);

	return (
		<SectionWrapper
			section={section}
			className="z-20 bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center flex items-start pt-16 lg:justify-center md:w-screen h-screen p-2 lg:h-screen relative"
		>
			<div className="z-10 p-4 container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
				<div className="lg:col-span-2">
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
				<div className="lg:col-span-3">
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
						<div className="flex justify-end mt-4 mb-4">
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
			<div></div>
		</SectionWrapper>
	);
};

export default PreviewFAQ1;
