// Hooks
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useDispatch, useSelector } from "react-redux";

// Menu section
import MenuFootersSection from "../Details/ContentManagement/footers/menu";
import MenuNavbarSection from "../Details/ContentManagement/menus/menu";
import MenuFormSection from "../Details/ContentManagement/body/form";
import MenuSection from "../Details/ContentManagement/body/sections/menu";
import MenuFAQSection from "../Details/ContentManagement/body/faq/menu";
import MenuCTASection from "../Details/ContentManagement/body/cta/menu";
import MenuBlogSection from "../Details/ContentManagement/body/blog";
import MenuLogoSection from "../Details/ContentManagement/body/logo/menu";
import MenuCareerSection from "../Details/ContentManagement/body/career/menu";
import MenuPricingSection from "../Details/ContentManagement/body/pricing/menu";
import MenuCommerceSection from "../Details/ContentManagement/body/commerce/menu";

// Management section
import LabelSection from "../Details/ContentManagement/body/sections/label";
import ButtonSection from "../Details/ContentManagement/body/button";
import BackgroundSection from "../Details/ContentManagement/body/background";
import FontSection from "../Details/ContentManagement/body/font";
import CompanyFooterSection from "../Details/ContentManagement/footers/company";
import NavigationFooterSection from "../Details/ContentManagement/footers/navigation";
import NavigationNavbarSection from "../Details/ContentManagement/menus/navigation";
import LogoNavbarSection from "../Details/ContentManagement/menus/logo";
import ButtonNavbarSection from "../Details/ContentManagement/menus/button";
import FontNavbarSection from "../Details/ContentManagement/menus/font";
import SocialFooterSection from "../Details/ContentManagement/footers/social";
import InformationFooterSection from "../Details/ContentManagement/footers/information";
import FontFooterSection from "../Details/ContentManagement/footers/font";
import FaqInputSection from "../Details/ContentManagement/body/faq/faq";
import BlogLabel from "../Details/ContentManagement/body/blog/blogLabel";
import FormManagementSection from "../Details/ContentManagement/body/form/forms";
import LogoManagementSection from "../Details/ContentManagement/body/logo/logo";
import CommerceCardManagementSection from "../Details/ContentManagement/body/commerce/card";
import CommerceShopModalManagementSection from "../Details/ContentManagement/body/commerce/shop-modal";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { toggleShowNavbar } from "@store/navbar";
// Constants
import {
	SECTION_TEMPLATE_ID,
	BLOG_TEMPLATE_ID,
	CTA_TEMPLATE_ID,
	FAQ_TEMPLATE_ID,
	FORM_TEMPLATE_ID,
	LOGO_TEMPLATE_ID,
	CAREER_TEMPLATE_ID,
	PRICING_TEMPLATE_ID,
	COMMERCE_TEMPLATE_ID,
} from "@/utils/constants";
import CategorySection from "../Details/ContentManagement/body/category";
import { Fragment } from "react";

// This component will determine which menu and management to display based on the selected template and section
const StyleManagementFragments = ({
	user_id,
	setSelectedSection,
	user_token,
	id_section,
	website_id,
	selectValues,
}) => {
	const getSectionApi = useSelector((state) => {
		return state.persistedReducer.sectionSlices;
	});
	const dispatch = useDispatch();
	const { setSelectComponent, selectSection, selectComponent, sectionComponentHero, selectManagement } =
		useStyleManagement();
	const navbarSlice = useSelector((state) => state.persistedReducer.navbarSlice);
	return (
		<>
			<div>
				{selectManagement == "menus" && (
					<button
						className="flex gap-2 items-center text-sm"
						onClick={() => {
							dispatch(toggleShowNavbar());
						}}
					>
						{navbarSlice.show_navbar ? (
							<EyeIcon className="w-5 h-5 text-[#D9D9D9]" />
						) : (
							<EyeSlashIcon className="w-5 h-5 text-[#D9D9D9]" />
						)}
						show menu
					</button>
				)}
				{selectValues.map((value, index) => {
					// use the value -1 if you want to clear the management menus
					return selectManagement === -1 ? (
						<div></div>
					) : (
						selectManagement === value && (
							<Fragment key={index}>
								{SECTION_TEMPLATE_ID.includes(getSectionApi.item[value - 1].id_template) ? (
									<MenuSection
										selectComponent={selectComponent}
										setSelectComponent={setSelectComponent}
									/>
								) : BLOG_TEMPLATE_ID.includes(getSectionApi.item[value - 1].id_template) ? (
									<MenuBlogSection
										selectComponent={selectComponent}
										setSelectComponent={setSelectComponent}
									/>
								) : FAQ_TEMPLATE_ID.includes(getSectionApi.item[value - 1].id_template) ? (
									<MenuFAQSection
										selectComponent={selectComponent}
										setSelectComponent={setSelectComponent}
									/>
								) : CTA_TEMPLATE_ID.includes(getSectionApi.item[value - 1].id_template) ? (
									<MenuCTASection
										selectComponent={selectComponent}
										setSelectComponent={setSelectComponent}
									/>
								) : FORM_TEMPLATE_ID.includes(getSectionApi.item[value - 1].id_template) ? (
									<MenuFormSection
										selectComponent={selectComponent}
										setSelectComponent={setSelectComponent}
									/>
								) : LOGO_TEMPLATE_ID.includes(getSectionApi.item[value - 1].id_template) ? (
									<MenuLogoSection
										selectComponent={selectComponent}
										setSelectComponent={setSelectComponent}
									/>
								) : CAREER_TEMPLATE_ID.includes(getSectionApi.item[value - 1].id_template) ? (
									<MenuCareerSection
										selectComponent={selectComponent}
										setSelectComponent={setSelectComponent}
									/>
								) : PRICING_TEMPLATE_ID.includes(
										getSectionApi.item[value - 1].id_template
								  ) ? (
									<MenuPricingSection
										selectComponent={selectComponent}
										setSelectComponent={setSelectComponent}
									/>
								) : COMMERCE_TEMPLATE_ID.includes(
										getSectionApi.item[value - 1].id_template
								  ) ? (
									<MenuCommerceSection
										selectComponent={selectComponent}
										setSelectComponent={setSelectComponent}
									/>
								) : (
									""
								)}
							</Fragment>
						)
					);
				})}
				{selectManagement == "footers" ? (
					<MenuFootersSection
						selectComponent={selectComponent}
						setSelectComponent={setSelectComponent}
					/>
				) : selectManagement == "menus" ? (
					<MenuNavbarSection
						selectComponent={selectComponent}
						setSelectComponent={setSelectComponent}
					/>
				) : (
					""
				)}
			</div>

			{/* use the "clear value" if you want to clear the component management */}
			{selectComponent == "clear" ? (
				<div></div>
			) : selectComponent == "label" ? (
				<LabelSection
					setSelectedSection={setSelectedSection}
					sectionComponentHero={sectionComponentHero}
					user_id={user_id}
					user_token={user_token}
					website_id={website_id}
				/>
			) : selectComponent == "button" || selectComponent == "faq-button" ? (
				<ButtonSection selectSection={selectSection} />
			) : selectComponent == "background" || selectComponent == "faq-background" ? (
				<BackgroundSection />
			) : selectComponent == "font" || selectComponent == "faq-font" ? (
				<FontSection selectSection={selectSection} />
			) : selectComponent == "company" ? (
				<CompanyFooterSection />
			) : selectComponent == "footer-navigation" ? (
				<NavigationFooterSection user_token={user_token} />
			) : selectComponent == "navbar-navigation" ? (
				<NavigationNavbarSection user_token={user_token} />
			) : selectComponent == "navbar-logo" ? (
				<LogoNavbarSection />
			) : selectComponent == "navbar-button" ? (
				<ButtonNavbarSection />
			) : selectComponent == "navbar-font" ? (
				<FontNavbarSection />
			) : selectComponent == "footer-social" ? (
				<SocialFooterSection user_token={user_token} />
			) : selectComponent == "footer-information" ? (
				<InformationFooterSection user_token={user_token} />
			) : selectComponent == "footer-font" ? (
				<FontFooterSection />
			) : selectComponent == "faq" ? (
				<FaqInputSection
					user_token={user_token}
					id_template={getSectionApi.item[selectManagement - 1].id_template}
				/>
			) : selectComponent == "blogLabel" ? (
				<BlogLabel
					setSelectedSection={setSelectedSection}
					sectionComponentHero={sectionComponentHero}
					user_id={user_id}
					user_token={user_token}
					website_id={website_id}
					id_section={id_section}
				/>
			) : selectComponent == "forms" ? (
				<FormManagementSection
					user_token={user_token}
					sectionComponentHero={sectionComponentHero}
					website_id={website_id}
				/>
			) : selectComponent == "logo" ? (
				<LogoManagementSection user_token={user_token} website_id={website_id} />
			) : selectComponent == "careerLabel" ? (
				<CategorySection
					setSelectedSection={setSelectedSection}
					sectionComponentHero={sectionComponentHero}
					user_token={user_token}
					website_id={website_id}
					section={"career"}
				/>
			) : selectComponent == "pricing-package" ? (
				<CategorySection
					setSelectedSection={setSelectedSection}
					sectionComponentHero={sectionComponentHero}
					user_token={user_token}
					website_id={website_id}
					section={"pricing"}
				/>
			) : selectComponent == "commerce-category" ? (
				<CategorySection
					setSelectedSection={setSelectedSection}
					sectionComponentHero={sectionComponentHero}
					user_token={user_token}
					website_id={website_id}
					section={"commerce"}
				/>
			) : selectComponent == "commerce-card" ? (
				<CommerceCardManagementSection
					setSelectedSection={setSelectedSection}
					sectionComponentHero={sectionComponentHero}
					user_token={user_token}
					website_id={website_id}
				/>
			) : selectComponent == "commerce-shop-modal" ? (
				<CommerceShopModalManagementSection
					setSelectedSection={setSelectedSection}
					sectionComponentHero={sectionComponentHero}
					user_token={user_token}
					website_id={website_id}
				/>
			) : (
				""
			)}
		</>
	);
};

export default StyleManagementFragments;
