import { createSlice } from "@reduxjs/toolkit";
import { getFooterThunk } from "@/utils/fetch/getFooterThunk";
export const navigationFooterSlice = createSlice({
	name: "navigationFooterSlice",
	initialState: {
		item: [],
	},
	reducers: {
		addFooterMenuNavigation: (state, action) => {
			const sectionAdd = [...state.item, { ...action.payload }];
			return {
				...state,
				item: sectionAdd,
			};
		},
		addFooterSubMenuNavigation: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].sub_navigation.push({
						id: action.payload.id,
						orderIndex: action.payload.orderIndex,
						subnav_name: action.payload.subnav_name,
						link: action.payload.link,
					});
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
					state.item.splice(action.payload, 1);
					state.item.map((item, index) => {
						state.item[index].orderIndex = index;
					});
				}
			});
		},
		deleteAllNav: (state) => {
			state.item = [];
		},
		deleteSubNav: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index_nav) {
					state.item[action.payload.index_nav].sub_navigation.splice(
						action.payload.index_subnav,
						1
					);
					state.item[action.payload.index_nav].sub_navigation.map((item, index) => {
						state.item[action.payload.index_nav].sub_navigation[index].orderIndex = index;
					});
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getFooterThunk.pending, (state) => {
				console.log("Getting the footer data...");
			})
			.addCase(getFooterThunk.fulfilled, (state, action) => {
				console.log("Get footer success!");
				state.item = action.payload.footerNavigation;
			})
			.addCase(getFooterThunk.rejected, (state, action) => {
				console.log("Get footer failed!");
				console.error(action.payload);
			});
	},
});
export const {
	addFooterMenuNavigation,
	changeNavName,
	addFooterSubMenuNavigation,
	changeSubNavName,
	changeSubNavLink,
	deleteNav,
	deleteAllNav,
	deleteSubNav,
} = navigationFooterSlice.actions;
export default navigationFooterSlice.reducer;
