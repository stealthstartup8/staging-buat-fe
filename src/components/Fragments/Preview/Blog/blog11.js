import { useEffect, useState, useRef, Fragment } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Icon } from "@iconify-icon/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { cn } from "@/utils/helpers/ClassName";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import { Button as InnerButton } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";

const PreviewBlog11 = ({
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
	const blog_data = useSelector((state) => state.blogSlice.blog_data);
	const [labelId, setLabelId] = useState("");

	const swiperRef = useRef(null);
	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<SectionWrapper
			section={section}
			className="relative p-4 z-20 w-screen py-16 lg:py-10 lg:min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center md:px-10"
		>
			<div className="flex flex-col gap-10 container mx-auto">
				{value_component?.components.map((item, index) => (
					<div key={index} className="flex">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<Headline
								font_slices={font_slices}
								section={section}
								title={value_component.components[index].title}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
								className="mb-[-5px] line-clamp-3"
							/>
							<Tagline
								font_slices={font_slices}
								section={section}
								tagline={value_component.components[index].tagline}
								className={`line-clamp-4 flex gap-3 grow `}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
							/>
						</div>
					</div>
				))}
				{filteredDataByLabel(blog_data, value_component, labelId).length > 0 && (
					<div className="flex justify-center">
						<div className="w-full relative pb-3 overflow-visible">
							<Swiper
								onSwiper={(swiper) => {
									swiperRef.current = swiper;
								}}
								onSlideChange={(e) => {
									setActiveSlide(e.realIndex);
								}}
								breakpoints={{
									0: {
										slidesPerView: 1,
										spaceBetween: 10,
									},
									640: {
										slidesPerView: 2,
										spaceBetween: 15,
									},
									1024: {
										slidesPerView: 4,
										spaceBetween: 20,
									},
								}}
								direction="horizontal"
								loop={true}
								autoplay={{
									delay: 5000,
									disableOnInteraction: false,
									pauseOnMouseEnter: true,
								}}
								modules={[Autoplay]}
							>
								{filteredDataByLabel(blog_data, value_component, labelId).map(
									(blog, idxBlog) => (
										<SwiperSlide
											key={idxBlog}
											onClick={() => setSectionComponentHero(idxBlog + 1)}
										>
											<div
												style={{
													backgroundColor: section.background_color,
													borderColor: section.background_color,
												}}
												className="min-w-[294px] w-[294px] border border-1 relative"
											>
												<img
													src={`${
														process.env.NEXT_PUBLIC_APP_ENV === "dev"
															? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/thumbnail-blog/${blog.thumbnail}`
															: `${blog.thumbnail}`
													}`}
													alt="post"
													className={cn(
														"w-[294px] h-[294px] object-cover rounded-sm mb-1",
														idxBlog === sectionComponentHero - 1
															? "border-4 border-blue-900 border-spacing-1 border-dashed"
															: ""
													)}
												/>
												<div className="text-start">
													<p
														style={{
															color: font_slices?.headline?.color,
															fontFamily: font_slices?.headline?.font_style,
														}}
														className="text-xl md:text-2xl line-clamp-1 mb-1 font-bold"
													>
														{blog.title}
													</p>
													<p
														style={{
															color: font_slices?.tagline?.color,
															fontFamily: font_slices?.tagline?.font_style,
														}}
														className={`text-sm md:text-base opacity-50 line-clamp-2 ${
															value_component.components[0].show_button &&
															"mb-[60px]"
														}`}
														dangerouslySetInnerHTML={{
															__html: sanitizeHTML(blog.content),
														}}
													></p>
													<div className="absolute bottom-0 left-0">
														{value_component.components[0].show_button ? (
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
											</div>
										</SwiperSlide>
									)
								)}
							</Swiper>
							<div className="text-[#C6C6C6] md:hidden flex gap-3 absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-10">
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
				)}
			</div>
		</SectionWrapper>
	);
};

export default PreviewBlog11;
