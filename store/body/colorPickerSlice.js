import { createSlice } from "@reduxjs/toolkit";

// This component is for handling the opening and closing of the color picker for each component
// If you want to add a new component that needs a color picker, add a new one here
export const colorPickerSlice = createSlice({
	name: "colorPickerSlice",
	// Each component has its own state to toggle the color picker
	initialState: {
		buttonColorPicker: {
			text: false,
			button: false,
			stroke: false,
		},
		labelColorPicker: {
			text: false,
			button: false,
			stroke: false,
		},
		backgroundColorPicker: false,
		fontColorPicker: {
			label: false,
			headline: false,
			tagline: false,
		},
		categoryColorPicker: {
			color: false,
			stroke: false,
		},
		commerceCardColorPicker: {
			color: false,
			stroke: false,
		},
		commerceModalColorPicker: {
			color: false,
		},
	},
	reducers: {
		handleButtonColorPicker: (state, action) => {
			const { type } = action.payload;
			state.buttonColorPicker[type] = !state.buttonColorPicker[type];
		},
		handleLabelColorPicker: (state, action) => {
			const { type } = action.payload;
			state.labelColorPicker[type] = !state.labelColorPicker[type];
		},
		handleBackgroundColorPicker: (state, action) => {
			state.backgroundColorPicker = !state.backgroundColorPicker;
		},
		handleFontColorPicker: (state, action) => {
			const { type } = action.payload;
			state.fontColorPicker[type] = !state.fontColorPicker[type];
		},
		handleCategoryColorPicker: (state, action) => {
			const { type } = action.payload;
			state.categoryColorPicker[type] = !state.categoryColorPicker[type];
		},
		handleCommerceCardColorPicker: (state, action) => {
			const { type } = action.payload;
			state.commerceCardColorPicker[type] = !state.commerceCardColorPicker[type];
		},
		handleCommerceModalColorPicker: (state, action) => {
			const { type } = action.payload;
			state.commerceModalColorPicker[type] = !state.commerceModalColorPicker[type];
		},
		resetColorPickers: (state) => {
			state.buttonColorPicker = {
				text: false,
				button: false,
				stroke: false,
			};
			state.labelColorPicker = {
				text: false,
				button: false,
				stroke: false,
			};
			state.backgroundColorPicker = false;
			state.fontColorPicker = {
				label: false,
				headline: false,
				tagline: false,
			};
			// This is for label color picker, but label is already referred as one of the font types so i use category instead
			state.categoryColorPicker = {
				text: false,
				background: false,
				stroke: false,
			};
			state.commerceCardColorPicker = {
				color: false,
				stroke: false,
			};
			state.commerceModalColorPicker = {
				color: false,
			};
		},
	},
});
export const {
	handleButtonColorPicker,
	handleLabelColorPicker,
	handleBackgroundColorPicker,
	handleFontColorPicker,
	handleCategoryColorPicker,
	handleCommerceCardColorPicker,
	handleCommerceModalColorPicker,
	resetColorPickers,
} = colorPickerSlice.actions;
export default colorPickerSlice.reducer;
