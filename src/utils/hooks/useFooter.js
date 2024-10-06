import { useDispatch, useSelector } from "react-redux";
import { addFooter } from "@store/footer";
import { addFooterCompany } from "@store/footer/companySlice";
import { addInformationFooter, addSubInformation } from "@store/footer/informationSlice";
import { addFontStyle } from "@store/footer/fontSlice";
import { addFooterMenuNavigation, addFooterSubMenuNavigation } from "@store/footer/navigationSlice";
import { addSocialMedia } from "@store/footer/socialSlice";

export const useFooter = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.persistedReducer);

	const getFooter = (footer_components, social_media_footer, information_component, website_detail) => {
		if (footer_components.data != null) {
			dispatch(
				addFooter({
					id: footer_components.data.id,
					id_website: footer_components.data.idWebsite,
					id_template: footer_components.data.idTemplate,
				})
			);

			dispatch(
				addFooterCompany({
					background_images:
						footer_components.data.backgroundImage == ""
							? ""
							: `"https://${website_detail.access_domain[0].name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/background/${footer_components.data.backgroundImage}"`,
					background_color: footer_components.data.backgroundColor,
				})
			);

			dispatch(
				addInformationFooter({
					title: "",
					about: "",
					footer_note: footer_components.data.copyright,
					logo:
						footer_components.data.logo == undefined
							? ""
							: `https://${website_detail.access_domain[0].name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/logo/${footer_components.data.logo}`,
				})
			);

			dispatch(
				addFontStyle({
					font_style: "",
					font_size: "",
					bold: false,
					italic: false,
					text_decoration: "",
					color: footer_components.data.textColor,
				})
			);

			footer_components.data.label_footer.map((item, index) => {
				if (store.navigationFooterSlice.item.length == 0) {
					dispatch(
						addFooterMenuNavigation({
							id: item.id,
							orderIndex: item.orderIndex,
							navigation_name: item.label,
							sub_navigation: [],
						})
					);
					if (item.list_nav_footer.length > 0) {
						item.list_nav_footer.map((item) => {
							dispatch(
								addFooterSubMenuNavigation({
									index: index,
									orderIndex: item.orderIndex,
									id: item.id,
									subnav_name: item.label,
									link: item.link,
								})
							);
						});
					}
				}
			});

			if (social_media_footer.length > 0) {
				social_media_footer.map((item) => {
					if (store.socialFooterSlice.item.length == 0) {
						dispatch(
							addSocialMedia({
								id: item.id,
								social_type: item.type,
								social_name: item.name,
								social_link: item.link,
								icon:
									item.icon == ""
										? ""
										: `https://${website_detail.access_domain[0].name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/icon/${item.icon}`,
							})
						);
					}
				});
			}

			if (information_component.length > 0) {
				information_component.map((item) => {
					if (store.informationFooterSlice.item.information.length == 0) {
						dispatch(
							addSubInformation({
								id: item.id,
								information_type: item.type,
								information: item.name,
							})
						);
					}
				});
			}
		}
	};

	return {
		footer_slice: store.footerSlice,
		footer_company: store.footerCompany,
		footer_navigation: store.navigationFooterSlice,
		footer_information: store.informationFooterSlice,
		footer_social: store.socialFooterSlice,
		footer_font: store.footerFontSlice,
		getFooter,
	};
};
