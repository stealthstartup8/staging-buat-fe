import { createSlice } from "@reduxjs/toolkit";
import { getNavbarThunk } from "@/utils/fetch/getNavbarThunk";

// this slice is used to store the navbar data with 2 version, the server and local version
// the local version is the one that will be manipulated by the user, while the server version is the one that will be used to compare the local version
export const navbarSlice = createSlice({
	name: "navbarSlice",
	// a website can only have one navbar, hence why it is an object instead of an array
	// 	here is the structure:
	// 	id --> null if undefined, string if defined
	// 	id_website --> null if undefined, string if defined
	// 	id_template --> null if undefined, string if defined
	// 	data --> "available" if navbar exists in website, and "not available" if it doesn't
	initialState: {
		server_item: {}, // This data mirrors the database version, only changes when database is updated
		item: {},
		show_navbar: true,
	},
	reducers: {
		addNavbar: (state, action) => {
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
		deleteNavbar: (state, action) => {
			state.item = {
				data: "not available",
				id: null,
			};
		},
		toggleShowNavbar: (state) => {
			state.show_navbar = !state.show_navbar;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNavbarThunk.pending, (state) => {
				console.log("Getting the navbar data...");
			})
			.addCase(getNavbarThunk.fulfilled, (state, action) => {
				console.log("Get navbar success!");

				function isEmpty(obj) {
					return Object.keys(obj).length === 0 && obj.constructor === Object;
				}

				if (isEmpty(action.payload.navbar)) {
					state.item = { ...action.payload.navbar, data: "" };
					state.server_item = { ...action.payload.navbar, data: "" };
				} else {
					state.item = { ...action.payload.navbar, data: "available" };
					state.server_item = { ...action.payload.navbar, data: "available" };
					state.show_navbar = true;
				}
			})
			.addCase(getNavbarThunk.rejected, (state, action) => {
				console.log("Get navbar failed!");
				console.error(action.payload);
			});
	},
});
export const { addNavbar, deleteNavbar, toggleShowNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
