import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import { Fragment, useRef, useState } from "react";
import SwiperButton1 from "@/components/Elements/Button/SwiperButton1";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import VideoPlayer from "@/components/Elements/Player/VideoPlayer";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";

const PreviewSection2 = ({
	label_slices,
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	sectionComponentHero,
	editable,
}) => {
	const swiperRef = useRef();
	const [activeSlide, setActiveSlide] = useState(0);
	const { setIndexComponent, setSectionComponentHero, onClickInnerComponent } = useStyleManagement();

	return (
		<SectionWrapper
			section={section}
			className="z-20 w-screen h-screen flex flex-col md:flex-row md:justify-end min-h-screen md:h-screen relative"
			video={false}
		>
			<div className="w-full md:w-1/2">
				<Swiper
					loop
					ref={swiperRef}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					slidesPerView={1}
					onSlideChange={(e) => {
						setActiveSlide(e.realIndex);
					}}
					className=""
				>
					{value_component.components.map((item, index) => (
						<Fragment key={index}>
							<SwiperSlide>
								{item.background_image !== "" && (
									<div
										style={{
											"--image-url": `url(${item.background_image})`,
										}}
										className="bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center min-h-80 md:h-full "
									>
										{item.background_type == "video" && (
											<VideoPlayer
												buttonPosition={"bottom-left"}
												source={item.background_image.replace(/^"|"$/g, "")}
											/>
										)}
									</div>
								)}
							</SwiperSlide>
						</Fragment>
					))}
				</Swiper>
			</div>
			<div
				style={{
					"--image-url": `url("${section.background_image}")`,
					backgroundColor: section.background_color,
				}}
				className="z-20 w-full md:w-1/2 flex flex-col justify-center md:flex-col-reverse  lg:p-8 p-4 relative md:relative  md:gap-12  bg-[image:var(--image-url)] bg-no-repeat bg-cover h-full bg-center"
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
				{value_component.components.length > 1 && (
					<SwiperButton1
						loop
						containerStyle="z-10 space-x-2 absolute top-5 right-5 md:w-full flex justify-end md:justify-start md:static"
						onPrev={() => swiperRef.current.slidePrev()}
						onNext={() => swiperRef.current.slideNext()}
					/>
				)}
				<div>
					<div className="mb-6">
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
							className={`lg:w-6/12  min-w-full`}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
							editable={editable}
						/>
						<Tagline
							font_slices={font_slices}
							section={section}
							tagline={value_component.components[activeSlide].tagline}
							className={`lg:w-6/12 mt-4  min-w-full `}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
							editable={editable}
						/>
					</div>
					{value_component.components[0].show_button == true ? (
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
		</SectionWrapper>
	);
};

export default PreviewSection2;
