import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	handle_reset,
	handle_add_category,
	handle_remove_category,
	handleNewProduct,
	handle_images,
	postPricing,
} from "@store/pricing";
import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import Label from "@/components/Elements/Input/label";
import { XCircleIcon } from "@heroicons/react/24/outline";
import ValidationPopup from "@/components/Fragments/Popup/job-vacancy";
import { getSession } from "next-auth/react";
import axios from "axios";
import { MAX_FILE_SIZE } from "@/utils/constants/Constraints";
import Toast from "@/components/Elements/Toast/Toast";
import dynamic from "next/dynamic";

const RichTextEditor2 = dynamic(() => import("@/components/Elements/Editor/RichTextEditor2"), {
	ssr: false,
});

const CreatePricing = ({ sessionData, website }) => {
	const dispatch = useDispatch();
	const pricing = useSelector((state) => state.pricingSlice.newData);

	const [inputValue, setInputValue] = useState("");
	const [open, setOpen] = useState(false);
	const [failed, setFailed] = useState(false);
	const website_id = website.id;
	const token = sessionData.user.token;

	const handleDescription = (value) => {
		dispatch(
			handleNewProduct({
				...pricing,
				description: value,
			})
		);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && e.target.value.trim()) {
			if (
				pricing.category.includes(e.target.value) ||
				pricing.category.includes(e.target.value.toLowerCase()) ||
				pricing.category.includes(e.target.value.toUpperCase()) ||
				pricing.category.length >= 4
			) {
				setFailed(true);
				setTimeout(() => {
					setFailed(false);
				}, 500);
				return;
			} else {
				dispatch(
					handleNewProduct({
						...pricing,
						category: [...pricing.category, e.target.value.trim()],
					})
				);
				setInputValue("");
			}
		} else if (e.key === "Backspace" && pricing.category.length > 0 && inputValue === "") {
			dispatch(
				handleNewProduct({
					...pricing,
					category: pricing.category.slice(0, pricing.category.length - 1),
				})
			);
		}
	};

	const pricingDetails = {
		categoryItem: pricing.category,
		image: pricing.image.file,
		name: pricing.name,
		price: pricing.price,
		diskon: pricing.price_after_discount,
		desc: pricing.description,
		buttonName: pricing.button.name,
		buttonLink: pricing.button.url,
	};

	const postItem = (status) => {
		if (pricing.category == "" || pricing.name == "") {
			setOpen(true);
		} else {
			dispatch(
				postPricing({
					pricingDetails,
					token,
					website_id,
					status: status,
				})
			).then((action) => {
				if (action.type === postPricing.fulfilled.type) {
					window.location.href = "/pricing";
				} else {
					alert("Failed to create Pricing");
				}
			});
		}
	};
	const handleChangeFile = (e) => {
		if (!e.target.files[0]) {
			setOpen(!open);
			return;
		}
		if (e.target.files[0]?.size > MAX_FILE_SIZE) {
			Toast({ type: "file-size-too-big" });
			setOpen(!open);
			return false;
		}
		dispatch(
			handleNewProduct({
				...pricing,
				image: {
					url: URL.createObjectURL(e.target.files[0]),
					file: e.target.files[0],
				},
			})
		);
	};
	return (
		<>
			<ValidationPopup open={open} setOpen={() => setOpen(!open)} />
			<div className="bg-[#ffffff] min-h-[100vh] pt-24 pb-8">
				<div className="container mx-auto">
					<div className="flex lg:justify-end lg:gap-0 gap-2 lg:px-0 px-4">
						<Button className="px-8 py-2 bg-[#ffffff] text-[#F24B4B] hover:bg-[#F24B4B] hover:text-white border-2 border-[#F24B4B] rounded-lg mb-4 lg:ml-2">
							Delete Product
						</Button>
						<Button
							onClick={() => postItem(false)}
							className="px-8 py-2 bg-[#ffffff] text-[#082691] hover:bg-[#082691] hover:text-white border-2 border-[#082691] rounded-lg mb-4 lg:ml-2"
						>
							Save as Draft
						</Button>
						<Button
							onClick={() => postItem(true)}
							className="px-8 py-2 bg-[#082691] text-white hover:bg-[#1e43c7] border-2 hover:border-[#1e43c7] border-[#082691] rounded-lg mb-4 lg:ml-2"
						>
							Activate Product
						</Button>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:px-0 px-4">
						<div>
							<h5 className="font-bold mb-4 text-[16px]">Package Image</h5>
							<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
								<div className="Upload w-[100%] h-[100%]">
									<div
										htmlFor="product-image"
										className={`relative flex items-center cursor-pointer w-[100%] h-[135px] text-[12px] border border-1 border-[#000000] justify-center text-center rounded-md border-dashed`}
										onClick={(e) => {
											e.preventDefault();
											document.getElementById(`product-image`).click();
										}}
									>
										<XCircleIcon
											onClick={(e) => {
												dispatch(
													handleNewProduct({
														...pricing,
														image: {
															url: "",
															file: null,
														},
													})
												);
												e.stopPropagation();
											}}
											className="z-10 absolute top-2 right-2 w-[28px] h-[28px] text-gray-500 hover:text-[#F24B4B]"
										/>
										{pricing.image.url ? (
											<img
												src={pricing.image.url}
												className="max-w-[100%] max-h-[100%]"
												draggable="false"
											/>
										) : (
											<div className="flex items-center justify-center h-[100%]">
												<p className="text-[14px] font-bold text-[#243E87]">
													Click to browse
													<span className="font-light">
														<br /> PNG, JPG, JPEG, GIF <br />
														(Main Image)
													</span>
												</p>
											</div>
										)}
									</div>
									<p className="text-center text-[#5B5E67] font-bold mt-2">276 x 78 px</p>
									<input
										type="file"
										className="choose-image-style hidden"
										accept="image/*"
										id="product-image"
										onChange={handleChangeFile}
									/>
								</div>
								<div className="mt-4">
									<Label>Package Description</Label>
									<RichTextEditor2
										value={pricing.description}
										onChange={handleDescription}
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4">
							<div>
								<h5 className="font-bold mb-4 text-[16px]">Pricing Detail</h5>
								<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
									<Label>Package Category/Label/Department</Label>
									<div className="w-full mb-4">
										<div
											className={`flex flex-wrap items-center border-[1px] ${
												failed == true ? "border-[#FF0000] shake" : "border-[#C8CDD0]"
											} rounded-md px-3 py-2 bg-white`}
										>
											{pricing.category?.map((item, index) => (
												<span
													key={index}
													className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 mr-4 flex items-center text-[12px]"
												>
													{item}
													<Button
														type="button"
														onClick={() => {
															dispatch(
																handleNewProduct({
																	...pricing,
																	category: pricing.category.filter(
																		(category) => category !== item
																	),
																})
															);
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
												onChange={(e) => setInputValue(e.target.value)}
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
										value={pricing.name}
										onChange={(e) => {
											dispatch(
												handleNewProduct({
													...pricing,
													name: e.target.value,
												})
											);
										}}
										type="text"
										label="Package Name"
										name="package_name"
										placeholder="Package Name"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
									<Input
										value={pricing.price}
										onChange={(e) => {
											dispatch(
												handleNewProduct({
													...pricing,
													price: e.target.value,
												})
											);
										}}
										type="text"
										label="Price"
										name="price"
										placeholder="e.g. USD 100 or HKD 100"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
									<Input
										value={pricing.price_after_discount}
										onChange={(e) => {
											dispatch(
												handleNewProduct({
													...pricing,
													price_after_discount: e.target.value,
												})
											);
										}}
										type="text"
										label="Price After Discount (optional)"
										name="price_after_discount"
										placeholder="e.g. USD 80 or HKD 80"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
								</div>
							</div>
							<div>
								<h5 className="font-bold mb-4 text-[16px]">Button</h5>
								<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
									<Input
										value={pricing.button.name}
										onChange={(e) => {
											dispatch(
												handleNewProduct({
													...pricing,
													button: {
														...pricing.button,
														name: e.target.value,
													},
												})
											);
										}}
										type="text"
										label="Button Name"
										name="button_name"
										placeholder="Button Name/Text"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
									<Input
										value={pricing.button.url}
										onChange={(e) => {
											dispatch(
												handleNewProduct({
													...pricing,
													button: {
														...pricing.button,
														url: e.target.value,
													},
												})
											);
										}}
										type="text"
										label="Button Link"
										name="button_link"
										placeholder="Any payment portal link"
										className="mb-4 w-full px-4 py-2 rounded-lg border border-[#C8CDD0] focus:outline-none focus:border-[#082691]"
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4 pt-10">
							<div className="border border-1 border-[#DCDCDC] w-[100%] rounded-xl p-4">
								<p>Status Product</p>
								<p className="font-bold">{pricing.status == false ? "Draft" : "Active"}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreatePricing;

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
