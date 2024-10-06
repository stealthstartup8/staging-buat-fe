import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const usePagesCard = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.persistedReducer);

	const handleDeletePage = async (page_id, user_token, setLoading) => {
		setLoading(true);
		const deletePage = await axios.delete(process.env.NEXT_PUBLIC_API_KEY + `/page/` + page_id, {
			headers: {
				Authorization: `Bearer ${user_token}`,
			},
		});
		window.location.reload();
		setLoading(false);
	};

	const handleUpdatePage = async (page_id, newNamePage, user_token, setLoading) => {
		setLoading(true);
		const updatPage = await axios.put(
			process.env.NEXT_PUBLIC_API_KEY + `/page/` + page_id,
			{
				name: newNamePage,
				path: `/${newNamePage}`,
			},
			{
				headers: {
					Authorization: `Bearer ${user_token}`,
				},
			}
		);
		window.location.reload();
		setLoading(false);
	};

	const handleResetPage = async (page_id, user_token, setLoading) => {
		setLoading(true);
		const resetPage = await axios.delete(
			process.env.NEXT_PUBLIC_API_KEY + `/page/reset-landing/` + page_id,
			{
				headers: {
					Authorization: `Bearer ${user_token}`,
				},
			}
		);
		window.location.reload();
		setLoading(false);
	};

	return {
		handleDeletePage,
		handleUpdatePage,
		handleResetPage,
	};
};
