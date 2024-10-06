import { useEffect, useState, useRef, Fragment } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Icon } from "@iconify-icon/react";
import { useMediaQuery } from "react-responsive";
import { Button as InnerButton, Label } from "@/components/Elements/InnerTemplate";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { cn } from "@/utils/helpers/ClassName";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";

const PreviewBlog8 = ({
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
	const swiperRef = useRef(null);
	const [activeSlide, setActiveSlide] = useState(0);

	const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

	return (
		<SectionWrapper
			section={section}
			className="relative z-20 w-screen min-h-fit md:min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10 px-5 md:px-10"
		>
			{value_component.components.map((item, index) => (
				<div
					key={index}
					className="flex flex-col mt-12 w-full h-[100%] relative bg-no-repeat bg-cover bg-center"
				>
					<div className="md:p-2 px-5 flex flex-col items-start md:items-center justify-center">
						<div className="container w-full mb-4 ">
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
						<div className="flex gap-4 w-fit px-2 mb-2">
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
					{filteredDataByLabel(blog_data, value_component, labelId).length > 0 && (
						<div className="flex flex-col md:flex-row gap-10 justify-between mt-4 max-h-min">
							<div
								className={cn(
									"flex-col gap-2 grow relative max-w-[60%]",
									isTabletOrDesktop ? "flex" : "hidden"
								)}
							>
								<div className="aspect-video w-full h-max">
									<img
										src={`${
											process.env.NEXT_PUBLIC_APP_ENV === "dev"
												? `${
														process.env.NEXT_PUBLIC_API_KEY
												  }/assets/${domain_name}/assets/thumbnail-blog/${
														filteredDataByLabel(
															blog_data,
															value_component,
															labelId
														)[0].thumbnail
												  }`
												: `${
														filteredDataByLabel(
															blog_data,
															value_component,
															labelId
														)[0].thumbnail
												  }`
										}`}
										className="object-cover aspect-video w-full"
									/>
								</div>
								<p
									style={{
										color: font_slices?.headline?.color,
										fontFamily: font_slices?.headline?.font_style,
									}}
									className="text-2xl font-bold"
								>
									{filteredDataByLabel(blog_data, value_component, labelId)[0].title}
								</p>
								<p
									style={{
										color: font_slices?.headline?.color,
										fontFamily: font_slices?.headline?.font_style,
									}}
									className="opacity-40  line-clamp-2"
									dangerouslySetInnerHTML={{
										__html: sanitizeHTML(
											filteredDataByLabel(blog_data, value_component, labelId)[0]
												.content
										),
									}}
								></p>
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
							<div className="flex relative flex-col gap-5 w-full md:w-[40%] h-fit md:h-[80vh] overflow-visible">
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
											direction: "horizontal",
										},
										768: {
											slidesPerView: 3,
											direction: "vertical",
										},
									}}
									spaceBetween={8}
									loop={true}
									autoplay={{
										delay: 5000,
										disableOnInteraction: false,
										pauseOnMouseEnter: true,
									}}
									modules={[Autoplay]}
								>
									{filteredDataByLabel(blog_data, value_component, labelId)
										.slice(isTabletOrDesktop ? 1 : 0)
										.map((blog, index) => {
											return (
												<Fragment key={index}>
													<SwiperSlide>
														<div className="grid grid-flow-col gap-3 place-content-start">
															<div className="md:size-40 size-32">
																<img
																	src={`${
																		process.env.NEXT_PUBLIC_APP_ENV ===
																		"dev"
																			? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/thumbnail-blog/${blog.thumbnail}`
																			: `${blog.thumbnail}`
																	}`}
																	className="object-cover h-full w-full"
																/>
															</div>
															<div className="flex flex-col gap-2">
																<p
																	style={{
																		color: font_slices?.headline?.color,
																		fontFamily:
																			font_slices?.headline?.font_style,
																	}}
																	className="text-lg md:text-xl font-bold line-clamp-2 whitespace-pre-wrap"
																>
																	{blog.title}
																</p>
																<p
																	style={{
																		color: font_slices?.headline?.color,
																		fontFamily:
																			font_slices?.headline?.font_style,
																	}}
																	className="opacity-40 text-sm md:text-base line-clamp-3"
																	dangerouslySetInnerHTML={{
																		__html:
																			sanitizeHTML(blog.content)
																				.length > 60
																				? sanitizeHTML(
																						blog.content
																				  ).substring(0, 60) + "..."
																				: sanitizeHTML(blog.content),
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
															</div>
														</div>
													</SwiperSlide>
												</Fragment>
											);
										})}
								</Swiper>
								<div className="text-[#C6C6C6] flex gap-3 absolute -bottom-8 left-0 z-10">
									{swiperRef.current &&
										Array.from({
											length: Math.ceil(
												swiperRef.current.slides.length /
													swiperRef.current.params.slidesPerView
											),
										}).map((_, index) => (
											<Fragment key={index}>
												<Icon
													key={index}
													icon={
														index === activeSlide ? "tabler:circle-dot" : "bi:dot"
													}
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
			))}
		</SectionWrapper>
	);
};

export default PreviewBlog8;
