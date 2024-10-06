import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PreviewNavbar1 from "@/components/Fragments/Preview/Navbar/navbar1";
import BlogDetails from "@/components/Fragments/Preview/BlogDetails";
import ContentManagementLayout from "@/components/Fragments/Blog-and-Product/ContentManagement";
import BlogSectionSelection from "@/components/Fragments/Blog-and-Product/SectionSelection";
import { useNavbar } from "@/utils/hooks/useNavbar";
import { useEffect, useRef } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useFooter } from "@/utils/hooks/useFooter";
import PreviewFooter1 from "@/components/Fragments/Preview/Footer/footer1";
import { useTemplate } from "@/utils/hooks/useTemplate";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import StyleManagementFragments from "@/components/Fragments/StyleManagement";
import { useState } from "react";
import OperationButton from "@/components/Fragments/OperationButton";
import BlogFeatures from "@/components/Fragments/Blog-and-Product/ContentManagement/body";
import { SaveNavbarData } from "@/utils/api/navbar";
import { SaveBodyData } from "@/utils/api/body";
import { SaveFooterData } from "@/utils/api/footer";
import { useBody } from "@/utils/hooks/useBody";
import TemplateMapping from "@/components/Fragments/Details/templateMapping";
import { Blocker } from "@/components/Fragments/Blocker";
import Modal from "@/components/Elements/Modal";
import Button from "@/components/Elements/Button";
import ZoomPan from "@/utils/helpers/ZoomPan";
import { useRouter } from "next/router";
import { fetchLabel as getBlogLabelThunk, fetchAllData as getBlogThunk } from "@store/blog";
import { resetState } from "@store/style-management";
import { getBodyThunk } from "@/utils/fetch/getBodyThunk";
import { useDispatch } from "react-redux";
import { getNavbarThunk } from "@/utils/fetch/getNavbarThunk";
import { getFooterThunk } from "@/utils/fetch/getFooterThunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OBJ_FOOTER_PREVIEW, OBJ_NAVBAR_PREVIEW } from "@/utils/constants";

const BlogAndProduct = ({
	user_id,
	user_token,
	navbar_components,
	footer_components,
	social_media_footer,
	information_component,
	website_id,
	page_slug,
	website_detail,
	sectionDatas,
	page_id,
}) => {
	const [open, setOpen] = useState(false);
	const [showBlogMenu, setShowBlogMenu] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);
	const [savedStatus, setSavedStatus] = useState(false);
	const [showMobileView, setShowMobileView] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();

	const { label_slice, dispatchDeleteSection } = useBody();

	const { navbar_slice, navigation_menu, navigation_style, navigation_font, navigation_button } =
		useNavbar();

	const {
		footer_slice,
		footer_company,
		footer_navigation,
		footer_information,
		footer_social,
		footer_font,
	} = useFooter();

	const {
		handleOnDrop,
		handleOnDragOver,
		dropIndexSelected,
		setDropIndexSelected,
		section_slice,
		body_slice,
		button_slice,
		font_slice,
	} = useTemplate();

	const {
		setSelectComponent,
		setSelectSection,
		setSelectManagement,
		setSectionComponentHero,
		selectManagement,
		onClickSection,
		selectSection,
		sectionId,
		setSectionId,
		setStateOnDeleteSection,
	} = useStyleManagement();

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
			navbar_components,
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
			footer_components,
			social_media_footer,
			information_component,
			website_detail,
		};

		await Promise.all([SaveNavbarData(NavbarDatas), SaveBodyData(BodyDatas), SaveFooterData(FooterDatas)])
			.then(() => {
				setSavedStatus(true);
			})
			.finally(() => {
				setSaveLoading(false);
			});
	};

	const setSelectedSection = (index) => {
		setSectionComponentHero(index);
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

	useEffect(() => {
		if (localStorage.getItem("first-render") == "true") {
			dispatch(getNavbarThunk({ website_detail, user_token }));
			dispatch(getBodyThunk({ website_detail, user_token, page_slug }));
			dispatch(getFooterThunk({ website_detail, user_token }));
			dispatch(resetState());
			localStorage.setItem("first-render", "false");
		}

		dispatch(
			getBlogThunk({
				website_id: website_detail.id,
				token: user_token,
				bucketAccess: website_detail.bucketAccess,
			})
		);
		dispatch(getBlogLabelThunk({ website_id: website_detail.id, token: user_token }));
	}, []); // disini

	const NavbarComponent = OBJ_NAVBAR_PREVIEW[navbar_slice.item.id_template];
	const FooterComponent = OBJ_FOOTER_PREVIEW[footer_slice.item.id_template];
	return (
		<>
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
			<div className="grid lg:grid-cols-5 grid-cols-1 overflow-hidden">
				<BlogSectionSelection website_id={website_id} user_token={user_token} />
				<div className="col-span-3 overflow-hidden relative">
					<TransformWrapper
						initialScale={0.3}
						smooth={{ wheel: { step: 10 } }}
						maxScale={1}
						minScale={0.1}
						scrollOnWindow={true}
						centerOnInit={true}
						wheel={{
							wheelDisabled: true,
						}}
						panning={{
							excluded: ["input", "textarea", "button"],
							wheelPanning: true,
						}}
					>
						<div className="absolute bottom-2 left-0 z-40 p-4">
							<ZoomPan setShowMobileView={setShowMobileView} showMobileView={showMobileView} />
						</div>
						<TransformComponent>
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
							<div className="cursor-pointer">
								<div
									onClick={(e) => {
										onClickSection(e, 0, 7);
										setSelectManagement(1);
										setSelectComponent("blog-background");
										setShowBlogMenu(true);
									}}
								>
									<BlogDetails editable={true} selectManagement={selectManagement} />
								</div>
							</div>
							<div>
								<TemplateMapping
									setOpen={setOpen}
									page_id={page_id}
									website_detail={website_detail}
									user_token={user_token}
									pages={"blog-and-product"}
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
										"pt-[100vh] bg-black/5 relative w-[100vw]"
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

				<ContentManagementLayout>
					{selectSection == "blogDetails" ? (
						<BlogFeatures />
					) : (
						<StyleManagementFragments
							user_id={user_id}
							setSelectedSection={setSelectedSection}
							user_token={user_token}
							website_id={website_id}
							id_section={body_slice.item.length}
							selectValues={selectValues}
						/>
					)}
				</ContentManagementLayout>
			</div>
		</>
	);
};
export default BlogAndProduct;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const page_slug = context.query.id;

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

		const resAllData = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY + `/page/get-all-data/` + page_slug,
			{
				headers: {
					Authorization: `Bearer ${session.user.token}`,
				},
			}
		);

		const getNavbar = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY + `/navbar-component/` + getWebsite.data.data.id,
			{
				headers: {
					Authorization: `Bearer ${session.user.token}`,
				},
			}
		);

		const getFooter = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY + `/footer-component/` + getWebsite.data.data.id,
			{
				headers: {
					Authorization: `Bearer ${session.user.token}`,
				},
			}
		);

		const getSocialMedia = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY + `/social-media-component/` + getWebsite.data.data.id,
			{
				headers: {
					Authorization: `Bearer ${session.user.token}`,
				},
			}
		);

		const getInformationComponent = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY + `/information-component/` + getWebsite.data.data.id,
			{
				headers: {
					Authorization: `Bearer ${session.user.token}`,
				},
			}
		);

		return {
			props: {
				user_id: user_id,
				user_token: session.user.token,
				navbar_components: getNavbar.data,
				footer_components: getFooter.data,
				social_media_footer: getSocialMedia.data.data,
				information_component: getInformationComponent.data.data,
				website_id: getWebsite.data.data.id,
				website_detail: getWebsite.data.data,
				page_slug: page_slug,
				page_id: resAllData.data.data.id,
				sectionDatas: resAllData.data.data.sections,
			},
		};
	}
}
