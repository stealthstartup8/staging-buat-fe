import { createSlice } from "@reduxjs/toolkit";
import { getNavbarThunk } from "@/utils/fetch/getNavbarThunk";
export const navigationFontSlice = createSlice({
	name: "navigationFontSlice",
	initialState: {
		item: {
			font_style: "",
			font_size: "",
			bold: false,
			italic: false,
			text_decoration: "",
			align: "left",
			color: "rgba(255,255,255,1)",
		},
	},
	reducers: {
		addFontStyleMenu: (state, action) => {
			return {
				...state,
				item: {
					font_style: action.payload.font_style,
					font_size: action.payload.font_size,
					bold: action.payload.bold,
					italic: action.payload.italic,
					text_decoration: action.payload.text_decoration,
					align: action.payload.align,
					color: action.payload.color,
				},
			};
		},
		fontStyle: (state, action) => {
			state.item.font_style = action.payload.font_style;
		},
		fontSize: (state, action) => {
			state.item.font_size = action.payload.font_size;
		},
		boldText: (state, action) => {
			if (state.item.bold == true) {
				action.payload.bold = false;
			}
			state.item.bold = action.payload.bold;
		},
		italicText: (state, action) => {
			if (state.item.italic == true) {
				action.payload.italic = false;
			}
			state.item.italic = action.payload.italic;
		},
		textDecoration: (state, action) => {
			if (state.item.text_decoration == action.payload.text_decoration) {
				action.payload.text_decoration = "";
			}
			state.item.text_decoration = action.payload.text_decoration;
		},
		textColor: (state, action) => {
			state.item.color = action.payload.color;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNavbarThunk.pending, (state) => {
				console.log("Getting the navbar data...");
			})
			.addCase(getNavbarThunk.fulfilled, (state, action) => {
				console.log("Get navbar success!");
				// if there is no data on the database, every field will be null, this checks only 2 fields for the sake of simplicity
				// there is no need to replace the state with null values, because it will cause problems when trying to create/edit a navbar
				if (
					action.payload.navbarFont.font_style !== undefined &&
					action.payload.navbarFont.font_size !== undefined
				) {
					state.item = action.payload.navbarFont;
				}
			})
			.addCase(getNavbarThunk.rejected, (state, action) => {
				console.log("Get navbar failed!");
				console.error(action.payload);
			});
	},
});
export const { fontStyle, fontSize, boldText, italicText, textDecoration, textColor, addFontStyleMenu } =
	navigationFontSlice.actions;
export default navigationFontSlice.reducer;
