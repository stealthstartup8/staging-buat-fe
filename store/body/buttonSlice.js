import { getBodyThunk } from "@/utils/fetch/getBodyThunk";
import { createSlice } from "@reduxjs/toolkit";

export const buttonHeroSlice = createSlice({
	name: "buttonHeroSlice",
	initialState: {
		item: [],
	},
	reducers: {
		addHeroButton: (state, action) => {
			const sectionAdd = [
				...state.item,
				{
					id: action.payload.id,
					order_index: action.payload.order_index,
					name: action.payload.name,
					link: action.payload.link,
					text_color: action.payload.text_color,
					button_shape: action.payload.button_shape,
					show_icon: action.payload.show_icon,
					icon: action.payload.icon,
					icon_file: action.payload.icon_file,
					button_color: action.payload.button_color,
					stroke_color: action.payload.stroke_color,
				},
			];
			sectionAdd.sort((a, b) => a.order_index - b.order_index);
			return {
				...state,
				item: sectionAdd,
			};
		},
		changeButtonShape: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].button_shape = action.payload.button_shape;
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
		changeButtonStatus: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].show_button = action.payload.show_button;
				}
			});
		},
		changeButtonLabel: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].name = action.payload.name;
				}
			});
		},
		changeButtonUrl: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].link = action.payload.link;
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
		changeButtonColor: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[index].button_color = action.payload.button_color;
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
		deleteButton: (state, action) => {
			state.item.splice(action.payload.index, 1);
		},
		switchingUpButton: (state, action) => {
			var index = action.payload.index;

			if (index > 0) {
				var temp = state.item[index];
				state.item[index] = state.item[index - 1];
				state.item[index - 1] = temp;
			}
		},
		switchingDownButton: (state, action) => {
			var index = action.payload.index;

			if (index < state.item.length - 1) {
				var temp = state.item[index];
				state.item[index] = state.item[index + 1];
				state.item[index + 1] = temp;
			}
		},
		moveDownButton: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[action.payload.index].order_index = action.payload.index + 1;
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBodyThunk.pending, (state) => {
				console.log("fetching button hero data");
			})
			.addCase(getBodyThunk.fulfilled, (state, action) => {
				console.log("success fetching button hero data");
				state.item = action.payload.buttonData;
			})
			.addCase(getBodyThunk.rejected, (state, action) => {
				console.log("failed fetching button hero data");
				console.error(action.payload);
			});
	},
});
export const {
	changeButtonShape,
	changeButtonLabel,
	changeButtonUrl,
	addHeroButton,
	changeButtonStatus,
	changeTextColor,
	changeButtonColor,
	changeStrokeColor,
	changeIcon,
	deleteButton,
	switchingUpButton,
	switchingDownButton,
	moveDownButton,
	changeShowIcon,
} = buttonHeroSlice.actions;
export default buttonHeroSlice.reducer;
