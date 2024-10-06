import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	pricing_datas: null,
	pagination: null,
	category_data: null,
	dataById: null,
	newData: {
		image: {
			url: "",
			file: "",
		},
		description: "",
		category: [],
		name: "",
		price: "",
		price_after_discount: "",
		button: {
			name: "",
			url: "",
		},
		status: false,
	},

	postStatus: "idle",
	fetchStatus: "idle",
	deleteStatus: "idle",
	error: null,
};

export const postPricing = createAsyncThunk(
	"pricingSlice/postPricing",
	async ({ pricingDetails, token, website_id, status }, thunkAPI) => {
		try {
			const response = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + "/prices",
				{ ...pricingDetails, idWebsite: website_id, status: status },
				{
					headers: {
						"Content-Type": "multipart/form-data",
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

export const fetchData = createAsyncThunk(
	"pricingSlice/fetchData",
	async ({ website_id, token, page, pageSize, search, category }, thunkAPI) => {
		const queryParams = new URLSearchParams();
		if (page) queryParams.append("page", page);
		if (pageSize) queryParams.append("pageSize", pageSize);
		if (search) queryParams.append("search", search);
		if (category) queryParams.append("category", category);

		const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";

		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_KEY}/prices/${website_id}${queryString}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const fetchDataById = createAsyncThunk(
	"pricingSlice/fetchDataById",
	async ({ token, id }, thunkAPI) => {
		try {
			const response = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/prices/detail/${id}`, {
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

export const fetchCategories = createAsyncThunk(
	"pricingSlice/fetchCategories",
	async ({ website_id, token }, thunkAPI) => {
		try {
			const response = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/prices/category/${website_id}`,
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

export const putPricing = createAsyncThunk(
	"pricingSlice/putPricing",
	async ({ pricingDetails, token, status, id }, thunkAPI) => {
		try {
			const response = await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + `/prices/${id}`,
				{ ...pricingDetails, status: status },
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
	"pricingSlice/deleteDataById",
	async ({ token, id }, thunkAPI) => {
		try {
			const response = await axios.delete(process.env.NEXT_PUBLIC_API_KEY + `/prices/${id}`, {
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

export const deleteCategory = createAsyncThunk(
	"pricingSlice/deleteCategory",
	async ({ token, id, categoryId }, thunkAPI) => {
		try {
			const response = await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY + `/prices/category/${id}/${categoryId}`,
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

export const pricingSlice = createSlice({
	name: "pricingSlice",
	initialState,
	reducers: {
		handleNewProduct: (state, action) => {
			state.newData = action.payload;
		},
		handleDataById: (state, action) => {
			state.dataById = action.payload;
		},
		handle_images: (state, action) => {
			state.image = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postPricing.pending, (state) => {
				state.postStatus = "loading";
			})
			.addCase(postPricing.fulfilled, (state) => {
				state.postStatus = "succeeded";
			})
			.addCase(postPricing.rejected, (state, action) => {
				state.postStatus = "failed";
				state.error = action.payload;
			})
			.addCase(fetchData.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";
				state.pricing_datas = action.payload.data;
				state.pagination = action.payload.pagination;
			})
			.addCase(fetchData.rejected, (state, action) => {
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
			.addCase(fetchCategories.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";
				state.category_data = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.fetchStatus = "failed";
				state.error = action.payload;
			})
			.addCase(putPricing.pending, (state) => {
				state.postStatus = "loading";
			})
			.addCase(putPricing.fulfilled, (state) => {
				state.postStatus = "succeeded";
			})
			.addCase(putPricing.rejected, (state, action) => {
				state.postStatus = "failed";
				state.error = action.payload;
			})
			.addCase(deleteDataById.pending, (state) => {
				state.deleteStatus = "loading";
			})
			.addCase(deleteDataById.fulfilled, (state) => {
				state.deleteStatus = "succeeded";
			})
			.addCase(deleteDataById.rejected, (state, action) => {
				state.deleteStatus = "failed";
				state.error = action.payload;
			})
			.addCase(deleteCategory.pending, (state) => {
				state.deleteStatus = "loading";
			})
			.addCase(deleteCategory.fulfilled, (state) => {
				state.deleteStatus = "succeeded";
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.deleteStatus = "failed";
				state.error = action.payload;
			});
	},
});

export const { handleDataById, handleNewProduct, handle_images } = pricingSlice.actions;

export default pricingSlice.reducer;
