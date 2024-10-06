import { useState, useRef, Fragment } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Icon } from "@iconify-icon/react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import { Button as InnerButton, Label } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";

const PreviewBlog4 = ({
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
	const swiperRef = useRef(null);
	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<SectionWrapper
			section={section}
			className="relative z-20 w-screen min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10 md:px-10"
		>
			{value_component.components.map((item, index) => (
				<div
					key={index}
					className="p-10 space-y-5 w-full h-[100%] relative bg-no-repeat bg-cover bg-center"
				>
					<div className="p-2">
						<div className="container mx-auto flex justify-between items-center">
							<Headline
								font_slices={font_slices}
								section={section}
								title={value_component.components[index].title}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
								className="mb-[-5px] overflow-hidden w-fit h-fit text-start"
							/>
							{value_component.components[0].show_button == true ? (
								<InnerButton
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

					{blog_data.length > 0 ? (
						<div className="w-full h-[75vh] md:h-[60vh] relative overflow-visible">
							<Swiper
								className="relative overflow-visible"
								onSwiper={(swiper) => {
									swiperRef.current = swiper;
								}}
								onSlideChange={(e) => {
									setActiveSlide(e.realIndex);
								}}
								slidesPerView={1}
								loop={true}
								autoplay={{
									delay: 5000,
									disableOnInteraction: false,
									pauseOnMouseEnter: true,
								}}
								modules={[Autoplay]}
								breakpoints={{
									320: {
										spaceBetween: 20,
										direction: "horizontal",
									},
									640: {
										spaceBetween: 30,
										direction: "horizontal",
									},
									768: {
										spaceBetween: 40,
										direction: "horizontal",
									},
									1024: {
										spaceBetween: 50,
										direction: "vertical",
									},
								}}
							>
								{filteredDataByLabel(blog_data, value_component).map((blog, index) => {
									const sanitizedContent = sanitizeHTML(blog.title);
									return (
										<Fragment key={index}>
											<SwiperSlide className="relative">
												<div className="flex rounded-xl w-full h-[75vh] md:h-[60vh] relative overflow-hidden items-end justify-start p-5">
													<img
														src={`${
															process.env.NEXT_PUBLIC_APP_ENV === "dev"
																? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/thumbnail-blog/${blog.thumbnail}`
																: `${blog.thumbnail}`
														}`}
														alt="post"
														className="object-cover object-center rounded-sm mb-1 w-full absolute top-0 left-0 h-[75vh] md:h-[60vh]"
													/>
													<div className="absolute bg-gradient-to-t from-black to-transparent w-full h-full top-0 left-0"></div>
													<div className="flex flex-col justify-start gap-4 absolute left-8 bottom-8">
														{blog.labels
															.filter(
																(label) =>
																	label.labelId ===
																	value_component.blog_detail[0]?.id_label
															)
															.map((label, index) => {
																return (
																	<Fragment key={index}>
																		<Label
																			key={index}
																			label_slices={label_slices}
																			font_slices={font_slices}
																			editable={false}
																		>
																			{label.label_tags.name.replace(
																				/\b\w/g,
																				(match) => match.toUpperCase()
																			)}
																		</Label>
																	</Fragment>
																);
															})}
														<div
															className="font-bold text-3xl text-white"
															dangerouslySetInnerHTML={{
																__html:
																	sanitizedContent.length > 200
																		? sanitizedContent.substring(0, 200) +
																		  "..."
																		: sanitizedContent,
															}}
														></div>
													</div>
												</div>
											</SwiperSlide>
										</Fragment>
									);
								})}
							</Swiper>
							<div className="text-[#C6C6C6] flex md:flex-col gap-3 absolute -bottom-10 left-0 md:left-auto md:bottom-0 md:-right-10">
								{swiperRef.current &&
									swiperRef.current.slides.map((slide, index) => (
										<Fragment key={index}>
											<Icon
												key={index}
												icon={index === activeSlide ? "tabler:circle-dot" : "bi:dot"}
												width={25}
												className="cursor-pointer"
												onClick={() => swiperRef.current.slideTo(index - 1)}
											/>
										</Fragment>
									))}
							</div>
						</div>
					) : (
						<span className="text-[#c21d30] border border-1 border-dashed border-[#c21d30] py-1 px-3">
							Publish your blog first!
						</span>
					)}
				</div>
			))}
		</SectionWrapper>
	);
};

export default PreviewBlog4;
