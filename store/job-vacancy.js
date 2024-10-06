import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	category_data: null,
	career_data: null,
	dataById: null,
	newData: {
		category: "",
		button: {
			name: "",
			url: "",
		},
		name: "",
		salary: "",
		location: "",
		description: "",
		status: false,
	},

	postStatus: "idle",
	fetchStatus: "idle",
	error: null,
};

export const postJobDetails = createAsyncThunk(
	"jobVacancy/postJobDetails",
	async ({ jobDetails, token, website_id, status }, thunkAPI) => {
		try {
			const response = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + "/career",
				{ ...jobDetails, idWebsite: website_id, status: status },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const fetchAllCareerData = createAsyncThunk(
	"jobVacancy/fetchAllCareerData",
	async ({ website_id, token }, thunkAPI) => {
		try {
			const response = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/career/career-by-website/${website_id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const fetchCategory = createAsyncThunk(
	"jobVacancy/fetchCategory",
	async ({ website_id, token }, thunkAPI) => {
		try {
			const response = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/career/category/${website_id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const fetchDataById = createAsyncThunk("jobVacancy/fetchDataById", async ({ id, token }, thunkAPI) => {
	try {
		const response = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/career/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export const putDataById = createAsyncThunk(
	"jobVacancy/putDataById",
	async ({ jobDetails, id, token, status }, thunkAPI) => {
		try {
			const response = await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + `/career/${id}`,
				{ ...jobDetails, status: status },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const deleteDataById = createAsyncThunk(
	"jobVacancy/deleteDataById",
	async ({ id, token }, thunkAPI) => {
		try {
			const response = await axios.delete(process.env.NEXT_PUBLIC_API_KEY + `/career/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const jobVacancySlice = createSlice({
	name: "jobVacancy",
	initialState,
	reducers: {
		handleNewProduct: (state, action) => {
			state.newData = action.payload;
		},
		handleDataById: (state, action) => {
			state.dataById = action.payload;
		},
		handleDesc: (state, action) => {
			state.dataById.desc = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postJobDetails.pending, (state) => {
				state.postStatus = "loading";
			})
			.addCase(postJobDetails.fulfilled, (state, action) => {
				state.postStatus = "succeeded";
			})
			.addCase(postJobDetails.rejected, (state, action) => {
				state.postStatus = "failed";
				state.error = action.payload;
			})
			.addCase(fetchAllCareerData.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(fetchAllCareerData.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";
				state.career_data = action.payload;
			})
			.addCase(fetchAllCareerData.rejected, (state, action) => {
				state.fetchStatus = "failed";
				state.error = action.payload;
			})
			.addCase(fetchCategory.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(fetchCategory.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";
				state.category_data = action.payload;
			})
			.addCase(fetchCategory.rejected, (state, action) => {
				state.fetchStatus = "failed";
				state.error = action.payload;
			})
			.addCase(fetchDataById.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(fetchDataById.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";
				state.dataById = action.payload;
			})
			.addCase(fetchDataById.rejected, (state, action) => {
				state.fetchStatus = "failed";
				state.error = action.payload;
			})
			.addCase(putDataById.pending, (state) => {
				state.postStatus = "loading";
			})
			.addCase(putDataById.fulfilled, (state, action) => {
				state.postStatus = "succeeded";
			})
			.addCase(putDataById.rejected, (state, action) => {
				state.postStatus = "failed";
				state.error = action.payload;
			})
			.addCase(deleteDataById.pending, (state) => {
				state.postStatus = "loading";
			})
			.addCase(deleteDataById.fulfilled, (state, action) => {
				state.postStatus = "succeeded";
			})
			.addCase(deleteDataById.rejected, (state, action) => {
				state.postStatus = "failed";
				state.error = action.payload;
			});
	},
});

export const { handleNewProduct, handleDataById, handleDesc } = jobVacancySlice.actions;

export default jobVacancySlice.reducer;
