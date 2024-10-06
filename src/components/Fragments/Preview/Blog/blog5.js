import { useState, useRef, Fragment } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Icon } from "@iconify-icon/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { useFontSize } from "@/utils/constants/FontSize";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import { Button as InnerButton, Label } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";
const PreviewBlog5 = ({
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
	const { setSectionComponentHero, onClickInnerComponent } = useStyleManagement();
	const blog_data = useSelector((state) => state.blogSlice.blog_data);
	const label_data = useSelector((state) => state.blogSlice.label_data);
	const [labelId, setLabelId] = useState("");
	const { getTaglineFontSize } = useFontSize();
	const swiperRef = useRef(null);
	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<SectionWrapper
			section={section}
			className="relative z-20 w-screen min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center pt-10 pb-12 md:px-10"
		>
			{value_component.components.map((item, index) => (
				<div
					key={index}
					className="px-4 flex flex-col mt-12 w-full h-[100%] relative bg-no-repeat bg-cover bg-center"
				>
					<div className="p-2">
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
						<div className="flex gap-4 w-[100%] lg:justify-center mb-2 flex-nowrap overflow-y-auto">
							{label_data
								.filter((label) =>
									value_component.blog_detail.some((item) => item.id_label === label.id)
								)
								.map((label, index) => {
									return (
										<Fragment key={index}>
											<Label
												key={index}
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

					<div className="flex justify-center">
						<div className="w-[90%] relative pb-3 overflow-visible">
							<Swiper
								className="relative overflow-visible flex justify-center"
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
									640: {
										slidesPerView: 2,
									},
									1024: {
										slidesPerView: 4,
									},
								}}
								spaceBetween={2}
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
																className="max-w-[328px]  w-full md:w-72 min-h-[27rem] relative flex flex-col justify-center items-center px-10 py-4"
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
																<div className="w-[80%] bottom-3 absolute left-3 flex flex-col gap-3">
																	<p
																		style={{
																			color: font_slices?.tagline
																				?.color,
																			fontFamily:
																				font_slices?.tagline
																					?.font_style,
																			fontSize: getTaglineFontSize(
																				font_slices?.tagline
																					?.font_size
																			),
																		}}
																		key={index}
																		className=" font-bold self-start "
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
							<div className="text-[#C6C6C6] flex gap-3 absolute -bottom-10 right-0 md:right-auto md:inset-x-1/2 z-10">
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

export default PreviewBlog5;
