import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTemplate = createAsyncThunk("blogTemplate/templateList", async () => {
	return await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/template`).then((res) => {
		return res.data.data;
	});
});

export const templateBlogSlice = createSlice({
	name: "blogTemplate",
	initialState: {
		templateList: [],
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTemplate.fulfilled, (state, action) => {
				state.templateList = action.payload;
				state.error = null;
			})
			.addCase(getTemplate.rejected, (state, action) => {
				state.error = action.error.message;
			});
	},
});

export default templateBlogSlice.reducer;
