import { createSlice } from "@reduxjs/toolkit";
import { getNavbarThunk } from "@/utils/fetch/getNavbarThunk";
export const navigationMenuSlice = createSlice({
	name: "navigationMenuSlice",
	initialState: {
		item: [],
	},
	reducers: {
		addMenuNavigation: (state, action) => {
			const sectionAdd = [...state.item, { ...action.payload }];
			return {
				...state,
				item: sectionAdd,
			};
		},
		addSubMenuNavigation: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].sub_navigation.push({
						id: action.payload.id,
						orderIndex: action.payload.orderIndex,
						subnav_name: action.payload.subnav_name,
						link: action.payload.link,
					});
					state.item[index].subnav = "true";
				}
			});
		},
		changeNavName: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].navigation_name = action.payload.navigation_name;
				}
			});
		},
		changeUrlNav: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].link = action.payload.link;
				}
			});
		},
		changeSubNavName: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index_nav) {
					state.item[action.payload.index_nav].sub_navigation[
						action.payload.index_subnav
					].subnav_name = action.payload.subnav_name;
				}
			});
		},
		changeSubNavLink: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index_nav) {
					state.item[action.payload.index_nav].sub_navigation[action.payload.index_subnav].link =
						action.payload.link;
				}
			});
		},
		deleteNav: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload) {
					state.item.splice(index, 1);
					state.item.map((item, index) => {
						item.orderIndex = index;
					});
				}
			});
		},
		deleteSubNav: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index_nav) {
					state.item[action.payload.index_nav].sub_navigation.splice(
						action.payload.index_subnav,
						1
					);
					state.item[action.payload.index_nav].sub_navigation.map((item, index) => {
						item.orderIndex = index;
					});
					if (state.item[action.payload.index_nav].sub_navigation.length == 0) {
						state.item[action.payload.index_nav].subnav = "false";
					}
				}
			});
		},
		changeToButton: (state, action) => {
			state.item.map((item) => {
				if (item.navigation_name == action.payload.target) {
					item.isButton = action.payload.isButton;
					item.id_shape = "2";
				} else {
					item.isButton = false;
				}
			});
		},
		changeButtonShape: (state, action) => {
			state.item.map((item) => {
				if (item.navigation_name == action.payload.target) {
					item.id_shape = action.payload.id_shape;
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNavbarThunk.pending, (state) => {
				console.log("Getting the navbar data...");
			})
			.addCase(getNavbarThunk.fulfilled, (state, action) => {
				console.log("Get navbar success!");
				state.item = action.payload.navbarNavigation;
			})
			.addCase(getNavbarThunk.rejected, (state, action) => {
				console.log("Get navbar failed!");
				console.error(action.payload);
			});
	},
});
export const {
	addMenuNavigation,
	changeNavName,
	changeUrlNav,
	addSubMenuNavigation,
	changeSubNavName,
	changeSubNavLink,
	deleteNav,
	deleteSubNav,
	changeToButton,
	changeButtonShape,
} = navigationMenuSlice.actions;
export default navigationMenuSlice.reducer;
