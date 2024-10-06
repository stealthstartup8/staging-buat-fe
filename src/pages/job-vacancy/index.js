import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import {
	CursorArrowRaysIcon,
	PencilSquareIcon,
	PlusCircleIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import { Card, CardBody, CardFooter, Option, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataById, fetchAllCareerData, fetchCategory } from "@store/job-vacancy";
import { getSession } from "next-auth/react";
import axios from "axios";
import DeletePopup from "@/components/Fragments/Popup/delete";
import Select from "react-select";

const JobVacancy = ({ sessionData, website }) => {
	const dispatch = useDispatch();
	const [filter, setFilter] = useState(1);
	const [value, setValue] = useState("");
	const [search, setSearch] = useState("");
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [id, setId] = useState(null);
	const website_id = website.id;
	const token = sessionData.user.token;

	const filterOption = [
		{ id: 1, label: "All" },
		{ id: 2, label: "Active" },
		{ id: 3, label: "Draft" },
	];

	const career_data = useSelector((state) => state.jobVacancySlice.career_data);
	const category = useSelector((state) => state.jobVacancySlice.category_data);
	const options = category?.map((item) => {
		return {
			value: item.name,
			label: item.name,
		};
	});

	useEffect(() => {
		dispatch(fetchAllCareerData({ website_id, token }));
		dispatch(fetchCategory({ website_id, token }));
	}, []);

	function HtmlContent({ htmlString }) {
		return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
	}

	return (
		<>
			<DeletePopup
				open={deleteOpen}
				setOpen={() => setDeleteOpen(!deleteOpen)}
				onClick={() => {
					dispatch(deleteDataById({ id: id, token: token })).then((action) => {
						if (action.type === deleteDataById.fulfilled.type) {
							window.location.href = "/job-vacancy";
						}
					});
				}}
			/>
			<div className="px-4 pt-16 lg:pt-0">
				<section>
					<div className="lg:flex justify-between items-center lg:mt-0 mt-2 mb-4">
						<div className="inline-block align-middle">
							<p>Add Job Vacancy and Setting</p>
						</div>
						<div className="flex flex-wrap gap-2 justify-self-end lg:mt-0 mt-2">
							<Link
								href="/job-vacancy/create"
								className="flex justify-center items-center w-[100%] px-8 py-2 bg-[#082691] text-white hover:bg-[#1e43c7] border-2 hover:border-[#1e43c7] border-[#082691] rounded-lg"
							>
								<PlusCircleIcon className="w-5 h-5 inline-block mr-2 mt-[-3px]" />
								Add Job Vacancy
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
							placeholder="Search by Title or Location"
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
											onClick={() => {
												setFilter(item.id);
												setSearch("");
												setValue("");
											}}
											key={item.id}
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
						{category && (
							<div className="lg:min-w-[280px] lg:mt-0 mt-8">
								<Select
									isSearchable={true}
									placeholder={`Show all Categories (${category.length})`}
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

				<section className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 pb-2 mt-8">
					{career_data
						?.filter((item) => {
							if (filter == 1) {
								if (search == "" && value == "") {
									return item;
								} else if (search != "") {
									return (
										item.name.toLowerCase().includes(search.toLowerCase()) ||
										item.location.toLowerCase().includes(search.toLowerCase())
									);
								} else if (value != "") {
									return item.categories.name == value;
								}
							} else if (filter == 2) {
								return item.status == true;
							} else if (filter == 3) {
								return item.status == false;
							}
						})
						?.map((item, index) => (
							<Fragment key={index}>
								<Card
									key={index}
									className="relative w-[100%] h-fit text-black border-[1px] border-[#B5B5B5] shadow-none p-4 pb-16"
								>
									<CardBody className="p-0">
										<Typography
											variant="h5"
											color="blue-gray"
											className="mb-2 break-words "
										>
											{item.name}
										</Typography>
										<div className="mb-4">
											<p className="text-[12px] font-bold">
												Location : {item.location}
											</p>
											<p className="text-[12px] font-bold">Salary: {item.salary}</p>
											<span className="mt-4 text-[12px] text-[#939393]">
												{item.categories.name}
											</span>
										</div>
										<div className="line-clamp-2 text-[14px]">
											<HtmlContent htmlString={item.desc} />
										</div>
									</CardBody>
									<CardFooter className="p-0 absolute bottom-0 w-[100%] left-0">
										<div className="flex justify-between p-4">
											<div className="flex flex-wrap justify-center items-center text-[14px] font-bold">
												<CursorArrowRaysIcon className="w-5 h-5 mx-1" />
												16
											</div>
											<Link
												href={`/job-vacancy/detail/${item.slug}`}
												className="flex flex-wrap items-center justify-center text-[14px] font-bold hover:text-[#082691] cursor-pointer"
											>
												<PencilSquareIcon className="w-5 h-5 mx-1" />
												Edit
											</Link>
											<Button
												onClick={() => {
													setId(item.id);
													setDeleteOpen(!deleteOpen);
												}}
												className="flex flex-wrap items-center justify-center text-[14px] font-bold hover:text-[#F24B4B] cursor-pointer"
											>
												<TrashIcon className="w-5 h-5 mx-1" />
												Delete
											</Button>
										</div>
									</CardFooter>
								</Card>
							</Fragment>
						))}
				</section>
				{/* <CardPagination /> */}
			</div>
		</>
	);
};

export default JobVacancy;
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
