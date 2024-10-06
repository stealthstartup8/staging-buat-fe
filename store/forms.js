import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	body: {
		id: null,
		name: "",
		successAlert: "",
		failAlert: "",
		form_component: [
			{
				id: null,
				name: "",
				input_type: "text",
				desc: "",
				option: [
					{
						id: null,
						value: "",
					},
				],
			},
		],
	},
};

export const formSlice = createSlice({
	name: "formSlice",
	initialState,
	reducers: {
		handleChangeBody: (state, action) => {
			state.body = action.payload;
		},
		handleFormComponent: (state, action) => {
			state.body.form_component[action.payload.index] = action.payload;
		},
		handleAddFormComponent: (state) => {
			state.body.form_component.push({
				id: null,
				index: state.body.form_component.length,
				name: "",
				input_type: "text",
				desc: "",
				option: [],
			});
		},
		handleDeleteFormComponent: (state, action) => {
			state.body.form_component = state.body.form_component.filter(
				(_, index) => index !== action.payload
			);
		},
		handleDropdown: (state, action) => {
			state.body.form_component[action.payload.index].option.push({
				id: action.payload.id,
				value: action.payload.value,
			});
		},
		handleRemoveDropdownItem: (state, action) => {
			const { index, optionIndex } = action.payload;
			const options = state.body.form_component[index].option;

			if (optionIndex >= 0 && optionIndex < options.length) {
				state.body.form_component[index].option = options.filter((_, idx) => idx !== optionIndex);
			}
		},
		fetchFormComponent: (state, action) => {
			state.body.form_component.push(action.payload);
		},
	},
});

export const {
	handleChangeBody,
	handleFormComponent,
	handleDropdown,
	handleRemoveDropdownItem,
	handleAddFormComponent,
	handleDeleteFormComponent,
	fetchFormComponent,
} = formSlice.actions;

export default formSlice.reducer;
