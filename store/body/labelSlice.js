import { createSlice } from "@reduxjs/toolkit";
import { getBodyThunk } from "@/utils/fetch/getBodyThunk";
export const labelSlice = createSlice({
	name: "labelSlice",
	initialState: {
		item: [],
	},
	reducers: {
		addLabel: (state, action) => {
			const sectionAdd = [
				...state.item,
				{
					id: action.payload.id,
					text_color: action.payload.text_color,
					shape: action.payload.shape,
					show_icon: action.payload.show_icon,
					icon: action.payload.icon,
					icon_file: action.payload.icon_file,
					background_color: action.payload.background_color,
					stroke_color: action.payload.stroke_color,
					order_index: action.payload.order_index,
				},
			];

			sectionAdd.sort((a, b) => a.order_index - b.order_index);

			return {
				...state,
				item: sectionAdd,
			};
		},
		changeShape: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].shape = action.payload.shape;
				}
			});
		},
		changeShowIcon: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].show_icon = action.payload.show_icon;
				}
			});
		},
		changeTextColor: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].text_color = action.payload.text_color;
				}
			});
		},
		changeBackgroundColor: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].background_color = action.payload.background_color;
				}
			});
		},
		changeStrokeColor: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].stroke_color = action.payload.stroke_color;
				}
			});
		},
		changeIcon: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].icon = action.payload.icon;
					state.item[index].icon_file = action.payload.icon_file;
				}
			});
		},
		switchingUpLabel: (state, action) => {
			var index = action.payload.index;

			if (index > 0) {
				var temp = state.item[index];
				state.item[index] = state.item[index - 1];
				state.item[index - 1] = temp;
			}
		},
		switchingDownLabel: (state, action) => {
			var index = action.payload.index;

			if (index < state.item.length - 1) {
				var temp = state.item[index];
				state.item[index] = state.item[index + 1];
				state.item[index + 1] = temp;
			}
		},
		moveDownLabel: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[action.payload.index].order_index = action.payload.index + 1;
				}
			});
		},
		deleteLabel: (state, action) => {
			state.item.splice(action.payload.index, 1);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBodyThunk.pending, (state) => {
				console.log("Getting the body...");
			})
			.addCase(getBodyThunk.fulfilled, (state, action) => {
				console.log("Get body success!");
				state.item = action.payload.label;
			})
			.addCase(getBodyThunk.rejected, (state, action) => {
				console.log("Get body failed!");
				console.error(action.payload);
			});
	},
});
export const {
	addLabel,
	changeShape,
	changeShowIcon,
	changeTextColor,
	changeColor,
	changeStrokeColor,
	changeIcon,
	changeBackgroundColor,
	switchingUpLabel,
	switchingDownLabel,
	moveDownLabel,
	deleteLabel,
} = labelSlice.actions;
export default labelSlice.reducer;
