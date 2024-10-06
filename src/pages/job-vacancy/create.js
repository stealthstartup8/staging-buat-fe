import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import Label from "@/components/Elements/Input/label";
import { useDispatch, useSelector } from "react-redux";
import { handleNewProduct, postJobDetails } from "@store/job-vacancy";
import ValidationPopup from "@/components/Fragments/Popup/job-vacancy";
import { useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import dynamic from "next/dynamic";

const RichTextEditor2 = dynamic(() => import("@/components/Elements/Editor/RichTextEditor2"), {
	ssr: false,
});

const CreateJobVacancy = ({ sessionData, website }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const jobVacancy = useSelector((state) => state.jobVacancySlice.newData);
	const website_id = website.id;
	const token = sessionData.user.token;

	const jobDetails = {
		categoryName: jobVacancy.category,
		name: jobVacancy.name,
		salary: jobVacancy.salary,
		location: jobVacancy.location,
		desc: jobVacancy.description,
		buttonName: jobVacancy.button.name,
		buttonLink: jobVacancy.button.url,
	};

	const handleDescription = (value) => {
		dispatch(
			handleNewProduct({
				...jobVacancy,
				description: value,
			})
		);
	};

	const postJob = (status) => {
		if (jobVacancy.category == "" || jobVacancy.name == "") {
			setOpen(true);
		} else {
			dispatch(
				postJobDetails({
					jobDetails,
					token,
					website_id,
					status: status,
				})
			).then((action) => {
				if (action.type === postJobDetails.fulfilled.type) {
					window.location.href = "/job-vacancy";
				} else {
					alert("Failed to create Job Vacancy");
				}
			});
		}
	};

	return (
		<>
			<ValidationPopup open={open} setOpen={() => setOpen(!open)} />
			<div className="bg-[#FFFFFF] min-h-[100vh] pt-24">
				<div className="container mx-auto">
					<div className="flex lg:justify-end lg:gap-0 gap-2 lg:px-0 px-4">
						<Button
							onClick={() => postJob(false)}
							className="flex-1 lg:flex-none px-8 py-2 bg-[#ffffff] text-[#082691] hover:bg-[#082691] hover:text-white border-2 border-[#082691] rounded-lg lg:mb-4 lg:ml-2"
						>
							Save as Draft
						</Button>
						<Button
							onClick={() => postJob(true)}
							className="flex-1 lg:flex-none px-8 py-2 bg-[#082691] text-white hover:bg-[#1e43c7] border-2 hover:border-[#1e43c7] border-[#082691] rounded-lg lg:mb-4 lg:ml-2"
						>
							Activate Vacancy
						</Button>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:px-0 px-4 lg:mt-0 mt-4 pb-4">
						<div className="flex flex-col gap-4">
							<div>
								<h5 className="font-bold mb-4 text-[16px]">Category/Label/Department</h5>
								<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
									<Input
										value={jobVacancy.category}
										onChange={(e) =>
											dispatch(
												handleNewProduct({
													...jobVacancy,
													category: e.target.value,
												})
											)
										}
										type="text"
										label="Job Category/Label/Department"
										name="category"
										placeholder="Input Category"
										className="w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
									<p className="text-[12px] leading-2 mt-4 text-[#5B5E67]">
										<b>Note:</b> Category in the Career/Job Vacancy is case-sensitive.
										Please ensure you type it correctly.
									</p>
								</div>
							</div>
							<div>
								<h5 className="font-bold mb-4 text-[16px]">Apply Button</h5>
								<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
									<Input
										value={jobVacancy.button.name}
										onChange={(e) =>
											dispatch(
												handleNewProduct({
													...jobVacancy,
													button: {
														...jobVacancy.button,
														name: e.target.value,
													},
												})
											)
										}
										type="text"
										label="Apply Button Name (optional)"
										name="buttonName"
										placeholder="Button Name/Text"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
									<Input
										value={jobVacancy.button.url}
										onChange={(e) =>
											dispatch(
												handleNewProduct({
													...jobVacancy,
													button: {
														...jobVacancy.button,
														url: e.target.value,
													},
												})
											)
										}
										type="text"
										label="Apply Button Link (optional)"
										name="buttonlink"
										placeholder="LinkedIn or any job portal link"
										className="w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4">
							<div>
								<h5 className="font-bold mb-4 text-[16px]">Job Detail</h5>
								<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
									<Input
										value={jobVacancy.name}
										onChange={(e) =>
											dispatch(
												handleNewProduct({
													...jobVacancy,
													name: e.target.value,
												})
											)
										}
										type="text"
										label="Job Name"
										name="jobname"
										placeholder="e.g. Sales"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
									<Input
										value={jobVacancy.salary}
										onChange={(e) =>
											dispatch(
												handleNewProduct({
													...jobVacancy,
													salary: e.target.value,
												})
											)
										}
										type="text"
										label="Salary (optional)"
										name="salary"
										placeholder="e.g. USD 100 or HKD 100/ Month"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
									<Input
										value={jobVacancy.location}
										onChange={(e) =>
											dispatch(
												handleNewProduct({
													...jobVacancy,
													location: e.target.value,
												})
											)
										}
										type="text"
										label="Location (optional)"
										name="location"
										placeholder="e.g. Jakarta, Indonesia"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
									<div>
										<div className="mt-0 ">
											<Label>Short Job Description (optional)</Label>
											<RichTextEditor2
												value={jobVacancy.description}
												onChange={handleDescription}
											
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4 lg:pt-10">
							<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
								<p>Status Product</p>
								<p className="font-bold">{jobVacancy.status == false ? "Draft" : "Active"}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateJobVacancy;
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
