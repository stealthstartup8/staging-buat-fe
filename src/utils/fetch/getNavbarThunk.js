import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGO_STORAGE_DIR } from "../constants/Storage";

// *note*
// some slice has an initial state (the ones with initial values even if its empty string), some slice doesn't have it (the ones with empty array and object as initial state)
// those with initial state shouldn't be replaced with undefined values fetched from database
// because setting having slice attributes as undefined will cause problems when trying to create/edit a section
// this is handled inside the slice itself, not here
export const getNavbarThunk = createAsyncThunk(
	"fetch/getNavbarThunk",
	async ({ user_token, website_detail }, thunkAPI) => {
		try {
			const getNavbar = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/navbar-component/` + website_detail.id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
			const navbar_components = getNavbar.data;

			// temporary variables, each representing a single slice
			let navbar = {};
			let navbarFont = {};
			let navbarLogo = {};
			let navbarButton = {};
			let navbarNavigation = [];
			let navbarSubMenu = [];

			if (navbar_components.data !== null) {
				navbar = {
					id: navbar_components.data.id,
					id_website: navbar_components.data.idWebsite,
					id_template: navbar_components.data.idTemplate,
				};

				navbarFont = {
					font_style: navbar_components.data.fontType ? navbar_components.data.fontType : "",
					font_size: navbar_components.data.fontSize ? navbar_components.data.fontSize : "",
					bold: navbar_components.data.bold ? navbar_components.data.bold : false,
					italic: navbar_components.data.italic ? navbar_components.data.italic : false,
					text_decoration: navbar_components.data.textDecoration
						? navbar_components.data.textDecoration
						: "",
					align: navbar_components.data.textAlign ? navbar_components.data.textAlign : "left",
					color: navbar_components.data.textColor
						? navbar_components.data.textColor
						: "rgba(255,255,255,1)",
				};

				navbarLogo = {
					logo_image:
						navbar_components.data.logo == ""
							? ""
							: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${LOGO_STORAGE_DIR}/${navbar_components.data.logo}`,
					background_color: navbar_components.data.background,
				};

				navbarButton = {
					button_color: navbar_components.data.buttonColor,
					stroke_button_color: navbar_components.data.borderColor,
				};

				for (const item of navbar_components.data.nav_item) {
					let subnav_item = [];

					if (item.subnav === true && item.sub_nav_item.length > 0) {
						try {
							const res = await axios.get(
								`${process.env.NEXT_PUBLIC_API_KEY}/sub-nav-component/${item.id}`,
								{
									headers: {
										Authorization: `Bearer ${user_token}`,
									},
								}
							);

							subnav_item = res.data.data.map((subItem) => ({
								orderIndex: subItem.orderIndex,
								id: subItem.id,
								subnav_name: subItem.name,
								link: subItem.link,
							}));
						} catch (error) {
							console.error("Error fetching sub-nav items", error);
						}
					}

					navbarNavigation.push({
						id: item.id,
						orderIndex: item.orderIndex,
						id_shape: String(navbar_components.data.idShape),
						navigation_name: item.name,
						isButton: item.isButton,
						link: item.link,
						subnav: item.subnav === true ? "true" : "false",
						sub_navigation: subnav_item,
					});
				}
			}

			return {
				navbar,
				navbarFont,
				navbarLogo,
				navbarButton,
				navbarNavigation,
				navbarSubMenu,
			};
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response);
		}
	}
);
