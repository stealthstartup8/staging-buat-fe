import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import { Fragment, useState, useRef } from "react";
import SwiperButton1 from "@/components/Elements/Button/SwiperButton1";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import VideoPlayer from "@/components/Elements/Player/VideoPlayer";
const PreviewSection4 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	label_slices,
	sectionComponentHero,
	editable,
}) => {
	const swiperRef = useRef(null);
	const { setIndexComponent, setSectionComponentHero, onClickInnerComponent } = useStyleManagement();
	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<SectionWrapper
			section={section}
			className="z-20 w-screen min-h-screen bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center pb-10 md:py-20 relative"
		>
			<Swiper
				loop
				spaceBetween={50}
				ref={swiperRef}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				slidesPerView={1}
				onSlideChange={(e) => {
					setActiveSlide(e.realIndex);
				}}
			>
				{value_component.components.map((item, index) => (
					<Fragment key={index}>
						<SwiperSlide>
							<div className=" lg:px-0 md:px-4 justify-center w-screen relative bg-no-repeat bg-cover bg-center">
								<div className="container mx-auto w-[100%]">
									<div
										style={{
											"--image-url": `url(${value_component.components[index].background_image})`,
										}}
										className={`${
											value_component.components.length > 1 ? "" : "mb-8"
										} bg-[image:var(--image-url)] w-[100%] h-[50vh]  rounded-md bg-no-repeat bg-cover bg-center relative`}
									>
										{value_component.components[index].background_type == "video" && (
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
			</Swiper>
			<div className="px-4 md:px-0 container mx-auto">
				{value_component.components.length > 1 ? (
					<SwiperButton1
						loop
						containerStyle="p-4 flex justify-end space-x-2 md:justify-center w-[100%]"
						onNext={() => swiperRef.current.slideNext()}
						onPrev={() => swiperRef.current.slidePrev()}
						darkMode
					/>
				) : (
					""
				)}
				<div className="px-4 md:px-0">
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
				<div className="lg:flex lg:mb-0 mb-8 mt-4 px-4 md:px-0">
					<div className="w-full lg:mb-0 mb-6">
						<Tagline
							font_slices={font_slices}
							section={section}
							tagline={value_component.components[activeSlide].tagline}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
							editable={editable}
						/>
					</div>
					<div>
						{value_component.components[activeSlide].show_button == true ? (
							<div className="container w-fit">
								<Button
									button_slices={button_slices}
									font_slices={font_slices}
									onClickInnerComponent={onClickInnerComponent}
									editable={editable}
									section={section}
								/>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
};

export default PreviewSection4;
