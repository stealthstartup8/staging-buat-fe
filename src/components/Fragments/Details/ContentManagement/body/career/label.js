import Input from "@/components/Elements/Input";
import UploadFile from "@/components/Elements/UploadFile";
import { useSelector } from "react-redux";
import { useState } from "react";
import CustomSelect from "@/components/Elements/Input/custom-select";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
const CareerLabel = ({ sectionComponentHero, setSelectedSection, user_token, website_id }) => {
	const [showChangeIcon, setShowChangeIcon] = useState(false);
	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);
	const fontSlices = useSelector((state) => state.persistedReducer.fontSlices);
	const { colorPickerRef, fontColorPicker, setShowLabelColorPicker } = useColorPicker();
	const showLabelColorPicker = fontColorPicker.label;

	return (
		<div className="mt-4 ">
			<h2 className="mb-2">
				<b>Departement Label</b>
			</h2>
			<div className="pb-4">
				<Link href="/job-vacancy">
					<button
						className={`w-full flex items-center justify-center text-sm font-medium gap-2 border border-1 rounded-md py-2 border-[#082691] text-[#082691] bg-transparent hover:bg-[#082691] hover:text-white transition-all ease-in-out duration-300`}
					>
						<p>Add/edit Vacancy</p>
						<ArrowTopRightOnSquareIcon className="size-5" />
					</button>
				</Link>
			</div>
			<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
				<div className="p-2">
					<h2 className="mb-2 ">Label Shape</h2>
					<CustomSelect />
				</div>
				<div className="p-2">
					<div className="flex">
						<Input
							type={"checkbox"}
							className="mr-2"
							checked={showChangeIcon}
							onChange={(e) => {
								setShowChangeIcon(!showChangeIcon);
								// 	handleRemoveFile();
							}}
						/>{" "}
						<h2 className="">Change Icon (PNG or GIF)</h2>
					</div>
					{showChangeIcon ? (
						<div className="pl-7">
							<UploadFile
								accept={".svg,.jpeg,.jpg,.png,.gif"}
								// icon={
								// 	labelSlice.item[selectedComponent.item.choiceLabelIndex]?.icon
								// }
								// handleChangeIcon={handleChangeIcon}
							/>
						</div>
					) : (
						""
					)}
				</div>
				<ColorPickerInput
					title="Label Color"
					ref={colorPickerRef}
					color={fontSlices?.item?.[selectedComponent.item.choiceLabelIndex]?.label.color}
					showColorPicker={showLabelColorPicker}
					setShowColorPicker={setShowLabelColorPicker}
					// handleColorChange={handleChangeLabelColor}
				/>
			</div>
		</div>
	);
};

export default CareerLabel;
