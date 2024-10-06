import { Fragment, useState } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import { Button as InnerButton, Label } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";
const PreviewBlog3 = ({
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

	return (
		<SectionWrapper
			section={section}
			className="relative z-20 w-screen min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10 md:px-10"
		>
			{value_component.components.map((item, index) => (
				<div
					key={index}
					className="flex flex-col mt-8 w-full h-[100%] relative bg-no-repeat bg-cover bg-center"
				>
					<div className="p-2">
						<div className="container mx-auto mb-8">
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
						<div className="flex gap-4 w-[100%] justify-center mb-8">
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

					<div className="px-4 flex justify-center">
						<div className="max-w-[100%] flex flex-nowrap overflow-x-auto overflow-y-auto gap-8 pb-3">
							{blog_data.length > 0 ? (
								<>
									{filteredDataByLabel(blog_data, value_component, labelId).map(
										(blog, index) => {
											const sanitizedContent = sanitizeHTML(blog.content);
											return (
												<Fragment key={index}>
													<div
														style={{
															backgroundColor: section.background_color,
															borderColor: section.background_color,
														}}
														className="min-w-[294px] lg:w-[294px] border border-1 relative"
													>
														<img
															src={`${
																process.env.NEXT_PUBLIC_APP_ENV === "dev"
																	? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/thumbnail-blog/${blog.thumbnail}`
																	: `${blog.thumbnail}`
															}`}
															alt="post"
															className="w-[100vw] lg:w-[294px] h-[294px] object-cover rounded-sm mb-1"
														/>
														<div className="text-center mt-6">
															<p
																style={{
																	color: font_slices?.headline?.color,
																	fontFamily:
																		font_slices?.headline?.font_style,
																}}
																key={index}
																className="text-[24px] mb-1 font-bold"
															>
																{blog.title}
															</p>
															<p
																style={{
																	color: font_slices?.tagline?.color,
																	fontFamily:
																		font_slices?.tagline?.font_style,
																}}
																className={`line-clamp-2 text-[16px] opacity-50 ${
																	value_component.components[0]
																		.show_button && "mb-4"
																}`}
																dangerouslySetInnerHTML={{
																	__html: sanitizedContent,
																}}
															></p>
															<div className="flex justify-center">
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
															</div>
														</div>
													</div>
												</Fragment>
											);
										}
									)}
								</>
							) : (
								<span className="text-[#c21d30] border border-1 border-dashed border-[#c21d30] py-1 px-3">
									Publish your blog first!
								</span>
							)}
						</div>
					</div>
				</div>
			))}
		</SectionWrapper>
	);
};

export default PreviewBlog3;
