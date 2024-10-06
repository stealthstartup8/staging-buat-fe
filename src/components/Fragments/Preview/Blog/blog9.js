import { useEffect, useState, Fragment } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { Button as InnerButton, Label } from "@/components/Elements/InnerTemplate";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";

const PreviewBlog9 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	label_slices,
	font_slices,
	user_token,
	websiteid,
	editable,
	sectionComponentHero,
	domain_name,
	website,
}) => {
	const { onClickInnerComponent } = useStyleManagement();
	const blog_data = useSelector((state) => state.blogSlice.blog_data);
	const label_data = useSelector((state) => state.blogSlice.label_data);
	const [labelId, setLabelId] = useState("");

	const [open, setOpen] = useState(0);

	const handleOpen = (value) => setOpen(open === value ? 0 : value);

	return (
		<SectionWrapper
			section={section}
			className="relative z-20 w-screen min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10 md:px-10"
		>
			{value_component?.components.map((item, index) => (
				<div
					key={index}
					className="container mx-auto flex flex-col mt-12 w-full h-[100%] relative bg-no-repeat bg-cover bg-center"
				>
					<div className="p-2 pb-8">
						<div className="container mx-auto mb-6">
							<Headline
								font_slices={font_slices}
								section={section}
								title={value_component.components[index].title}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
								className="mb-[-5px]"
							/>
							<Tagline
								font_slices={font_slices}
								section={section}
								tagline={value_component.components[index].tagline}
								className={` mt-2`}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
							/>
						</div>
						<div className="flex gap-4 w-[100%] justify-center mb-2">
							{label_data
								.filter((label) =>
									value_component.blog_detail.some((item) => item.id_label === label.id)
								)
								.map((label, index) => {
									return (
										<Fragment key={index}>
											<Label
												label_slices={label_slices}
												font_slices={font_slices}
												editable={false}
												className={`${
													labelId == label.id ? "opacity-100" : "opacity-50"
												}`}
												onClick={() => {
													if (labelId == label.id) {
														setLabelId("");
													} else {
														setLabelId(label.id);
													}
												}}
											>
												{label.name.replace(/\b\w/g, (match) => match.toUpperCase())}
											</Label>
										</Fragment>
									);
								})}
						</div>
					</div>
					{filteredDataByLabel(blog_data, value_component, labelId).length > 0 && (
						<div className="flex flex-col md:flex-row md:justify-between gap-10 mb-10">
							<div className="lg:w-6/12 flex flex-col gap-2 grow order-last md:order-first relative">
								{filteredDataByLabel(blog_data, value_component, labelId).map(
									(blog, index) => {
										return (
											<Fragment key={index}>
												<Accordion
													open={open === index}
													className="group"
													onMouseEnter={() => handleOpen(index)}
												>
													<div className="flex flex-col gap-2">
														<AccordionHeader>
															<p
																style={{
																	// color: font_slices?.headline?.color,
																	fontFamily:
																		font_slices?.headline?.font_style,
																}}
																className={`text-[${font_slices?.headline?.color}] group-hover:text-[#4777FF] font-bold text-2xl line-clamp-1`}
															>
																{blog.title}
															</p>
														</AccordionHeader>
														<AccordionBody>
															<p
																style={{
																	color: font_slices?.headline?.color,
																	fontFamily:
																		font_slices?.headline?.font_style,
																}}
																className="mb-2 opacity-60 line-clamp-3"
																dangerouslySetInnerHTML={{
																	__html: sanitizeHTML(blog?.content),
																}}
															></p>
															{value_component.components[0].show_button ? (
																<InnerButton
																	button_slices={button_slices}
																	font_slices={font_slices}
																	onClickInnerComponent={
																		onClickInnerComponent
																	}
																	editable={editable}
																	section={section}
																/>
															) : (
																""
															)}
														</AccordionBody>
													</div>
												</Accordion>
											</Fragment>
										);
									}
								)}
							</div>
							<div className="order-first md:order-last text-black w-full md:w-6/12 relative">
								<img
									src={
										filteredDataByLabel(blog_data, value_component, labelId)[open]
											?.thumbnail
									}
									alt="blog-image"
									className="object-cover aspect-square w-full"
								/>
							</div>
						</div>
					)}
				</div>
			))}
		</SectionWrapper>
	);
};

export default PreviewBlog9;
