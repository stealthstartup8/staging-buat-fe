import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Scrollbar, Autoplay, FreeMode, Pagination } from "swiper/modules";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Fragment, useRef, useState } from "react";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import VideoPlayer from "@/components/Elements/Player/VideoPlayer";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
const PreviewSection8 = ({
	section,
	value_component,
	label_slices,
	idComponent,
	button_slices,
	font_slices,
	sectionComponentHero,
	editable,
	onClick,
}) => {
	const { setIndexComponent, setSectionComponentHero } = useStyleManagement();
	const swiperRef = useRef(null);
	const { onClickInnerComponent } = useStyleManagement();
	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<SectionWrapper
			section={section}
			className="z-20 md:w-screen min-h-screen md:grid grid-cols-5 relative"
			video={false}
		>
			<div
				style={{
					"--image-url": `url("${section.background_image}")`,
					backgroundColor: section.background_color,
				}}
				className=" bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center container mx-auto w-[100%] flex gap-4  col-span-2 md:pb-20 pl-10 md:bg-black z-10 relative"
			>
				{section.background_type == "video" && (
					<video
						src={section.background_image}
						autoPlay
						loop
						muted
						className="w-[100%] h-[100%] object-cover bgVideo z-[-1]"
					></video>
				)}
			</div>

			<div className="col-span-3 z-20">
				<Swiper
					loop={true}
					autoplay={false}
					onSlideChange={(e) => {
						setActiveSlide(e.realIndex);
					}}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					modules={[Scrollbar, Autoplay, FreeMode, Pagination]}
					slidesPerView={1}
				>
					{value_component.components.map((item, index) => (
						<Fragment key={index}>
							<SwiperSlide>
								<div className="lg:px-0 md:px-4 justify-center relative bg-no-repeat bg-cover bg-center ">
									<div className="container mx-auto ">
										<div
											style={{
												"--image-url": `url(${value_component.components[activeSlide]?.background_image})`,
											}}
											className="bg-[image:var(--image-url)] w-[100%] h-[100vh]  md:rounded-md bg-no-repeat bg-cover bg-center relative my-slide-content"
										>
											{value_component.components[activeSlide]?.background_type ===
												"video" && (
												<>
													<VideoPlayer
														buttonPosition={"bottom-left"}
														source={item.background_image.replace(/^"|"$/g, "")}
													/>
												</>
											)}
										</div>
									</div>
								</div>
							</SwiperSlide>
						</Fragment>
					))}
				</Swiper>
				<div className="container mx-auto">
					<div className="w-[90%] space-y-2  absolute bottom-0 left-0 z-10 ml-10 mb-20">
						<div className="container mx-auto ">
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
								section={section}
								title={value_component.components[activeSlide].title}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
							/>
							<Tagline
								font_slices={font_slices}
								section={section}
								tagline={value_component.components[activeSlide].tagline}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
							/>
							{value_component.components[activeSlide]?.show_button == true && (
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
				</div>
			</div>
		</SectionWrapper>
	);
};

export default PreviewSection8;
