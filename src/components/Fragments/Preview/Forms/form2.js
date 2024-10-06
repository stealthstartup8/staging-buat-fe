import Input from "@/components/Elements/Input";
import Label from "@/components/Elements/Input/label";
import UploadFileBigPreview from "@/components/Elements/UploadFile/BigPreview";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Option, Select } from "@material-tailwind/react";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useFontSize } from "@/utils/constants/FontSize";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@/components/Elements/InnerTemplate";
import Headline from "@/components/Elements/InnerTemplate/Headline";

const PreviewForm2 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	editable,
	sectionComponentHero,
	user_token,
}) => {
	const { onClickInnerComponent } = useStyleManagement();
	const { getButtonFontSize } = useFontSize();
	const [content, setContent] = useState([]);
	const body_slice = useSelector((state) => state.persistedReducer.bodySlice);

	useEffect(() => {
		if (body_slice.item[idComponent].form_detail?.id_category != "") {
			getFormData();
		}
	}, [body_slice.item[idComponent].form_detail?.id_category]);

	const getFormData = async () => {
		try {
			const res = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY +
					`/form/get-by-category/${body_slice.item[idComponent].form_detail?.id_category}`,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
			setContent(res.data.data.form);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SectionWrapper
			section={section}
			className="bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center min-h-[100vh] py-10 md:py-0  px-4 md:px-0 overflow-x-hidden"
			video={false}
		>
			<div className=" mx-auto grid lg:grid-cols-5 grid-cols-1 gap-10 container ">
				<div className="lg:col-span-2 mt-6 order-last md:order-first md:py-14">
					<div className=" ">
						<Headline
							font_slices={font_slices}
							section={section}
							title={value_component?.components[0]?.title}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
							lineHeight="60px"
							editable={editable}
						/>
						<Tagline
							font_slices={font_slices}
							section={section}
							tagline={value_component?.components[0]?.tagline}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
							className={`mt-4`}
							editable={editable}
						/>

						<div className="mt-8 mb-6">
							{content?.map((item, index) => (
								<React.Fragment key={index}>
									{item.type == "text" && (
										<div className="mt-4">
											<Label className={"text-[#C8CDD0]"}>{item.label}</Label>
											<Input
												type={"text"}
												placeholder={item.label}
												className="bg-transparent w-[100%] border-[1px] rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691]"
											/>
										</div>
									)}
									{item.type == "dropdown" && (
										<div className="mt-4">
											<Label className={"text-[#C8CDD0]"}>{item.label}</Label>
											<Select className="border-2 border-[#C8CDD0]">
												{item.option_form?.map((item, index) => (
													<Fragment key={index}>
														<Option value={item.value}>{item.value}</Option>
													</Fragment>
												))}
											</Select>
										</div>
									)}
									{item.type == "textarea" && (
										<div className="mt-4">
											<Label className={"text-[#C8CDD0]"}>{item.label}</Label>
											<textarea
												rows={4}
												placeholder={item.label}
												className="bg-transparent w-[100%] border-[1px] rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691]"
											/>
										</div>
									)}
									{item.type == "images" || item.type == "document" ? (
										<div className="mt-4">
											<div className="mt-4">
												<Label className={"text-[#C8CDD0]"}>{item.label}</Label>
												<UploadFileBigPreview
													accept={".svg,.jpeg,.jpg,.png,.gif,.mp4"}
													form={true}
													description={item.placeholder}
													// file={file}
													// handleSetFile={(e) =>
													//   handleSetThumbnail(
													//     e,
													//     select_section.item.choiceLabelIndex
													//   )
													// }
												/>
											</div>
										</div>
									) : (
										""
									)}
								</React.Fragment>
							))}
						</div>
						<Button
							button_slices={button_slices}
							font_slices={font_slices}
							onClickInnerComponent={onClickInnerComponent}
							editable={editable}
							section={section}
						/>
					</div>
				</div>
				<div className="w-[100%] h-96 md:h-full bg-gray-300 lg:col-span-3">
					{value_component.components[0]?.background_image && (
						<Image
							src={value_component.components[0]?.background_image}
							alt=""
							width={0}
							height={0}
							sizes="100vw"
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								objectPosition: "center",
							}}
						/>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
};

export default PreviewForm2;
