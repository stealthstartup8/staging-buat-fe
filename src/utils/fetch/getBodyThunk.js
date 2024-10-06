import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ARR_SELECTED_TEMPLATE_PREVIEW, TRANSPARENT_CATEGORY_BUTTON_TEMPLATE } from "../constants";
import { BACKGROUND_STORAGE_DIR, ICON_STORAGE_DIR, LOGO_STORAGE_DIR } from "../constants/Storage";

// How this function works?
// 1. This function will fetch all data from the API, literally everything in 1 API call.
// 2. The data will be stored in some temporary variables.
// 3. Some data will be sorted and processed.
// 4. After all data is sorted and processed, the data will be returned in the form of an object.
// 5. If there is an error, it will be caught and returned as a rejected value.
// 6. If the data is successfully fetched, every slice that is listening to this function will be updated.
// 7. The new data will replace the old data in the store, NOT adding new data to the store.
export const getBodyThunk = createAsyncThunk(
	"general/getBodyThunk",
	async ({ website_detail, user_token, page_slug }, thunkAPI) => {
		try {
			// getting all the data from the API
			const resAllData = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/page/get-all-data/` + page_slug,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
			const sectionDatas = resAllData.data.data.sections;

			// temporary variables, each representing a single slice
			let section = [];
			let body = [];
			let buttonData = [];
			let sectionFontStyle = [];
			let label = [];

			// each item represents a section/template
			for (const item of sectionDatas) {
				// section array stores section/template in a page

				section.push({
					id: item.id,
					id_page: item.idPage,
					id_template: item.idTemplate,
					order_index: item.orderIndex,
					id_category: item.idCategory,
					background_color: item.backgroundColor,
					background_image:
						item.backgroundImage === ""
							? ""
							: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${BACKGROUND_STORAGE_DIR}/${item.backgroundImage}`,
					background_file: "",
					background_type: item.type,
				});
				section = section.sort((a, b) => a.order_index - b.order_index);

				// body array stores all components in a section/template
				body.push(
					getBodyObject({
						id_component: item.orderIndex,
						id_category: item.idCategory,
						id_template: item.idTemplate,
					})
				);

				// adding faq components if the current item is a faq template
				if (item.idCategory === 4) {
					for (const faqItem of item.section_components[0]?.faq_components || []) {
						body[item.orderIndex].faq.push({
							id: faqItem.id,
							question: faqItem.question,
							answer: faqItem.answer,
						});
					}
				}

				// adding blog components if the current item is a blog template
				if (item.idCategory === 6) {
					for (const blog of item.section_components[0]?.section_blog || []) {
						body[item.orderIndex].blog_detail.push({
							id: blog.id,
							id_blog: blog.idBlog,
							id_label: blog.idLabel,
						});
					}
				}

				// adding form components if the current item is a form template
				if (item.section_components[0]?.section_forms != null) {
					if (item.idCategory === 9) {
						body[item.orderIndex].form_detail.id = item.section_components[0]?.section_forms.id;
						body[item.orderIndex].form_detail.id_category =
							item.section_components[0]?.section_forms.idCategoryForm;
					}
				}

				// adding logo components if the current item is a logo template
				if (item.idCategory === 10) {
					for (const logoItem of item.section_components[0]?.section_logo || []) {
						body[item.orderIndex].logo_section.push({
							id: logoItem.id,
							name: logoItem.name,
							order_index: logoItem.orderIndex,
							logo_image:
								logoItem.image === ""
									? ""
									: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${LOGO_STORAGE_DIR}/${logoItem.image}`,
						});
					}
				}

				// adding categories of career template
				if (item.idCategory === 11) {
					const categories_filtered = item.section_components[0]?.section_career.map((category) => {
						return {
							...category.category,
							id_section: category.id,
						};
					});
					body[item.orderIndex].category_detail.categories = categories_filtered;
				}

				// adding categories of pricing template
				if (item.idCategory === 12) {
					const categories_filtered = item.section_components[0]?.section_price.map((category) => {
						return {
							...category.category,
							id_section: category.id,
						};
					});
					body[item.orderIndex].category_detail.categories = categories_filtered;
				}

				// adding categories of commerce template
				if (item.idCategory === 13) {
					const categories_filtered = item.section_components[0]?.section_commerce.map(
						(category) => {
							return {
								...category.category,
								id_section: category.id,
							};
						}
					);

					const cardStyle = {
						id: item.section_components[0]?.card_components.id,
						color: item.section_components[0]?.card_components.backgroundColor,
						stroke: item.section_components[0]?.card_components.strokeColor,
						textColor: item.section_components[0]?.card_components.textColor,
					};

					body[item.orderIndex].category_detail.categories = categories_filtered;
					body[item.orderIndex].card_detail = cardStyle;
				}

				// adding general components of a section/template (each section/template can have multiple components)
				for (const component of item.section_components || []) {
					body[item.orderIndex].components.push({
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
								: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${BACKGROUND_STORAGE_DIR}/${component.thumbnail}`,
						typeThumbnail: component.typeThumbnail,
						show_button: component.isButton,
						button_item: component.buttonItem,
					});
				}

				// fetch button data by id
				const fetchButtonData = async (id, index) => {
					const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/button-component/${id}`, {
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					});
					const data = res.data.data;
					return {
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
								: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${ICON_STORAGE_DIR}/${data.icon}`,
						button_color: data.background,
						stroke_color: data.strokeColor,
					};
				};

				// button items is all button component in a section/template

				if (item.section_components[0]?.buttonItem) {
					let buttonItems = await Promise.all(
						item.section_components[0]?.buttonItem?.map((id, index) => fetchButtonData(id, index))
					);
					// while buttonData is all button component on the whole website
					buttonData.push(...buttonItems);
					buttonData = buttonData.sort((a, b) => a.order_index - b.order_index);
				}

				// adding label components
				label.push({
					id: item.section_components[0]?.label_component?.idComponent,
					text_color: item.section_components[0]?.label_component?.textColor,
					shape: String(item.section_components[0]?.label_component?.idShape),
					show_icon: item.section_components[0]?.label_component?.showIcon,
					icon:
						item.section_components[0]?.label_component?.icon === ""
							? ""
							: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${ICON_STORAGE_DIR}/${item.section_components[0]?.label_component?.icon}`,
					icon_file: "",
					background_color: item.section_components[0]?.label_component?.background,
					stroke_color: item.section_components[0]?.label_component?.strokeColor,
				});

				// adding font style of each section/template
				sectionFontStyle.push({
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
				});
				sectionFontStyle = sectionFontStyle.sort((a, b) => a.order_index - b.order_index);
			}
			return {
				section,
				body,
				buttonData,
				sectionFontStyle,
				label,
			};
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error);
		}
	}
);

// this function will return the appropriate object based on the category of the section/template
const getBodyObject = ({ id_component, id_category, id_template }) => {
	if (id_category === 3 || id_category === 5 || id_category === 7) {
		return {
			id_component: id_component,
			id_category: id_category,
			background_color: "rgba(255,255,255,1)",
			components: [],
		};
	} else if (id_category === 4) {
		return {
			id_component: id_component,
			id_category: id_category,
			background_color: "rgba(255,255,255,1)",
			components: [],
			faq: [],
		};
	} else if (id_category === 6) {
		return {
			id_component: id_component,
			id_category: id_category,
			background_color: "rgba(255,255,255,1)",
			components: [],
			blog_detail: [],
		};
	} else if (id_category === 9) {
		return {
			id_component: id_component,
			id_category: id_category,
			background_color: "rgba(255,255,255,1)",
			components: [],
			form_detail: {},
		};
	} else if (id_category === 10) {
		return {
			id_component: id_component,
			id_category: id_category,
			background_color: "rgba(255,255,255,1)",
			components: [],
			logo_section: [],
		};
	} else if (id_category === 11 || id_category === 12) {
		return {
			id_component: id_component,
			id_category: id_category,
			background_color: "rgba(255,255,255,1)",
			components: [],
			category_detail: {
				id: null,
				color:
					ARR_SELECTED_TEMPLATE_PREVIEW.includes(id_template) &&
					!TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(id_template)
						? "rgba(0,0,0,1)"
						: "rgba(255,255,255,1)",
				stroke: TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(id_template)
					? "rgba(255,255,255,1)"
					: "rgba(0,0,0,1)",
				shape: "",
				icon_image: "",
				icon_file: null,
				categories: [],
			},
		};
	} else if (id_category === 13) {
		return {
			id_component: id_component,
			id_category: id_category,
			background_color: "rgba(255,255,255,1)",
			components: [],
			category_detail: {
				id: null,
				color:
					ARR_SELECTED_TEMPLATE_PREVIEW.includes(id_template) &&
					!TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(id_template)
						? "rgba(0,0,0,1)"
						: "rgba(255,255,255,1)",
				stroke: TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(id_template)
					? "rgba(255,255,255,1)"
					: "rgba(0,0,0,1)",
				shape: "",
				icon_image: "",
				icon_file: null,
				categories: [],
			},
			card_detail: {
				id: null,
				color: ARR_SELECTED_TEMPLATE_PREVIEW.includes(id_template)
					? "rgba(0,0,0,1)"
					: "rgba(255,255,255,1)",
				stroke: "rgba(0,0,0,1)",
				textColor: TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(id_template)
					? "rgba(255,255,255,1)"
					: "rgba(0,0,0,1)",
			},
			modal_detail: {
				id: null,
				title: "",
				thumbnail_image: "",
				thumbnail_file: "",
				description: "",
				color: ARR_SELECTED_TEMPLATE_PREVIEW.includes(id_template)
					? "rgba(0,0,0,1)"
					: "rgba(255,255,255,1)",
			},
		};
	}
};
