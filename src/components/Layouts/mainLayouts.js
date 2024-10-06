import Sidebar from "../Fragments/sidebar";
import MainHeader from "../Fragments/mainHeader";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CreateWebsite from "../Fragments/Form/createWebsite";
import Modal from "../Elements/Modal";
import { useDispatch, useSelector } from "react-redux";
import { handleNewUser } from "@store/website";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MainLayouts = ({ children }) => {
	const [open, setOpen] = useState(true);
	const [isWebsite, SetIsWebsite] = useState("");
	const [user, setUser] = useState({});
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const new_user = useSelector((state) => state?.persistedReducer?.websiteSlices?.new_user);

	//state create website
	const [webTitle, setWebTitle] = useState("");
	const [webDesc, setWebDesc] = useState("");
	const [customDomain, setCustomDomain] = useState("");
	const [favicon, setFavicon] = useState(null);
	const [customDomainExternal, setCustomDomainExternal] = useState("");
	const [validation, setValidation] = useState({
		emptyImageOrTitle: false,
		emptyDesc: false,
		emptyDomain: false,
		domainAvailable: undefined,
	});
	const [mobileSidebar, setMobileSidebar] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (session && status == "authenticated") {
			setUser(session.user);
			getWebsite(session.user.token, session.user.data.id);
		}
	}, [session]);

	const getWebsite = async (token, id) => {
		try {
			const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/website/` + id, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			SetIsWebsite(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const createWebsite = async (e) => {
		e.preventDefault();

		setLoading(true);

		let updatedValidation = { ...validation };

		if (!favicon || !webTitle) {
			updatedValidation = {
				...updatedValidation,
				emptyImageOrTitle: true,
			};
		} else {
			updatedValidation.emptyImageOrTitle = false;
		}

		if (!webDesc) {
			updatedValidation = {
				...updatedValidation,
				emptyDesc: true,
			};
		} else {
			updatedValidation.emptyDesc = false;
		}

		if (!customDomain || validation.domainAvailable == undefined) {
			updatedValidation = {
				...updatedValidation,
				emptyDomain: true,
			};
		} else {
			updatedValidation.emptyDomain = false;
		}

		if (favicon && webTitle && webDesc && customDomain && validation.domainAvailable) {
			try {
				const res = await axios.post(
					process.env.NEXT_PUBLIC_API_KEY + `/website`,
					{
						title: webTitle,
						icon: favicon,
						meta: "",
						googleAnalytic: "",
						domain: customDomain.replace(" ", "-"),
						desc: webDesc,
						idUser: user.data.id,
					},
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);

				const getPages = await axios.get(
					process.env.NEXT_PUBLIC_API_KEY + `/page/` + res.data.data.id,
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				dispatch(handleNewUser(true));
				router.reload();
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
			updatedValidation = {
				emptyImage: false,
				emptyTitle: false,
				emptyDesc: false,
				emptyDomain: false,
				domainAvailable: undefined,
			};
		}

		setLoading(false);
		setValidation(updatedValidation);
	};

	return (
		<>
			{new_user && <div className="bg-black fixed top-0 left-0 w-full h-full z-30 bg-opacity-50"></div>}
			<div className="flex bg-white max-h-[100vh]">
				{isWebsite == null && (
					<Modal open={open} size="sm">
						<Modal.Header>
							<div className="w-[100vw]">
								Create Website
								<hr className="mt-2" />
							</div>
						</Modal.Header>

						<Modal.Body>
							<CreateWebsite
								userToken={user.token}
								setWebTitle={setWebTitle}
								setWebDesc={setWebDesc}
								setCustomDomain={setCustomDomain}
								customDomain={customDomain}
								setFavicon={setFavicon}
								onSubmit={createWebsite}
								setCustomDomainExternal={setCustomDomainExternal}
								customDomainExternal={customDomainExternal}
								validation={validation}
								setValidation={setValidation}
								webTitle={webTitle}
								loading={loading}
							/>
						</Modal.Body>
					</Modal>
				)}

				<div className="lg:p-4 lg:pr-0">
					<MainHeader
						domain={isWebsite?.access_domain?.[0]?.name}
						title={isWebsite?.title}
						id={isWebsite?.id}
						icon={isWebsite?.icon}
						setMobileSidebar={setMobileSidebar}
						mobileSidebar={mobileSidebar}
					/>
					<Sidebar
						user_data={user.data}
						mobileSidebar={mobileSidebar}
						setMobileSidebar={setMobileSidebar}
					/>
				</div>
				<main className="overflow-y-scroll mt-20 lg:p-4 overflow-x-hidden">
					<div className="width-sidebar ">{children}</div>
				</main>
			</div>
		</>
	);
};

export default MainLayouts;
