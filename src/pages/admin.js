import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import Button from "@/components/Elements/Button";

const AdminPages = () => {
	const [coloumn, setColoumn] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		setColoumn(coloumns);
		setData(datas);
	}, []);

	const tableCustomStyles = {
		headCells: {
			style: {
				fontSize: "14px",
				// fontWeight: "bold",
				backgroundColor: "#082691",
				color: "#ffffff",
			},
		},
	};

	const coloumns = [
		{
			name: "Register Date",
			selector: "registerDate",
			sortable: true,
		},
		{
			name: "Admin Email",
			selector: "adminEmail",
			sortable: true,
		},
		{
			name: "Amount of Websites",
			selector: "amountOfWebsites",
			sortable: true,
		},
		{
			name: "Role",
			selector: "role",
			sortable: true,
		},
		{
			name: "Detail",
			selector: "detail",
			sortable: true,
		},
	];

	const datas = [
		{
			id: 1,
			registerDate: "2021-09-09",
			adminEmail: "Alex@varnion.com",
			amountOfWebsites: "7",
			role: "Super Admin",
			detail: (
				<Button
					type="button"
					className="min-w-[100%] px-3 py-2 bg-[#ffffff] border border-1 border-[#082691] text-[#082691] hover:bg-gray-200 rounded-lg"
				>
					Detail
				</Button>
			),
		},
		{
			id: 1,
			registerDate: "2021-01-20",
			adminEmail: "Rifdo@varnion.com",
			amountOfWebsites: "7",
			role: "Admin",
			detail: (
				<Button
					type="button"
					className="min-w-[100%] px-3 py-2 bg-[#ffffff] border border-1 border-[#082691] text-[#082691] hover:bg-gray-200 rounded-lg"
				>
					Detail
				</Button>
			),
		},
	];
	return (
		<>
			<div className="width-sidebar p-4">
				<DataTable
					className="border-t-2 border-t-[#082691] border-b-2 border-b-[#082691] mt-4"
					customStyles={tableCustomStyles}
					columns={coloumn}
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

export default AdminPages;
