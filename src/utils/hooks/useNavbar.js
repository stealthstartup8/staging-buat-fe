import { useDispatch, useSelector } from "react-redux";
import { addNavbar } from "@store/navbar";
import { addFontStyleMenu } from "@store/menu/fontSlice";
import { addLogoAndBgColor } from "@store/menu/logoSlice";
import { changeButtonStyle } from "@store/menu/buttonSlice";
import { addMenuNavigation, addSubMenuNavigation } from "@store/menu/navigationSlice";
import axios from "axios";

export const useNavbar = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.persistedReducer);

	const getNavbar = (token, navbar_components, website_detail) => {
		if (navbar_components.data != null) {
			dispatch(
				addNavbar({
					id: navbar_components.data.id,
					id_website: navbar_components.data.idWebsite,
					id_template: navbar_components.data.idTemplate,
				})
			);

			dispatch(
				addFontStyleMenu({
					font_style: navbar_components.data.fontType,
					font_size: navbar_components.data.fontSize,
					bold: navbar_components.data.bold,
					italic: navbar_components.data.italic,
					text_decoration: navbar_components.data.textDecoration,
					align: navbar_components.data.textAlign,
					color: navbar_components.data.textColor,
				})
			);

			dispatch(
				addLogoAndBgColor({
					logo_image:
						navbar_components.data.logo == ""
							? ""
							: `https://${website_detail.access_domain[0].name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/logo/${navbar_components.data.logo}`,
					background_color: navbar_components.data.background,
				})
			);

			dispatch(
				changeButtonStyle({
					button_color: navbar_components.data.buttonColor,
					stroke_button_color: navbar_components.data.borderColor,
				})
			);

			navbar_components.data.nav_item.map((item, index) => {
				if (store.navigationMenuSlice.item.length == 0) {
					dispatch(
						addMenuNavigation({
							id: item.id,
							orderIndex: item.orderIndex,
							id_shape: String(navbar_components.data.idShape),
							navigation_name: item.name,
							isButton: item.isButton,
							link: item.link,
							subnav: item.subnav == true ? "true" : "false",
							sub_navigation: [],
						})
					);

					if (item.subnav == true && item.sub_nav_item.length > 0) {
						const getSubnav = axios
							.get(process.env.NEXT_PUBLIC_API_KEY + `/sub-nav-component/` + item.id, {
								headers: {
									Authorization: `Bearer ${token}`,
								},
							})
							.then((res) => {
								res.data.data.map((item) => {
									dispatch(
										addSubMenuNavigation({
											index: index,
											orderIndex: item.orderIndex,
											id: item.id,
											subnav_name: item.name,
											link: item.link,
										})
									);
								});
							});
					}
				}
			});
		}
	};

	return {
		navbar_slice: store.navbarSlice,
		navigation_menu: store.navigationMenuSlice,
		navigation_style: store.navigationLogoSlice,
		navigation_font: store.navigationFontSlice,
		navigation_button: store.navigationButtonSlice,
		getNavbar,
	};
};
