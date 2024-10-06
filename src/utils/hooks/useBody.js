import { useDispatch, useSelector } from "react-redux";
import { addSection, deleteSection } from "@store/sections";
import {
	addBody,
	addDropdownDescription,
	addFAQ,
	addForm,
	addFormComponent,
	addLogo,
	addSectionComponents,
	add_blog_component,
	appendFormComponent,
	deleteBody,
	setCategories,
	switchRightComponent,
} from "@store/body/bodySlice";
import { addHeroButton, deleteButton } from "@store/body/buttonSlice";
import { addSectionFontStyle, deleteSectionFontStyle } from "@store/body/fontSlice";
import axios from "axios";
import { addLabel, deleteLabel } from "@store/body/labelSlice";

export const useBody = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.persistedReducer);

	const section_slice = store.sectionSlices;
	const font_slice = store.fontSlices;
	const body_slice = store.bodySlice;
	const button_slice = store.buttonHeroSlice;
	const label_slice = store.labelSlice;
	const select_section = store.addChangeChoice;

	const switchRightComponents = (index) => {
		dispatch(
			switchRightComponent({
				index: index,
			})
		);
	};

	const getBody = async (sectionDatas, website_detail, token) => {
		const fetchButtonData = async (id, index) => {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/button-component/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = res.data.data;

			dispatch(
				addHeroButton({
					order_index: index,
					id: data.id,
					name: data.name,
					link: data.url,
					text_color: data.textColor,
					button_shape: String(data.idShape),
					show_icon: data.showIcon,
					icon:
						data.icon === ""
							? ""
							: `https://${website_detail.access_domain[0].name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/icon/${data.icon}`,
					button_color: data.background,
					stroke_color: data.strokeColor,
				})
			);
		};

		for (const item of sectionDatas) {
			if (section_slice.item.length === 0) {
				dispatch(
					addSection({
						id: item.id,
						id_page: item.idPage,
						id_template: item.idTemplate,
						order_index: item.orderIndex,
						id_category: item.idCategory,
						background_color: item.backgroundColor,
						background_image:
							item.backgroundImage === ""
								? ""
								: `https://${website_detail.access_domain[0].name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/background/${item.backgroundImage}`,
						background_file: "",
						background_type: item.type,
					})
				);

				dispatch(
					addBody({
						id_component: item.orderIndex,
						id_category: item.idCategory,
						id_template: item.idTemplate,
					})
				);

				if (item.idCategory === 4) {
					for (const faq of item.section_components[0]?.faq_components || []) {
						dispatch(
							addFAQ({
								index: item.orderIndex,
								id: faq.id,
								question: faq.question,
								answer: faq.answer,
							})
						);
					}
				}

				if (item.idCategory === 6) {
					for (const blog of item.section_components[0]?.section_blog || []) {
						dispatch(
							add_blog_component({
								index: item.orderIndex,
								id: blog.id,
								id_blog: blog.idBlog,
								id_label: blog.idLabel,
							})
						);
					}
				}

				if (item.section_components[0]?.section_forms != null) {
					if (item.idCategory === 9) {
						dispatch(
							addForm({
								index: item.orderIndex,
								id: item.section_components[0]?.section_forms.id,
								id_category: item.section_components[0]?.section_forms.idCategoryForm,
							})
						);
					}
				}

				if (item.idCategory === 10) {
					for (const logo of item.section_components[0]?.section_logo || []) {
						dispatch(
							addLogo({
								index: item.orderIndex,
								id: logo.id,
								name: logo.name,
								orderIndex: logo.orderIndex,
								logo_image:
									logo.image === ""
										? ""
										: `https://${website_detail.access_domain[0].name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/logo/${logo.image}`,
							})
						);
					}
				}

				if (item.idCategory === 11) {
					const categories_filtered = item.section_components[0]?.section_career.map((category) => {
						return {
							...category.category,
							id_section: category.id,
						};
					});

					dispatch(
						setCategories({
							index: item.orderIndex,
							categories: categories_filtered,
						})
					);
				}

				if (item.idCategory === 12) {
					const categories_filtered = item.section_components[0]?.section_price.map((category) => {
						return {
							...category.category,
							id_section: category.id,
						};
					});

					dispatch(
						setCategories({
							index: item.orderIndex,
							categories: categories_filtered,
						})
					);
				}

				if (item.idCategory === 13) {
					const categories_filtered = item.section_components[0]?.section_commerce.map(
						(category) => {
							return {
								...category.category,
								id_section: category.id,
							};
						}
					);

					dispatch(
						setCategories({
							index: item.orderIndex,
							categories: categories_filtered,
						})
					);
				}

				for (const component of item.section_components || []) {
					dispatch(
						addSectionComponents({
							index: item.orderIndex,
							id: component.id,
							id_label: component.label_component?.id || null,
							id_title: component.title?.id || null,
							id_tagline: component.desc?.id || null,
							label: component.label_component?.name || "",
							title: component.title?.name || "",
							tagline: component.desc?.name || "",
							background_type: component.type,
							background_image:
								component.thumbnail === ""
									? ""
									: `https://${website_detail.access_domain[0].name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/background/${component.thumbnail}`,
							typeThumbnail: component.typeThumbnail,
							show_button: component.isButton,
							button_item: component.buttonItem,
						})
					);
				}

				await Promise.all(
					item.section_components[0].buttonItem.map((id, index) => fetchButtonData(id, index))
				);

				dispatch(
					addLabel({
						id: item.section_components[0]?.label_component?.idComponent,
						text_color: item.section_components[0]?.label_component?.textColor,
						shape: String(item.section_components[0]?.label_component?.idShape),
						show_icon: item.section_components[0]?.label_component?.showIcon,
						icon:
							item.section_components[0]?.label_component?.icon === ""
								? ""
								: `https://${website_detail.access_domain[0].name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/icon/${item.section_components[0]?.label_component?.icon}`,
						icon_file: "",
						background_color: item.section_components[0]?.label_component?.background,
						stroke_color: item.section_components[0]?.label_component?.strokeColor,
						order_index: item.orderIndex,
					})
				);

				dispatch(
					addSectionFontStyle({
						order_index: item.orderIndex,
						label: {
							font_style: item.section_components[0]?.label_component?.fontType,
							font_size: item.section_components[0]?.label_component?.fontSize,
							bold: item.section_components[0]?.label_component?.bold,
							italic: item.section_components[0]?.label_component?.italic,
							text_decoration: item.section_components[0]?.label_component?.textDecoration,
							align: item.section_components[0]?.label_component?.textAlign,
							color: item.section_components[0]?.label_component?.textColor,
						},
						headline: {
							font_style: item.section_components[0]?.title?.fontType,
							font_size: item.section_components[0]?.title?.fontSize,
							bold: item.section_components[0]?.title?.bold,
							italic: item.section_components[0]?.title?.italic,
							text_decoration: item.section_components[0]?.title?.textDecoration,
							align: item.section_components[0]?.title?.textAlign,
							color: item.section_components[0]?.title?.textColor,
						},
						tagline: {
							font_style: item.section_components[0]?.desc?.fontType,
							font_size: item.section_components[0]?.desc?.fontSize,
							bold: item.section_components[0]?.desc?.bold,
							italic: item.section_components[0]?.desc?.italic,
							text_decoration: item.section_components[0]?.desc?.textDecoration,
							align: item.section_components[0]?.desc?.textAlign,
							color: item.section_components[0]?.desc?.textColor,
						},
						button: {
							font_style: "",
							font_size: "",
							bold: false,
							italic: false,
							text_decoration: "",
						},
					})
				);
			}
		}
	};

	const handleDeleteSection = async (e) => {
		e.preventDefault();

		dispatch(
			deleteSection({
				idComponent: select_section.item.choiceIdComponent - 1,
			})
		);

		dispatch(
			deleteBody({
				idComponent: select_section.item.choiceIdComponent - 1,
			})
		);

		dispatch(
			deleteSectionFontStyle({
				index: select_section.item.choiceIdComponent - 1,
			})
		);

		dispatch(
			deleteButton({
				index: select_section.item.choiceIdComponent - 1,
			})
		);

		dispatch(
			deleteLabel({
				index: select_section.item.choiceIdComponent - 1,
			})
		);
	};

	return {
		section_slice: section_slice,
		font_slice: font_slice,
		body_slice: body_slice,
		button_slice: button_slice,
		label_slice: label_slice,
		select_section: select_section,
		getBody,
		dispatchDeleteSection: handleDeleteSection,
		switchRightComponents,
	};
};
