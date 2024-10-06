import { createSlice } from "@reduxjs/toolkit";
import {
	ARR_SELECTED_TEMPLATE_PREVIEW,
	COMMERCE_TEMPLATE_ID,
	PRICING_TEMPLATE_ID,
	CAREER_TEMPLATE_ID,
} from "@/utils/constants";
import { getBodyThunk } from "@/utils/fetch/getBodyThunk";

export const fontSlices = createSlice({
	name: "fontSlices",
	initialState: {
		item: [],
	},

	reducers: {
		addSectionFontStyle: (state, action) => {
			let sectionAdd = [];
			const labelFontColor = CAREER_TEMPLATE_ID.includes(parseInt(action.payload.template))
				? "#4777FF"
				: ARR_SELECTED_TEMPLATE_PREVIEW.includes(parseInt(action.payload.template)) ^
							(COMMERCE_TEMPLATE_ID.includes(parseInt(action.payload.template)) ||
								PRICING_TEMPLATE_ID.includes(parseInt(action.payload.template))) ||
					  parseInt(action.payload.template) == 1303 // commerce 3, the default is light mode but the label is black, which differ from the other commerce template
					? "rgba(0,0,0,1)"
					: "rgba(255,255,255,1)";
			const fontColor = ARR_SELECTED_TEMPLATE_PREVIEW.includes(parseInt(action.payload.template))
				? "rgba(0,0,0,1)"
				: "rgba(255,255,255,1)";
			if (action.payload.content == "initial") {
				sectionAdd = [
					...state.item,
					{
						order_index: action.payload.order_index,
						label: {
							font_style: "inherit",
							font_size: "md",
							bold: false,
							italic: false,
							text_decoration: "",
							align:
								COMMERCE_TEMPLATE_ID.includes(parseInt(action.payload.template)) ||
								PRICING_TEMPLATE_ID.includes(parseInt(action.payload.template)) ||
								CAREER_TEMPLATE_ID.includes(parseInt(action.payload.template))
									? "center"
									: "left",
							color: labelFontColor,
						},
						headline: {
							font_style: "inherit",
							font_size: "md",
							bold: true,
							italic: false,
							text_decoration: "",
							align: "left",
							color: fontColor,
						},
						tagline: {
							font_style: "inherit",
							font_size: "md",
							bold: false,
							italic: false,
							text_decoration: "",
							align: "left",
							color: fontColor,
						},
						button: {
							font_style: "inherit",
							font_size: "md",
							bold: false,
							italic: false,
							text_decoration: "",
						},
					},
				];
			} else {
				sectionAdd = [...state.item, { ...action.payload }];
			}

			sectionAdd.sort((a, b) => a.order_index - b.order_index);

			return {
				...state,
				item: sectionAdd,
			};
		},
		fontStyle: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					if (action.payload.component === "label") {
						state.item[index].label.font_style = action.payload.font_style;
					} else if (action.payload.component === "headline") {
						state.item[index].headline.font_style = action.payload.font_style;
					} else if (action.payload.component === "tagline") {
						state.item[index].tagline.font_style = action.payload.font_style;
					} else if (action.payload.component === "button") {
						state.item[index].button.font_style = action.payload.font_style;
					}
				}
			});
		},
		fontSize: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					if (action.payload.component === "label") {
						state.item[index].label.font_size = action.payload.font_size;
					} else if (action.payload.component === "headline") {
						state.item[index].headline.font_size = action.payload.font_size;
					} else if (action.payload.component === "tagline") {
						state.item[index].tagline.font_size = action.payload.font_size;
					} else if (action.payload.component === "button") {
						state.item[index].button.font_size = action.payload.font_size;
					}
				}
			});
		},
		boldText: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					if (action.payload.component === "label") {
						if (state.item[index].label.bold == true) {
							action.payload.bold = false;
						}
						state.item[index].label.bold = action.payload.bold;
					} else if (action.payload.component === "headline") {
						if (state.item[index].headline.bold == true) {
							action.payload.bold = false;
						}
						state.item[index].headline.bold = action.payload.bold;
					} else if (action.payload.component === "tagline") {
						if (state.item[index].tagline.bold == true) {
							action.payload.bold = false;
						}
						state.item[index].tagline.bold = action.payload.bold;
					} else if (action.payload.component === "button") {
						if (state.item[index].button.bold == true) {
							action.payload.bold = false;
						}
						state.item[index].button.bold = action.payload.bold;
					}
				}
			});
		},
		italicText: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					if (action.payload.component === "label") {
						if (state.item[index].label.italic == true) {
							action.payload.italic = false;
						}
						state.item[index].label.italic = action.payload.italic;
					} else if (action.payload.component === "headline") {
						if (state.item[index].headline.italic == true) {
							action.payload.italic = false;
						}
						state.item[index].headline.italic = action.payload.italic;
					} else if (action.payload.component === "tagline") {
						if (state.item[index].tagline.italic == true) {
							action.payload.italic = false;
						}
						state.item[index].tagline.italic = action.payload.italic;
					} else if (action.payload.component === "button") {
						if (state.item[index].button.italic == true) {
							action.payload.italic = false;
						}
						state.item[index].button.italic = action.payload.italic;
					}
				}
			});
		},
		alignText: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					if (action.payload.component === "label") {
						state.item[index].label.align = action.payload.align;
					} else if (action.payload.component === "headline") {
						state.item[index].headline.align = action.payload.align;
					} else if (action.payload.component === "tagline") {
						state.item[index].tagline.align = action.payload.align;
					} else if (action.payload.component === "button") {
						state.item[index].button.align = action.payload.align;
					}
				}
			});
		},
		textDecoration: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					if (action.payload.component === "label") {
						if (state.item[index].label.text_decoration == action.payload.text_decoration) {
							action.payload.text_decoration = "";
						}
						state.item[index].label.text_decoration = action.payload.text_decoration;
					} else if (action.payload.component === "headline") {
						if (state.item[index].headline.text_decoration == action.payload.text_decoration) {
							action.payload.text_decoration = "";
						}
						state.item[index].headline.text_decoration = action.payload.text_decoration;
					} else if (action.payload.component === "tagline") {
						if (state.item[index].tagline.text_decoration == action.payload.text_decoration) {
							action.payload.text_decoration = "";
						}
						state.item[index].tagline.text_decoration = action.payload.text_decoration;
					} else if (action.payload.component === "button") {
						if (state.item[index].button.text_decoration == action.payload.text_decoration) {
							action.payload.text_decoration = "";
						}
						state.item[index].button.text_decoration = action.payload.text_decoration;
					}
				}
			});
		},
		textColor: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					if (action.payload.component === "label") {
						state.item[index].label.color = action.payload.color;
					} else if (action.payload.component === "headline") {
						state.item[index].headline.color = action.payload.color;
					} else if (action.payload.component === "tagline") {
						state.item[index].tagline.color = action.payload.color;
					} else if (action.payload.component === "button") {
						state.item[index].button.color = action.payload.color;
					}
				}
			});
		},
		deleteSectionFontStyle: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item.splice(index, 1);
				}
			});
		},
		switchingUpFont: (state, action) => {
			var index = action.payload.index;

			if (index > 0) {
				var temp = state.item[index];
				state.item[index] = state.item[index - 1];
				state.item[index - 1] = temp;
			}
		},
		switchingDownFont: (state, action) => {
			var index = action.payload.index;

			if (index < state.item.length - 1) {
				var temp = state.item[index];
				state.item[index] = state.item[index + 1];
				state.item[index + 1] = temp;
			}
		},
		moveDownFont: (state, action) => {
			state.item.map((item, index) => {
				if (index == action.payload.index) {
					state.item[action.payload.index].order_index = action.payload.index + 1;
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBodyThunk.pending, (state) => {
				console.log("Getting the body...");
			})
			.addCase(getBodyThunk.fulfilled, (state, action) => {
				console.log("Get body success!");
				state.item = action.payload.sectionFontStyle;
			})
			.addCase(getBodyThunk.rejected, (state, action) => {
				console.log("Get body failed!");
				console.error(action.payload);
			});
	},
});

export const {
	addSectionFontStyle,
	fontStyle,
	fontSize,
	boldText,
	italicText,
	alignText,
	textColor,
	textDecoration,
	deleteSectionFontStyle,
	switchingUpFont,
	switchingDownFont,
	moveDownFont,
} = fontSlices.actions;
export default fontSlices.reducer;
