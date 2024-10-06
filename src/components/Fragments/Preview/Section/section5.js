import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Scrollbar, Autoplay, FreeMode, Pagination } from "swiper/modules";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Fragment, useRef } from "react";
import { useState } from "react";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import SwiperPagination from "@/components/Elements/Pagination/SwiperPagination";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import VideoPlayer from "@/components/Elements/Player/VideoPlayer";
const PreviewSection5 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	sectionComponentHero,
	editable,
	label_slices,
	onClick,
}) => {
	const { setIndexComponent, setSectionComponentHero } = useStyleManagement();
	const swiperRef = useRef(null);
	const { onClickInnerComponent } = useStyleManagement();
	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<SectionWrapper
			section={section}
			className="z-20 w-screen min-h-screen bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center pt-10 md:py-20 relative"
		>
			<div className="container mx-auto w-[100%] flex-col md:flex md:flex-row gap-4  px-4 md:px-0">
				<div className="w-[100%]">
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
				</div>
				<div className="w-[100%]">
					<Tagline
						font_slices={font_slices}
						section={section}
						tagline={value_component.components[activeSlide].tagline}
						idComponent={idComponent}
						sectionComponentHero={sectionComponentHero}
						editable={editable}
					/>
					{value_component.components[activeSlide]?.show_button && (
						<div className="container w-fit mt-4">
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
				onSlideChange={(e) => {
					setActiveSlide(e.realIndex);
				}}
				onClick={(e) => {
					setIndexComponent(e.realIndex);
					setSectionComponentHero(e.realIndex);
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
						<SwiperSlide
							onClick={(e) => {
								setIndexComponent(e.realIndex);
								setSectionComponentHero(e.realIndex);
							}}
						>
							<div className="lg:px-0 md:px-4 justify-center w-screen relative bg-no-repeat bg-cover bg-center">
								<div className="w-[100%]">
									<div className="container mx-auto mt-8">
										<div
											style={{
												"--image-url": `url(${value_component.components[index]?.background_image})`,
											}}
											className={`${
												value_component.components.length > 1 ? "" : "mb-8"
											} bg-[image:var(--image-url)] w-[100%] h-[50vh]  md:rounded-md bg-no-repeat bg-cover bg-center relative my-slide-content`}
										>
											{value_component.components[index]?.background_type ===
												"video" && (
												<VideoPlayer
													buttonPosition={"bottom-left"}
													source={item.background_image.replace(/^"|"$/g, "")}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
					</Fragment>
				))}
				<SwiperPagination
					containerStyle="w-full flex justify-start md:justify-center gap-2  px-4 py-5 md:px-0"
					activeSlide={activeSlide}
					darkMode
					ref={swiperRef}
				/>
			</Swiper>
		</SectionWrapper>
	);
};

export default PreviewSection5;
