import { createSlice } from "@reduxjs/toolkit";
import { getFooterThunk } from "@/utils/fetch/getFooterThunk";
export const footerCompany = createSlice({
	name: "footerCompany",
	initialState: {
		server_item: {
			background_images: "",
			background_images_file: "",
			background_color: "#333E48",
		},
		item: {
			background_images: "",
			background_images_file: "",
			background_color: "#333E48",
		},
	},
	reducers: {
		addFooterCompany: (state, action) => {
			return {
				...state,
				item: {
					background_images: action.payload.background_images,
					background_color: action.payload.background_color,
				},
			};
		},
		changeBgColor: (state, action) => {
			state.item.background_color = action.payload.background_color;
		},
		changeBgImages: (state, action) => {
			state.item.background_images = action.payload.background_images;
			state.item.background_images_file = action.payload.background_images_file;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getFooterThunk.pending, (state) => {
				console.log("Getting the footer data...");
			})
			.addCase(getFooterThunk.fulfilled, (state, action) => {
				console.log("Get footer success!");
				// no need to replace state if the data is undefined
				// only checks 2 fields for the sake of simplicity
				if (
					action.payload.footerCompany.background_images !== undefined &&
					action.payload.footerCompany.background_color !== undefined
				) {
					state.item = action.payload.footerCompany;
					state.server_item = action.payload.footerCompany;
				}
			})
			.addCase(getFooterThunk.rejected, (state, action) => {
				console.log("Get footer failed!");
				console.error(action.payload);
			});
	},
});
export const { changeBgColor, changeBgImages, addFooterCompany } = footerCompany.actions;
export default footerCompany.reducer;
