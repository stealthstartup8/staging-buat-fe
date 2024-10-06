import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import { Fragment, useRef, useState } from "react";
import SwiperButton1 from "@/components/Elements/Button/SwiperButton1";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import VideoPlayer from "@/components/Elements/Player/VideoPlayer";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
const PreviewSection1 = ({
	section,
	value_component,
	label_slices,
	idComponent,
	button_slices,
	font_slices,
	editable,
	sectionComponentHero,
	onClick,
}) => {
	const swiperRef = useRef(null);
	const [activeSlide, setActiveSlide] = useState(0);
	const { setIndexComponent, setSectionComponentHero } = useStyleManagement();
	const { onClickInnerComponent } = useStyleManagement();

	return (
		<SectionWrapper
			section={section}
			className="z-20 w-screen relative h-screen bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center"
		>
			<Swiper
				loop={value_component?.components.length > 1}
				spaceBetween={50}
				slidesPerView={1}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				onSlideChange={(e) => {
					setActiveSlide(e.realIndex);
				}}
				onClick={(e) => {
					setIndexComponent(e.realIndex);
					setSectionComponentHero(e.realIndex);
				}}
			>
				{value_component?.components.length > 1 && (
					<>
						<SwiperButton1
							loop
							containerStyle="z-10 absolute bottom-0 right-0 p-4 flex"
							onPrev={() => swiperRef.current.slidePrev()}
							onNext={() => swiperRef.current.slideNext()}
						/>
					</>
				)}
				{value_component?.components.map((item, index) => (
					<Fragment key={index}>
						<SwiperSlide>
							<div
								style={{
									"--image-url": `url(${item.background_image})`,
								}}
								className="bg-[image:var(--image-url)] flex flex-col justify-center w-screen h-screen relative bg-no-repeat bg-cover bg-center"
							>
								{item.background_type == "video" && (
									<VideoPlayer
										buttonPosition={"bottom-left"}
										source={item.background_image.replace(/^"|"$/g, "")}
									/>
								)}
							</div>
						</SwiperSlide>
					</Fragment>
				))}
			</Swiper>
			<div className="container mx-auto">
				<div className="p-2 absolute top-1/2 -translate-y-1/2 ml-4 md:ml-20 z-50 ">
					<div className="  mb-7">
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
							title={value_component?.components[activeSlide].title}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
							editable={editable}
						/>
						<Tagline
							font_slices={font_slices}
							section={section}
							tagline={value_component?.components[activeSlide].tagline}
							className={` mt-4`}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
							editable={editable}
						/>
					</div>
					{value_component?.components[0].show_button == true ? (
						<div className="">
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
		</SectionWrapper>
	);
};

export default PreviewSection1;
