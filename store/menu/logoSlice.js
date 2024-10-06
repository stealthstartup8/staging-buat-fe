import { createSlice } from "@reduxjs/toolkit";
import { getNavbarThunk } from "@/utils/fetch/getNavbarThunk";
export const navigationLogoSlice = createSlice({
	name: "navigationLogoSlice",
	initialState: {
		server_item: {
			logo_image: "",
			logo_file: "",
			background_color: "#1A1A1A",
		},
		item: {
			logo_image: "",
			logo_file: "",
			background_color: "#1A1A1A",
		},
	},
	reducers: {
		addLogoAndBgColor: (state, action) => {
			return {
				...state,
				item: {
					logo_image: action.payload.logo_image,
					background_color: action.payload.background_color,
				},
			};
		},
		addCompanyLogo: (state, action) => {
			state.item.logo_image = action.payload.logo_image;
			state.item.logo_file = action.payload.logo_file;
		},
		changeBackgroundColor: (state, action) => {
			state.item.background_color = action.payload.background_color;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNavbarThunk.pending, (state) => {
				console.log("Getting the navbar data...");
			})
			.addCase(getNavbarThunk.fulfilled, (state, action) => {
				console.log("Get navbar success!");
				// no need to replace state if the data is null
				// only checks 2 fields for the sake of simplicity
				if (
					action.payload.navbarLogo.logo_image !== null &&
					action.payload.navbarLogo.background_color !== null
				) {
					state.item = action.payload.navbarLogo;
					state.server_item = action.payload.navbarLogo;
				}
			})
			.addCase(getNavbarThunk.rejected, (state, action) => {
				console.log("Get navbar failed!");
				console.error(action.payload);
			});
	},
});
export const { addLogoAndBgColor, addCompanyLogo, changeBackgroundColor } = navigationLogoSlice.actions;
export default navigationLogoSlice.reducer;
