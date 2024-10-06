import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_COLOR_OPTIONS } from "../src/utils/constants/Styles";
// Some important notes in this context:
// 1. section refers to the a template that is used in the website. For example, hero, pricing, career, etc are sections that can be drag and dropped to the website.
// 2. component refers to the elements inside the section. For example, in the hero section, there are headline, tagline, button, and in the commerce section, there are card, modal, button, background, etc.
// 3. management refers to the settings of the component. For example, in the hero section, there are settings for the headline, tagline, button, etc.
export const styleManagementSlice = createSlice({
	name: "styleManagement",
	initialState: {
		// stores the selected component name. example: "pricing-package", "careerLabel", "commerce-card", "forms"
		selectComponent: "",
		// stores the selected section name. example: "hero", "pricing", "career""
		selectSection: "",
		// stores the index of hero slide (only the ones that has slider). example: 0, 1, 2, 3
		sectionComponentHero: 0,
		// stores the selected management index which controls what management menu to show. example: 0, 1, 2, 3
		// actually, there is an exception for navbar and footers, check on src\components\Fragments\StyleManagement\index.js
		selectManagement: "",
		//
		sectionId: "",
		// stores the last selected font component name. example: "headline", "label", "tagline"
		fontComponent: "",
		// this is the general version of sectionComponentHero. It stores the index of the selected component. example: 0, 1, 2, 3
		selectIndexComponent: 0,
		// this is the color options diplayed on the color picker
		colorOptions: DEFAULT_COLOR_OPTIONS,
	},
	reducers: {
		handleSelectComponent: (state, action) => {
			state.selectComponent = action.payload;
		},
		resetState: (state) => {
			state.selectComponent = "";
			state.selectSection = "";
			state.sectionComponentHero = 0;
			state.selectManagement = "";
			state.sectionId = "";
			state.fontComponent = "";
			state.selectIndexComponent = 0;
		},
		handleSelectSection: (state, action) => {
			state.selectSection = action.payload;
		},
		handleSectionComponentHero: (state, action) => {
			state.sectionComponentHero = action.payload;
		},
		handleSelectManagement: (state, action) => {
			state.selectManagement = action.payload;
		},
		handleSectionId: (state, action) => {
			state.sectionId = action.payload;
		},
		handleFontComponent: (state, action) => {
			state.fontComponent = action.payload;
		},
		handleSelectIndexComponent: (state, action) => {
			state.selectIndexComponent = action.payload;
		},
		handleSetColorOptions: (state, action) => {
			state.colorOptions = action.payload;
		},
	},
});

export const {
	handleSelectComponent,
	handleSelectSection,
	handleSectionComponentHero,
	handleSelectManagement,
	handleSectionId,
	handleFontComponent,
	handleSelectIndexComponent,
	resetState,
	handleSetColorOptions,
} = styleManagementSlice.actions;

export default styleManagementSlice.reducer;
