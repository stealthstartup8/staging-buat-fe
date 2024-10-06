import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import PostsCard from "@/components/Fragments/Card/postsCard";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllData, fetchLabel } from "@store/blog";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostsPage = ({ sessionData, website, domain, slug }) => {
	const filterOption = [
		{ id: 1, label: "All" },
		{ id: 2, label: "This Week" },
		{ id: 3, label: "Draft" },
		{ id: 4, label: "Published" },
	];
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			fetchAllData({
				website_id: website.id,
				token: sessionData.user.token,
				bucketAccess: website.bucketAccess,
			})
		);
		dispatch(fetchLabel({ website_id: website.id, token: sessionData.user.token }));
	}, []);
	const blog_data = useSelector((state) => state.blogSlice.blog_data);
	const label_data = useSelector((state) => state.blogSlice.label_data);
	const fetchStatus = useSelector((state) => state.blogSlice.fetchStatus);
	const router = useRouter();
	const [mainFilter, setMainFilter] = useState(1);
	const [labelFilter, setLabelFilter] = useState("");
	const [searchFilter, setSearchFilter] = useState("");
	const [value, setValue] = useState("");

	const options = label_data?.map((item) => {
		return {
			value: item.name,
			label: item.name,
		};
	});

	const Card = ({ blog }) => {
		return (
			<>
				<PostsCard key={blog.id}>
					<PostsCard.Images thumbnail={blog.thumbnail} website={website} />
					<PostsCard.Header labels={blog.labels} />
					<PostsCard.Body title={blog.title} content={blog.content} />
					<PostsCard.Footer
						date_publish={blog.publishDate}
						view={blog.view}
						id={blog.id}
						user_token={sessionData.user.token}
						domain={domain}
						slug={blog.slug}
					/>
				</PostsCard>
			</>
		);
	};

	const handleRemoveLocalStorage = (e) => {
		e.preventDefault();
		localStorage.setItem("first-render", "true");
		window.location.href = "/pages-detail/blog-and-product/" + slug;
	};

	return (
		<>
			<ToastContainer />

			<section className="px-4 pt-16 lg:pt-0">
				<div className="lg:flex justify-between items-center pb-8">
					<div className="inline-block align-middle">
						<p>Post and Blog Management</p>
					</div>
					<div className="lg:mt-0 mt-4 flex flex-wrap gap-2 lg:justify-self-end items-center">
						<Button
							onClick={handleRemoveLocalStorage}
							className="flex items-center px-6 py-2 bg-[#ffffff] text-[#082691]  border-2 border-[#082691] hover:bg-[#082691] hover:text-[#ffffff] rounded-lg mr-1"
						>
							<PencilSquareIcon className="w-5 h-5 inline-block mr-2 mt-[-3px]" />
							<span id="post-btn-desktop">Adjust Blog Page</span>
							<span id="post-btn-mobile">Blog Page</span>
						</Button>
						<Button
							onClick={(e) => router.push("/blog/create")}
							className="flex-1 px-6 py-2 bg-[#082691] text-white hover:bg-[#1e43c7] border-2 hover:border-[#1e43c7] border-[#082691] rounded-lg ml-1"
						>
							<PlusCircleIcon className="w-5 h-5 inline-block mr-2 mt-[-3px]" />
							Write Blog
						</Button>
					</div>
				</div>

				<div className="mb-2">
					<Input
						value={searchFilter}
						onChange={(e) => {
							setLabelFilter("");
							setMainFilter(1);
							setSearchFilter(e.target.value);
						}}
						type="text"
						label="Search"
						name="search"
						placeholder="Label or Title"
						className="w-[100%] lg:w-[312px] px-3 py-2 border-2 border-gray-200 rounded-md mb-4"
					/>
				</div>

				<div className="lg:flex gap-2 mb-2 items-center justify-between">
					<div className="flex gap-2">
						<p className="font-bold ">
							Filter <span className="text-[#DADADA] ml-1 mr-1 font-light">| </span>
						</p>
						{filterOption.map((item, index) => {
							return (
								<Fragment key={index}>
									<Button
										onClick={() => setMainFilter(item.id)}
										className={`px-4 py-2 border border-[#082691] ${
											mainFilter == item.id
												? "text-[#ffffff] bg-[#082691]"
												: "text-[#082691] bg-[#ffffff]"
										} rounded-md text-[12px]`}
									>
										{item.label}
									</Button>
								</Fragment>
							);
						})}
					</div>
					{label_data && (
						<div className="lg:min-w-[280px] lg:mt-0 mt-8">
							<Select
								isSearchable={true}
								placeholder={`Show all Categories (${label_data.length})`}
								isClearable={true}
								options={options}
								onChange={(val) => {
									setMainFilter(1);
									setSearchFilter("");
									setLabelFilter(val == null ? "" : val.value);
								}}
								value={options.find((obj) => obj.value === value)}
							/>
						</div>
					)}
				</div>

				<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 pr-2 mt-4 pb-4">
					{fetchStatus == "succeeded" && (
						<>
							{blog_data
								.filter((blog) => {
									if (mainFilter == 1) {
										if (labelFilter != "") {
											return blog.labels.some(
												(label) => label.label_tags.name == labelFilter
											);
										} else if (searchFilter != "") {
											return (
												blog.title
													.toLowerCase()
													.includes(searchFilter.toLowerCase()) ||
												blog.labels.some(
													(label) => label.label_tags.name == searchFilter
												)
											);
										}
										return blog;
									}
									if (mainFilter == 2) {
										const date = new Date();
										const week = new Date(date.setDate(date.getDate() - 7));
										return new Date(blog.publishDate) > week;
									}
									if (mainFilter == 3) return blog.publishStatus == false;
									if (mainFilter == 4) return blog; //popup calendar
									if (mainFilter == 5) return blog.publishStatus == true;
								})
								.map((blog) => Card({ blog }))}
						</>
					)}
				</div>
			</section>
		</>
	);
};

export default PostsPage;
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

		const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/page/` + getWebsite.data.data.id, {
			headers: {
				Authorization: `Bearer ${session.user.token}`,
			},
		});

		const getDomain = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY + `/access-domain/` + getWebsite.data.data.id,
			{
				headers: {
					Authorization: `Bearer ${session.user.token}`,
				},
			}
		);

		return {
			props: {
				sessionData: session,
				website: getWebsite.data.data,
				domain: getDomain.data.data,
				slug: res.data.data[1].slug,
			},
		};
	}
}
