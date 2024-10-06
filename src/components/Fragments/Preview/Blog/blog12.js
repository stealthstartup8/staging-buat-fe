import { useEffect, useState } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useMediaQuery } from "react-responsive";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { cn } from "@/utils/helpers/ClassName";
import { useFontSize } from "@/utils/constants/FontSize";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import { Button as InnerButton } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";

const PreviewBlog12 = ({
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
	const { getHeadlineFontSize, getTaglineFontSize } = useFontSize();
	const blog_data = useSelector((state) => state.blogSlice.blog_data);
	const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

	return (
		<SectionWrapper
			section={section}
			className="relative z-20 w-screen min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10 md:px-10"
		>
			{value_component.components.map((item, index) => (
				<div
					key={index}
					className="px-4 flex flex-col w-full h-[100%] relative bg-no-repeat bg-cover bg-center"
				>
					{filteredDataByLabel(blog_data, value_component).length > 0 && (
						<div className="flex flex-col md:flex-row gap-10 justify-between mt-4 max-h-min">
							<div
								className={cn("flex flex-col gap-3 grow relative max-w-full md:max-w-[60%]")}
							>
								<div className="h-max">
									<img
										src={filteredDataByLabel(blog_data, value_component)[0].thumbnail}
										className="object-cover aspect-[16/6] md:w-80 w-full"
									/>
								</div>
								<p
									style={{
										color: font_slices?.tagline?.color,
										fontFamily: font_slices?.tagline?.font_style,
										fontSize: getTaglineFontSize(font_slices?.tagline?.font_size),
										textAlign: font_slices?.tagline?.align,
									}}
									className="opacity-40 line-clamp-3"
									dangerouslySetInnerHTML={{
										__html: sanitizeHTML(
											filteredDataByLabel(blog_data, value_component)[0].content
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
							<div className="flex relative flex-col gap-10 w-full md:w-[40%] h-fit overflow-y-auto max-h-screen">
								{filteredDataByLabel(blog_data, value_component)
									.slice(isTabletOrDesktop ? 1 : 0)
									.map((blog, index) => {
										const fontSizeHeadline = getHeadlineFontSize(
											font_slices?.headline?.font_size
										);
										return (
											<div className="flex flex-col gap-3" key={index}>
												<hr className="border-t border-gray-600 dark:border-gray-200" />
												<div
													key={index}
													className="grid grid-flow-col gap-3 place-content-start"
												>
													<div className="md:size-24 size-32">
														<img
															src={`${
																process.env.NEXT_PUBLIC_APP_ENV === "dev"
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
																fontFamily: font_slices?.headline?.font_style,
															}}
															className="text-lg md:text-xl font-bold line-clamp-4  w-auto break-after-avoid"
														>
															{blog.title}
														</p>
														<p
															style={{
																color: font_slices?.tagline?.color,
																fontFamily: font_slices?.tagline?.font_style,
															}}
															className="opacity-40 text-sm md:text-base line-clamp-5"
															dangerouslySetInnerHTML={{
																__html: sanitizeHTML(blog.content),
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
												</div>
											</div>
										);
									})}
							</div>
						</div>
					)}
				</div>
			))}
		</SectionWrapper>
	);
};

export default PreviewBlog12;
