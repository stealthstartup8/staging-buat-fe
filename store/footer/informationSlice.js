import { createSlice } from "@reduxjs/toolkit";
import { getFooterThunk } from "@/utils/fetch/getFooterThunk";
export const informationFooterSlice = createSlice({
	name: "informationFooterSlice",
	initialState: {
		server_item: {
			title: "",
			about: "",
			footer_note: "",
			logo: "",
			logo_file: "",
			information: [],
		},
		item: {
			title: "",
			about: "",
			footer_note: "",
			logo: "",
			logo_file: "",
			information: [],
		},
	},
	reducers: {
		addInformationFooter: (state, action) => {
			return {
				...state,
				item: {
					title: action.payload.title,
					about: action.payload.about,
					logo: action.payload.logo,
					footer_note: action.payload.footer_note,
					logo_file: "",
					information: [],
				},
			};
		},
		changeTitle: (state, action) => {
			state.item.title = action.payload.title;
		},
		changeFooterNote: (state, action) => {
			state.item.footer_note = action.payload.footer_note;
		},
		changeAbout: (state, action) => {
			state.item.about = action.payload.about;
		},
		addLogo: (state, action) => {
			state.item.logo = action.payload.logo;
			state.item.logo_file = action.payload.logo_file;
		},
		addSubInformation: (state, action) => {
			state.item.information.push({
				id: action.payload.id,
				information_type: action.payload.information_type,
				information: action.payload.information,
			});
		},
		deleteSubInformation: (state, action) => {
			state.item.information.splice(action.payload.index, 1);
		},
		changeInformationType: (state, action) => {
			state.item.information.map((item, index) => {
				if (index == action.payload.index) {
					item.information_type = action.payload.information_type;
				}
			});
		},
		changeInformation: (state, action) => {
			state.item.information.map((item, index) => {
				if (index == action.payload.index) {
					item.information = action.payload.information;
				}
			});
		},
		deleteInformationFooter: (state, action) => {
			return {
				...state,
				item: {
					title: "",
					about: "",
					logo: "",
					logo_file: "",
					information: [],
				},
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getFooterThunk.pending, (state) => {
				console.log("Getting the footer data...");
			})
			.addCase(getFooterThunk.fulfilled, (state, action) => {
				console.log("Get footer success!");
				// no need to replace state if the data is undefined
				// only checks 2 fields for the sake of simplicity
				if (
					action.payload.footerInformation.title !== undefined &&
					action.payload.footerInformation.about !== undefined
				) {
					state.item = action.payload.footerInformation;
					state.server_item = action.payload.footerInformation;
				}
			})
			.addCase(getFooterThunk.rejected, (state, action) => {
				console.log("Get footer failed!");
				console.error(action.payload);
			});
	},
});
export const {
	changeTitle,
	changeAbout,
	addLogo,
	addSubInformation,
	deleteSubInformation,
	changeInformationType,
	changeInformation,
	addInformationFooter,
	deleteInformationFooter,
	changeFooterNote,
} = informationFooterSlice.actions;
export default informationFooterSlice.reducer;
