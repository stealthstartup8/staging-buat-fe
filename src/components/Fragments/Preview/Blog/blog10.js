import { Fragment, useEffect, useState } from "react";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useFontSize } from "@/utils/constants/FontSize";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import { Button as InnerButton } from "@/components/Elements/InnerTemplate";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import { useSelector } from "react-redux";
import filteredDataByLabel from "./filteredDataByLabel";

const PreviewBlog10 = ({
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
	const { getHeadlineFontSize } = useFontSize();
	const blog_data = useSelector((state) => state.blogSlice.blog_data);
	const [labelId, setLabelId] = useState("");

	const fontSize = getHeadlineFontSize(font_slices?.headline?.font_size);

	return (
		<SectionWrapper
			section={section}
			className="relative px-5 md:px-10 z-20 w-screen min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10"
		>
			{filteredDataByLabel(blog_data, value_component, labelId).length > 0 &&
				filteredDataByLabel(blog_data, value_component, labelId).map((blog, index) => (
					<Fragment key={index}>
						<hr className="border border-gray-600 dark:border-gray-200 my-5" />
						<div key={index} className="flex container mx-auto">
							<div className="flex justify-start grow md:justify-between flex-col md:flex-row gap-5">
								<p
									style={{
										color: font_slices?.headline?.color,
										fontFamily: font_slices?.headline?.font_style,
										fontWeight: font_slices?.headline.bold == true ? "700" : "normal",
										textDecoration: font_slices?.headline?.text_decoration,
										fontStyle: font_slices?.headline?.italic == true ? "italic" : "",
										fontSize,
										textAlign: font_slices?.headline?.align,
									}}
									className="uppercase line-clamp-2 leading-tight w-full md:max-w-[45%]"
								>
									{blog.title}
								</p>
								<div className="flex flex-col gap-3 text-gray-600 grow w-full md:max-w-[45%]">
									<p
										className="line-clamp-4"
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
					</Fragment>
				))}
		</SectionWrapper>
	);
};

export default PreviewBlog10;
