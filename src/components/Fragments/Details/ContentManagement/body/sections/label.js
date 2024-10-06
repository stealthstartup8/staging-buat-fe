import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import { Fragment, useState } from "react";
import UploadFileBigPreview from "@/components/Elements/UploadFile/BigPreview";
import { useDispatch, useSelector } from "react-redux";
import { addSectionComponents, sectionComponentBg } from "@store/body/bodySlice";
import axios from "axios";
import { useBody } from "@/utils/hooks/useBody";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import LabelCoreSection from "../labelCore";
import { deleteSectionComponents as deleteSectionComponentsState } from "@store/body/bodySlice";
const LabelSection = ({ sectionComponentHero, setSelectedSection, user_id, user_token, website_id }) => {
	const { switchRightComponents } = useBody();
	const { setIndexComponent, indexComponent } = useStyleManagement();
	const bodySlice = useSelector((state) => state.persistedReducer.bodySlice);

	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);

	const [checkThumbnail, setCheckThumbnail] = useState(
		bodySlice.item[selectedComponent.item.choiceLabelIndex]?.components[sectionComponentHero]
			?.background_image != ""
			? true
			: false
	);
	const dispatch = useDispatch();

	function handleSetFile({ file, url }, index) {
		dispatch(
			sectionComponentBg({
				index: index,
				indexComponent: sectionComponentHero,
				background_image: url,
				background_file: file,
				background_type: file.type.split("/")[0],
			})
		);
	}

	function removeBgFile(index) {
		dispatch(
			sectionComponentBg({
				index: index,
				indexComponent: sectionComponentHero,
				background_image: "",
			})
		);
	}

	function sendData(index) {
		setIndexComponent(index);
		setSelectedSection(index);
		setCheckThumbnail(
			bodySlice.item[selectedComponent.item.choiceLabelIndex]?.components[index]?.background_image != ""
				? true
				: false
		);
	}

	const deleteSectionComponents = async () => {
		if (
			bodySlice.item[selectedComponent.item.choiceLabelIndex]?.components[sectionComponentHero]?.id !=
			null
		) {
			const deleteSectionComponents = await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					"/section-component/" +
					bodySlice.item[selectedComponent.item.choiceLabelIndex]?.components[sectionComponentHero]
						?.id +
					`/${website_id}`,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}
	};

	const addSection = () => {
		dispatch(
			addSectionComponents({
				index: selectedComponent.item.choiceLabelIndex,
				id: null,
				label: "Label",
				title: "Lorem ipsum dolor sit amet.",
				tagline: "Lorem ipsum dolor sit amet.",
				background_image: "",
				background_file: "",
				background_type: "",
				button_item: [],
				show_button: false,
			})
		);
		sendData(bodySlice.item[selectedComponent.item.choiceLabelIndex]?.components.length);
		setCheckThumbnail(false);
	};

	return (
		<div className="mt-4 overflow-y-auto content-scrollbar">
			<h2 className="mb-2">
				<b>Content Label</b>
			</h2>
			<div className="flex flex-nowrap gap-2 overflow-auto pb-4">
				{bodySlice.item[selectedComponent.item.choiceLabelIndex]?.components.map((item, index) => (
					<Fragment key={index}>
						<Button
							onClick={(e) => {
								sendData(index);
							}}
							className={`${
								index == indexComponent
									? "bg-[#082691] text-white"
									: "text-[#082691] bg-white"
							} text-[14px] flex gap-1 border border-1 rounded-md px-2 py-2 border-[#082691]`}
						>
							Label&nbsp;
							{index + 1}
						</Button>
					</Fragment>
				))}
			</div>
			<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
				<LabelCoreSection />
				<hr className="my-1 border-[#C8CDD0]"></hr>
				<div>
					<div className="flex p-2">
						<Input
							type={"checkbox"}
							className="mr-2"
							checked={checkThumbnail}
							onChange={(e) => {
								setCheckThumbnail(!checkThumbnail);
								removeBgFile(selectedComponent.item.choiceLabelIndex);
							}}
						/>{" "}
						Thumbnails
					</div>
					{checkThumbnail ? (
						<UploadFileBigPreview
							accept={".svg,.jpeg,.jpg,.png,.gif,.mp4,.mov"}
							file={bodySlice.item[selectedComponent.item.choiceLabelIndex]?.components[
								sectionComponentHero
							]?.background_image.replace(/"/g, "")}
							file_type={
								bodySlice.item[selectedComponent.item.choiceLabelIndex]?.components[
									sectionComponentHero
								]?.background_type
							}
							handleSetFile={(image) =>
								handleSetFile(image, selectedComponent.item.choiceLabelIndex)
							}
							removeFile={(e) => {
								e.stopPropagation();
								removeBgFile(selectedComponent.item.choiceLabelIndex);
							}}
						/>
					) : (
						""
					)}
				</div>
			</div>
			<div className="flex gap-2">
				{sectionComponentHero != 0 && (
					<Button
						onClick={(e) => {
							dispatch(
								deleteSectionComponentsState({
									index: selectedComponent.item.choiceLabelIndex,
									indexComponent: sectionComponentHero,
								})
							);
							sendData(0);
							deleteSectionComponents();
						}}
						className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#F11010] text-[#F11010] bg-white hover:bg-[#F11010] hover:text-white"
					>
						Delete Section
					</Button>
				)}
				<Button
					onClick={addSection}
					className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white"
				>
					Add Section
				</Button>
			</div>
		</div>
	);
};

export default LabelSection;
