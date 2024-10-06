import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { deleteFormComponent } from "@store/body/bodySlice";

export const useForm = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const body_store = useSelector((state) => state.persistedReducer);
	const bodySlice = body_store.bodySlice;

	const deleteFormContent = async (index, indexForm, user_token) => {
		dispatch(
			deleteFormComponent({
				index: index,
				indexForm: indexForm,
			})
		);

		if (bodySlice.item[index].form_component.form_category.form_content[indexForm].id != null) {
			const deleteOption = await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					"/form/" +
					bodySlice.item[index].form_component.form_category.form_content[indexForm].id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}
	};

	const deleteOption = async (index, indexForm, indexOption, user_token) => {
		// dispatch(
		// 	deleteDropdownDescription({
		// 		index: index,
		// 		indexForm: indexForm,
		// 		indexDescription: indexOption,
		// 	})
		// );

		if (
			bodySlice.item[index].form_component.form_category.form_content[indexForm].description[
				indexOption
			].id != null
		) {
			const deleteOption = await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					"/form/option-form/" +
					bodySlice.item[index].form_component.form_category.form_content[indexForm].description[
						indexOption
					].id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}
	};

	const deleteFormResponse = async (selectedItem, tableHeader, user_token, website_id) => {
		const fieldFilter = tableHeader
			.filter((item) => item.type === "images" || item.type === "document")
			.map((item) => item.name);

		for (const name of fieldFilter) {
			await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					`/form/delete/file?filename=${selectedItem.answer[name]}&foldername=${selectedItem.idCategory}&idWebsite=${website_id}`,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}

		await axios.delete(process.env.NEXT_PUBLIC_API_KEY + "/form/delete-answer/" + selectedItem.id, {
			headers: {
				Authorization: `Bearer ${user_token}`,
			},
		});

		router.reload();
	};

	const getImageUrl = async (fileName, idCategory, user_token, website_id) => {
		const response = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY +
				`/form/download/file?filename=${fileName}&idWebsite=${website_id}&idCategory=${idCategory}`,
			{
				headers: {
					Authorization: `Bearer ${user_token}`,
				},
			}
		);
		const url = response.data.imageUrl;
		window.open(url, "_blank");
	};

	return {
		deleteOption,
		deleteFormContent,
		deleteFormResponse,
		getImageUrl,
	};
};
