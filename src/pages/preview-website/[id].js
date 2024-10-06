import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useFooter } from "@/utils/hooks/useFooter";
import { useNavbar } from "@/utils/hooks/useNavbar";
import { useBody } from "@/utils/hooks/useBody";
import { OBJ_COMPONENT_PREVIEW, OBJ_FOOTER_PREVIEW, OBJ_NAVBAR_PREVIEW } from "@/utils/constants";
import { Fragment, useEffect } from "react";
import {
	fetchAllData as getCommerceThunk,
	fetchCategory as getCommerceCategoryThunk,
} from "@store/e-commerce";
import {
	fetchAllCareerData as getCareerThunk,
	fetchCategory as getCareerCategoryThunk,
} from "@store/job-vacancy";
import { fetchLabel as getBlogLabelThunk, fetchAllData as getBlogThunk } from "@store/blog";
import { useDispatch } from "react-redux";
import { getNavbarThunk } from "@/utils/fetch/getNavbarThunk";
import { getBodyThunk } from "@/utils/fetch/getBodyThunk";
import { getFooterThunk } from "@/utils/fetch/getFooterThunk";
import { resetState } from "@store/style-management";

const PreviewWebsite = ({ user_token, websiteid, website_detail }) => {
	const router = useRouter();
	const page_slug = router.query.id;
	const dispatch = useDispatch();

	const { navbar_slice, navigation_menu, navigation_style, navigation_font, navigation_button } =
		useNavbar();

	useEffect(() => {
		if (localStorage.getItem("first-render") == "true") {
			dispatch(getNavbarThunk({ website_detail, user_token }));
			dispatch(getBodyThunk({ website_detail, user_token, page_slug }));
			dispatch(getFooterThunk({ website_detail, user_token }));
			dispatch(resetState());
			localStorage.setItem("first-render", "false");
		}

		dispatch(getCommerceThunk({ website_id: website_detail.id, token: user_token }));
		dispatch(getCommerceCategoryThunk({ website_id: website_detail.id, token: user_token }));
		dispatch(getCareerThunk({ website_id: website_detail.id, token: user_token }));
		dispatch(getCareerCategoryThunk({ website_id: website_detail.id, token: user_token }));
		dispatch(
			getBlogThunk({
				website_id: website_detail.id,
				token: user_token,
				bucketAccess: website_detail.bucketAccess,
			})
		);
		dispatch(getBlogLabelThunk({ website_id: website_detail.id, token: user_token }));
	}, []);

	const {
		footer_slice,
		footer_company,
		footer_navigation,
		footer_information,
		footer_social,
		footer_font,
	} = useFooter();

	const { section_slice, font_slice, body_slice, button_slice, label_slice } = useBody();
	const NavbarComponent = OBJ_NAVBAR_PREVIEW[navbar_slice.item.id_template];
	const FooterComponent = OBJ_FOOTER_PREVIEW[footer_slice.item.id_template];

	return (
		<div>
			{NavbarComponent ? (
				<>
					<NavbarComponent
						navigation_menu={navigation_menu}
						navigation_style={navigation_style}
						navigation_font={navigation_font}
						navigation_button={navigation_button}
					/>
					{navbar_slice.item.id_template !== "102" && <div className="h-12"></div>}
					{/* rough height of the navbar, so the content below it is not blocked much */}
				</>
			) : (
				""
			)}
			{section_slice.item.map((item, index) => {
				const Component = OBJ_COMPONENT_PREVIEW[item.id_template];
				return item.id_page == section_slice.item[0].id_page && Component ? (
					<Fragment key={index}>
						<Component
							section={section_slice.item[index]}
							idComponent={item.order_index}
							value_component={body_slice.item[index]}
							button_slices={button_slice.item[index]}
							label_slices={label_slice.item[index]}
							font_slices={font_slice.item[index]}
							user_token={user_token}
							websiteid={website_detail.id}
							domain_name={website_detail.access_domain[0].name}
							website={website_detail}
						/>
					</Fragment>
				) : (
					""
				);
			})}

			{FooterComponent ? (
				<FooterComponent
					footer_company={footer_company}
					footer_navigation={footer_navigation}
					footer_information={footer_information}
					footer_social={footer_social}
					footer_font={footer_font}
				/>
			) : (
				""
			)}
		</div>
	);
};

export default PreviewWebsite;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	} else {
		const user_id = session.user.data.id;

		const getWebsite = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/website/` + user_id, {
			headers: {
				Authorization: `Bearer ${session.user.token}`,
			},
		});

		return {
			props: {
				user_token: session.user.token,
				websiteid: getWebsite.data.data.id,
				website_detail: getWebsite.data.data,
			},
		};
	}
}
