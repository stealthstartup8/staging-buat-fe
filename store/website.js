import { createSlice } from "@reduxjs/toolkit";

export const websiteSlices = createSlice({
	name: "websiteSlices",
	initialState: {
		new_user: false,
	},
	reducers: {
		handleNewUser: (state, action) => {
			state.new_user = action.payload;
		},
	},
});

export const { handleNewUser } = websiteSlices.actions;

export default websiteSlices.reducer;
