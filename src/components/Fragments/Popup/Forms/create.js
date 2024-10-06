import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import Label from "@/components/Elements/Input/label";
import Modal from "@/components/Elements/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { List, ListItem, ListItemPrefix, Radio, Typography } from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	handleAddFormComponent,
	handleChangeBody,
	handleDeleteFormComponent,
	handleDropdown,
	handleFormComponent,
	handleRemoveDropdownItem,
} from "@store/forms";
import axios from "axios";
import { useRouter } from "next/router";
import CamelCaseConverter from "@/utils/helpers/CamelCaseConverter";

export const CreateFormPopup = ({ open, handle, website, sessionData }) => {
	const router = useRouter();
	const [inputValue, setInputValue] = useState("");
	const [selected, setSelected] = useState(0);

	const body = useSelector((state) => state.formSlice.body);
	const dispatch = useDispatch();

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && e.target.value.trim()) {
			dispatch(
				handleDropdown({
					index: selected,
					id: null,
					value: e.target.value.trim(),
				})
			);
			setInputValue("");
		} else if (
			e.key === "Backspace" &&
			body.form_component[selected].option.length > 0 &&
			inputValue === ""
		) {
			dispatch(
				handleRemoveDropdownItem({
					index: selected,
					optionIndex: body.form_component[selected].option.length - 1,
				})
			);
		}
	};

	const handleRemoveItem = (index) => {
		dispatch(handleRemoveDropdownItem({ index: selected, optionIndex: index }));
	};

	const inputList = [
		{
			name: "Text",
			value: "text",
		},
		{
			name: "Text Area",
			value: "textarea",
		},
		{
			name: "Dropdown",
			value: "dropdown",
		},
		{
			name: "Images",
			value: "images",
		},
		{
			name: "Document",
			value: "document",
		},
	];

	const handlePostForm = async () => {
		try {
			const res = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + `/form/category-form`,
				{
					idWebsite: website.id,
					name: body.name,
					successAlert: body.successAlert,
					failAlert: body.failAlert,
				},
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			);

			// post form component
			var categoryId = res.data.data.id;
			const formComponentPromises = body.form_component.map(async (item) => {
				try {
					const res = await axios.post(
						process.env.NEXT_PUBLIC_API_KEY + `/form`,
						{
							idCategory: categoryId,
							name: CamelCaseConverter(item.name),
							orderIndex: item.index,
							label: item.name,
							type: item.input_type,
							placeholder: item.desc,
						},
						{
							headers: {
								Authorization: `Bearer ${sessionData.user.token}`,
							},
						}
					);

					var formId = res.data.data.id;
					if (item.input_type === "dropdown") {
						item.option.map(async (option) => {
							try {
								const res = await axios.post(
									process.env.NEXT_PUBLIC_API_KEY + `/form/option-form`,
									{
										idForm: formId,
										label: option.value,
										value: option.value,
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
						});
					}
				} catch (error) {
					console.log(error);
				}
			});

			await Promise.all(formComponentPromises);
			router.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal open={open} size="lg">
			<Modal.Header>
				<div className="relative w-[100%] h-[100%] mb-2">
					<div>
						<div className="absolute left-0">
							<p>Create Form</p>
						</div>
						<div className="absolute right-0" onClick={handle}>
							<XMarkIcon className="w-5 h-5 mt-1 cursor-pointer hover:text-[#F24B4B]" />
						</div>
					</div>
				</div>
			</Modal.Header>
			<Modal.Body>
				<hr className="mb-2" />
				<div className="grid lg:grid-cols-2 gap-8 max-h-[60vh] overflow-y-scroll hide-scrollbar">
					<div className="max-h-[50vh] overflow-y-auto hide-scrollbar">
						<div className="text-black text-[14px] mt-4">
							<Input
								type="text"
								label="Form Title/Category"
								name="category"
								placeholder="Form Title/Category"
								value={body.name}
								onChange={(e) => {
									dispatch(handleChangeBody({ ...body, name: e.target.value }));
								}}
								className="w-[100%] lg:w-[24rem] max-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-md mb-4"
							/>
							<Input
								type="text"
								label="Success Notification Title"
								name="success-notification-title"
								placeholder="Success Notification Title"
								value={body.successAlert}
								onChange={(e) => {
									dispatch(handleChangeBody({ ...body, successAlert: e.target.value }));
								}}
								className="w-[100%] lg:w-[24rem] max-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-md mb-4"
							/>
							<Input
								type="text"
								label="Fail Notification Message"
								name="fail-notification-message"
								placeholder="Fail Notification Message"
								value={body.failAlert}
								onChange={(e) => {
									dispatch(handleChangeBody({ ...body, failAlert: e.target.value }));
								}}
								className="w-[100%] lg:w-[24rem] max-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-md mb-4"
							/>
						</div>
						<div className="text-[14px] font-normal">
							<span className="font-bold">Note:</span> After creating your form, you can apply
							them by going to the web edit section, dragging and dropping the form section, and
							then selecting the form title to which you want to apply the questions.
						</div>
					</div>
					<div>
						<div className="text-black text-[14px] mt-4 ">
							<Label>Question/Form Field</Label>
							<div className="flex flex-nowrap gap-2 overflow-auto pb-4">
								{body.form_component.map((input, i) => (
									<Fragment key={i}>
										<Button
											key={i}
											onClick={() => setSelected(i)}
											className={`text-[14px] flex items-center gap-1 border border-1 rounded-md px-2 py-2 border-[#082691] ${
												selected === i ? "bg-[#082691] text-white" : "text-[#082691]"
											}`}
										>
											{input.name == "" ? body.form_component.length : input.name}
										</Button>
									</Fragment>
								))}
							</div>
						</div>
						<div className="bg-[#F5F5F5] rounded-lg py-4 max-h-[48vh] overflow-y-auto hide-scrollbar">
							<div className="px-2">
								<Input
									label={"Form Name"}
									value={body.form_component[selected].name}
									onChange={(e) => {
										dispatch(
											handleFormComponent({
												...body.form_component[selected],
												index: selected,
												name: e.target.value,
											})
										);
									}}
									placeholder="Form Name"
									className="w-[100%] lg:w-[24rem] max-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-md"
								/>
							</div>
							<List>
								{inputList.map((input, i) => (
									<Fragment key={i}>
										<ListItem className="p-0 flex-col" key={i}>
											<label
												htmlFor={input.value}
												className="flex w-full cursor-pointer items-center px-3 py-2"
											>
												<ListItemPrefix className="mr-3">
													<Radio
														name="input-type"
														id={input.value}
														ripple={false}
														className="hover:before:opacity-0"
														containerProps={{
															className: "p-0",
														}}
														onChange={() => {
															dispatch(
																handleFormComponent({
																	...body.form_component[selected],
																	index: selected,
																	input_type: input.value,
																})
															);
														}}
														checked={
															body.form_component[selected].input_type ===
															input.value
														}
													/>
												</ListItemPrefix>
												<Typography
													color="blue-gray"
													className="font-medium text-blue-gray-400 text-[14px]"
												>
													{input.name}
												</Typography>
											</label>
											{input.value == "dropdown" &&
												body.form_component[selected].input_type === input.value && (
													<div className="px-2 pb-4 w-full">
														<div className="flex flex-wrap items-center border-2 border-gray-200 rounded-md px-3 py-2 bg-white">
															{body.form_component[selected].option.map(
																(item, index) => (
																	<span
																		key={index}
																		className="bg-gray-200 text-gray-700 rounded-full px-2 my-1 py-1 mr-4 flex items-center"
																	>
																		{item.value}
																		<Button
																			type="button"
																			onClick={() =>
																				handleRemoveItem(index)
																			}
																			className="ml-2 text-red-500 focus:outline-none mt-[-2px]"
																		>
																			&times;
																		</Button>
																	</span>
																)
															)}
															<input
																type="text"
																placeholder="Options"
																value={inputValue}
																onChange={(e) =>
																	setInputValue(e.target.value)
																}
																onKeyDown={handleKeyDown}
																className="flex-grow focus:outline-none py-1"
															/>
														</div>
													</div>
												)}
											{input.value == "images" || input.value == "document"
												? body.form_component[selected].input_type ===
														input.value && (
														<div className="px-2 pb-4 w-full">
															<Input
																onChange={(e) => {
																	dispatch(
																		handleFormComponent({
																			...body.form_component[selected],
																			index: selected,
																			desc: e.target.value,
																		})
																	);
																}}
																value={body.form_component[selected].desc}
																placeholder="Description"
																className="w-full lg:w-full max-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-md"
															/>
														</div>
													)
												: ""}
										</ListItem>
									</Fragment>
								))}
							</List>
							<div className="flex w-[100%] gap-4 p-4">
								<Button
									type="button"
									className="w-[100%] pt-1.5 pb-1.5 border border-[1px] border-[#F24B4B] text-[#F24B4B] hover:text-white hover:bg-[#F24B4B] rounded-md"
									onClick={(e) => {
										dispatch(handleDeleteFormComponent(selected));
										setSelected(selected - 1);
									}}
								>
									Delete Field
								</Button>
								<Button
									type="button"
									className="w-[100%] pt-1.5 pb-1.5 border border-[1px] border-[#082691] text-[#082691] hover:text-white hover:bg-[#082691] rounded-md"
									onClick={(e) => {
										dispatch(handleAddFormComponent());
										setSelected(body.form_component.length);
									}}
								>
									Add Field
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className="flex w-[100%] gap-4">
					<Button
						type="button"
						className="w-[100%] pt-1.5 pb-1.5 border border-[1px] border-[#082691] text-[#082691] hover:bg-[#082691] hover:text-white rounded-md"
						onClick={handle}
					>
						Cancel
					</Button>
					<Button
						disabled={body.form_component[selected].name === "" || body.name === ""}
						type="button"
						className={`w-[100%] pt-1.5 pb-1.5 border border-[1px] rounded-md ${
							body.form_component[selected].name === "" || body.name === ""
								? "bg-[#082691]/70 border-[#082691]/70 text-white"
								: "bg-[#082691] border-[#082691] text-white hover:bg-[#0a34c9] hover:border-[#0a34c9] hover:text-white "
						}`}
						onClick={handlePostForm}
					>
						Save
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};
