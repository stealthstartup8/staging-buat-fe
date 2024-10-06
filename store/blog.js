import { BLOG_STORAGE_DIR } from "@/utils/constants/Storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	blog_data: [],
	label_data: [],
	dataById: null,
	postStatus: "idle",
	putStatus: "idle",
	fetchStatus: "idle",
	deleteStatus: "idle",
	error: null,
};

export const postBlog = createAsyncThunk(
	"blogSlice/postBlog",
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

export const putBlog = createAsyncThunk(
	"blogSlice/putBlog",
	async (
		{
			blogProperties,
			blogDetail,
			token,
			domainName,
			localThumbnailURL,
			localThumbnailFile,
			bucketAccess,
		},
		thunkAPI
	) => {
		try {
			const res = await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + `/blog/` + blogDetail.id,
				{
					title: blogProperties.title,
					content: blogProperties.content,
					publishDate: blogProperties.datePublish,
					publishStatus: blogProperties.publishStatus,
					labelItem: blogProperties.labelAdd,
				},
				{
					headers: {
						// "Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (
				`${process.env.NEXT_PUBLIC_STORAGE_URL}/${bucketAccess}/${BLOG_STORAGE_DIR}/${blogDetail.thumbnail}` !=
				localThumbnailURL
			) {
				const res = await axios.put(
					process.env.NEXT_PUBLIC_API_KEY + `/blog/update-image/` + blogDetail.id,
					{
						thumbnail_old: blogDetail.thumbnail,
						thumbnail: localThumbnailFile,
					},
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${token}`,
						},
					}
				);
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const fetchAllData = createAsyncThunk(
	"blogSlice/fetchAllData",
	async ({ website_id, token, bucketAccess }, thunkAPI) => {
		try {
			const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/blog/${website_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = [
				...res.data.data.map((blog) => ({
					...blog,
					thumbnail: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${bucketAccess}/${BLOG_STORAGE_DIR}/${blog.thumbnail}`,
				})),
			];
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const fetchLabel = createAsyncThunk(
	"blogSlice/fetchLabel",
	async ({ website_id, token }, thunkAPI) => {
		try {
			const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/blog/get-label/${website_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

// export const getDataById = createAsyncThunk("blogSlice/getDataById", async ({ id, token }, thunkAPI) => {
// 	try {
// 		const response = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/blog/blog-detail/${id}`, {
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 			},
// 		});
// 		return response.data.data;
// 	} catch (error) {
// 		return thunkAPI.rejectWithValue(error.response.data);
// 	}
// });

export const deleteDataById = createAsyncThunk(
	"blogSlice/deleteDataById",
	async ({ id, token }, thunkAPI) => {
		try {
			const res = await axios.delete(process.env.NEXT_PUBLIC_API_KEY + `/blog/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data;
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const deleteCategoryById = createAsyncThunk(
	"blogSlice/deleteCategoryById",
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
	"blogSlice/deleteButtonById",
	async ({ id, website_id, token }, thunkAPI) => {
		try {
			const response = await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY + `/button-component/${id}/${website_id}`,
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

export const blogSlice = createSlice({
	name: "blogSlice",
	initialState,
	reducers: {
		handleDataById: (state, action) => {
			state.dataById = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postBlog.pending, (state) => {
				state.postStatus = "loading";
			})
			.addCase(postBlog.fulfilled, (state) => {
				state.postStatus = "succeeded";
			})
			.addCase(postBlog.rejected, (state, action) => {
				state.postStatus = "failed";
				state.error = action.payload;
			})
			.addCase(fetchAllData.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(fetchAllData.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";
				state.blog_data = action.payload;
			})
			.addCase(fetchAllData.rejected, (state, action) => {
				state.fetchStatus = "failed";
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
			.addCase(fetchLabel.pending, (state) => {
				state.fetchStatus = "loading";
			})
			.addCase(fetchLabel.fulfilled, (state, action) => {
				state.fetchStatus = "succeeded";
				state.label_data = action.payload;
			})
			.addCase(fetchLabel.rejected, (state, action) => {
				state.fetchStatus = "failed";
				state.error = action.payload;
			})

			.addCase(putBlog.pending, (state) => {
				state.putStatus = "loading";
			})
			.addCase(putBlog.fulfilled, (state) => {
				state.putStatus = "succeeded";
			})
			.addCase(putBlog.rejected, (state, action) => {
				state.putStatus = "failed";
				state.error = action.payload;
			});
		// .addCase(getDataById.pending, (state) => {
		// 	state.fetchStatus = "loading";
		// })
		// .addCase(getDataById.fulfilled, (state, action) => {
		// 	state.fetchStatus = "succeeded";
		// 	state.dataById = action.payload;
		// })
		// .addCase(getDataById.rejected, (state, action) => {
		// 	state.fetchStatus = "failed";
		// 	state.error = action.payload;
		// });
	},
});

export const { handleDataById } = blogSlice.actions;

export default blogSlice.reducer;
