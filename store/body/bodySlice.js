import { createSlice } from "@reduxjs/toolkit";
import { ARR_SELECTED_TEMPLATE_PREVIEW, TRANSPARENT_CATEGORY_BUTTON_TEMPLATE } from "@/utils/constants";
import { getBodyThunk } from "@/utils/fetch/getBodyThunk";
import { textColor } from "./fontSlice";

// this slice is used to store all body section data (section except navbar and footer)
export const bodySlice = createSlice({
	name: "bodySlice",
	initialState: {
		// one item represents 1 body section/template
		item: [],
	},
	reducers: {
		// call this function to add a section
		// there are cases for each template, but some of them has the same structure
		// there are 2 cases for each type of structure, one for the first data and one for the next data
		// the second case (not first data) was used for getbody function, but now
		addBody: (state, action) => {
			let addBody = [];
			if (
				action.payload.id_category === 3 ||
				action.payload.id_category === 5 ||
				action.payload.id_category === 7
			) {
				if (action.payload.data == "first data") {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [
								{
									id: null,
									id_label: null,
									id_title: null,
									id_tagline: null,
									label: "Label",
									title: "Lorem ipsum dolor sit amet.",
									tagline: "Lorem ipsum dolor sit amet.",
									background_image: "",
									background_file: "",
									background_type: "",
									show_button: false,
									button_item: [],
								},
							],
						},
					];
				} else {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [],
						},
					];
				}
			} else if (action.payload.id_category === 4) {
				if (action.payload.data == "first data") {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [
								{
									id: null,
									id_label: null,
									id_title: null,
									id_tagline: null,
									label: "",
									title: "Lorem ipsum dolor sit amet.",
									tagline: "",
									background_image: "",
									background_file: "",
									show_button: false,
									button_item: [],
								},
							],
							faq: [],
						},
					];
				} else {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [],
							faq: [],
						},
					];
				}
			} else if (action.payload.id_category === 6) {
				if (action.payload.data == "first data") {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [
								{
									id: null,
									id_label: null,
									id_title: null,
									id_tagline: null,
									label: "",
									title: "Lorem ipsum dolor sit amet.",
									tagline: "Lorem ipsum dolor sit amet.",
									background_image: "",
									background_file: "",
									show_button: false,
									button_item: [],
								},
							],
							blog_detail: [
								{
									id: null,
									id_blog: "",
									id_label: "",
								},
							],
						},
					];
				} else {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [],
							blog_detail: [],
						},
					];
				}
			} else if (action.payload.id_category === 9) {
				if (action.payload.data == "first data") {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [
								{
									id: null,
									id_label: null,
									id_title: null,
									id_tagline: null,
									label: "",
									title: "Lorem ipsum dolor sit amet.",
									tagline: "Lorem ipsum dolor sit amet.",
									background_image: "",
									background_file: "",
									show_button: false,
									button_item: [],
								},
							],
							form_detail: {
								id: null,
								id_category: "",
							},
						},
					];
				} else {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [],
							form_detail: {},
						},
					];
				}
			} else if (action.payload.id_category === 10) {
				if (action.payload.data == "first data") {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [
								{
									id: null,
									id_label: null,
									id_title: null,
									id_tagline: null,
									label: "",
									title: "Lorem ipsum dolor sit amet.",
									tagline: "Lorem ipsum dolor sit amet.",
									background_image: "",
									background_file: "",
									show_button: false,
									button_item: [],
								},
							],
							logo_section: [
								{
									id: null,
									name: "",
									logo_image: "",
									logo_file: "",
									order_index: 0,
								},
							],
						},
					];
				} else {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [],
							logo_section: [],
						},
					];
				}
			} else if (action.payload.id_category === 11 || action.payload.id_category === 12) {
				if (action.payload.data == "first data") {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [
								{
									id: null,
									id_label: null,
									id_title: null,
									id_tagline: null,
									label: "",
									title: "Lorem ipsum dolor sit amet.",
									tagline: "Lorem ipsum dolor sit amet.",
									background_image: "",
									background_file: "",
									show_button: false,
									button_item: [],
								},
							],
							category_detail: {
								id: null,
								// categories button color
								color:
									ARR_SELECTED_TEMPLATE_PREVIEW.includes(action.payload.id_template) &&
									!TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(action.payload.id_template)
										? "rgba(0,0,0,1)"
										: "rgba(255,255,255,1)",
								// categories button stroke
								stroke: TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(
									action.payload.id_template
								)
									? "rgba(255,255,255,1)"
									: "rgba(0,0,0,1)",
								// categories button shape
								shape: "",
								// categories button icon file name
								icon_image: "",
								// categories button icon file
								icon_file: null,
								// list of chosen categories to display
								categories: [],
							},
						},
					];
				} else {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [],
							category_detail: {
								id: null,
								color:
									ARR_SELECTED_TEMPLATE_PREVIEW.includes(action.payload.id_template) &&
									!TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(action.payload.id_template)
										? "rgba(0,0,0,1)"
										: "rgba(255,255,255,1)",
								stroke: TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(
									action.payload.id_template
								)
									? "rgba(255,255,255,1)"
									: "rgba(0,0,0,1)",
								shape: "",
								icon_image: "",
								icon_file: null,
								categories: [],
							},
						},
					];
				}
			} else if (action.payload.id_category === 13) {
				if (action.payload.data == "first data") {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [
								{
									id: null,
									id_label: null,
									id_title: null,
									id_tagline: null,
									label: "",
									title: "Lorem ipsum dolor sit amet.",
									tagline: "Lorem ipsum dolor sit amet.",
									background_image: "",
									background_file: "",
									show_button: false,
									button_item: [],
								},
							],
							category_detail: {
								id: null,
								// categories button color
								color:
									ARR_SELECTED_TEMPLATE_PREVIEW.includes(action.payload.id_template) &&
									!TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(action.payload.id_template)
										? "rgba(0,0,0,1)"
										: "rgba(255,255,255,1)",
								// categories button stroke
								stroke: TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(
									action.payload.id_template
								)
									? "rgba(255,255,255,1)"
									: "rgba(0,0,0,1)",
								// categories button shape
								shape: "",
								// categories button icon
								icon_image: "",
								// categories button icon file
								icon_file: null,
								// list of chosen categories to display
								categories: [],
							},
							card_detail: {
								id: null,
								color: ARR_SELECTED_TEMPLATE_PREVIEW.includes(action.payload.id_template)
									? "rgba(255,255,255,1)"
									: "rgba(0,0,0,1)",
								textColor: ARR_SELECTED_TEMPLATE_PREVIEW.includes(action.payload.id_template)
									? "rgba(0,0,0,1)"
									: "rgba(255,255,255,1)",
								stroke: "rgba(0,0,0,1)",
							},
							modal_detail: {
								id: null,
								title: "",
								thumbnail_image: "",
								thumbnail_file: "",
								description: "",
								color: ARR_SELECTED_TEMPLATE_PREVIEW.includes(action.payload.id_template)
									? "rgba(255,255,255,1)"
									: "rgba(0,0,0,1)",
							},
						},
					];
				} else {
					addBody = [
						...state.item,
						{
							id_component: action.payload.id_component,
							id_category: action.payload.id_category,
							background_color: "rgba(255,255,255,1)",
							components: [],
							category_detail: {
								id: null,
								color:
									ARR_SELECTED_TEMPLATE_PREVIEW.includes(action.payload.id_template) &&
									!TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(action.payload.id_template)
										? "rgba(0,0,0,1)"
										: "rgba(255,255,255,1)",
								stroke: TRANSPARENT_CATEGORY_BUTTON_TEMPLATE.includes(
									action.payload.id_template
								)
									? "rgba(255,255,255,1)"
									: "rgba(0,0,0,1)",
								shape: "",
								icon_image: "",
								icon_file: null,
								categories: [],
							},
							card_detail: {
								id: null,
								color: ARR_SELECTED_TEMPLATE_PREVIEW.includes(action.payload.id_template)
									? "rgba(0,0,0,1)"
									: "rgba(255,255,255,1)",
								stroke: "rgba(0,0,0,1)",
							},
							modal_detail: {
								id: null,
								title: "",
								thumbnail_image: "",
								thumbnail_file: "",
								description: "",
								color: ARR_SELECTED_TEMPLATE_PREVIEW.includes(action.payload.id_template)
									? "rgba(0,0,0,1)"
									: "rgba(255,255,255,1)",
							},
						},
					];
				}
			}

			addBody.sort((a, b) => a.id_component - b.id_component);

			return {
				...state,
				item: addBody,
			};
		},
		addSectionComponents: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[action.payload.index].components.push({
						id: action.payload.id,
						id_label: action.payload.id_label,
						id_title: action.payload.id_title,
						id_tagline: action.payload.id_tagline,
						label: action.payload.label,
						title: action.payload.title,
						tagline: action.payload.tagline,
						background_image: action.payload.background_image,
						background_file: action.payload.background_file,
						background_type: action.payload.background_type,
						show_button: action.payload.show_button,
						button_item: action.payload.button_item,
					});
				}
			});
		},
		buttonStatus: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].components.map((component) => {
						component.show_button = action.payload.show_button;
					});
				}
			});
		},
		inputLabel: (state, action) => {
			state.item.map((item) => {
				if (item.id_component === action.payload.idComponent) {
					if (item.components.length === 1) {
						item.components[0].label = action.payload.label;
					} else {
						item.components[action.payload.indexSection].label = action.payload.label;
					}
				}
			});
		},
		label: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					if (item.components.length === 1) {
						state.item[action.payload.index].components[0].label = action.payload.label;
					} else {
						state.item[action.payload.index].components[action.payload.indexComponent].label =
							action.payload.label;
					}
				}
			});
		},
		inputTitle: (state, action) => {
			state.item.map((item) => {
				if (item.id_component === action.payload.idComponent) {
					if (item.components.length === 1) {
						item.components[0].title = action.payload.title;
					} else {
						item.components[action.payload.indexSection].title = action.payload.title;
					}
				}
			});
		},
		title: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					if (item.components.length === 1) {
						state.item[action.payload.index].components[0].title = action.payload.title;
					} else {
						state.item[action.payload.index].components[action.payload.indexComponent].title =
							action.payload.title;
					}
				}
			});
		},
		inputTagline: (state, action) => {
			state.item.map((item) => {
				if (item.id_component === action.payload.idComponent) {
					if (item.components.length === 1) {
						item.components[0].tagline = action.payload.tagline;
					} else {
						item.components[action.payload.indexSection].tagline = action.payload.tagline;
					}
				}
			});
		},
		sectionComponentBg: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					if (item.components.length === 1) {
						state.item[action.payload.index].components[0].background_image =
							action.payload.background_image;
						state.item[action.payload.index].components[0].background_file =
							action.payload.background_file;
						state.item[action.payload.index].components[0].background_type =
							action.payload.background_type;
					} else {
						state.item[action.payload.index].components[
							action.payload.indexComponent
						].background_image = action.payload.background_image;
						state.item[action.payload.index].components[
							action.payload.indexComponent
						].background_file = action.payload.background_file;
						state.item[action.payload.index].components[
							action.payload.indexComponent
						].background_type = action.payload.background_type;
					}
				}
			});
		},
		addFAQ: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.faq.push({
						id: action.payload.id,
						question: action.payload.question,
						answer: action.payload.answer,
					});
				}
			});
		},
		question: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.faq[action.payload.indexFaq].question = action.payload.question;
				}
			});
		},
		answer: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.faq[action.payload.indexFaq].answer = action.payload.answer;
				}
			});
		},
		deleteFAQ: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.faq.splice(action.payload.indexFaq, 1);
				}
			});
		},
		deleteBody: (state, action) => {
			var index = state.item.findIndex((item) => item.id_component == action.payload.idComponent);
			let splice = state.item.splice(index, 1);

			state.item.map((item, index) => {
				if (item.id_component > action.payload.idComponent) {
					state.item[index].id_component = item.id_component - 1;
				}
			});
		},
		deleteSectionComponents: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.components.splice(action.payload.indexComponent, 1);
				}
			});
		},
		switchingUpBody: (state, action) => {
			var index = action.payload.index;

			if (index > 0) {
				var temp = state.item[index];
				state.item[index] = state.item[index - 1];
				state.item[index - 1] = temp;

				state.item[index].id_component = index;
				state.item[index - 1].id_component = index - 1;
			}
		},
		switchingDownBody: (state, action) => {
			var index = action.payload.index;

			if (index < state.item.length - 1) {
				var temp = state.item[index];
				state.item[index] = state.item[index + 1];
				state.item[index + 1] = temp;
				state.item[index].id_component = index;
				state.item[index + 1].id_component = index + 1;
			}
		},
		blog_component: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.blog_detail[action.payload.indexBlog].id_label = action.payload.id_label;
					item.blog_detail[action.payload.indexBlog].id_blog = action.payload.id_blog;
				}
			});
		},
		add_blog_component: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.blog_detail.push({
						id: action.payload.id,
						id_blog: action.payload.id_blog,
						id_label: action.payload.id_label,
					});
				}
			});
		},
		delete_blog_component: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.blog_detail.splice(action.payload.indexBlog, 1);
				}
			});
		},
		switchRightComponent: (state, action) => {
			console.log(action.payload);
		},
		moveDownBody: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[action.payload.index].id_component = action.payload.index + 1;
				}
			});
		},
		changeThumbnailImageForm: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[action.payload.index].form_component.thumbnail_image =
						action.payload.thumbnail_image;
					state.item[action.payload.index].form_component.thumbnail_file =
						action.payload.thumbnail_file;
				}
			});
		},
		addLogo: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.logo_section.push({
						id: action.payload.id,
						name: action.payload.name,
						logo_image: action.payload.logo_image,
						logo_file: action.payload.logo_file,
						order_index: action.payload.orderIndex,
					});
				}
			});
		},
		logoName: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.logo_section[action.payload.indexLogo].name = action.payload.name;
				}
			});
		},
		addLogoImage: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.logo_section[action.payload.indexLogo].logo_image = action.payload.logo_image;
					item.logo_section[action.payload.indexLogo].logo_file = action.payload.logo_file;
				}
			});
		},
		deleteLogo: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.logo_section.splice(action.payload.indexFaq, 1);
				}
			});
		},
		selectForm: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.form_detail.id_category = action.payload.id_category;
				}
			});
		},
		addForm: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.form_detail.id = action.payload.id;
					item.form_detail.id_category = action.payload.id_category;
				}
			});
		},
		setCategories: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.category_detail.categories = action.payload.categories;
				}
			});
		},
		setButtonItems: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.components.map((component) => {
						component.button_item = action.payload.button_item;
					});
				}
			});
		},
		changeCategoriesColor: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.category_detail.color = action.payload.color;
				}
			});
		},
		changeCategoriesStroke: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.category_detail.stroke = action.payload.stroke;
				}
			});
		},
		changeCategoriesIcon: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.category_detail.icon_image = action.payload.icon_image;
					item.category_detail.icon_file = action.payload.icon_file;
				}
			});
		},
		changeCardColor: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.card_detail.color = action.payload.color;
				}
			});
		},
		changeCardTextColor: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.card_detail.textColor = action.payload.textColor;
				}
			});
		},
		changeCardStroke: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.card_detail.stroke = action.payload.stroke;
				}
			});
		},
		changeModalColor: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.modal_detail.color = action.payload.color;
				}
			});
		},
		changeModalThumbnail: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.modal_detail.thumbnail_image = action.payload.thumbnail_image;
					item.modal_detail.thumbnail_file = action.payload.thumbnail_file;
				}
			});
		},
		changeModalTitle: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.modal_detail.title = action.payload.title;
				}
			});
		},
		changeModalDescription: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					item.modal_detail.description = action.payload.description;
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBodyThunk.pending, (state) => {
				console.log("Getting the body...");
			})
			.addCase(getBodyThunk.fulfilled, (state, action) => {
				console.log("Get body success!");
				state.item = action.payload.body;
			})
			.addCase(getBodyThunk.rejected, (state, action) => {
				console.log("Get body failed!");
				console.error(action.payload);
			});
	},
});
export const {
	addBody,
	buttonStatus,
	inputLabel,
	label,
	inputTitle,
	title,
	inputTagline,
	sectionComponentBg,
	addFAQ,
	question,
	answer,
	deleteFAQ,
	deleteBody,
	addSectionComponents,
	deleteSectionComponents,
	switchingUpBody,
	switchingDownBody,
	blog_component,
	add_blog_component,
	delete_blog_component,
	switchRightComponent,
	moveDownBody,
	changeThumbnailImageForm,
	deleteFormComponent,
	addLogo,
	logoName,
	logoImage,
	addLogoImage,
	deleteLogo,
	selectForm,
	addForm,
	setCategories,
	setButtonItems,
	changeCategoriesColor,
	changeCategoriesStroke,
	changeCategoriesIcon,
	changeCardColor,
	changeCardStroke,
	changeCardTextColor,
	changeModalColor,
	changeModalThumbnail,
	changeModalTitle,
	changeModalDescription,
} = bodySlice.actions;
export default bodySlice.reducer;
