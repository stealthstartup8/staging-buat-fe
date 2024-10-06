import { createSlice } from "@reduxjs/toolkit";

const initialBackgroundColor = {
	backgroundColor: "rgba(255,255,255,1)",
};

const initialBackButton = {
	text: "Back",
};

export const styleSlice = createSlice({
	name: "style",
	initialState: {
		backgroundStyle: initialBackgroundColor,
		backButton: initialBackButton,
	},
	reducers: {
		handleBackgroundColor: (state, action) => {
			state.backgroundStyle.backgroundColor = action.payload;
		},
		handleBackButtonText: (state, action) => {
			state.backButton.text = action.payload;
		},
	},
});

export const { handleBackgroundColor, handleBackButtonText } = styleSlice.actions;

export default styleSlice.reducer;
