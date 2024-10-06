import Input from "@/components/Elements/Input";
import { useDispatch, useSelector } from "react-redux";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import {
	changeModalThumbnail,
	changeModalTitle,
	changeModalDescription,
	changeModalColor,
} from "@store/body/bodySlice";
import { useBody } from "@/utils/hooks/useBody";
import UploadFileBigPreview from "@/components/Elements/UploadFile/BigPreview";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import { MAX_FILE_SIZE } from "@/utils/constants/Constraints";
import Toast from "@/components/Elements/Toast/Toast";
const CommerceShopModalManagementSection = ({
	selectComponent,
	setSelectComponent,
	user_token,
	website_id,
	sectionComponentHero,
}) => {
	const dispatch = useDispatch();
	const bodySlice = useSelector((state) => state.persistedReducer.bodySlice);
	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);
	const { select_section } = useBody();
	const { colorPickerRef, commerceModalColorPicker, setShowCommerceModalColorPicker } = useColorPicker();

	const showCommerceModalColorPicker = commerceModalColorPicker.color;

	const handleChangeCommerceModalColor = (color) => {
		dispatch(
			changeModalColor({
				index: selectedComponent?.item.choiceLabelIndex,
				color: color,
			})
		);
	};

	const handleSetThumbnail = ({ file, url }, index) => {
		dispatch(
			changeModalThumbnail({
				index: index,
				thumbnail_image: url,
				thumbnail_file: file,
			})
		);
	};

	const removeBgFile = (index) => {
		dispatch(
			changeModalThumbnail({
				index: index,
				thumbnail_image: "",
				thumbnail_file: null,
			})
		);
	};

	const handleChangeTitle = (index, value) => {
		dispatch(
			changeModalTitle({
				index: index,
				title: value,
			})
		);
	};
	const handleChangeDescription = (index, value) => {
		dispatch(
			changeModalDescription({
				index: index,
				description: value,
			})
		);
	};
	return (
		<>
			<div className="mt-4 bg-[#F5F5F5] rounded-md p-2">
				<div className="p-2">
					<p>Purchase Modal Title</p>
					<Input
						placeholder="Enter title here..."
						value={bodySlice.item[selectedComponent?.item.choiceLabelIndex]?.modal_detail.title}
						className="w-[100%]  border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
						onChange={(e) =>
							handleChangeTitle(selectedComponent.item.choiceLabelIndex, e.target.value)
						}
					/>
				</div>
				<div className="p-2">
					<p className="">Modal Image (optional)</p>
					<div className="mt-4">
						<UploadFileBigPreview
							accept={".svg,.jpeg,.jpg,.png,.gif,.mp4"}
							file={
								bodySlice.item[select_section.item.choiceLabelIndex]?.modal_detail
									?.thumbnail_image == undefined
									? ""
									: bodySlice.item[
											select_section.item.choiceLabelIndex
										]?.modal_detail?.thumbnail_image.replace(/^"|"$/g, "")
							}
							handleSetFile={(image) =>
								handleSetThumbnail(image, select_section.item.choiceLabelIndex)
							}
							removeFile={(e) => {
								e.stopPropagation();
								removeBgFile(select_section.item.choiceLabelIndex);
							}}
						/>
					</div>
				</div>
				<div className="p-2">
					<p>Purchase Modal Description (optional)</p>
					<Input
						placeholder="Enter description here"
						value={
							bodySlice.item[selectedComponent?.item.choiceLabelIndex]?.modal_detail.description
						}
						className="w-[100%]  border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
						onChange={(e) =>
							handleChangeDescription(selectedComponent.item.choiceLabelIndex, e.target.value)
						}
					/>
				</div>
				<ColorPickerInput
					title="Modal Color"
					ref={colorPickerRef}
					color={bodySlice.item[selectedComponent?.item.choiceLabelIndex]?.modal_detail.color}
					showColorPicker={showCommerceModalColorPicker}
					setShowColorPicker={setShowCommerceModalColorPicker}
					handleColorChange={handleChangeCommerceModalColor}
				/>
			</div>
		</>
	);
};

export default CommerceShopModalManagementSection;
