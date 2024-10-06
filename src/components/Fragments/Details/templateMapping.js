import SortingButton from "../sortingButton";
import { useBody } from "@/utils/hooks/useBody";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useTemplate } from "@/utils/hooks/useTemplate";
import { BLOG_TEMPLATE_ID, OBJ_COMPONENT_PREVIEW } from "@/utils/constants";
import { Fragment } from "react";
import { useNavbar } from "@/utils/hooks/useNavbar";
import { useRouter } from "next/router";

const TemplateMapping = ({ setOpen, page_id, website_detail, user_token, pages }) => {
	const { section_slice, font_slice, body_slice, button_slice, label_slice } = useBody();
	const { navbar_slice } = useNavbar();
	const router = useRouter();

	const { onClickSection, sectionComponentHero, selectManagement } = useStyleManagement();
	const { handleOnDragOver, handleOnDrop, dropIndexSelected, setDropIndexSelected } = useTemplate();

	return (
		<>
			<div
				style={{
					marginTop: navbar_slice.item.id_template == "102" ? "" : "48px",
				}}
				className={`  ${
					navbar_slice.item.data == "" ||
					navbar_slice.item.data == "not available" ||
					router.pathname == "/pages-detail/blog-and-product/[id]"
						? "pt-0"
						: "pt-0"
				}`}
			>
				{section_slice.item
					// .slice()
					// .sort((a, b) => a.order_index - b.order_index)
					.map((item, index) => {
						const Component = OBJ_COMPONENT_PREVIEW[item.id_template];
						return (
							<Fragment key={index}>
								<div
									onDrop={(e) => handleOnDrop(e, page_id)}
									onDragOver={(e) => handleOnDragOver(e, item.order_index)}
									onDragLeave={(e) => setDropIndexSelected(null)}
									className={`${
										dropIndexSelected == index && "pt-[100vh] bg-black/5 relative"
									}`}
								>
									{dropIndexSelected == index && (
										<div className="absolute top-[23%] left-[43%]">
											<p className="text-[32px]">Drop Here</p>
										</div>
									)}
									<SortingButton
										item={item}
										setOpen={setOpen}
										index={index}
										pages={pages}
									/>
									{item.id_page == page_id ? (
										<div
											onClick={(e) => onClickSection(e, index, item.id_category)}
											className={`cursor-pointer relative max-w-screen ${
												selectManagement == item.order_index + 1
													? "border-dashed border-[1px] border-[#c21d30]"
													: ""
											}`}
											key={index}
										>
											{Component ? (
												<Component
													section={section_slice.item[index]}
													idComponent={item.order_index}
													value_component={body_slice.item[index]}
													button_slices={button_slice.item[index]}
													label_slices={label_slice.item[index]}
													font_slices={font_slice.item[index]}
													sectionComponentHero={sectionComponentHero}
													editable={true}
													user_token={user_token}
													websiteid={website_detail.id}
													domain_name={website_detail.access_domain[0].name}
													website={website_detail}
												/>
											) : (
												""
											)}
										</div>
									) : (
										""
									)}
								</div>
							</Fragment>
						);
					})}
			</div>
		</>
	);
};

export default TemplateMapping;
