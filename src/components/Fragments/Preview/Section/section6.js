import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Scrollbar, Autoplay, FreeMode, Pagination } from "swiper/modules";
import { useDispatch } from "react-redux";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Fragment, useRef, useState } from "react";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import SwiperButton2 from "@/components/Elements/Button/SwiperButton2";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import VideoPlayer from "@/components/Elements/Player/VideoPlayer";

const PreviewSection6 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	label_slices,
	sectionComponentHero,
	editable,
	onClick,
}) => {
	const swiperRef = useRef(null);
	const { onClickInnerComponent, setIndexComponent, setSectionComponentHero } = useStyleManagement();
	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<SectionWrapper
			section={section}
			className="z-20 md:w-screen min-h-screen bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center relative"
		>
			<div className="container mx-auto w-[100%] flex gap-4 pt-10 md:py-20">
				<div className="w-[100%] space-y-6 px-4 md:px-0">
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
					{value_component.components[activeSlide]?.show_button && (
						<div className="container w-fit mx-auto">
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
			<Swiper
				loop
				autoplay={false}
				onSlideChange={(e) => {
					setActiveSlide(e.realIndex);
				}}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				modules={[Scrollbar, Autoplay, FreeMode, Pagination]}
				spaceBetween={50}
				slidesPerView={1}
			>
				{value_component.components.map((item, index) => (
					<Fragment key={index}>
						<SwiperSlide>
							<div className="lg:px-0 md:px-4 justify-center w-screen relative bg-no-repeat bg-cover bg-center pb-20">
								<div className="container mx-auto mt-8">
									<div
										style={{
											"--image-url": `url(${value_component.components[index]?.background_image})`,
										}}
										className={`${
											value_component.components.length > 1 ? "" : "mb-8"
										} bg-[image:var(--image-url)] w-[100%] h-80 md:h-[100vh]  md:rounded-md bg-no-repeat bg-cover bg-center relative my-slide-content`}
									>
										{value_component.components[index]?.background_type === "video" && (
											<VideoPlayer
												buttonPosition={"bottom-left"}
												source={item.background_image.replace(/^"|"$/g, "")}
											/>
										)}
									</div>
								</div>
							</div>
						</SwiperSlide>
					</Fragment>
				))}
				{value_component.components.length > 1 && (
					<SwiperButton2
						loop
						containerStyle="py-4 px-4 md:px-20 flex justify-center gap-16 md:gap-4 md:gap-0 md:justify-between absolute -bottom-4 md:top-1/2 md:bottom-auto md:-translate-y-1/2 w-[100%] z-50 "
						onPrev={() => swiperRef.current.slidePrev()}
						onNext={() => swiperRef.current.slideNext()}
						darkMode
					/>
				)}
			</Swiper>
		</SectionWrapper>
	);
};

export default PreviewSection6;
