import Input from "@/components/Elements/Input";
import UploadFileBigPreview from "@/components/Elements/UploadFile/BigPreview";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import {
	backgroundImage as handleBackgroundImage,
	backgroundColor as handleBackgroundColor,
} from "@store/sections";
const BackgroundSection = () => {
	const dispatch = useDispatch();
	const { colorPickerRef, backgroundColorPicker, setShowBackgroundColorPicker } = useColorPicker();
	const showBackgroundColorPicker = backgroundColorPicker;
	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);
	const sectionSlices = useSelector((state) => state.persistedReducer.sectionSlices);

	const [backgroundImage, setBackgroundImage] = useState(
		sectionSlices.item[selectedComponent.item.choiceLabelIndex]?.background_image == "" ? false : true
	);
	const [backgroundColor, setBackgroundColor] = useState(
		sectionSlices.item[selectedComponent.item.choiceLabelIndex]?.background_color == "" ? false : true
	);

	function handleSetBg({ file, url }, index) {
		dispatch(
			handleBackgroundImage({
				index: index,
				background_image: url,
				background_file: file,
				background_type: file.type.split("/")[0],
			})
		);
	}

	const handleSetBgColor = (color) => {
		dispatch(
			handleBackgroundColor({
				index: selectedComponent.item.choiceLabelIndex,
				background_color: color,
			})
		);
	};

	function removeBgFile(index) {
		dispatch(
			handleBackgroundImage({
				index: index,
				background_image: "",
			})
		);
	}

	return (
		<>
			<div className="mt-4 ">
				<h2 className="mb-2">
					<b>Background</b>
				</h2>
				<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
					{/* <div className="p-2">
					<div className="flex">
						<div>
						<label className={styles.switch}>
							<input type="checkbox" />
							<span className={styles.slider}></span>
						</label>
						</div>
						<p className="mt-[-1px] ml-2 text-[12px]">
						Mobile does not follow desktop’s background
						</p>
					</div>
					</div> */}
					<div className="p-2">
						<div className="flex">
							<Input
								type={"checkbox"}
								checked={backgroundImage}
								className="mr-2"
								onChange={(e) => {
									setBackgroundImage(!backgroundImage);
									removeBgFile(selectedComponent.item.choiceLabelIndex);
								}}
							/>{" "}
							<h2 className="">Background Images</h2>
						</div>
						{backgroundImage ? (
							<div className="mt-4">
								<UploadFileBigPreview
									accept={".svg,.jpeg,.jpg,.png,.gif,.mp4"}
									file={
										sectionSlices.item[selectedComponent.item.choiceLabelIndex]
											?.background_image
									}
									file_type={
										sectionSlices.item[selectedComponent.item.choiceLabelIndex]
											?.background_type
									}
									handleSetFile={(image) =>
										handleSetBg(image, selectedComponent.item.choiceLabelIndex)
									}
									removeFile={(e) => {
										e.stopPropagation();
										removeBgFile(selectedComponent.item.choiceLabelIndex);
									}}
								/>
								<hr className="border-[#C8CDD0]"></hr>
							</div>
						) : (
							""
						)}
					</div>
					<div className="p-2">
						<div className="flex">
							<Input
								checked={backgroundColor}
								type={"checkbox"}
								className="mr-2"
								onChange={(e) => setBackgroundColor(!backgroundColor)}
							/>
							<h2 className="">Background Color</h2>
						</div>
						{backgroundColor && (
							<ColorPickerInput
								title=""
								ref={colorPickerRef}
								color={
									sectionSlices.item[selectedComponent.item.choiceLabelIndex]
										?.background_color
								}
								showColorPicker={showBackgroundColorPicker}
								setShowColorPicker={setShowBackgroundColorPicker}
								handleColorChange={handleSetBgColor}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default BackgroundSection;
