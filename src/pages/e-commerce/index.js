import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataById, fetchAllData, fetchCategory } from "@store/e-commerce";
import { getSession } from "next-auth/react";
import axios from "axios";
import DeletePopup from "@/components/Fragments/Popup/delete";
import Select from "react-select";
import { COMMERCE_STORAGE_DIR } from "@/utils/constants/Storage";

const ECommerce = ({ sessionData, website }) => {
	const dispatch = useDispatch();
	const [filter, setFilter] = useState(1);
	const [value, setValue] = useState("");
	const [search, setSearch] = useState("");
	const [id, setId] = useState("");
	const [deleteOpen, setDeleteOpen] = useState(false);
	const website_id = website.id;
	const token = sessionData.user.token;

	useEffect(() => {
		dispatch(fetchAllData({ website_id, token }));
		dispatch(fetchCategory({ website_id, token }));
	}, []);

	const commerce_datas = useSelector((state) => state.eCommerceSlice.commerce_data);
	const category_datas = useSelector((state) => state.eCommerceSlice.category_data);
	const options = category_datas?.map((item) => {
		return {
			value: item.name,
			label: item.name,
		};
	});
	const filterOption = [
		{ id: 1, label: "All" },
		{ id: 2, label: "Active" },
		{ id: 3, label: "Draft" },
	];

	return (
		<>
			<DeletePopup
				open={deleteOpen}
				setOpen={() => setDeleteOpen(!deleteOpen)}
				onClick={() => {
					dispatch(deleteDataById({ id: id, token: token })).then((action) => {
						if (action.type === deleteDataById.fulfilled.type) {
							window.location.href = "/e-commerce";
						} else {
							alert("Failed to delete Commerce");
						}
					});
					window.location.href = "/e-commerce";
				}}
			/>
			<div className="px-4 pt-16 lg:pt-0">
				<section>
					<div className="lg:flex justify-between items-center mb-4">
						<div className="inline-block align-middle">
							<p>Upload Product and Setting</p>
						</div>
						<div className="flex flex-wrap gap-2 justify-self-end lg:mt-0 mt-4">
							<Link
								href="/e-commerce/create"
								className="w-[100%] flex justify-center items-center px-8 py-2 bg-[#082691] text-white hover:bg-[#1e43c7] border-2 hover:border-[#1e43c7] border-[#082691] rounded-lg ml-1"
							>
								<PlusCircleIcon className="w-5 h-5 inline-block mr-2 lg:mt-[-3px]" />
								Add Product
							</Link>
						</div>
					</div>
					<div className="mb-2 lg:mt-0 mt-4">
						<Input
							onChange={(e) => {
								setFilter(1);
								setSearch(e.target.value);
							}}
							value={search}
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
						{category_datas && (
							<div className="lg:min-w-[280px] lg:mt-0 mt-8">
								<Select
									isSearchable={true}
									placeholder={`Show all Categories (${category_datas.length})`}
									isClearable={true}
									options={options}
									onChange={(val) => {
										setValue(val == null ? "" : val.value);
									}}
									value={options.find((obj) => obj.value === value)}
								/>
							</div>
						)}
					</div>
				</section>

				<section className="lg:grid lg:grid-cols-4 md:grid-cols-2 gap-4 pb-4 mt-8 ">
					{commerce_datas
						?.filter((item) => {
							if (filter == 1) {
								if (search == "" && value == "") {
									return item;
								} else if (search != "") {
									return item.name.toLowerCase().includes(search.toLowerCase());
									// item.categories.name.toLowerCase().includes(search.toLowerCase())
								} else if (value != "") {
									return item.categories.map((item) => item.category.name).includes(value);
								}
							} else if (filter == 2) {
								return item.status == true;
							} else if (filter == 3) {
								return item.status == false;
							}
						})
						?.map((item, index) => (
							<div
								key={index}
								className="aspect-[3/4] w-[100%] md:w-100 border border-[#DBDBDB] px-4 py-6 space-y-2 "
							>
								<div className="aspect-square w-full">
									{item.image != "" ? (
										<img
											src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${website.bucketAccess}/${COMMERCE_STORAGE_DIR}/${item.image}`}
											alt="image"
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="bg-[#DBDBDB] w-full h-full"></div>
									)}
								</div>
								<h6 className="font-bold text-[16px] break-words">{item.name}</h6>
								<p className="text-[12px] text-[#939393]">
									{item.categories.map((item) => item.category.name).join(", ")}
								</p>
								<hr className="bg-[#DBDBDB]" />
								{item.discount != "" ? (
									<div>
										<p className="text-[14px] -mb-2 text-[#F24B4B] line-through">
											{item.price}
										</p>
										<p className="text-[24px]">{item.discount}</p>
									</div>
								) : (
									<div>
										<p className="text-[24px]">{item.price}</p>
									</div>
								)}
								<hr className="bg-[#DBDBDB]" />
								<div className="p-0 pt-2 flex justify-left gap-4">
									<Link
										href={`/e-commerce/detail/${item.slug}`}
										className="flex flex-wrap items-center justify-center text-[14px] font-bold hover:text-[#082691] cursor-pointer"
									>
										<PencilSquareIcon className="w-5 h-5 mx-1" />
										Edit
									</Link>
									<div
										onClick={() => {
											setId(item.id);
											setDeleteOpen(!deleteOpen);
										}}
										className="flex flex-wrap items-center justify-center text-[14px] font-bold hover:text-[#F24B4B] cursor-pointer"
									>
										<TrashIcon className="w-5 h-5 mx-1" />
										Delete
									</div>
								</div>
							</div>
						))}
				</section>
				{/* <CardPagination /> */}
			</div>
		</>
	);
};

export default ECommerce;
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
