import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKGROUND_STORAGE_DIR, ICON_STORAGE_DIR, LOGO_STORAGE_DIR } from "../constants/Storage";

// *note*
// some slice has an initial state (the ones with initial values even if its empty string), some slice doesn't have it (the ones with empty array and object as initial state)
// those with initial state shouldn't be replaced with undefined values fetched from database
// because setting having slice attributes as undefined will cause problems when trying to create/edit a section
// this is handled inside the slice itself, not here
export const getFooterThunk = createAsyncThunk(
	"fetch/getFooterThunk",
	async ({ user_token, website_detail }, thunkAPI) => {
		try {
			const res = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/footer-component/` + website_detail.id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
			const footer_components = res.data;
			console.log("footer_components", footer_components);
			const getSocialMedia = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/social-media-component/` + website_detail.id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
			const social_media_footer = getSocialMedia.data.data;

			const getInformationComponent = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/information-component/` + website_detail.id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
			const information_component = getInformationComponent.data.data;

			// temporary variables, each representing a single slice
			let footer = {};
			let footerCompany = {};
			let footerInformation = {};
			let footerFont = {};
			let footerNavigation = [];
			let footerSocial = [];

			// check if there is a footer
			if (footer_components.data !== null) {
				footer = {
					id: footer_components.data.id,
					id_website: footer_components.data.idWebsite,
					id_template: footer_components.data.idTemplate,
				};

				footerCompany = {
					background_images:
						footer_components.data.backgroundImage == ""
							? ""
							: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${BACKGROUND_STORAGE_DIR}/${footer_components.data.backgroundImage}`,
					background_color: footer_components.data.backgroundColor,
				};

				footerInformation = {
					title: footer_components.data.title,
					about: footer_components.data.about,
					footer_note: footer_components.data.copyright,
					logo:
						footer_components.data.logo == undefined || footer_components.data.logo == ""
							? ""
							: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${LOGO_STORAGE_DIR}/${footer_components.data.logo}`,
					logo_file: "",
					information: [],
				};

				if (information_component.length > 0) {
					for (const component of information_component) {
						footerInformation.information.push({
							id: component.id,
							information_type: component.type,
							information: component.name,
						});
					}
				}

				footerFont = {
					font_style: footer_components.data.fontStyle,
					font_size: footer_components.data.fontSize,
					bold: footer_components.data.bold,
					italic: footer_components.data.italic,
					text_decoration: footer_components.data.textDecoration,
					color: footer_components.data.textColor,
				};

				for (const item of footer_components.data.label_footer) {
					let sub_navigation = [];
					for (const subItem of item.list_nav_footer) {
						sub_navigation.push({
							index: item.orderIndex,
							orderIndex: subItem.orderIndex,
							id: subItem.id,
							subnav_name: subItem.label,
							link: subItem.link,
						});
					}
					footerNavigation.push({
						id: item.id,
						orderIndex: item.orderIndex,
						navigation_name: item.label,
						sub_navigation: sub_navigation,
					});
				}
			}
			// because social media is not binded to the footer, but to the website itself, we dont need to check if there is a footer or now
			if (social_media_footer.length > 0) {
				for (const item of social_media_footer) {
					footerSocial.push({
						id: item.id,
						social_type: item.type,
						social_name: item.name,
						social_link: item.link,
						icon:
							item.icon == "" || item.icon == undefined
								? ""
								: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${ICON_STORAGE_DIR}/${item.icon}`,
					});
				}
			}

			return {
				footer,
				footerCompany,
				footerInformation,
				footerFont,
				footerNavigation,
				footerSocial,
			};
		} catch (error) {
			console.log(error);
			return thunkAPI.rejectWithValue(error.response);
		}
	}
);
