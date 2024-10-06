import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	commerce_data: [],
	category_data: null,
	dataById: null,
	newData: {
		image: "",
		image_file: "",
		category: [],
		name: "",
		price: "",
		price_after_discount: "",
		status: "Draft",
		purchase_button: [
			{
				name: "",
				url: "",
				button: [
					{
						id: 1,
						name: "text",
						show: false,
						color: "rgba(255,255,255,1)",
					},
					{
						id: 2,
						name: "button",
						show: false,
						color: "rgba(255,255,255,1)",
					},
				],
				show_shape_option: false,
				button_shape: "2",
				icon: {
					show: false,
					icon: "",
					icon_file: "",
				},
			},
		],
	},

	postStatus: "idle",
	putStatus: "idle",
	fetchStatus: "idle",
	deleteStatus: "idle",
	error: null,
};

export const postCommerce = createAsyncThunk(
	"eCommerceSlice/postCommerce",
	async ({ commerceDetails, purchase_button, token, website_id, status }, thunkAPI) => {
		try {
			var buttonItem = [];

			for (let i = 0; i < purchase_button.length; i++) {
				const postButtonItem = await axios.post(
					process.env.NEXT_PUBLIC_API_KEY + "/button-component",
					{
						idWebsite: website_id,
						idShape: parseInt(purchase_button[i].button_shape),
						name: purchase_button[i].name,
						fontType: "",
						bold: false,
						fontSize: "",
						italic: false,
						textDecoration: "",
						textColor: purchase_button[i].button[0].color,
						background: purchase_button[i].button[1].color,
						strokeColor: "",
						showIcon: false,
						icon: purchase_button[i].icon.icon_file,
						url: purchase_button[i].url,
					},
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				buttonItem.push(postButtonItem.data.data.id);
			}

			const response = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + "/commerce",
				{
					...commerceDetails,
					buttonItem,
					idWebsite: website_id,
					status: status,
				},
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

export const putCommerce = createAsyncThunk(
	"eCommerceSlice/putCommerce",
	async ({ commerceDetails, purchase_button, token, website_id, status, id, image }, thunkAPI) => {
		try {
			var buttonItem = [];

			for (let i = 0; i < purchase_button.length; i++) {
				if (purchase_button[i].id != null) {
					const putButtonItem = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY + `/button-component/${purchase_button[i].id}`,
						{
							idShape: purchase_button[i].button_shape,
							name: purchase_button[i].name,
							background: purchase_button[i].button[1].color,
							strokeColor: "",
							textColor: purchase_button[i].button[0].color,
							url: purchase_button[i].url,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					if (purchase_button[i].icon.icon_file != "") {
						const putIcon = await axios.put(
							process.env.NEXT_PUBLIC_API_KEY +
								`/button-component/update-icon/${purchase_button[i].id}`,
							{
								icon: purchase_button[i].icon.icon_file,
								idWebsite: website_id,
							},
							{
								headers: {
									"Content-Type": "multipart/form-data",
									Authorization: `Bearer ${token}`,
								},
							}
						);
					}
					buttonItem.push(putButtonItem.data.data.id);
				} else {
					const postButtonItem = await axios.post(
						process.env.NEXT_PUBLIC_API_KEY + "/button-component",
						{
							idWebsite: website_id,
							idShape: 1,
							name: purchase_button[i].name,
							fontType: "",
							bold: false,
							fontSize: "",
							italic: false,
							textDecoration: "",
							textColor: purchase_button[i].button[0].color,
							background: purchase_button[i].button[1].color,
							strokeColor: "",
							showIcon: false,
							icon: purchase_button[i].icon.icon_file,
							url: purchase_button[i].url,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					buttonItem.push(postButtonItem.data.data.id);
				}
			}

			if (image != undefined || image != null) {
				const formData = new FormData();
				formData.append("image", image);

				await axios.put(process.env.NEXT_PUBLIC_API_KEY + `/commerce/update-image/${id}`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				});
			}

			const response = await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + `/commerce/${id}`,
				{
					...commerceDetails,
					buttonItem,
					idWebsite: website_id,
					status: status,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const fetchAllData = createAsyncThunk(
	"eCommerceSlice/fetchAllData",
	async ({ website_id, token }, thunkAPI) => {
		try {
			const response = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/commerce/get-all/${website_id}`,
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
	"eCommerceSlice/fetchCategory",
	async ({ website_id, token }, thunkAPI) => {
		try {
			const response = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/commerce/category/${website_id}`,
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

export const getDataById = createAsyncThunk("eCommerceSlice/getDataById", async ({ id, token }, thunkAPI) => {
	try {
		const response = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/commerce/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const resp = response.data.data;

		for (let i = 0; i < resp.buttonItem.length; i++) {
			const getDetailButton = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/button-component/${resp.buttonItem[i]}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const detailButton = getDetailButton.data.data;
			resp.buttonItem[i] = {
				id: detailButton.id,
				name: detailButton.name,
				url: detailButton.url,
				button: [
					{
						id: 1,
						name: "text",
						show: false,
						color: detailButton.textColor,
					},
					{
						id: 2,
						name: "button",
						show: false,
						color: detailButton.background,
					},
				],
				show_shape_option: false,
				button_shape: detailButton.idShape,
				icon: {
					show: detailButton.icon == "" ? false : true,
					icon: detailButton.icon,
					icon_file: "",
				},
			};
		}

		return response.data.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

export const deleteDataById = createAsyncThunk(
	"eCommerceSlice/deleteDataById",
	async ({ id, token }, thunkAPI) => {
		try {
			const response = await axios.delete(process.env.NEXT_PUBLIC_API_KEY + `/commerce/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);
			return response.data.data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const deleteCategoryById = createAsyncThunk(
	"eCommerceSlice/deleteCategoryById",
	async ({ commerceId, categoryId, token }, thunkAPI) => {
		try {
			const response = await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY + `/commerce/category/${commerceId}/${categoryId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const deleteButtonById = createAsyncThunk(
	"eCommerceSlice/deleteButtonById",
	async ({ id, commerce_id, token }, thunkAPI) => {
		try {
			const response = await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY + `/commerce/delete-button/${commerce_id}?idButton=${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const eCommerceSlice = createSlice({
	name: "eCommerceSlice",
	initialState,
	reducers: {
		handleNewData: (state, action) => {
			state.newData = action.payload;
		},
		handleDataById: (state, action) => {
			state.dataById = action.payload;
		},
		handle_purchase_button: (state, action) => {
			state.newData.purchase_button = action.payload;
		},
		handle_add_purchase_button: (state, action) => {
			state.newData.purchase_button.push(action.payload);
		},
		handle_show_icon: (state, action) => {
			state.newData.purchase_button[action.payload.index].icon.show = action.payload.show;
			state.newData.purchase_button[action.payload.index].icon.icon = "";
			state.newData.purchase_button[action.payload.index].icon.icon_file = "";
		},
		handle_show_shape_option: (state, action) => {
			state.newData.purchase_button[action.payload.index].show_shape_option = action.payload.show;
		},
		handle_change_icon: (state, action) => {
			state.newData.purchase_button[action.payload.index].icon.icon = action.payload.icon;
			state.newData.purchase_button[action.payload.index].icon.icon_file = action.payload.icon_file;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postCommerce.pending, (state) => {
				state.postStatus = "loading";
			})
			.addCase(postCommerce.fulfilled, (state) => {
				state.postStatus = "succeeded";
			})
			.addCase(postCommerce.rejected, (state, action) => {
				state.postStatus = "failed";
				state.error = action.payload;
			})
			.addCase(fetchAllData.pending, (state) => {
				state.postStatus = "loading";
			})
			.addCase(fetchAllData.fulfilled, (state, action) => {
				state.postStatus = "succeeded";
				state.commerce_data = action.payload;
			})
			.addCase(fetchAllData.rejected, (state, action) => {
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
			.addCase(deleteCategoryById.pending, (state) => {
				state.deleteStatus = "loading";
			})
			.addCase(deleteCategoryById.fulfilled, (state) => {
				state.deleteStatus = "succeeded";
			})
			.addCase(deleteCategoryById.rejected, (state, action) => {
				state.deleteStatus = "failed";
				state.error = action.payload;
			})
			.addCase(deleteButtonById.pending, (state) => {
				state.deleteStatus = "loading";
			})
			.addCase(deleteButtonById.fulfilled, (state) => {
				state.deleteStatus = "succeeded";
			})
			.addCase(deleteButtonById.rejected, (state, action) => {
				state.deleteStatus = "failed";
				state.error = action.payload;
			})
			.addCase(fetchCategory.pending, (state) => {
				state.postStatus = "loading";
			})
			.addCase(fetchCategory.fulfilled, (state, action) => {
				state.postStatus = "succeeded";
				state.category_data = action.payload;
			})
			.addCase(fetchCategory.rejected, (state, action) => {
				state.postStatus = "failed";
				state.error = action.payload;
			})
			.addCase(getDataById.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(getDataById.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";
				state.dataById = action.payload;
			})
			.addCase(getDataById.rejected, (state, action) => {
				state.fetchStatus = "failed";
				state.error = action.payload;
			})
			.addCase(putCommerce.pending, (state) => {
				state.putStatus = "loading";
			})
			.addCase(putCommerce.fulfilled, (state) => {
				state.putStatus = "succeeded";
			})
			.addCase(putCommerce.rejected, (state, action) => {
				state.putStatus = "failed";
				state.error = action.payload;
			});
	},
});

export const {
	handleNewData,
	handleDataById,
	handle_show_shape_option,
	handle_purchase_button,
	handle_add_purchase_button,
	handle_show_icon,
	handle_change_icon,
} = eCommerceSlice.actions;

export default eCommerceSlice.reducer;
