import { BACKGROUND_STORAGE_DIR, LOGO_STORAGE_DIR } from "@/utils/constants/Storage";
import axios from "axios";

export async function SaveFooterData(FooterDatas) {
	const footerSlice = FooterDatas.footer_slice;
	const footerCompanySlice = FooterDatas.footer_company;
	const footerFontSlice = FooterDatas.footer_font;
	const informationFooterSlice = FooterDatas.footer_information;
	const navigationFooterSlice = FooterDatas.footer_navigation;
	const socialFooterSlice = FooterDatas.footer_social;
	const user_token = FooterDatas.user_token;
	const website_detail = FooterDatas.website_detail;
	const footer_components = FooterDatas.footer_components;
	const social_media_footer = FooterDatas.social_media_footer;
	const domain_name = FooterDatas.website_detail.access_domain[0].name;

	if (footerSlice.item.data == "available") {
		try {
			if (footerSlice.item.id == null) {
				const postFooter = await axios.post(
					process.env.NEXT_PUBLIC_API_KEY + `/footer-component`,
					{
						idTemplate: footerSlice.item.id_template,
						backgroundColor: footerCompanySlice.item.background_color,
						title: informationFooterSlice.item.title || "",
						about: informationFooterSlice.item.about || "",
						copyright: informationFooterSlice.item.footer_note || "",
						logo: informationFooterSlice.item.logo_file,
						backgroundImage: footerCompanySlice.item.background_images_file || "",
						textColor: footerFontSlice.item.color,
						fontType: footerFontSlice.item.font_style,
						fontSize: footerFontSlice.item.font_size,
						bold: footerFontSlice.item.bold,
						italic: footerFontSlice.item.italic,
						textDecoration: footerFontSlice.item.text_decoration,
						idWebsite: website_detail.id,
					},
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${user_token}`,
						},
					}
				);
			} else {
				const putFooter = await axios.put(
					process.env.NEXT_PUBLIC_API_KEY + `/footer-component/` + footerSlice.item.id,
					{
						idTemplate: footerSlice.item.id_template,
						backgroundColor: footerCompanySlice.item.background_color,
						title: informationFooterSlice.item.title,
						about: informationFooterSlice.item.about,
						copyright: informationFooterSlice.item.footer_note,
						fontType: footerFontSlice.item.font_style,
						fontSize: footerFontSlice.item.font_size,
						bold: footerFontSlice.item.bold,
						italic: footerFontSlice.item.italic,
						textDecoration: footerFontSlice.item.text_decoration,
						textColor: footerFontSlice.item.color,
					},
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);

				if (
					footerCompanySlice.server_item.background_images !=
					footerCompanySlice.item.background_images
				) {
					const putBgImage = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY +
							`/footer-component/background-image/` +
							footerSlice.item.id,
						{
							backgroundImage:
								footerCompanySlice.item.background_images_file == undefined
									? ""
									: footerCompanySlice.item.background_images_file,
						},
						{
							headers: {
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}

				if (informationFooterSlice.item.logo != informationFooterSlice.server_item.logo) {
					const putLogo = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY +
							`/footer-component/update-logo/` +
							footerSlice.item.id,
						{
							logo:
								informationFooterSlice.item.logo_file == undefined
									? ""
									: informationFooterSlice.item.logo_file,
						},
						{
							headers: {
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
					console.log("putLogo", putLogo);
				}
			}

			const getFooter = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/footer-component/` + website_detail.id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);

			if (navigationFooterSlice.item.length > 0) {
				for (let i = 0; i < navigationFooterSlice.item.length; i++) {
					if (navigationFooterSlice.item[i].id == null) {
						const postNavigation = await axios.post(
							process.env.NEXT_PUBLIC_API_KEY + `/label-footer-component`,
							{
								label: navigationFooterSlice.item[i].navigation_name,
								idFooter: getFooter.data.data.id,
								orderIndex: navigationFooterSlice.item[i].orderIndex,
							},
							{
								headers: {
									Authorization: `Bearer ${user_token}`,
								},
							}
						);
					} else {
						const putNavigation = await axios.put(
							process.env.NEXT_PUBLIC_API_KEY +
								`/label-footer-component/` +
								navigationFooterSlice.item[i].id,
							{
								label: navigationFooterSlice.item[i].navigation_name,
								orderIndex: navigationFooterSlice.item[i].orderIndex,
							},
							{
								headers: {
									Authorization: `Bearer ${user_token}`,
								},
							}
						);
					}
				}
			}

			const getNavFooter = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/label-footer-component/` + getFooter.data.data.id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);

			if (navigationFooterSlice.item.length > 0) {
				for (let i = 0; i < navigationFooterSlice.item.length; i++) {
					for (let f = 0; f < navigationFooterSlice.item[i].sub_navigation.length; f++) {
						if (navigationFooterSlice.item[i].sub_navigation[f].id == null) {
							const postSubnav = await axios.post(
								process.env.NEXT_PUBLIC_API_KEY + `/list-nav-footer-component`,
								{
									label: navigationFooterSlice.item[i].sub_navigation[f].subnav_name,
									link: navigationFooterSlice.item[i].sub_navigation[f].link,
									idLabelFooter: getNavFooter.data.data[i].id,
									orderIndex: navigationFooterSlice.item[i].sub_navigation[f].orderIndex,
								},
								{
									headers: {
										Authorization: `Bearer ${user_token}`,
									},
								}
							);
						} else {
							const putSubnav = await axios.put(
								process.env.NEXT_PUBLIC_API_KEY +
									`/list-nav-footer-component/` +
									navigationFooterSlice.item[i].sub_navigation[f].id,
								{
									label: navigationFooterSlice.item[i].sub_navigation[f].subnav_name,
									link: navigationFooterSlice.item[i].sub_navigation[f].link,
									orderIndex: navigationFooterSlice.item[i].sub_navigation[f].orderIndex,
								},
								{
									headers: {
										Authorization: `Bearer ${user_token}`,
									},
								}
							);
						}
					}
				}
			}

			if (socialFooterSlice.item.length > 0) {
				for (let i = 0; i < socialFooterSlice.item.length; i++) {
					if (socialFooterSlice.item[i].id == null) {
						const postSocial = await axios.post(
							process.env.NEXT_PUBLIC_API_KEY + `/social-media-component`,
							{
								type: socialFooterSlice.item[i].social_type,
								name: socialFooterSlice.item[i].social_name,
								link: socialFooterSlice.item[i].social_link,
								icon: socialFooterSlice.item[i].icon_file,
								idWebsite: website_detail.id,
							},
							{
								headers: {
									"Content-Type": "multipart/form-data",
									Authorization: `Bearer ${user_token}`,
								},
							}
						);
					} else {
						const putSocial = await axios.put(
							process.env.NEXT_PUBLIC_API_KEY +
								`/social-media-component/` +
								socialFooterSlice.item[i].id,
							{
								type: socialFooterSlice.item[i].social_type,
								name: socialFooterSlice.item[i].social_name,
								link: socialFooterSlice.item[i].social_link,
							},
							{
								headers: {
									Authorization: `Bearer ${user_token}`,
								},
							}
						);
						console.log(putSocial);
						if (social_media_footer[i].icon !== socialFooterSlice.item[i].icon) {
							const putIcon = await axios.put(
								process.env.NEXT_PUBLIC_API_KEY +
									`/social-media-component/icon-update/` +
									socialFooterSlice.item[i].id,
								{
									icon: socialFooterSlice.item[i].icon_file,
									idWebsite: website_detail.id,
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
				}
			}

			if (informationFooterSlice.item.information.length > 0) {
				for (let i = 0; i < informationFooterSlice.item.information.length; i++) {
					if (informationFooterSlice.item.information[i].id == null) {
						const postInformation = await axios.post(
							process.env.NEXT_PUBLIC_API_KEY + `/information-component`,
							{
								type: informationFooterSlice.item.information[i].information_type,
								name: informationFooterSlice.item.information[i].information,
								idWebsite: website_detail.id,
							},
							{
								headers: {
									Authorization: `Bearer ${user_token}`,
								},
							}
						);
					} else {
						const putInformation = await axios.put(
							process.env.NEXT_PUBLIC_API_KEY +
								`/information-component/` +
								informationFooterSlice.item.information[i].id,
							{
								type: informationFooterSlice.item.information[i].information_type,
								name: informationFooterSlice.item.information[i].information,
							},
							{
								headers: {
									Authorization: `Bearer ${user_token}`,
								},
							}
						);
					}
				}
			}
		} catch (err) {
			console.error("Error saving footer data:", err);
		}
	}
}
