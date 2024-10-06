import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	font_list: null,
	postStatus: "idle",
	fetchStatus: "idle",
	error: null,
};

export const getGoogleFont = createAsyncThunk(
	"googleFontSlice/getGoogleFont",
	async ({ token }, thunkAPI) => {
		try {
			const response = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${token}`);
			return response.data.items;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const googleFontSlice = createSlice({
	name: "googleFontSlice",
	initialState,
	reducers: {
		handleFetchData: (state, action) => {
			state.newData = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getGoogleFont.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(getGoogleFont.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";
				state.font_list = action.payload;
			})
			.addCase(getGoogleFont.rejected, (state, action) => {
				state.fetchStatus = "failed";
				state.error = action.payload;
			});
	},
});

export const { handleNewProduct, handleDataById } = googleFontSlice.actions;

export default googleFontSlice.reducer;
