import { LOGO_STORAGE_DIR } from "@/utils/constants/Storage";
import axios from "axios";

export async function SaveNavbarData(NavbarDatas) {
	const {
		navbar_slice,
		navigation_style,
		navigation_font,
		navigation_button,
		navigation_menu,
		user_token,
		website_detail,
		navbar_components,
	} = NavbarDatas;

	const domain_name = website_detail.access_domain[0].name;
	const baseURL = process.env.NEXT_PUBLIC_API_KEY;
	var navbarId = navbar_components.id;

	if (navbar_slice.item.data !== "available") return;

	const getIdShape = navigation_menu.item?.filter((item) => item.isButton).map((item) => item.id_shape);

	const idTemplate = parseInt(navbar_slice.item.id_template);
	const logo = navigation_style.item.logo_file;
	const background = navigation_style.item.background_color;
	const fontType = navigation_font.item.font_style;
	const fontSize = navigation_font.item.font_size;
	const bold = navigation_font.item.bold;
	const textAlign = navigation_font.item.align;
	const italic = navigation_font.item.italic;
	const textDecoration = navigation_font.item.text_decoration;
	const textColor = navigation_font.item.color;
	const idShape = parseInt(getIdShape[0] || 2);
	const buttonColor = navigation_button.item.button_color;
	const borderColor = navigation_button.item.stroke_button_color;
	const idWebsite = website_detail.id;

	try {
		// id null means the navbar does not exist in the database
		if (navbar_slice.item.id == null) {
			console.log("navbar_slice", navbar_slice);
			// Post Navbar
			const navigation = await axios.post(
				`${baseURL}/navbar-component`,
				{
					idTemplate,
					logo,
					background,
					fontType,
					fontSize,
					bold,
					textAlign,
					italic,
					textDecoration,
					textColor,
					idShape,
					buttonColor,
					borderColor,
					idWebsite,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${user_token}`,
					},
				}
			);

			navbarId = navigation.data.data.id;
		} else {
			// Put Navbar
			console.log("navbar_slice put", navbar_slice);
			const test = await axios.put(
				`${baseURL}/navbar-component/${navbar_slice.item.id}`,
				{
					idTemplate,
					background,
					fontType,
					fontSize,
					bold,
					textAlign,
					italic,
					textDecoration,
					textColor,
					idShape,
					buttonColor,
					borderColor,
				},
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);

			console.log("test", test);

			if (navigation_style.server_item.logo_image !== navigation_style.item.logo_image) {
				await axios.put(
					`${baseURL}/navbar-component/update-logo/${navbar_slice.item.id}`,
					{
						logo,
					},
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${user_token}`,
						},
					}
				);
			}
		}

		// Process navigation menu items
		await Promise.all(
			navigation_menu.item.map(async (item) => {
				const { id, navigation_name, link, subnav, isButton, sub_navigation, orderIndex } = item;

				if (id == null) {
					// Post Navitem
					const postResponse = await axios.post(
						`${baseURL}/navbar-item-component`,
						{
							orderIndex,
							name: navigation_name,
							link,
							subnav,
							isButton,
							idNavigation: navbarId,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
					const idNavItem = postResponse.data.data.id;

					// Post Subnav
					if (subnav == "true") {
						await Promise.all(
							sub_navigation.map(async (subnavItem) => {
								const { subnav_name, link, orderIndex } = subnavItem;
								const test = await axios.post(
									`${baseURL}/sub-nav-component`,
									{
										name: subnav_name,
										link,
										orderIndex,
										idNavItem,
									},
									{
										headers: {
											Authorization: `Bearer ${user_token}`,
										},
									}
								);
							})
						);
					}
				} else {
					// Put Navitem
					await axios.put(
						`${baseURL}/navbar-item-component/${id}`,
						{
							orderIndex,
							name: navigation_name,
							link,
							subnav,
							isButton,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);

					// Put or Post Subnav
					if (subnav == "true") {
						await Promise.all(
							sub_navigation.map(async (subnavItem) => {
								const { id: subnavId, subnav_name, link, orderIndex } = subnavItem;

								if (subnavId == null) {
									// Post Subnav
									const aa = await axios.post(
										`${baseURL}/sub-nav-component`,
										{
											name: subnav_name,
											orderIndex,
											link,
											idNavItem: id,
										},
										{
											headers: {
												Authorization: `Bearer ${user_token}`,
											},
										}
									);
								} else {
									// Put Subnav
									await axios.put(
										`${baseURL}/sub-nav-component/${subnavId}`,
										{
											name: subnav_name,
											link,
											orderIndex,
										},
										{
											headers: {
												Authorization: `Bearer ${user_token}`,
											},
										}
									);
								}
							})
						);
					}
				}
			})
		);

		// Get Navitem
		const navitemResponse = await axios.get(`${baseURL}/navbar-item-component/${navbarId}`, {
			headers: {
				Authorization: `Bearer ${user_token}`,
			},
		});

		const idNavItems = navitemResponse.data.data.map((navitem) => navitem.id);
	} catch (error) {
		console.error("Error saving navbar data:", error);
	}
}
