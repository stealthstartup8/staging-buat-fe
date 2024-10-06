import { useState, useRef, Fragment } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Icon } from "@iconify-icon/react";
import { Button as InnerButton, Label } from "@/components/Elements/InnerTemplate";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";
const PreviewBlog7 = ({
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
	const { onClickInnerComponent, setSectionComponentHero } = useStyleManagement();
	const [labelId, setLabelId] = useState("");
	const blog_data = useSelector((state) => state.blogSlice.blog_data);
	const label_data = useSelector((state) => state.blogSlice.label_data);
	const swiperRef = useRef(null);
	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<SectionWrapper
			section={section}
			className="relative z-20 w-screen min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10"
		>
			{value_component.components.map((item, index) => (
				<div
					key={index}
					className="container mx-auto px-10 h-full flex items-center flex-col md:flex-row mt-12 w-screen relative bg-no-repeat bg-cover bg-center"
				>
					<div className="p-2 h-full">
						<div className="container mx-auto mb-4">
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
						<div className="flex gap-4 w-[100%] mb-2">
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

					<div className="flex w-full lg:w-[65%]">
						<div className="w-full relative pb-3 overflow-visible">
							<Swiper
								className="relative overflow-visible"
								onSwiper={(swiper) => {
									swiperRef.current = swiper;
								}}
								onSlideChange={(e) => {
									setActiveSlide(e.realIndex);
								}}
								breakpoints={{
									0: {
										slidesPerView: 1,
									},
									768: {
										slidesPerView: 3,
									},
								}}
								spaceBetween={4}
								direction="horizontal"
								loop={true}
								autoplay={{
									delay: 5000,
									disableOnInteraction: false,
									pauseOnMouseEnter: true,
								}}
								modules={[Autoplay]}
							>
								{blog_data.length > 0 ? (
									<>
										{filteredDataByLabel(blog_data, value_component, labelId).map(
											(blog, idxBlog) => {
												const sanitizedContent = sanitizeHTML(blog.content);
												return (
													<Fragment key={idxBlog}>
														<SwiperSlide
															onClick={() =>
																setSectionComponentHero(idxBlog + 1)
															}
														>
															<div
																style={{
																	backgroundColor: section.background_color,
																	borderColor: section.background_color,
																}}
																className="max-w-[300px] w-full md:w-64 min-h-[27rem] relative flex flex-col justify-center items-center px-10 py-4"
															>
																<img
																	src={`${
																		process.env.NEXT_PUBLIC_APP_ENV ===
																		"dev"
																			? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/thumbnail-blog/${blog.thumbnail}`
																			: `${blog.thumbnail}`
																	}`}
																	alt="post"
																	className={`object-cover rounded-sm mb-1 absolute w-full h-full ${
																		idxBlog === sectionComponentHero - 1
																			? "border-4 border-blue-900 border-spacing-1 border-dashed"
																			: ""
																	}`}
																/>
																<div className="absolute bg-gradient-to-t from-black/70 to-transparent w-full h-full top-0 left-0"></div>
																<div className="w-[80%] flex flex-col gap-3 self-start bottom-3 absolute left-3">
																	<p
																		style={{
																			color: font_slices?.tagline
																				?.color,
																			fontFamily:
																				font_slices?.tagline
																					?.font_style,
																		}}
																		key={index}
																		className="font-bold"
																	>
																		{blog.title}
																	</p>
																	{value_component.components[0]
																		.show_button ? (
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
														</SwiperSlide>
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
							</Swiper>
							<div className="text-[#C6C6C6] flex gap-3 absolute -bottom-10 left-0 z-10">
								{swiperRef.current &&
									Array.from({
										length: Math.ceil(
											swiperRef.current.slides.length /
												swiperRef.current.params.slidesPerView
										),
									}).map((_, index) => (
										<Fragment key={index}>
											<Icon
												icon={index === activeSlide ? "tabler:circle-dot" : "bi:dot"}
												width={25}
												className="cursor-pointer"
												onClick={() =>
													swiperRef.current.slideTo(
														index * swiperRef.current.params.slidesPerView
													)
												}
											/>
										</Fragment>
									))}
							</div>
						</div>
					</div>
				</div>
			))}
		</SectionWrapper>
	);
};

export default PreviewBlog7;
