import Button from "@/components/Elements/Button";
import PagesCard from "@/components/Fragments/Card/PagesCard";
import { getSession, useSession } from "next-auth/react";
import Modal from "@/components/Elements/Modal";
import { XMarkIcon, RocketLaunchIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Input from "@/components/Elements/Input";
import { Fragment, useEffect, useState } from "react";
import LoadingAnimation from "@/components/Elements/Loading";
import { CardPagination } from "@/components/Elements/Pagination";

const HomePage = ({ sessionData, access_domain }) => {
	const [website, setWebsite] = useState({});

	const [pages, setPages] = useState([]);
	const [loadingContent, setLoadingContent] = useState(false);
	const [open, setOpen] = useState(false);
	const [namePage, setNamePage] = useState("");
	const [idBlog, setIdBlog] = useState("");
	const [loadingNewPage, setLoadingNewPage] = useState(false);

	const handleOpen = () => setOpen(!open);

	useEffect(() => {
		getWebsite(sessionData.user.data.id, sessionData.user.token);
	}, []);

	async function getWebsite(id, token) {
		setLoadingContent(true);
		try {
			const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/website/` + id, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setWebsite(res.data.data);
			getPages(res.data.data.id, token);
		} catch (error) {
			console.log(error);
		}
	}

	const getPages = async (id_website, token) => {
		try {
			const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/page/` + id_website, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setLoadingContent(false);
			setPages(res.data.data);
			setIdBlog(res.data.data[1].id);
		} catch (error) {
			console.log(error);
		}
	};

	const addNewpage = async (e) => {
		setLoadingNewPage(true);
		e.preventDefault();
		try {
			const res = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + `/page`,
				{
					name: namePage,
					path: `/${namePage.toLowerCase()}`,
					idWebsite: website.id,
				},
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			);
		} catch (error) {
			console.log(error);
		}

		window.location.reload();
		setLoadingNewPage(false);
	};

	return (
		<>
			{loadingContent == true ? <LoadingAnimation>Loading...</LoadingAnimation> : ""}
			<Modal open={open} size="xs">
				<Modal.Header>
					<div className="relative w-[100%] h-[100%] mb-2">
						<div>
							<div className="absolute left-0">
								<p>Add New Page</p>
							</div>
							<div className="absolute right-0" onClick={handleOpen}>
								<XMarkIcon className="w-5 h-5 mt-1 cursor-pointer hover:text-[#F24B4B]" />
							</div>
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<hr className="mb-2" />
					<p className="text-sm text-black leading-5 mb-6 mt-4">
						Your page name will be your domain’s prefix address, so try to make it simple
					</p>
					<form onSubmit={addNewpage}>
						<Input
							type="text"
							label="Input Page Name"
							name="name"
							placeholder="Name page..."
							value={namePage}
							onChange={(e) => setNamePage(e.target.value.replace(" ", "-").toLowerCase())}
							className="min-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-md"
						/>
						<p className="text-black mb-4 text-sm">
							{access_domain[0]?.name}.{process.env.NEXT_PUBLIC_DOMAIN_URL}/{namePage}
						</p>
						<Button
							disabled={loadingNewPage}
							type="submit"
							className={`min-w-[100%] px-3 py-2 text-white rounded-md mb-2 mt-2 ${
								loadingNewPage == true ? "bg-[#082691]/50" : "bg-[#082691] hover:bg-[#1e43c7]"
							}`}
						>
							Create
							{loadingNewPage == true && (
								<div
									className="ml-1 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
									role="status"
								>
									<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
										Loading...
									</span>
								</div>
							)}
						</Button>
					</form>
				</Modal.Body>
			</Modal>

			<section className="px-4 pt-16 lg:pt-0">
				<div className="flex justify-between items-center pb-8">
					<div className="inline-block align-middle">
						<p>Post and Blog Management</p>
					</div>
					<div className="flex flex-wrap gap-2 justify-self-end items-center">
						<Button
							type="button"
							className="flex items-center justify-center lg:w-[150px] min-w-[100%] px-3 py-2 text-white bg-[#082691] hover:bg-[#1e43c7] border border-2 border-[#082691] hover:border-[#1e43c7] rounded-lg"
							onClick={handleOpen}
						>
							<PlusCircleIcon className="w-5 h-5 inline-block mr-2" />
							New Page
						</Button>
					</div>
				</div>
				<div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
						{loadingContent == false &&
							pages.map((page, index) => {
								return (
									<Fragment key={index}>
										{page.name != "Blog Detail" && page.name != "Product Detail" ? (
											<>
												<PagesCard>
													<PagesCard.Header
														name_page={page.name}
														path_name={page.path}
														access_domain={access_domain}
														index={index}
														page_id={page.id}
														user_token={sessionData.user.token}
														access_id={access_domain.id}
													/>
													<PagesCard.Images
														statusPublished={page.statusPublished}
														slug={page.slug}
														path_name={page.path}
														access_domain={access_domain}
													/>
													<PagesCard.Footer />
												</PagesCard>
											</>
										) : (
											""
										)}
									</Fragment>
								);
							})}
					</div>
				</div>
			</section>
		</>
	);
};

export default HomePage;
export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

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

		let getAccessDomain;

		if (getWebsite.data.data != null) {
			getAccessDomain = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/access-domain/` + getWebsite.data.data.id,
				{
					headers: {
						Authorization: `Bearer ${session.user.token}`,
					},
				}
			);
		}

		return {
			props: {
				sessionData: session,
				access_domain: getAccessDomain == undefined ? "" : getAccessDomain.data.data,
			},
		};
	}
}
