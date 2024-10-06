import { Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";

const PreviewBlog1 = ({
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
	const [swiperPage, setSwiperPage] = useState(1);
	const { onClickInnerComponent } = useStyleManagement();
	const blog_data = useSelector((state) => state.blogSlice.blog_data);

	return (
		<SectionWrapper
			section={section}
			className="relative z-20 w-screen min-h-[100vh] lg:h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10 md:px-10"
		>
			{value_component.components.map((item, index) => (
				<div
					key={index}
					className="p-4 gap-4 lg:p-0 container mx-auto lg:flex justify-center items-center min-h-[100%] w-full relative bg-no-repeat bg-cover bg-center"
				>
					<div className="p-2 lg:w-5/12 ">
						<div className="container mx-auto mb-4 lg:border-r border-[#CACACA]">
							<Headline
								font_slices={font_slices}
								section={section}
								title={value_component.components[index].title}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
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
					</div>

					<div className="justify-center lg:w-7/12">
						<div className="">
							{blog_data.length > 0 ? (
								<>
									<Swiper
										spaceBetween={50}
										slidesPerView="auto"
										onSlideChange={(swiper) => setSwiperPage(swiper.activeIndex + 1)}
										// onSwiper={(swiper) => console.log(swiper)}
										freeMode={true}
										mousewheel={true}
										modules={[FreeMode, Scrollbar, Mousewheel]}
										direction={"horizontal"}
									>
										{filteredDataByLabel(blog_data, value_component).map(
											(blog, index) => {
												const sanitizedContent = sanitizeHTML(blog.content);

												return (
													<Fragment key={index}>
														<SwiperSlide>
															<div className="lg:flex gap-5 items-center relative">
																<div className="lg:w-4/12 flex justify-end lg:w-[100%] lg:h-[75vh]">
																	<img
																		src={`${
																			process.env
																				.NEXT_PUBLIC_APP_ENV === "dev"
																				? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/thumbnail-blog/${blog.thumbnail}`
																				: `${blog.thumbnail}`
																		}`}
																		alt="post"
																		className="lg:h-[75vh] object-cover rounded-sm mb-1"
																	/>
																</div>
																<div
																	style={{
																		textAlign: font_slices?.label?.align,
																	}}
																	className="lg:w-8/12 lg:mt-0 mt-4"
																>
																	{blog.labels
																		.filter(
																			(label) =>
																				label.labelId ===
																				value_component.blog_detail[0]
																					?.id_label
																		)
																		.map((label, index) => {
																			return (
																				<Fragment key={index}>
																					<Label
																						key={index}
																						label_slices={
																							label_slices
																						}
																						font_slices={
																							font_slices
																						}
																						editable={false}
																					>
																						{label.label_tags.name.replace(
																							/\b\w/g,
																							(match) =>
																								match.toUpperCase()
																						)}
																					</Label>
																				</Fragment>
																			);
																		})}
																	<p
																		style={{
																			color: font_slices?.headline
																				?.color,
																			fontFamily:
																				font_slices?.headline
																					?.font_style,
																		}}
																		key={index}
																		className="text-[24px] my-1 font-bold"
																	>
																		{blog.title}
																	</p>
																	<p
																		style={{
																			color: font_slices?.tagline
																				?.color,
																			fontFamily:
																				font_slices?.tagline
																					?.font_style,
																		}}
																		className={`line-clamp-3 text-[16px] opacity-50 ${
																			value_component.components[0]
																				.show_button && "mb-[20px]"
																		}`}
																		dangerouslySetInnerHTML={{
																			__html: sanitizedContent,
																		}}
																	></p>
																	<div className="">
																		{value_component.components[0]
																			.show_button ? (
																			<Button
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
														</SwiperSlide>
													</Fragment>
												);
											}
										)}
									</Swiper>
									{value_component.blog_detail.length > 1 && (
										<div className="hidden lg:block mt-2 text-[#D9D9D9] ">
											<p>
												0{swiperPage}/0{value_component.blog_detail.length}
											</p>
										</div>
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

export default PreviewBlog1;
