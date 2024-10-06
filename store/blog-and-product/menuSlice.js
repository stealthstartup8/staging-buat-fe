import { createSlice } from "@reduxjs/toolkit";

const initialMenuManagement = {
	selectedMenu: "background",
};

const initialSectionSelection = {
	selectedSection: "blog",
};

export const menuSlice = createSlice({
	name: "menu",
	initialState: {
		menuManagement: initialMenuManagement,
		sectionSelection: initialSectionSelection,
	},
	reducers: {
		handleMenuManagement: (state, action) => {
			state.menuManagement.selectedMenu = action.payload;
		},
		handleSectionSelection: (state, action) => {
			state.sectionSelection.selectedSection = action.payload;
		},
	},
});

export const { handleMenuManagement, handleSectionSelection } = menuSlice.actions;

export default menuSlice.reducer;
