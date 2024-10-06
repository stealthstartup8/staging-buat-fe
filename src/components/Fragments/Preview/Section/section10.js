import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Scrollbar, Autoplay, FreeMode, Pagination } from "swiper/modules";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Fragment, useRef } from "react";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import HorizontalScrollWrapper from "@/components/Elements/Wrapper/HorizontalScrollWrapper";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import VideoPlayer from "@/components/Elements/Player/VideoPlayer";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
const PreviewSection10 = ({
	label_slices,
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	sectionComponentHero,
	editable,
	onClick,
}) => {
	const { setSectionComponentHero, setIndexComponent } = useStyleManagement();
	const swiperRef = useRef(null);
	const { onClickInnerComponent } = useStyleManagement();

	return (
		<SectionWrapper
			section={section}
			className="z-20  min-h-screen bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center flex items-center space-y-6  gap-16 overflow-x-clip "
			video={false}
		>
			{editable ? (
				<div className=" min-h-screen md:px-20 md:h-[70vh] w-full aspect-square">
					<Swiper
						onSwiper={(swiper) => {
							swiperRef.current = swiper;
						}}
						modules={[Scrollbar, Autoplay, FreeMode, Pagination]}
						spaceBetween={50}
						slidesPerView={1}
					>
						{value_component.components.map((item, index) => (
							<Fragment key={"edit" + index}>
								<SwiperSlide>
									<div className="md:h-full lg:px-0  justify-center   bg-no-repeat bg-cover bg-center md:flex items-center space-y-10 md:space-y-0 gap-10">
										<div className="container w-full md:w-[50%] relative">
											<div
												style={{
													"--image-url": `url(${value_component.components[index].background_image})`,
												}}
												className={`${
													value_component.components.length > 1 ? "" : "mb-8"
												} bg-[image:var(--image-url)] w-[100%] h-96 md:h-[70vh] bg-[#D9D9D9] md:rounded-md bg-no-repeat bg-cover bg-center relative my-slide-content `}
											>
												{value_component.components[index].background_type ===
													"video" && (
													<>
														<VideoPlayer
															buttonPosition={"bottom-left"}
															source={item.background_image.replace(
																/^"|"$/g,
																""
															)}
														/>
													</>
												)}
											</div>
										</div>
										<div className="w-full md:w-[60%] px-4 md:px-0 flex flex-col justify-center space-y-4">
											<Label
												label_slices={label_slices}
												item={item}
												font_slices={font_slices}
												onClickInnerComponent={onClickInnerComponent}
												editable={editable}
												section={section}
												idComponent={idComponent}
												sectionComponentHero={sectionComponentHero}
											/>
											<Headline
												font_slices={font_slices}
												section={section}
												title={value_component.components[index].title}
												idComponent={idComponent}
												sectionComponentHero={sectionComponentHero}
												lineHeight="60px"
												editable={editable}
											/>
											<Tagline
												font_slices={font_slices}
												section={section}
												tagline={value_component.components[index].tagline}
												idComponent={idComponent}
												sectionComponentHero={sectionComponentHero}
												editable={editable}
											/>

											{value_component.components[index].show_button == true && (
												<div className="container w-fit">
													<Button
														button_slices={button_slices}
														font_slices={font_slices}
														onClickInnerComponent={onClickInnerComponent}
														editable={editable}
														section={section}
													/>
												</div>
											)}
										</div>
									</div>
								</SwiperSlide>
							</Fragment>
						))}
					</Swiper>
				</div>
			) : (
				<HorizontalScrollWrapper>
					{value_component.components.map((item, index) => (
						<div
							key={"preview" + index}
							className="md:h-full pt-20 lg:pt-0 lg:px-20 w-screen  justify-center    md:flex items-center space-y-10 md:space-y-0 gap-10"
						>
							<div className=" w-full md:w-[50%] relative">
								<div
									style={{
										"--image-url": `url(${value_component.components[index].background_image})`,
									}}
									className={`${
										value_component.components.length > 1 ? "" : "mb-8"
									} bg-[image:var(--image-url)] w-[100%] h-96 md:h-[70vh] bg-[#D9D9D9] md:rounded-md bg-no-repeat bg-cover bg-center relative my-slide-content `}
								>
									{value_component.components[index].background_type === "video" && (
										<>
											<VideoPlayer
												buttonPosition={"bottom-left"}
												source={item.background_image.replace(/^"|"$/g, "")}
											/>
										</>
									)}
								</div>
							</div>
							<div className="w-full md:w-[60%] px-4 md:px-0 flex flex-col justify-center space-y-4">
								<Label
									label_slices={label_slices}
									item={item}
									font_slices={font_slices}
									onClickInnerComponent={onClickInnerComponent}
									editable={editable}
									section={section}
									idComponent={idComponent}
									sectionComponentHero={sectionComponentHero}
								/>
								<Headline
									font_slices={font_slices}
									section={section}
									title={value_component.components[index].title}
									idComponent={idComponent}
									sectionComponentHero={sectionComponentHero}
									lineHeight="60px"
									editable={editable}
								/>
								<Tagline
									font_slices={font_slices}
									section={section}
									tagline={value_component.components[index].tagline}
									idComponent={idComponent}
									sectionComponentHero={sectionComponentHero}
									editable={editable}
								/>

								{value_component.components[index].show_button == true && (
									<div className="container w-fit">
										<Button
											button_slices={button_slices}
											font_slices={font_slices}
											onClickInnerComponent={onClickInnerComponent}
											editable={editable}
											section={section}
										/>
									</div>
								)}
							</div>
						</div>
					))}
				</HorizontalScrollWrapper>
			)}
		</SectionWrapper>
	);
};

export default PreviewSection10;
