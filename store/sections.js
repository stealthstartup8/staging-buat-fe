import { createSlice } from "@reduxjs/toolkit";
import { getBodyThunk } from "@/utils/fetch/getBodyThunk";

// this slice is used to store the section data
export const sectionSlices = createSlice({
	name: "sectionSlices",
	// each item represent a section as a general (not entitled to a single template)

	// here is the structure of each item:
	// id --> null if undefined, string if defined
	// id_page --> 9919 if undefined, string if defined
	// id_template --> number
	// order_index --> number
	// id_category --> number
	// background_color --> string in rgba format
	// background_image --> string
	// background_file --> string if empty, file if not empty
	// background_type --> string
	initialState: {
		item: [],
	},
	reducers: {
		addSection: (state, action) => {
			const sectionAdd = [...state.item, { ...action.payload }];
			sectionAdd.sort((a, b) => a.order_index - b.order_index);

			return {
				...state,
				item: sectionAdd,
			};
		},
		deleteSection: (state, action) => {
			state.item.map((item, index) => {
				if (item.order_index == action.payload.idComponent) {
					state.item.splice(index, 1);
				}
			});

			state.item.map((item, index) => {
				if (item.order_index > action.payload.idComponent) {
					state.item[index].order_index = item.order_index - 1;
				}
			});
		},
		backgroundColor: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[action.payload.index].background_color = action.payload.background_color;
				}
			});
		},
		backgroundImage: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[action.payload.index].background_image = action.payload.background_image;
					state.item[action.payload.index].background_file = action.payload.background_file;
					state.item[action.payload.index].background_type = action.payload.background_type;
				}
			});
		},
		switchingUp: (state, action) => {
			var index = state.item.findIndex((item) => item.order_index == action.payload.idComponent);

			if (index > 0) {
				var temp = state.item[index];
				state.item[index] = state.item[index - 1];
				state.item[index - 1] = temp;
				state.item[index].order_index = index;
				state.item[index - 1].order_index = index - 1;
			}
		},
		switchingDown: (state, action) => {
			var index = state.item.findIndex((item) => item.order_index == action.payload.idComponent);

			if (index < state.item.length - 1) {
				var temp = state.item[index];
				state.item[index] = state.item[index + 1];
				state.item[index + 1] = temp;
				state.item[index].order_index = index;
				state.item[index + 1].order_index = index + 1;
			}
		},
		moveDown: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[action.payload.index].order_index = action.payload.index + 1;
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBodyThunk.pending, (state) => {
				console.log("Getting the body...");
			})
			.addCase(getBodyThunk.fulfilled, (state, action) => {
				console.log("Get body success!");
				state.item = action.payload.section;
			})
			.addCase(getBodyThunk.rejected, (state, action) => {
				console.log("Get body failed!");
				console.error(action.payload);
			});
	},
});
export const {
	addSection,
	deleteSection,
	backgroundColor,
	backgroundImage,
	switchingUp,
	switchingDown,
	moveDown,
} = sectionSlices.actions;
export default sectionSlices.reducer;
