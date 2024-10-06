import { createSlice } from "@reduxjs/toolkit";
import { getFooterThunk } from "@/utils/fetch/getFooterThunk";

// this slice is used to store the footer data with 2 version, the server and local version
// the local version is the one that will be manipulated by the user, while the server version is the one that will be used to compare the local version
export const footerSlice = createSlice({
	name: "footerSlice",
	// a website can only have one footer, hence why it is an object instead of an array
	// 	here is the structure:
	// 	id --> null if undefined, string if defined
	// 	id_website --> null if undefined, string if defined
	// 	id_template --> null if undefined, string if defined
	// 	data --> "available" if footer exists in website, and "not available" if it doesn't	data: "available",
	initialState: {
		server_item: {}, // This data mirrors the database version, only changes when database is updated
		item: {},
	},
	reducers: {
		addFooter: (state, action) => {
			return {
				...state,
				item: {
					data: "available",
					id: action.payload.id,
					id_website: action.payload.id_website,
					id_template: action.payload.id_template,
				},
			};
		},
		deleteFooter: (state, action) => {
			state.item = {
				data: "not available",
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getFooterThunk.pending, (state) => {
				console.log("Getting the footer data...");
			})
			.addCase(getFooterThunk.fulfilled, (state, action) => {
				function isEmpty(obj) {
					return Object.keys(obj).length === 0 && obj.constructor === Object;
				}
				if (isEmpty(action.payload.footer)) {
					state.item = { ...action.payload.footer, data: "" };
					state.server_item = { ...action.payload.footer, data: "" };
				} else {
					state.item = { ...action.payload.footer, data: "available" };
					state.server_item = { ...action.payload.footer, data: "available" };
				}
			})
			.addCase(getFooterThunk.rejected, (state, action) => {
				console.log("Get footer failed!");
				console.error(action.payload);
			});
	},
});
export const { addFooter, deleteFooter } = footerSlice.actions;
export default footerSlice.reducer;
