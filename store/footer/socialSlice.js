import { createSlice } from "@reduxjs/toolkit";
import { getFooterThunk } from "@/utils/fetch/getFooterThunk";
export const socialFooterSlice = createSlice({
	name: "socialFooterSlice",
	initialState: {
		server_item: [], // This data mirrors the database version, only changes when database is updated
		item: [],
	},
	reducers: {
		addSocialMedia: (state, action) => {
			const sectionAdd = [...state.item, { ...action.payload }];
			return {
				...state,
				item: sectionAdd,
			};
		},
		socialType: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].social_type = action.payload.social_type;
				}
			});
		},
		socialName: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].social_name = action.payload.social_name;
				}
			});
		},
		socialLink: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].social_link = action.payload.social_link;
				}
			});
		},
		socialIcon: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].icon = action.payload.icon;
					state.item[index].icon_file = action.payload.icon_file;
				}
			});
		},
		deleteSocial: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload) {
					state.item.splice(action.payload, 1);
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
				state.item = action.payload.footerSocial;
				state.server_item = action.payload.footerSocial;
			})
			.addCase(getFooterThunk.rejected, (state, action) => {
				console.log("Get footer failed!");
				console.error(action.payload);
			});
	},
});
export const { addSocialMedia, socialType, socialLink, socialName, socialIcon, deleteSocial } =
	socialFooterSlice.actions;
export default socialFooterSlice.reducer;
