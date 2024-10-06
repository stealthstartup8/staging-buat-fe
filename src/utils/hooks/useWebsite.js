import axios from "axios";
import { ICON_STORAGE_DIR } from "../constants/Storage";

export const useWebsite = () => {
	const handleUpdateWebsite = async (e, website_id, token, website, current_data, setLoading) => {
		e.preventDefault();

		setLoading(true);
		try {
			const res = await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + `/website/${website_id}`,
				{
					title: website.title,
					meta: website.meta,
					googleAnalytic: website.googleAnalytic,
					desc: website.desc,
					chatFloating: website.chatFloating,
					urlFloating: website.urlFloating,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("res", res);

			if (
				`${process.env.NEXT_PUBLIC_STORAGE_URL}/${current_data.bucketAccess}/${ICON_STORAGE_DIR}/${current_data.icon}` !=
				website.icon
			) {
				try {
					const res = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY + `/website/update-icon/${website_id}`,
						{
							icon: website.iconFile,
						},
						{
							headers: {
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${token}`,
							},
						}
					);
				} catch (error) {
					console.log(error);
				}
			}

			if (
				`${process.env.NEXT_PUBLIC_STORAGE_URL}/${current_data.bucketAccess}/${ICON_STORAGE_DIR}/${current_data.iconFloating}` !=
				website.floatingChatIcon
			) {
				try {
					const res = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY + `/website/update-icon-floating/${website_id}`,
						{
							iconFloating: website.floatingChatIconFile,
						},
						{
							headers: {
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${token}`,
							},
						}
					);
				} catch (error) {
					console.log(error);
				}
			}

			window.location.reload();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleDeleteWebsite = async (e, website_id, token, setLoading) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.delete(process.env.NEXT_PUBLIC_API_KEY + `/website/${website_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			window.location.href = "/";
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return {
		handleUpdateWebsite,
		handleDeleteWebsite,
	};
};
