import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Scrollbar, Autoplay, FreeMode, Pagination } from "swiper/modules";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Fragment, useRef, useState } from "react";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import VideoPlayer from "@/components/Elements/Player/VideoPlayer";
const PreviewSection9 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	label_slices,
	font_slices,
	sectionComponentHero,
	editable,
	onClick,
}) => {
	const { setIndexComponent, setSectionComponentHero } = useStyleManagement();
	const [activeSlide, setActiveSlide] = useState(0);
	const swiperRef = useRef(null);
	const { onClickInnerComponent } = useStyleManagement();

	return (
		<SectionWrapper
			section={section}
			className="z-20 w-full min-h-screen md:h-[30rem] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center md:grid grid-cols-7 gap-10 relative  md:px-20 space-y-4 md:space-y-0 py-10 px-4"
		>
			<div
				style={{
					"--image-url": value_component.components[activeSlide]?.background_image
						? `url(${value_component.components[activeSlide]?.background_image})`
						: "",
				}}
				className={` ${
					value_component.components[activeSlide]?.background_image
						? "bg-[image:var(--image-url)]"
						: "bg-transparent"
				} w-full aspect-[5/3] md:col-span-5 md:h-full  rounded-2xl flex items-end   bg-no-repeat bg-cover bg-center relative my-slide-content `}
			>
				{value_component.components[activeSlide]?.background_type === "video" && (
					<>
						<VideoPlayer
							buttonPosition={"bottom-left"}
							source={value_component.components[activeSlide]?.background_image.replace(
								/^"|"$/g,
								""
							)}
						/>
					</>
				)}
			</div>
			<div className="col-span-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full flex-col h-[30rem] md:h-full  overflow-scroll overflow-x-auto  mt-0 ">
				<Swiper
					loop={false}
					direction="horizontal"
					ref={swiperRef}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					modules={[Scrollbar, Autoplay, FreeMode, Pagination]}
					slidesPerView={1.1}
					breakpoints={{
						640: {
							direction: "vertical",
							slidesPerView: 2.5,
						},
					}}
				>
					{value_component.components.map((item, index) => (
						<Fragment key={index}>
							<SwiperSlide
								onClick={() => {
									setIndexComponent(index);
									setSectionComponentHero(index);
								}}
							>
								<div
									style={{
										"--hover-bg": button_slices?.button_color
											? button_slices?.button_color
											: "#000000",
										"--hover-color": button_slices?.text_color
											? button_slices?.text_color
											: "#FFFFFF",
										backgroundColor: "transparent",
										color: button_slices?.button_color,
									}}
									className=" aspect-[4/3] md:aspect-[3/2] rounded-2xl border border-[#EFEFEF] p-4 transition-colors duration-300 flex flex-col  group hover:!text-[--hover-color] hover:!bg-[--hover-bg]"
									onClick={(e) => {
										e.stopPropagation();
										setActiveSlide(index);
										setSectionComponentHero(index);
										setIndexComponent(index);
									}}
								>
									<div className="space-y-2 mb-6">
										return (
										<Label
											label_slices={label_slices}
											item={value_component?.components[activeSlide]}
											font_slices={font_slices}
											onClickInnerComponent={onClickInnerComponent}
											editable={editable}
											section={section}
											idComponent={idComponent}
											sectionComponentHero={sectionComponentHero}
										/>
										<Headline
											font_slices={font_slices}
											style={{
												"--hover-color": button_slices?.text_color
													? button_slices?.text_color
													: "#FFFFFF",
											}}
											className="group-hover:!text-[--hover-color]"
											section={section}
											title={value_component.components[activeSlide].title}
											idComponent={idComponent}
											sectionComponentHero={sectionComponentHero}
											smaller
											editable={editable}
										/>
									</div>

									<div className="w-full flex justify-between">
										{value_component.components[index]?.show_button == true && (
											<div className="container w-fit">
												<Button
													button_slices={button_slices}
													font_slices={font_slices}
													onClickInnerComponent={onClickInnerComponent}
													editable={editable}
													section={section}
													styleButton={{
														"--hover-color": button_slices?.text_color,
														color: button_slices?.button_color,
														backgroundColor: "transparent",
													}}
													classNameButton={`group-hover:!text-[--hover-color] p-0 mt-auto`}
													largerFont
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
		</SectionWrapper>
	);
};

export default PreviewSection9;
