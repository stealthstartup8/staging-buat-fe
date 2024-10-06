import Button from "@/components/Elements/Button";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Modal from "@/components/Elements/Modal";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useNavbar } from "@/utils/hooks/useNavbar";
import { useFooter } from "@/utils/hooks/useFooter";
import { useTemplate } from "@/utils/hooks/useTemplate";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import StyleManagementFragments from "@/components/Fragments/StyleManagement";
import OperationButton from "@/components/Fragments/OperationButton";
import { SaveNavbarData } from "@/utils/api/navbar";
import { SaveBodyData } from "@/utils/api/body";
import { SaveFooterData } from "@/utils/api/footer";
import { useBody } from "@/utils/hooks/useBody";
import TemplateMapping from "@/components/Fragments/Details/templateMapping";
import PageSectionSelection from "@/components/Fragments/Details/SectionSelection";
import ZoomPan from "@/utils/helpers/ZoomPan";
import { OBJ_FOOTER_PREVIEW, OBJ_NAVBAR_PREVIEW } from "@/utils/constants";
import autosize from "autosize";
import { Blocker } from "@/components/Fragments/Blocker";
import { useDispatch, useSelector } from "react-redux";
import { handleNewUser } from "@store/website";
import { getBodyThunk } from "@/utils/fetch/getBodyThunk";
import { getNavbarThunk } from "@/utils/fetch/getNavbarThunk";
import { getFooterThunk } from "@/utils/fetch/getFooterThunk";
import { resetState } from "@store/style-management";
import {
	fetchAllData as getCommerceThunk,
	fetchCategory as getCommerceCategoryThunk,
} from "@store/e-commerce";
import {
	fetchAllCareerData as getCareerThunk,
	fetchCategory as getCareerCategoryThunk,
} from "@store/job-vacancy";
import { fetchLabel as getBlogLabelThunk, fetchAllData as getBlogThunk } from "@store/blog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PagesDetail = ({
	categoryDatas,
	templateHero,
	templateFooter,
	templateNavbar,
	templateFaQs,
	templateCTA,
	templateBlog,
	templateCareer,
	templatePricing,
	templateCommerce,
	templateForm,
	templateLogo,
	// sectionDatas,
	page_id,
	page_slug,
	user_id,
	user_token,
	website_detail,
	// navbar_components,
	// footer_components,
	// social_media_footer,
	// information_component,
	path,
}) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const new_user = useSelector((state) => state?.persistedReducer?.websiteSlices?.new_user);

	const { navbar_slice, navigation_menu, navigation_style, navigation_font, navigation_button, getNavbar } =
		useNavbar();
	const { selectManagement } = useStyleManagement();

	const {
		footer_slice,
		footer_company,
		footer_navigation,
		footer_information,
		footer_social,
		footer_font,
	} = useFooter();

	const {
		setSelectComponent,
		setSelectSection,
		setSelectManagement,
		setSectionComponentHero,
		selectSection,
		sectionId,
		setStateOnDeleteSection,
	} = useStyleManagement();

	const {
		getBody,
		section_slice,
		font_slice,
		body_slice,
		label_slice,
		button_slice,
		dispatchDeleteSection,
	} = useBody();
	const { handleOnDragOver, handleOnDrop, dropIndexSelected, setDropIndexSelected } = useTemplate();

	const [selectFooter, setSelectFooter] = useState("");
	const [selectMenu, setSelectMenu] = useState("");
	const [open, setOpen] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);
	const [savedStatus, setSavedStatus] = useState(false);
	const [showMobileView, setShowMobileView] = useState(false);

	const setSelectedSection = (index) => {
		setSectionComponentHero(index);
	};

	const wrapperRef = useRef(false);
	useEffect(() => {
		new_user == true && dispatch(handleNewUser(false));
	}, []);

	useEffect(() => {
		autosize(document.querySelectorAll("textarea"));
	}, [section_slice.item.length]);

	useEffect(() => {
		if (localStorage.getItem("first-render") == "true") {
			// getFooter(footer_components, social_media_footer, information_component, website_detail);
			// getNavbar(user_token, navbar_components, website_detail);
			// getBody(sectionDatas, website_detail, user_token);
			dispatch(getNavbarThunk({ website_detail, user_token }));
			dispatch(getBodyThunk({ website_detail, user_token, page_slug }));
			dispatch(getFooterThunk({ website_detail, user_token }));
			dispatch(resetState());
			localStorage.setItem("first-render", "false");
		}

		// this will be executed on every refresh, because the data is not persisted
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
	}, []); // disini

	useEffect(() => {
		const iframe = document.getElementById("iframe-preview");
		if (iframe) {
			iframe.src = `/preview-website/${page_id}`;
		}
	}, [handleOnDrop]);

	const saveData = async () => {
		setSaveLoading(true);

		const NavbarDatas = {
			website_detail,
			user_token,
			navigation_style,
			navigation_font,
			navigation_button,
			navigation_menu,
			navbar_slice,
			navbar_components: navbar_slice.server_item,
			website_detail,
		};

		const BodyDatas = {
			body_slice,
			button_slice,
			label_slice,
			font_slice,
			user_token,
			user_id,
			page_id,
			section_slice,
			website_detail,
		};

		const FooterDatas = {
			footer_slice,
			footer_company,
			footer_information,
			footer_font,
			footer_navigation,
			footer_social,
			user_token,
			footer_components: footer_slice.server_item,
			social_media_footer: footer_social.server_item,
			website_detail,
		};

		await Promise.all([SaveNavbarData(NavbarDatas), SaveBodyData(BodyDatas), SaveFooterData(FooterDatas)])
			.then(() => {
				setSavedStatus(true);
				dispatch(getNavbarThunk({ website_detail, user_token }));
				dispatch(getBodyThunk({ website_detail, user_token, page_slug }));
				dispatch(getFooterThunk({ website_detail, user_token }));
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setSaveLoading(false);
			});
	};

	const selectValues = [];

	section_slice.item.map((item) => {
		if (selectValues[0] != 1) {
			selectValues.push(1);
		} else {
			selectValues.push(item.order_index + selectValues[0]);
		}
	});

	const handleDeleteSection = async (e) => {
		e.preventDefault();

		// set the state when deleting a section
		setStateOnDeleteSection();

		if (sectionId !== null) {
			// deleting the section on the server
			try {
				const deleteSection = await axios.delete(
					process.env.NEXT_PUBLIC_API_KEY + `/section/` + sectionId + `/${website_detail.id}`,
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);
			} catch (err) {
				console.error(err);
			} finally {
				dispatch(getBodyThunk({ website_detail, user_token, page_slug }));
			}
		} else {
			// deleting the section locally
			dispatchDeleteSection(e);
		}
	};

	const NavbarComponent = OBJ_NAVBAR_PREVIEW[navbar_slice.item.id_template];
	const FooterComponent = OBJ_FOOTER_PREVIEW[footer_slice.item.id_template];

	return (
		<div id="pages-detail-page">
			<ToastContainer />
			<Blocker url={"/posts"} />
			<Modal open={open} size="xs">
				<Modal.Header className="text-sm font-normal">
					<div>
						<h1 className="text-xl font-bold">Delete</h1>
						<hr className="my-2"></hr>
						You can’t undo this action, are you sure you want to delete this edit?{" "}
					</div>
				</Modal.Header>
				<Modal.Footer>
					<div className="flex gap-2 mt-[-25px] w-[100%]">
						<Button
							onClick={(e) => setOpen(false)}
							className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#000000] text-[#000000] bg-white hover:bg-[#000000] hover:text-white focus:outline-none"
						>
							Back
						</Button>
						<Button
							onClick={(e) => {
								handleDeleteSection(e);
								setOpen(false);
							}}
							className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#F11010] text-[#F11010] bg-white hover:bg-[#F11010] hover:text-white"
						>
							Delete
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			<OperationButton
				saveLoading={saveLoading}
				savedStatus={savedStatus}
				setSavedStatus={setSavedStatus}
				id={router.query.id}
				saveData={saveData}
				user_token={user_token}
				website_detail={website_detail}
			/>

			<div className={`grid lg:grid-cols-5 grid-cols-1`}>
				<PageSectionSelection
					setSelectMenu={setSelectMenu}
					categoryDatas={categoryDatas}
					selectSection={selectSection}
					setSelectSection={setSelectSection}
					templateHero={templateHero}
					user_token={user_token}
					navbar_components={navbar_slice.server_item}
					templateNavbar={templateNavbar}
					selectMenu={selectMenu}
					templateFaQs={templateFaQs}
					templateCTA={templateCTA}
					templateCareer={templateCareer}
					templatePricing={templatePricing}
					templateCommerce={templateCommerce}
					templateBlog={templateBlog}
					templateForm={templateForm}
					templateLogo={templateLogo}
					setSelectFooter={setSelectFooter}
					templateFooter={templateFooter}
					footer_components={footer_slice.server_item}
					selectFooter={selectFooter}
					website_detail={website_detail}
					path={path}
				/>
				<div className="col-span-3 relative">
					<TransformWrapper
						initialScale={0.5}
						maxScale={1}
						minScale={0.1}
						ref={wrapperRef}
						centerZoomedOut={false}
						centerOnInit={true}
						wheel={{
							wheelDisabled: true,
						}}
						panning={{
							excluded: ["input", "textarea", "button"],
							wheelPanning: true,
						}}
						limitToBounds={false}
					>
						<div className="absolute bottom-2 left-0 z-40 p-4">
							<ZoomPan setShowMobileView={setShowMobileView} showMobileView={showMobileView} />
						</div>
						<TransformComponent>
							<div className="flex gap-32">
								<div className="desktop">
									<div
										onClick={(e) => {
											setSelectManagement("menus");
											setSelectComponent("navbar-navigation");
											setSelectSection("menus");
										}}
										className="cursor-pointer"
									>
										{NavbarComponent && (
											<NavbarComponent
												editable={true}
												navigation_menu={navigation_menu}
												navigation_style={navigation_style}
												navigation_font={navigation_font}
												navigation_button={navigation_button}
												show_navbar={navbar_slice.show_navbar}
											/>
										)}
									</div>
									<TemplateMapping
										setOpen={setOpen}
										page_id={page_id}
										website_detail={website_detail}
										user_token={user_token}
									/>
									{!FooterComponent && (
										<div
											onDrop={(e) => handleOnDrop(e, page_id)}
											onDragOver={(e) => handleOnDragOver(e, section_slice.item.length)}
											onDragLeave={(e) => setDropIndexSelected(null)}
											className="border-dotted border-2 border-gray-700 h-[640px] w-[100vw] text-center pt-[260px] text-[32px] font-bold"
										>
											Drop Here
										</div>
									)}
									<div
										onDrop={(e) => handleOnDrop(e, page_id)}
										onDragOver={(e) => handleOnDragOver(e, section_slice.item.length)}
										onDragLeave={(e) => setDropIndexSelected(null)}
										onClick={(e) => {
											setSelectManagement("footers");
											setSelectComponent("company");
											setSelectSection("footers");
										}}
										className={`cursor-pointer ${
											dropIndexSelected == section_slice.item.length &&
											"pt-[100vh] bg-black/5 relative"
										} `}
									>
										{FooterComponent && (
											<FooterComponent
												editable={true}
												footer_company={footer_company}
												footer_navigation={footer_navigation}
												footer_information={footer_information}
												footer_social={footer_social}
												footer_font={footer_font}
											/>
										)}
									</div>
								</div>
							</div>
						</TransformComponent>
					</TransformWrapper>
				</div>
				<div
					style={{
						backgroundImage: "url(/assets/phone-mockup.png)",
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
					}}
					className={`fixed top-[12%] right-[21.5%] z-20 w-[225.6px] h-[460.8px] ${
						showMobileView ? "block" : "hidden"
					}`}
				>
					<iframe
						id="iframe-preview"
						src={`/preview-website/${page_id}`}
						className="w-[510px] h-[862px] absolute top-[40px] left-[10.5px] z-10 scale-[0.4] origin-top-left"
					></iframe>
				</div>

				<div className="col-span-1 rounded-md h-[100vh] overflow-hidden lg:block hidden ">
					<div className="bg-white p-6 h-[100vh] overflow-hidden pt-[100px] overflow-x-hidden flex flex-col">
						<h1 className="text-lg font-bold">
							{selectSection == "sections"
								? "Content"
								: selectSection == "footers"
								? "Footer"
								: selectSection == "menus"
								? "Menu"
								: "Content"}{" "}
							Management
						</h1>
						<hr className="mt-4 mb-2"></hr>
						<StyleManagementFragments
							user_id={user_id}
							setSelectedSection={setSelectedSection}
							user_token={user_token}
							website_id={website_detail.id}
							id_section={body_slice.item.length}
							selectValues={selectValues}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PagesDetail;

export async function getServerSideProps(context) {
	const page_slug = context.query.id;
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

		const resCategory = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/category`);

		const resTemplate = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/template`);

		const resAllData = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY + `/page/get-all-data/` + page_slug,
			{
				headers: {
					Authorization: `Bearer ${session.user.token}`,
				},
			}
		);

		const getWebsite = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/website/` + user_id, {
			headers: {
				Authorization: `Bearer ${session.user.token}`,
			},
		});

		// const getNavbar = await axios.get(
		// 	process.env.NEXT_PUBLIC_API_KEY + `/navbar-component/` + getWebsite.data.data.id,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${session.user.token}`,
		// 		},
		// 	}
		// );

		// const getFooter = await axios.get(
		// 	process.env.NEXT_PUBLIC_API_KEY + `/footer-component/` + getWebsite.data.data.id,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${session.user.token}`,
		// 		},
		// 	}
		// );

		// const getSocialMedia = await axios.get(
		// 	process.env.NEXT_PUBLIC_API_KEY + `/social-media-component/` + getWebsite.data.data.id,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${session.user.token}`,
		// 		},
		// 	}
		// );

		// const getInformationComponent = await axios.get(
		// 	process.env.NEXT_PUBLIC_API_KEY + `/information-component/` + getWebsite.data.data.id,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${session.user.token}`,
		// 		},
		// 	}
		// );

		const categoryIds = {
			templateNavbar: 1,
			templateFooter: 2,
			templateHero: 3,
			templateFaQs: 4,
			templateCTA: 5,
			templateBlog: 6,
			templateForm: 9,
			templateLogo: 10,
			templateCareer: 11,
			templatePricing: 12,
			templateCommerce: 13,
		};

		const templates = Object.keys(categoryIds).reduce((acc, key) => {
			acc[key] = resTemplate.data.data.filter((item) => item.idCategory === categoryIds[key]);
			return acc;
		}, {});

		return {
			props: {
				categoryDatas: resCategory.data,
				...templates,
				sectionDatas: resAllData.data.data.sections,
				page_slug: page_slug,
				page_id: resAllData.data.data.id,
				user_id: user_id,
				user_token: session.user.token,
				website_detail: getWebsite.data.data,
				// navbar_components: getNavbar.data,
				// footer_components: getFooter.data,
				// social_media_footer: getSocialMedia.data.data,
				// information_component: getInformationComponent.data.data,
				path: resAllData.data.data.path,
			},
		};
	}
}
