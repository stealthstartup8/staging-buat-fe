import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import CustomSelect from "@/components/Elements/Input/custom-select";
import Label from "@/components/Elements/Input/label";
import { useDispatch, useSelector } from "react-redux";
import {
	handleDataById,
	getDataById,
	putCommerce,
	deleteCategoryById,
	deleteButtonById,
} from "@store/e-commerce";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import ValidationPopup from "@/components/Fragments/Popup/job-vacancy";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import { COMMERCE_STORAGE_DIR, ICON_STORAGE_DIR } from "@/utils/constants/Storage";
import UploadFileBigPreviewWithDesc from "@/components/Elements/UploadFile/BigPreviewWithDesc";
import UploadFile from "@/components/Elements/UploadFile";

const DetailCommerce = ({ id, sessionData, website }) => {
	const token = sessionData.user.token;
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [failed, setFailed] = useState(false);
	const [openButtonColorPicker, setOpenButtonColorPicker] = useState(-1);
	const [openTextColorPicker, setOpenTextColorPicker] = useState(-1);
	const [activelyEditing, setActivelyEditing] = useState(-1);
	const { colorPickerRef } = useColorPicker();
	const commerce = useSelector((state) => state.eCommerceSlice.dataById);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDataById({ id, token }));
		const handleClickOutside = (event) => {
			if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
				setOpenButtonColorPicker(-1);
				setOpenTextColorPicker(-1);
			}
		};
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		// Cleanup the event listener on component unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const purchase_button = commerce?.buttonItem;
	const commerceDetails = {
		categoryItems: commerce?.categories.map((category) => category.category.name),
		name: commerce?.name,
		price: commerce?.price,
		discount: commerce?.discount,
	};

	function handleChangeIcon({ file, url }) {
		// if (!e.target.files[0]) {
		// 	setOpen(!open);
		// 	return;
		// }
		// if (e.target.files[0]?.size > MAX_FILE_SIZE) {
		// 	Toast({ type: "file-size-too-big" });
		// 	setOpen(!open);
		// 	return false;
		// }
		dispatch(
			handleDataById({
				...commerce,
				buttonItem: commerce?.buttonItem.map((data, i) =>
					i === activelyEditing
						? {
								...data,
								icon: {
									...data.icon,
									icon: url,
									icon_file: file,
								},
						  }
						: data
				),
			})
		);
		setActivelyEditing(-1);
	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && e.target.value.trim()) {
			if (
				commerce?.categories.some((category) => category.category.name === e.target.value) ||
				commerce?.categories.length >= 4
			) {
				setFailed(true);
				setTimeout(() => {
					setFailed(false);
				}, 500);
				return;
			} else {
				dispatch(
					handleDataById({
						...commerce,
						categories: [...commerce?.categories, { category: { name: e.target.value } }],
					})
				);
				setInputValue("");
			}
		} else if (e.key === "Backspace") {
			if (commerce?.categories?.length > 1 && inputValue === "") {
				dispatch(
					handleDataById({
						...commerce,
						categories: commerce?.categories.slice(0, commerce?.categories.length - 1),
					})
				);
				if (commerce?.categories[commerce?.categories.length - 1].idCategory !== undefined) {
					dispatch(
						deleteCategoryById({
							token,
							commerceId: id,
							categoryId: commerce?.categories[commerce?.categories.length - 1].idCategory,
						})
					);
				}
			} else {
				setFailed(true);
				setTimeout(() => {
					setFailed(false);
				}, 500);
			}
		}
	};

	const putCommerceData = (status) => {
		if (commerce?.name == "") {
			setOpen(true);
		} else {
			dispatch(
				putCommerce({
					commerceDetails,
					image: commerce.image_file,
					purchase_button,
					token,
					website_id: website.id,
					status: status,
					id: commerce.id,
				})
			).then((action) => {
				if (action.type === putCommerce.fulfilled.type) {
					window.location.href = "/e-commerce";
				} else {
					alert("Failed to Update Commerce");
				}
			});
		}
	};

	const handleOpenButtonColorPicker = (index) => {
		setOpenTextColorPicker(-1);
		setOpenButtonColorPicker(index);
	};

	const handleOpenTextColorPicker = (index) => {
		setOpenButtonColorPicker(-1);
		setOpenTextColorPicker(index);
	};

	const handleChangeImage = ({ file, url }) => {
		// if (!e.target.files[0]) {
		// 	setOpen(!open);
		// 	return;
		// }
		// if (e.target.files[0]?.size > MAX_FILE_SIZE) {
		// 	Toast({ type: "file-size-too-big" });
		// 	setOpen(!open);
		// 	return false;
		// }
		dispatch(
			handleDataById({
				...commerce,
				image: url,
				image_file: file,
			})
		);
	};
	const handleRemoveImage = (e) => {
		e.stopPropagation();
		dispatch(
			handleDataById({
				...commerce,
				image: "",
				image_file: "",
			})
		);
	};
	return (
		<>
			<ValidationPopup open={open} setOpen={() => setOpen(!open)} />
			<div className="bg-[#ffffff] min-h-[100vh] flex items-center pt-24">
				<div className="container mx-auto">
					<div className="flex lg:justify-end lg:gap-0 gap-2 lg:px-0 px-4">
						<Button className="px-8 py-2 bg-[#ffffff] text-[#dfb8b8] hover:bg-[#F24B4B] hover:text-white border-2 border-[#F24B4B] rounded-lg mb-4 lg:ml-2">
							Delete Product
						</Button>
						<Button
							onClick={(e) => putCommerceData(false)}
							className="px-8 py-2 bg-[#ffffff] text-[#082691] hover:bg-[#082691] hover:text-white border-2 border-[#082691] rounded-lg mb-4 lg:ml-2"
						>
							Save as Draft
						</Button>
						<Button
							onClick={(e) => putCommerceData(true)}
							className="px-8 py-2 bg-[#082691] text-white hover:bg-[#1e43c7] border-2 hover:border-[#1e43c7] border-[#082691] rounded-lg mb-4 lg:ml-2"
						>
							Activate Product
						</Button>
					</div>
					<div className="lg:grid grid-cols-10 gap-4 lg:px-0 px-4">
						<div className="flex flex-col col-span-3 gap-4">
							<div>
								<h5 className="font-bold mb-4 text-[16px]">Product Image</h5>
								<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
									<UploadFileBigPreviewWithDesc
										accept={"image/*"}
										image={
											commerce?.image_file || !commerce?.image
												? commerce?.image
												: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website.bucketAccess}/${COMMERCE_STORAGE_DIR}/${commerce?.image}`
										}
										handleSetFile={handleChangeImage}
										removeFile={handleRemoveImage}
										description="276 x 276 px"
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col col-span-4 gap-4">
							<div>
								<h5 className="font-bold mb-4 text-[16px]">Category/Label/Department</h5>
								<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
									<Label>Product Category/Label/Department</Label>
									<div className="w-full mb-4">
										<div
											className={`flex flex-wrap items-center border-[1px] ${
												failed == true ? "border-[#FF0000] shake" : "border-[#C8CDD0]"
											} rounded-md px-3 py-2 bg-white`}
										>
											{commerce?.categories?.map((item, index) => (
												<span
													key={index}
													className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 mr-4 flex items-center text-[12px]"
												>
													{item.category.name}
													<Button
														type="button"
														onClick={() => {
															if (commerce?.categories.length > 1) {
																dispatch(
																	handleDataById({
																		...commerce,
																		categories:
																			commerce?.categories.filter(
																				(data, i) => i !== index
																			),
																	})
																);
																if (item.idCategory !== undefined) {
																	dispatch(
																		deleteCategoryById({
																			token,
																			commerceId: id,
																			categoryId: item.idCategory,
																		})
																	);
																}
															} else {
																setFailed(true);
																setTimeout(() => {
																	setFailed(false);
																}, 500);
															}
														}}
														className="ml-2 text-red-500 focus:outline-none mt-[-2px]"
													>
														&times;
													</Button>
												</span>
											))}
											<input
												type="text"
												placeholder="Type and enter to save"
												value={inputValue}
												onChange={(e) => {
													setInputValue(e.target.value);
													setFailed(false);
												}}
												onKeyDown={handleKeyDown}
												className="flex-grow focus:outline-none"
											/>
										</div>
										<p className="text-[12px] mt-2 text-[#5B5E67]">
											<b>Note:</b> Category in the product is case-sensitive. Please
											ensure you type it correctly.
										</p>
									</div>
									<Input
										value={commerce?.name}
										onChange={(e) => {
											dispatch(
												handleDataById({
													...commerce,
													name: e.target.value,
												})
											);
										}}
										type="text"
										label="Product Name"
										name="productName"
										placeholder="Product Name"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none"
									/>
									<Input
										value={commerce?.price}
										onChange={(e) => {
											dispatch(
												handleDataById({
													...commerce,
													price: e.target.value,
												})
											);
										}}
										type="text"
										label="Price"
										name="price"
										placeholder="e.g. USD 100 or HKD 100"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none"
									/>
									<Input
										value={commerce?.discount}
										onChange={(e) => {
											dispatch(
												handleDataById({
													...commerce,
													discount: e.target.value,
												})
											);
										}}
										type="text"
										label="Price After Discount (optional)"
										name="priceAfterDiscount"
										placeholder="e.g. USD 80 or HKD 80"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none"
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4 pt-10 col-span-3">
							<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
								<p>Status Product</p>
								<p className="font-bold">{commerce?.status == false ? "Draft" : "Active"}</p>
							</div>
						</div>
					</div>
					<div className="mt-8 space-y-4 mb-8 lg:px-0 px-4">
						<h5 className="font-bold text-[16px]">Add Purchase Button</h5>
						<p className="text-[14px] text-[#5B5E67]">
							<b>Note:</b> Lead your web visitors to your store with the purchase link.
						</p>
						<Button
							onClick={() => {
								dispatch(
									handleDataById({
										...commerce,
										buttonItem: [
											...commerce?.buttonItem,
											{
												id: null,
												name: "",
												url: "",
												show_shape_option: false,
												button: [
													{
														id: 1,
														name: "text",
														color: "rgba(255,255,255,1)",
														show: false,
													},
													{
														id: 2,
														name: "background",
														color: "rgba(255,255,255,1)",
														show: false,
													},
												],
												icon: {
													show: false,
													icon: "",
													icon_file: "",
												},
											},
										],
									})
								);
							}}
							className="px-8 py-2 bg-[#ffffff] text-[#082691] hover:bg-[#082691] hover:text-white border-[1px] border-[#082691] rounded-lg mb-4 ml-1"
						>
							Add More Button
						</Button>
					</div>
					<div className="lg:grid grid-cols-3 gap-4 mt-4 mb-4 lg:px-0 px-4">
						{commerce?.buttonItem?.map((item, index) => (
							<div
								key={index}
								className="relative pb-20 border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4 lg:mb-0 mb-4"
							>
								<Input
									value={item.name}
									onChange={(e) => {
										dispatch(
											handleDataById({
												...commerce,
												buttonItem: commerce?.buttonItem.map((data, i) =>
													i === index ? { ...data, name: e.target.value } : data
												),
											})
										);
									}}
									type="text"
									label="Purchase Button Name"
									name="buttonName"
									placeholder="Button name"
									className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
								/>
								<Input
									value={item.url}
									onChange={(e) => {
										dispatch(
											handleDataById({
												...commerce,
												buttonItem: commerce?.buttonItem.map((data, i) =>
													i === index ? { ...data, url: e.target.value } : data
												),
											})
										);
									}}
									type="text"
									label="Purchase Button Link"
									name="buttonLink"
									placeholder="Product or Marketplace Link"
									className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
								/>
								<div className="grid grid-cols-2 gap-4">
									{item?.button?.map((btn, btnIndex) => (
										<div key={btnIndex} className="relative">
											<ColorPickerInput
												title={
													btn.name === "text" ? "Button Text Color" : "Button Color"
												}
												ref={colorPickerRef}
												color={btn.color}
												showColorPicker={
													btn.name === "text"
														? openTextColorPicker === index
														: openButtonColorPicker === index
												}
												setShowColorPicker={(value) =>
													btn.name === "text"
														? handleOpenTextColorPicker(value ? index : -1)
														: handleOpenButtonColorPicker(value ? index : -1)
												}
												custom
												customClassname="pb-4"
												pickerCustomClassname="absolute z-10 bottom-16"
												size="small"
												handleColorChange={(color) => {
													dispatch(
														handleDataById({
															...commerce,
															buttonItem: commerce?.buttonItem.map((data, i) =>
																i === index
																	? {
																			...data,
																			button: data.button.map((b) =>
																				b.id === btn.id
																					? {
																							...b,
																							color: color,
																					  }
																					: b
																			),
																	  }
																	: data
															),
														})
													);
												}}
											/>
										</div>
									))}
								</div>
								<div>
									<Label>Button Shape</Label>
									<div>
										<CustomSelect
											expand="top"
											initialSelect={commerce.buttonItem[index].button_shape}
											className={"border-[1px] border-[#C8CDD0]"}
											handleSelectedOption={(option) => {
												dispatch(
													handleDataById({
														...commerce,
														buttonItem: commerce?.buttonItem.map((data, i) =>
															i === index
																? {
																		...data,
																		button_shape: Number(option),
																  }
																: data
														),
													})
												);
											}}
										/>
									</div>
								</div>
								<div className="mb-2">
									<div class="flex items-center justify-left mt-4 w-full">
										<label htmlFor={`toggle-${index}`} className="flex cursor-pointer">
											<div className="relative">
												<input
													onChange={() => {
														dispatch(
															handleDataById({
																...commerce,
																buttonItem: commerce?.buttonItem.map(
																	(data, i) =>
																		i === index
																			? {
																					...data,
																					icon: {
																						...data.icon,
																						show: !data.icon.show,
																					},
																			  }
																			: data
																),
															})
														);
													}}
													checked={item.icon.show}
													type="checkbox"
													id={`toggle-${index}`}
													className="sr-only"
												/>
												<div className="background block bg-gray-400 w-8 h-[17px] rounded-full"></div>
												<div className="dot absolute left-[2px] top-[1.5px] bg-white w-[14px] h-[14px] rounded-full transition"></div>
											</div>
											<div className="ml-3 -mt-[1px]">
												<div className="text-gray-700 text-[14px]">
													Add Icon (PNG, JPG, JPEG, GIF)
												</div>
												{item.icon.show && (
													<div onClick={() => setActivelyEditing(index)}>
														<UploadFile
															accept={".svg,.jpeg,.jpg,.png,.gif"}
															icon={
																item?.icon.icon_file
																	? item?.icon?.icon
																	: item?.icon?.icon
																	? `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website.bucketAccess}/${ICON_STORAGE_DIR}/${item?.icon?.icon}`
																	: ""
															}
															handleChangeIcon={(image) =>
																handleChangeIcon(image)
															}
														/>
													</div>
												)}
											</div>
										</label>
									</div>
								</div>
								<Button
									onClick={() => {
										dispatch(
											handleDataById({
												...commerce,
												buttonItem: commerce?.buttonItem.filter(
													(data, i) => i !== index
												),
											})
										);
										dispatch(
											deleteButtonById({
												id: item.id,
												commerce_id: commerce?.id,
												token,
											})
										);
									}}
									className="lg:w-[90%] absolute bottom-4 px-8 py-2 bg-[#ffffff] text-[#F24B4B] hover:bg-[#F24B4B] hover:text-white border-2 border-[#F24B4B] rounded-lg"
								>
									Delete Product
								</Button>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default DetailCommerce;

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
				id: ctx.query.id,
			},
		};
	}
}
