import { createSlice } from "@reduxjs/toolkit";

// this slice is used to store the selected section data such as page id, category id, template id, and component id
// choiceLabelIndex is the selected label index of the selected section
export const selectSection = createSlice({
	// this slice is imported as a different name which is "addChangeChoice", on the definition of the store, hence why you see "addChangeChoice" on the selector hook to access this slice
	name: "selectSection",
	initialState: {
		item: {
			choiceIdPages: "",
			choiceIdCategory: "",
			choiceIdTemplate: "",
			choiceIdComponent: null,
			choiceLabelIndex: 0,
		},
	},
	reducers: {
		addChangeChoice: (state, action) => {
			const updateChoice = {
				...state.item,
				...action.payload,
			};
			return {
				...state,
				item: updateChoice,
			};
		},
	},
});

export const { addChangeChoice } = selectSection.actions;

export default selectSection.reducer;
