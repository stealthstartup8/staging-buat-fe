import DataTable from "react-data-table-component";
import { useState, useEffect, Fragment } from "react";
import Button from "@/components/Elements/Button";
import {
	EllipsisHorizontalCircleIcon,
	PencilSquareIcon,
	PlusCircleIcon,
	QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Select, Option } from "@material-tailwind/react";
import { DetailsFormPopUp } from "@/components/Fragments/Popup/Forms/details";
import { CreateFormPopup } from "@/components/Fragments/Popup/Forms/create";
import { getSession } from "next-auth/react";
import axios from "axios";
import { EditFormPopup } from "@/components/Fragments/Popup/Forms/edit";
import { useDispatch } from "react-redux";
import { fetchFormComponent, handleChangeBody, handleDropdown } from "@store/forms";
import { XMarkIcon } from "@heroicons/react/24/solid";

const FormPages = ({ sessionData, website, category }) => {
	const dispatch = useDispatch();
	const [openFormDetail, setOpenFormDetail] = useState(false);
	const [openFormCreate, setOpenFormCreate] = useState(false);
	const [openFormEdit, setOpenFormEdit] = useState(false);
	const [value, setValue] = useState(category[0]?.id);
	const [tableHeader, setTableHeader] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [selectedBody, setSelectedBody] = useState("");
	const [showTooltip, setShowTooltip] = useState(false);

	useEffect(() => {
		const fetchAndMapData = async () => {
			try {
				await fetchData();
				await fetchDataAnswer();
				headerMapping();
				bodyMapping();
			} catch (error) {
				console.error("Error during data fetch and mapping:", error);
			}
		};

		fetchAndMapData();
	}, [value, openFormEdit]);

	const formatDateTime = (dateString) => {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
		const year = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${day}/${month}/${year} ${hours}:${minutes}`;
	};

	const HandleOpenModal = (id) => {
		return (
			<EllipsisHorizontalCircleIcon
				className="h-5 w-5 mt-[2px] ml-1 hover:scale-110 hover:text-[#082691] cursor-pointer"
				onClick={() => {
					setSelectedBody(id.id);
					setOpenFormDetail(true);
				}}
			/>
		);
	};

	const tableCustomStyles = {
		headCells: {
			style: {
				fontSize: "14px",
				fontWeight: "bold",
			},
		},
	};

	const headerMapping = () => {
		const columns = tableHeader.slice(0, 5).map((item) => ({
			id: item.id,
			name: item.label,
			selector: (row) => row[item.name.replace(/\s+/g, "")],
			sortable: true,
		}));

		columns.push({
			name: "More",
			selector: (row) => row.more,
			sortable: true,
		});

		columns.unshift({
			name: "Submit Date",
			selector: (row) => row.submitDate,
			sortable: true,
		});

		return columns;
	};

	const bodyMapping = () => {
		return tableData.map((item) => {
			let mappedItem = {};
			for (let key in item.answer.answers) {
				if (item.answer.answers.hasOwnProperty(key)) {
					mappedItem[key] = item.answer.answers[key];
				}
			}

			mappedItem.submitDate = formatDateTime(item.createdAt);
			mappedItem.more = <HandleOpenModal id={item.id} />;
			return mappedItem;
		});
	};

	const data = bodyMapping();
	const coloumns = headerMapping();

	const fetchData = async () => {
		try {
			const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/form/get-by-category/${value}`, {
				headers: {
					Authorization: `Bearer ${sessionData.user.token}`,
				},
			});

			const response = res.data.data;

			dispatch(
				handleChangeBody({
					id: response.id,
					name: response.name,
					successAlert: response.successAlert,
					failAlert: response.failAlert,
					form_component:
						response.form.length >= 1
							? []
							: [
									{
										id: null,
										name: "",
										input_type: "text",
										desc: "",
										option: [],
									},
							  ],
				})
			);

			response.form?.map((item, index) => {
				dispatch(
					fetchFormComponent({
						id: item.id,
						name: item.label,
						input_type: item.type,
						desc: item.placeholder,
						option: [],
					})
				);

				if (item.option_form.length >= 1) {
					item.option_form?.map((option) => {
						dispatch(
							handleDropdown({
								index: index,
								id: option.id,
								value: option.value,
							})
						);
					});
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	const fetchDataAnswer = async () => {
		try {
			const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/form/get-response/${value}`, {
				headers: {
					Authorization: `Bearer ${sessionData.user.token}`,
				},
			});
			console.log("res", res.data.data);
			setTableHeader(res.data.data.form);
			setTableData(res.data.data.response_form);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="px-4 pt-16 lg:pt-0">
				<div className="inline-block align-middle flex">
					<p>Form Data</p>
					<div
						onMouseEnter={() => {
							console.log(showTooltip ? "kontil" : "kontol");
							setShowTooltip(true);
						}}
						onMouseLeave={() => {
							console.log(showTooltip ? "kontil" : "kontol");
							setShowTooltip(false);
						}}
						className="relative"
					>
						<QuestionMarkCircleIcon className="h-5 w-5 mt-[2px] ml-1 hover:text-[#c21807] "></QuestionMarkCircleIcon>
						{showTooltip && (
							<div className="bg-white p-4 rounded-lg absolute top-0 left-[105%] border border-black w-80 z-10 text-sm text-justify">
								<h2 className="font-bold">Form data</h2>
								<p>
									You can collect visitors' submitted data by adding a form section to your
									website page.
								</p>
								<ol className="list-decimal ml-6">
									<li>Create your form with fields or questions.</li>
									<li>
										Go to the website editor, then drag and drop a{" "}
										<span className="font-bold">form</span> section.
									</li>
								</ol>
							</div>
						)}
					</div>
				</div>
			</div>

			<DetailsFormPopUp
				open={openFormDetail}
				handle={() => setOpenFormDetail(false)}
				selectedBody={selectedBody}
				tableData={tableData}
				tableHeader={tableHeader}
				user_token={sessionData.user.token}
				website_id={website.id}
			/>
			<CreateFormPopup
				open={openFormCreate}
				handle={() => setOpenFormCreate(false)}
				website={website}
				sessionData={sessionData}
			/>
			<EditFormPopup
				open={openFormEdit}
				handle={() => setOpenFormEdit(false)}
				website={website}
				sessionData={sessionData}
				category_id={value}
			/>

			<div className="width-sidebar px-4 mt-8">
				<div className="lg:flex items-center justify-between relative">
					<div className="lg:w-72">
						<Select label="Select Category" value={value} onChange={(val) => setValue(val)}>
							{category.map((item, index) => (
								<Option key={index} value={item.id}>
									{item.name}
								</Option>
							))}
						</Select>
					</div>
					<div className="flex lg:flex-col gap-2 lg:absolute lg:right-0 lg:-mt-8 mt-4">
						<Button
							type="button"
							onClick={() => {
								setOpenFormCreate(true);
								dispatch(
									handleChangeBody({
										name: "",
										successAlert: "",
										failAlert: "",
										form_component: [
											{
												id: null,
												name: "",
												input_type: "text",
												desc: "",
												option: [],
											},
										],
									})
								);
							}}
							className="flex justify-center lg:min-w-[100px] min-w-[48%] px-3 py-2 bg-[#082691] border border-1 border-[#082691] text-[#ffffff] hover:bg-[#0a34c9] rounded-lg"
						>
							<PlusCircleIcon className="h-5 w-5 mt-[2px] mr-1" />
							Create Form
						</Button>
						<Button
							onClick={() => {
								setOpenFormEdit(true);
							}}
							type="button"
							className="flex justify-center lg:min-w-[48%] min-w-[50%] px-3 py-2 bg-[#ffffff] border border-1 border-[#082691] text-[#082691] hover:bg-gray-100 rounded-lg"
						>
							<PencilSquareIcon className="h-5 w-5 mt-[2px] mr-1" />
							Edit
						</Button>
					</div>
				</div>
				<DataTable
					className="mt-8 rounded-xl"
					customStyles={tableCustomStyles}
					columns={coloumns}
					data={data}
					pagination={true}
					paginationPerPage={5}
					paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
					paginationComponentOptions={{ rowsPerPageText: "Rows per page:" }}
				></DataTable>
			</div>
		</>
	);
};

export default FormPages;
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

		const getCategory = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY + `/category-form/get-by-web/${getWebsite.data.data.id}`,
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
				category: getCategory.data.data,
			},
		};
	}
}
