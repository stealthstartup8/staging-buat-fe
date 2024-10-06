import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import {
	CursorArrowRaysIcon,
	MagnifyingGlassCircleIcon,
	PencilSquareIcon,
	PlusCircleIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import Select from "react-select";
import axios from "axios";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataById, fetchCategories, fetchData, reset } from "@store/pricing";
import { useRouter } from "next/router";
import DeletePopup from "@/components/Fragments/Popup/delete";
import { usePathname, useSearchParams } from "next/navigation";
import paramsChecker from "@/utils/helpers/paramsChecker";
import { CardPagination } from "@/components/Elements/Pagination";
import { createQueryString } from "@/utils/helpers/CreateQuery";

const Pricing = ({ sessionData, website }) => {
	paramsChecker({ page: 1, pageSize: 8 });
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const createQuery = createQueryString(searchParams);

	const page = searchParams.get("page");
	const pageSize = searchParams.get("pageSize");
	const paramSearch = searchParams.get("search");
	const category = searchParams.get("category");

	const dispatch = useDispatch();
	const [filter, setFilter] = useState(1);
	const [value, setValue] = useState(category);
	const [search, setSearch] = useState(paramSearch);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [id, setId] = useState(null);
	const website_id = website.id;
	const token = sessionData.user.token;

	const filterOption = [
		{ id: 1, label: "All" },
		{ id: 2, label: "Active" },
		{ id: 3, label: "Draft" },
	];

	const slices = useSelector((state) => state.pricingSlice);
	const pricing_data = slices?.pricing_datas;
	const pagination_data = slices?.pagination;

	const category_list = useSelector((state) => state.pricingSlice.category_data);
	const options = category_list?.map((item) => {
		return {
			value: item.name,
			label: item.name,
		};
	});

	useEffect(() => {
		dispatch(
			fetchCategories({
				website_id,
				token,
			})
		);
		dispatch(
			fetchData({
				website_id,
				token,
				page: page == null ? 1 : page,
				pageSize: pageSize == null ? 4 : pageSize,
				search: paramSearch,
				category: category,
			})
		);
	}, [searchParams]);

	function HtmlContent({ htmlString }) {
		return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
	}

	const removeParams = (key) => {
		const url = new URL(window.location.href);
		const searchParams = new URLSearchParams(url.search);
		searchParams.delete(key);
		const newUrl = `${url.pathname}?${searchParams.toString()}`;
		router.push(newUrl);
	};

	return (
		<>
			<DeletePopup
				open={deleteOpen}
				setOpen={() => setDeleteOpen(!deleteOpen)}
				onClick={() => {
					dispatch(deleteDataById({ id: id, token: token })).then((action) => {
						if (action.type === deleteDataById.fulfilled.type) {
							window.location.href = "/pricing";
						} else {
							alert("Failed to delete Pricing");
						}
					});
					window.location.href = "/pricing";
				}}
			/>
			<div className="px-4 pt-16 lg:pt-0">
				<section>
					<div className="lg:flex justify-between items-center mb-4">
						<div className="inline-block align-middle">
							<p>Add Pricing and Setting</p>
						</div>
						<div className="flex flex-wrap gap-2 justify-self-end lg:mt-0 mt-4">
							<Link
								href="/pricing/create"
								className="w-[100%] flex justify-center items-center px-8 py-2 bg-[#082691] text-white hover:bg-[#1e43c7] border-2 hover:border-[#1e43c7] border-[#082691] rounded-lg ml-1"
							>
								<PlusCircleIcon className="w-5 h-5 inline-block mr-2 lg:mt-[-3px]" />
								Add Pricing
							</Link>
						</div>
					</div>
					<div className="mb-4 flex items-end">
						<div>
							<Input
								onChange={(e) => {
									setFilter(1);
									setSearch(e.target.value);
									if (e.target.value == "") {
										removeParams("search");
									}
								}}
								value={search}
								type="text"
								label="Search"
								name="search"
								placeholder="Title"
								className="w-[100%] lg:w-[312px] px-3 py-2 border-2 border-gray-200 rounded-md"
							/>
						</div>
						<Button
							onClick={() => {
								router.push(pathname + "?" + createQuery("search", search));
							}}
							className="ml-2 px-3 py-2 bg-[#082691] text-white mb-[2px] rounded-md hover:bg-[#1e43c7]"
						>
							<MagnifyingGlassCircleIcon className="w-6 h-6" />
						</Button>
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
											onClick={() => setFilter(item.id)}
											className={`flex-1 px-4 py-2 border border-[#082691] ${
												filter == item.id
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
						{category_list && (
							<div className="lg:min-w-[280px] lg:mt-0 mt-8">
								<Select
									isSearchable={true}
									placeholder={`Show all Categories (${category_list.length})`}
									isClearable={true}
									options={options}
									value={options.find((obj) => obj.value === value)}
									onChange={(val) => {
										setValue(val == null ? "" : val.value);
										if (val == null) {
											removeParams("category");
										} else {
											router.push(
												pathname +
													"?" +
													createQuery("category", val == null ? "" : val.value)
											);
										}
									}}
								/>
							</div>
						)}
					</div>
				</section>

				<section className="lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 gap-4 pb-4 mt-8">
					{pricing_data != "" ? (
						pricing_data
							?.filter((item) => {
								if (filter == 1) {
									return item;
								} else if (filter == 2) {
									return item.status == true;
								} else if (filter == 3) {
									return item.status == false;
								}
							})
							?.map((item, index) => (
								<div
									key={index}
									className="relative w-100 border border-[#DBDBDB] px-4 py-6 space-y-1 pb-28"
								>
									<div
										className={`h-[78px] w-full mb-2 ${
											item.image == "" && "bg-gray-300"
										}`}
									>
										{item.image && (
											<img
												src={`https://storage.googleapis.com/${website.bucketAccess}/pricing-assets/${item.image}`}
												alt="image"
												className="w-full h-full object-cover"
											/>
										)}
									</div>
									<div className="flex gap-1">
										{item.categories.map((category, index) => (
											<p className="font-bold text-[14px]" key={index}>
												{category.category.name}
											</p>
										))}
									</div>
									<h2 className="text-[24px] font-bold">{item.name}</h2>
									<div className="flex gap-2">
										{item.diskon != "" ? (
											<>
												<p className="line-through text-[#F24B4B] ">{item.price}</p>
												<p>{item.diskon}</p>
											</>
										) : (
											<p>{item.price}</p>
										)}
									</div>
									<hr className="bg-[#DBDBDB]" />
									<div className="text-[14px] line-clamp-4">
										<HtmlContent htmlString={item.desc} />
									</div>
									<div className="absolute w-[100%] px-4 -mx-4 bottom-2">
										<div className="space-y-2 w-full">
											<hr className="bg-[#DBDBDB]" />
											<button className="w-full py-3 flex justify-center font-bold bg-black text-white rounded-lg">
												{item.buttonName}
											</button>
										</div>
										<div className="p-0 pt-2 flex justify-between">
											<div className="flex flex-wrap justify-center items-center text-[14px] font-bold">
												<CursorArrowRaysIcon className="w-5 h-5 mx-1" />
												16
											</div>
											<Link
												href={`/pricing/detail/${item.slug}`}
												className="flex flex-wrap items-center justify-center text-[14px] font-bold hover:text-[#082691] cursor-pointer"
											>
												<PencilSquareIcon className="w-5 h-5 mx-1" />
												Edit
											</Link>
											<div
												onClick={() => {
													setDeleteOpen(true);
													setId(item.id);
												}}
												className="flex flex-wrap items-center justify-center text-[14px] font-bold hover:text-[#F24B4B] cursor-pointer"
											>
												<TrashIcon className="w-5 h-5 mx-1" />
												Delete
											</div>
										</div>
									</div>
								</div>
							))
					) : (
						<div className="width-sidebar flex justify-center items-center h-[20vh]">
							<p>Data Not Found</p>
						</div>
					)}
				</section>
				{pricing_data != "" && <CardPagination pagination_data={pagination_data} />}
			</div>
		</>
	);
};

export default Pricing;
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

		return {
			props: {
				sessionData: session,
				website: getWebsite.data.data,
			},
		};
	}
}
