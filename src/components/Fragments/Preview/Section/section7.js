import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Scrollbar, Autoplay, FreeMode, Pagination } from "swiper/modules";
import { useDispatch } from "react-redux";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Fragment, useRef, useState } from "react";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import SwiperPagination from "@/components/Elements/Pagination/SwiperPagination";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import VideoPlayer from "@/components/Elements/Player/VideoPlayer";
const PreviewSection7 = ({
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
	const { indexComponent, setIndexComponent, setSectionComponentHero } = useStyleManagement();
	const [activeSlide, setActiveSlide] = useState(0);
	const swiperRef = useRef(null);
	const { onClickInnerComponent } = useStyleManagement();

	return (
		<SectionWrapper
			section={section}
			className="z-20 md:w-screen min-h-screen bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center space-y-6 pt-10 md:py-20 relative"
		>
			{value_component.components[activeSlide] && (
				<div className="container mx-auto w-[100%] flex gap-4  px-4 md:px-0">
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
						<Tagline
							font_slices={font_slices}
							section={section}
							tagline={value_component.components[activeSlide].tagline}
							className={`md:hidden`}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
							editable={editable}
						/>
					</div>
				</div>
			)}
			<div className="container mx-auto w-[100%]   grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="h-[40vh]">
					<Swiper
						loop
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
									<div className="  justify-center  relative bg-no-repeat bg-cover bg-center">
										<div className="container  ">
											<div
												style={{
													"--image-url": `url(${value_component.components[activeSlide]?.background_image})`,
												}}
												className={`${
													value_component.components.length > 1 ? "" : "mb-8"
												} bg-[image:var(--image-url)] w-[100%] h-[40vh]  md:rounded-md bg-no-repeat bg-cover bg-center relative my-slide-content`}
											>
												{value_component.components[activeSlide]?.background_type ===
													"video" && (
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
					<SwiperPagination
						containerStyle=" gap-1 py-2 hidden md:flex"
						activeSlide={activeSlide}
						darkMode
						ref={swiperRef}
					/>
				</div>
				{value_component.components[indexComponent] && (
					<div className="container mx-auto w-[100%] flex gap-4 ">
						<div className="w-[100%]">
							<Tagline
								font_slices={font_slices}
								section={section}
								tagline={value_component.components[activeSlide].tagline}
								className={`hidden md:block`}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
							/>

							{value_component.components[activeSlide]?.show_button == true && (
								<div className="container w-fit ml-4 md:ml-0 md:mt-4">
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
				)}
			</div>
		</SectionWrapper>
	);
};

export default PreviewSection7;
