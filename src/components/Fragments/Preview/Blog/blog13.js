import { useEffect, useState, Fragment } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Button as InnerButton, Label } from "@/components/Elements/InnerTemplate";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { cn } from "@/utils/helpers/ClassName";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";

const PreviewBlog13 = ({
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
	const blog_data = useSelector((state) => state.blogSlice.blog_data);
	const label_data = useSelector((state) => state.blogSlice.label_data);
	const [labelId, setLabelId] = useState("");
	const [idxImg, setIdxImg] = useState(0);
	const [hoverIndex, setHoverIndex] = useState(null);

	const handleHover = (index) => {
		setIdxImg(index);
		setHoverIndex(index);
	};

	const handleOut = () => {
		setHoverIndex(null);
	};

	return (
		<SectionWrapper
			section={section}
			className="relative z-20 w-screen min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10"
		>
			{value_component.components.map((item, index) => (
				<div
					key={index}
					className="flex flex-col md:px-10 px-5 mt-12 w-full h-[100%] relative bg-no-repeat bg-cover bg-center"
				>
					<div className="flex flex-col items-start md:items-center justify-center">
						<div className="container w-full mb-4">
							<Headline
								font_slices={font_slices}
								section={section}
								title={value_component.components[index].title}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
								className="mb-[-5px]"
							/>
							<Tagline
								font_slices={font_slices}
								section={section}
								tagline={value_component.components[index].tagline}
								className={`mt-2 md:mx-auto`}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
							/>
						</div>
						<div className="flex gap-4 w-full justify-center md:justify-start px-5 mb-2">
							{label_data
								.filter((label) =>
									value_component.blog_detail.some((item) => item.id_label === label.id)
								)
								.map((label, index) => {
									return (
										<Fragment key={index}>
											<Label
												key={index}
												label_slices={label_slices}
												font_slices={font_slices}
												editable={false}
												className={`${
													labelId == label.id ? "opacity-100" : "opacity-50"
												}`}
												onClick={() => {
													if (labelId == label.id) {
														setLabelId("");
													} else {
														setLabelId(label.id);
													}
												}}
											>
												{label.name.replace(/\b\w/g, (match) => match.toUpperCase())}
											</Label>
										</Fragment>
									);
								})}
						</div>
					</div>
					{filteredDataByLabel(blog_data, value_component, labelId).length > 0 && (
						<div className="flex flex-col md:flex-row gap-10 justify-start mt-4 max-h-min">
							<div className={cn("flex grow relative w-full md:max-w-[60%]")}>
								<div className="aspect-video w-full h-max">
									<img
										src={`${
											process.env.NEXT_PUBLIC_APP_ENV === "dev"
												? `${
														process.env.NEXT_PUBLIC_API_KEY
												  }/assets/${domain_name}/assets/thumbnail-blog/${
														filteredDataByLabel(
															blog_data,
															value_component,
															labelId
														)[idxImg].thumbnail
												  }`
												: `${
														filteredDataByLabel(
															blog_data,
															value_component,
															labelId
														)[idxImg].thumbnail
												  }`
										}`}
										className="object-cover aspect-video w-full"
									/>
								</div>
							</div>
							<div className="flex relative flex-row flex-nowrap overflow-x-auto md:flex-col gap-5 w-full md:w-[40%] h-fit md:h-[80vh] md:overflow-y-auto">
								{filteredDataByLabel(blog_data, value_component, labelId).map(
									(blog, index) => {
										const isHovered = hoverIndex === index;
										const itemTextColor = isHovered
											? section?.background_color
											: font_slices?.headline?.color;

										return (
											<div
												key={index}
												className={cn(
													"grid grid-flow-col gap-3 place-content-start hover:bg-black/90 rounded-xl p-5 border transition-all duration-300 ease-in-out cursor-pointer",
													"group/item"
												)}
												onMouseEnter={() => handleHover(index)}
												onMouseLeave={() => handleOut()}
											>
												<div className="md:size-24 size-32 relative">
													<img
														src={`${
															process.env.NEXT_PUBLIC_APP_ENV === "dev"
																? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/thumbnail-blog/${blog.thumbnail}`
																: `${blog.thumbnail}`
														}`}
														className="object-cover w-full h-full absolute top-0"
													/>
												</div>
												<div className="flex flex-col gap-2">
													<p
														key={index}
														style={{
															color: itemTextColor,
															fontFamily: font_slices?.headline?.font_style,
														}}
														className={cn(
															"text-md md:text-lg font-bold transition-all duration-300 ease-in-out line-clamp-2 whitespace-pre-line"
														)}
													>
														{blog.title}
													</p>
													<p
														style={{
															color: itemTextColor,
															fontFamily: font_slices?.headline?.font_style,
														}}
														className={cn(
															"opacity-40 text-sm md:text-base transition-all duration-300 ease-in-out line-clamp-2"
														)}
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
										);
									}
								)}
							</div>
						</div>
					)}
				</div>
			))}
		</SectionWrapper>
	);
};

export default PreviewBlog13;
