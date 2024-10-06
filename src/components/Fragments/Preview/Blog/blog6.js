import { useEffect, useState, useRef, Fragment } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Icon } from "@iconify-icon/react";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import { Button as InnerButton, Label } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import { cn } from "@/utils/helpers/ClassName";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";

const PreviewBlog6 = ({
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
	const isDesktopView = useMediaQuery({ query: "(min-width: 768px)" });
	const circleTrackRef = useRef(null);
	const containerTrackRef = useRef(null);

	useEffect(() => {
		const cardContents = document.querySelectorAll(".card-content");
		const verticalLines = document.querySelectorAll(".vertical-line");

		const setCircleTrackPosition = () => {
			const scrollY = containerTrackRef.current.scrollTop;
			const circleRelativePosition =
				circleTrackRef.current.offsetTop - containerTrackRef.current.offsetTop;
			const circleTrackPosition = scrollY + circleRelativePosition;
			const documentHeight = containerTrackRef.current.scrollHeight;
			const circleTrackHeight = circleTrackRef.current.offsetHeight;
			const bottomPosition = documentHeight - circleTrackHeight;
			circleTrackRef.current.style.top = Math.min(circleTrackPosition, bottomPosition) + "px";
			circleTrackRef.current.style.transition = "top 0.5s";
		};

		window.addEventListener("scroll", setCircleTrackPosition);

		cardContents.forEach((cardContent, index) => {
			verticalLines[index].style.height = cardContent.offsetHeight + "px";
		});

		return () => {
			window.removeEventListener("scroll", setCircleTrackPosition);
		};
	}, []);

	return (
		<SectionWrapper
			section={section}
			className="relative z-20 w-screen min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10"
		>
			{value_component?.components.map((item, index) => (
				<div
					key={index}
					className="container mx-auto flex flex-col mt-12 w-screen h-[100%] relative bg-no-repeat bg-cover bg-center"
				>
					<div className="p-4">
						<div className="container mx-auto mb-4">
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
								className={` mt-2`}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
							/>
						</div>
						<div className="flex gap-4 w-[100%] justify-center mb-2">
							{label_data
								.filter((label) =>
									value_component.blog_detail.some((item) => item.id_label === label.id)
								)
								.map((label, index) => {
									return (
										<Fragment key={index}>
											<Label
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

					<section
						id="container-track"
						ref={containerTrackRef}
						className={cn(
							isDesktopView
								? "px-10 md:px-28 relative my-5 hidden md:flex flex-col items-center"
								: "my-5 px-10 md:hidden relative"
						)}
					>
						<div className="absolute w-fit h-full z-50">
							<Icon
								id="circle-track"
								ref={circleTrackRef}
								className={cn(
									"sticky top-0 stroke-current stroke-[10] transition ease-out duration-700 mx-auto transform text-gray-600",
									isDesktopView ? "left-1/2" : "-left-1/2 -translate-x-1/2"
								)}
								icon="charm:circle"
								width="25"
							></Icon>
						</div>
						{blog_data.length > 0 && (
							<>
								{filteredDataByLabel(blog_data, value_component, labelId).map(
									(blog, idxBlog) => {
										const isOdd = idxBlog % 2 === 0;

										const sanitizedContent = sanitizeHTML(blog.content);
										if (!blog) return null;
										return (
											<>
												{isDesktopView ? (
													<div
														className={`flex relative justify-between w-full items-center ${
															!isOdd ? "flex-row-reverse" : "flex-row"
														}`}
														key={idxBlog}
													>
														<span className="h-full border-l border-black border absolute left-1/2 -translate-x-1/2" />
														<div className={`flex-1 justify-center flex`}>
															<div className="w-full flex items-center justify-end relative">
																<img
																	src={`${
																		process.env.NEXT_PUBLIC_APP_ENV ===
																		"dev"
																			? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/thumbnail-blog/${blog.thumbnail}`
																			: `${blog.thumbnail}`
																	}`}
																	className="object-cover aspect-video w-full rounded-lg"
																/>
															</div>
														</div>
														<div className="flex-none align-middle mx-6 z-10">
															<Icon
																className="text-gray-600"
																icon="carbon:circle-filled"
																width="15"
															></Icon>
														</div>
														<div className="flex-1 flex justify-center">
															<div className="w-full flex items-center">
																<div className="space-y-2">
																	<Label
																		label_slices={label_slices}
																		font_slices={font_slices}
																		editable={false}
																	>
																		{blog.labels[0].label_tags.name.replace(
																			/\b\w/g,
																			(match) => match.toUpperCase()
																		)}
																	</Label>
																	<p className="text-black font-bold text-xl">
																		{blog?.title}
																	</p>
																	<p
																		className="line-clamp-4"
																		dangerouslySetInnerHTML={{
																			__html: sanitizedContent,
																		}}
																	></p>
																	{value_component.components[0]
																		.show_button ? (
																		<InnerButton
																			button_slices={button_slices}
																			font_slices={font_slices}
																			onClickInnerComponent={
																				onClickInnerComponent
																			}
																			editable={editable}
																			section={section}
																		/>
																	) : (
																		""
																	)}
																</div>
															</div>
														</div>
													</div>
												) : (
													<div
														id="mobile"
														className="flex justify-between items-start"
													>
														<div className="relative vertical-line">
															<div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-400"></div>

															<div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 flex items-center">
																<Icon
																	className="text-gray-600"
																	icon="carbon:circle-filled"
																	observer="false"
																	width="15"
																></Icon>
															</div>
														</div>
														<div className="card-content py-5 flex flex-col items-center justify-end w-[80%] gap-4">
															<div className="flex items-center justify-end">
																<div className="aspect-video min-w-[65vw] rounded-lg">
																	<img
																		src={`${
																			process.env
																				.NEXT_PUBLIC_APP_ENV === "dev"
																				? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/thumbnail-blog/${blog.thumbnail}`
																				: `${blog.thumbnail}`
																		}`}
																		className="object-cover rounded-lg w-full"
																	/>
																</div>
															</div>
															<div className="w-full flex items-center">
																<div className="space-y-2">
																	<Label
																		label_slices={label_slices}
																		font_slices={font_slices}
																		editable={false}
																	>
																		{blog.labels[0].label_tags.name.replace(
																			/\b\w/g,
																			(match) => match.toUpperCase()
																		)}
																	</Label>
																	<p className="text-black font-bold text-xl">
																		${blog?.title}
																	</p>
																	<div
																		className="line-clamp-4 whitespace-pre-line text-gray-600"
																		dangerouslySetInnerHTML={{
																			__html: sanitizeHTML(
																				blog?.content
																			),
																		}}
																	></div>
																	{value_component.components[0]
																		.show_button ? (
																		<InnerButton
																			button_slices={button_slices}
																			font_slices={font_slices}
																			onClickInnerComponent={
																				onClickInnerComponent
																			}
																			editable={editable}
																			section={section}
																		/>
																	) : (
																		""
																	)}
																</div>
															</div>
														</div>
													</div>
												)}
											</>
										);
									}
								)}
							</>
						)}
					</section>
				</div>
			))}
		</SectionWrapper>
	);
};

export default PreviewBlog6;
