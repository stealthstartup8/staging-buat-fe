import Input from "@/components/Elements/Input";
import UploadFile from "@/components/Elements/UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CustomSelect from "@/components/Elements/Input/custom-select";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Select from "react-select";
import { setCategories } from "@store/body/bodySlice";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import axios from "axios";
import {
	changeShowIcon,
	changeColor,
	changeIcon,
	changeShape,
	changeStrokeColor,
	changeTextColor,
	changeBackgroundColor,
} from "@store/body/labelSlice";
const CategorySection = ({ sectionComponentHero, setSelectedSection, user_token, website_id, section }) => {
	const [showChangeIcon, setShowChangeIcon] = useState(false);
	const pricing_category_data = useSelector((state) => state.pricingSlice.category_data || []);
	const career_category_data = useSelector((state) => state.jobVacancySlice.category_data || []);
	const commerce_category_data = useSelector((state) => state.eCommerceSlice.category_data || []);

	const dispatch = useDispatch();
	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);
	const bodySlice = useSelector((state) => state.persistedReducer.bodySlice);
	const labelSlice = useSelector((state) => state.persistedReducer.labelSlice);

	const {
		colorPickerRef,
		setShowLabelTextColorPicker,
		setShowLabelButtonColorPicker,
		setShowLabelStrokeColorPicker,
		labelColorPicker,
	} = useColorPicker();

	const showTextColorPicker = labelColorPicker.text;
	const showButtonColorPicker = labelColorPicker.button;
	const showStrokeColorPicker = labelColorPicker.stroke;

	const categoryChangeHandler = (selectedOptions, context) => {
		if (context.action === "remove-value") {
			if (selectedComponent.item.choiceIdCategory == 11) {
				if (context.removedValue.id_section != undefined) {
					axios.delete(
						process.env.NEXT_PUBLIC_API_KEY +
							`/section-career/${context.removedValue.id_section}`,
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}
			} else if (selectedComponent.item.choiceIdCategory == 12) {
				if (context.removedValue.id_section != undefined) {
					axios.delete(
						process.env.NEXT_PUBLIC_API_KEY + `/section-price/${context.removedValue.id_section}`,
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}
			} else if (selectedComponent.item.choiceIdCategory == 13) {
				if (context.removedValue.id_section != undefined) {
					axios.delete(
						process.env.NEXT_PUBLIC_API_KEY +
							`/section-commerce/${context.removedValue.id_section}`,
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}
			}
		}

		const selectedOptionsWithStatus = [
			...selectedOptions.map((option) => ({
				...option,
				id_section: option.id_section == undefined ? null : option.id_section,
			})),
		];

		dispatch(
			setCategories({
				index: selectedComponent.item.choiceLabelIndex,
				categories: selectedOptionsWithStatus,
			})
		);
	};

	const handleSelectedOption = (option) => {
		dispatch(
			changeShape({
				index: selectedComponent.item.choiceLabelIndex,
				shape: option,
			})
		);
	};

	const handleChangeTextColor = (color) => {
		dispatch(
			changeTextColor({
				index: selectedComponent.item.choiceLabelIndex,
				text_color: color,
			})
		);
	};

	const handleChangeButtonColor = (color) => {
		dispatch(
			changeBackgroundColor({
				index: selectedComponent.item.choiceLabelIndex,
				background_color: color,
			})
		);
	};

	const handleChangeStrokeColor = (color) => {
		dispatch(
			changeStrokeColor({
				index: selectedComponent.item.choiceLabelIndex,
				stroke_color: color,
			})
		);
	};

	const handleShowIcon = (e) => {
		dispatch(
			changeShowIcon({
				index: selectedComponent.item.choiceLabelIndex,
				show_icon: e.target.checked,
			})
		);
		setShowChangeIcon(e.target.checked);
	};

	function handleChangeIcon({ file, url }) {
		dispatch(
			changeIcon({
				index: selectedComponent.item.choiceLabelIndex,
				icon: url,
				icon_file: file,
			})
		);
	}

	const handleRemoveIcon = () => {
		dispatch(
			changeIcon({
				index: selectedComponent.item.choiceLabelIndex,
				icon: "",
			})
		);
	};

	return (
		<>
			<div className="mt-4 overflow-y-auto content-scrollbar pr-1 overflow-x-hidden">
				<h2 className="mb-2">
					<b>Category</b>
				</h2>
				<div className="pb-4">
					<Link
						href={
							section == "pricing"
								? "/pricing"
								: section === "career"
									? "/job-vacancy"
									: section === "commerce"
										? "/e-commerce"
										: ""
						}
						target="_blank"
					>
						<button
							className={`w-full flex items-center justify-center text-sm font-medium gap-2 border border-1 rounded-md py-2 border-[#082691] text-[#082691] bg-transparent hover:bg-[#082691] hover:text-white transition-all ease-in-out duration-300`}
						>
							<p>
								Add/Edit{" "}
								{section == "pricing"
									? "Package"
									: section === "career"
										? "Job"
										: section === "commerce"
											? "Product"
											: ""}
							</p>
							<ArrowTopRightOnSquareIcon className="size-5" />
						</button>
					</Link>
				</div>

				<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
					<div className="p-2">
						<h2 className="mb-2 ">Show Categories</h2>
						{(section === "pricing"
							? pricing_category_data
							: section === "career"
								? career_category_data
								: section === "commerce"
									? commerce_category_data
									: false) && (
							<Select
								value={
									bodySlice.item[selectedComponent.item.choiceLabelIndex]?.category_detail
										?.categories
								}
								isMulti
								name="colors"
								options={
									section === "pricing"
										? pricing_category_data
										: section === "career"
											? career_category_data
											: section === "commerce"
												? commerce_category_data
												: []
								}
								getOptionLabel={(option) => option.name}
								getOptionValue={(option) => option.id}
								onChange={categoryChangeHandler}
								className="basic-multi-select"
								classNamePrefix="select"
							/>
						)}
						<p className="text-[0.6rem] text-justify">
							<span className="text-red-800">*</span>every item with at least one category above
							will be displayed
						</p>
					</div>
					<div className="p-2">
						<h2 className="mb-2 ">Label Shape</h2>
						<CustomSelect
							initialSelect={parseInt(
								labelSlice.item[selectedComponent.item.choiceLabelIndex]?.shape
							)}
							handleSelectedOption={handleSelectedOption}
						/>
					</div>
					<div className="p-2">
						<div className="flex">
							<Input
								type={"checkbox"}
								className="mr-2"
								checked={showChangeIcon}
								onChange={(e) => {
									handleShowIcon(e);
									handleRemoveIcon();
								}}
							/>
							<h2 className="">Change Icon (PNG or GIF)</h2>
						</div>
						{showChangeIcon ? (
							<div className="pl-7">
								<UploadFile
									accept={".svg,.jpeg,.jpg,.png,.gif"}
									icon={labelSlice.item[selectedComponent.item.choiceLabelIndex]?.icon}
									handleChangeIcon={handleChangeIcon}
								/>
							</div>
						) : (
							""
						)}
					</div>
					<ColorPickerInput
						title="Text Color"
						ref={colorPickerRef}
						showColorPicker={showTextColorPicker}
						setShowColorPicker={setShowLabelTextColorPicker}
						color={labelSlice.item[selectedComponent.item.choiceLabelIndex]?.text_color}
						handleColorChange={handleChangeTextColor}
					/>
					<ColorPickerInput
						title="Label Color"
						ref={colorPickerRef}
						showColorPicker={showButtonColorPicker}
						setShowColorPicker={setShowLabelButtonColorPicker}
						color={labelSlice.item[selectedComponent.item.choiceLabelIndex]?.background_color}
						handleColorChange={handleChangeButtonColor}
					/>
					<ColorPickerInput
						title="Label Stroke Color"
						ref={colorPickerRef}
						showColorPicker={showStrokeColorPicker}
						setShowColorPicker={setShowLabelStrokeColorPicker}
						color={labelSlice.item[selectedComponent.item.choiceLabelIndex]?.stroke_color}
						handleColorChange={handleChangeStrokeColor}
					/>
				</div>
			</div>
		</>
	);
};

export default CategorySection;
