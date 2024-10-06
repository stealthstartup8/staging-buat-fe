import { createSlice } from "@reduxjs/toolkit";
import { getNavbarThunk } from "@/utils/fetch/getNavbarThunk";
export const navigationButtonSlice = createSlice({
	name: "navigationButtonSlice",
	initialState: {
		item: {
			button_color: "",
			stroke_button_color: "",
		},
	},
	reducers: {
		changeButtonStyle: (state, action) => {
			state.item.button_color = action.payload.button_color;
			state.item.stroke_button_color = action.payload.stroke_button_color;
		},
		changeButtonColor: (state, action) => {
			state.item.button_color = action.payload.button_color;
		},
		changeStrokeButtonColor: (state, action) => {
			state.item.stroke_button_color = action.payload.stroke_button_color;
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
				if (
					action.payload.navbarButton.button_color !== null &&
					action.payload.navbarButton.stroke_button_color !== null
				) {
					state.item = action.payload.navbarButton;
				}
			})
			.addCase(getNavbarThunk.rejected, (state, action) => {
				console.log("Get navbar failed!");
				console.error(action.payload);
			});
	},
});
export const { changeButtonColor, changeStrokeButtonColor, changeButtonStyle } =
	navigationButtonSlice.actions;
export default navigationButtonSlice.reducer;
