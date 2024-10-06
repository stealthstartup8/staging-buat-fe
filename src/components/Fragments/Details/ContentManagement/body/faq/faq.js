import Button from "@/components/Elements/Button";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Input from "@/components/Elements/Input";
import { useSelector, useDispatch } from "react-redux";
import { addFAQ, answer, deleteFAQ, question, sectionComponentBg } from "@store/body/bodySlice";
import { Fragment, useState } from "react";
import axios from "axios";
import UploadFileBigPreview from "@/components/Elements/UploadFile/BigPreview";
const FaqInputSection = ({ user_token, id_template }) => {
	const faqTemplateWithImage = [402];
	const dispatch = useDispatch();
	const bodySlice = useSelector((state) => state.persistedReducer.bodySlice.item);
	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);
	const [selectLabel, setSelectLabel] = useState(0);
	const addContent = () => {
		dispatch(
			addFAQ({
				index: selectedComponent.item.choiceLabelIndex,
				id: null,
			})
		);
		setSelectLabel(bodySlice[selectedComponent.item.choiceLabelIndex]?.faq.length);
	};

	const handleTitle = (value) => {
		dispatch(
			question({
				index: selectedComponent.item.choiceLabelIndex,
				indexFaq: selectLabel,
				question: value,
			})
		);
	};

	const handleContent = (value) => {
		dispatch(
			answer({
				index: selectedComponent.item.choiceLabelIndex,
				indexFaq: selectLabel,
				answer: value,
			})
		);
	};

	const handleDeleteContent = () => {
		if (bodySlice[selectedComponent.item.choiceLabelIndex]?.faq[selectLabel]?.id != null) {
			const deleteDBFAQ = axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					"/faq-component/" +
					bodySlice[selectedComponent.item.choiceLabelIndex]?.faq[selectLabel]?.id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}
		dispatch(
			deleteFAQ({
				index: selectedComponent.item.choiceLabelIndex,
				indexFaq: selectLabel,
			})
		);
		setSelectLabel(0);
	};

	function removeBgFile(index) {
		dispatch(
			sectionComponentBg({
				index: selectedComponent.item.choiceLabelIndex,
				background_image: "",
			})
		);
	}
	function handleSetFile({ file, url }) {
		dispatch(
			sectionComponentBg({
				index: selectedComponent.item.choiceLabelIndex,
				background_image: url,
				background_file: file,
				background_type: file.type.split("/")[0],
			})
		);
	}

	return (
		<div className="mt-4 ">
			<h2 className="mb-2">
				<b>Content Label</b>
			</h2>
			{faqTemplateWithImage.includes(id_template) && (
				<div>
					<h3 className="text-[14px]">Thumbnail Image</h3>
					<UploadFileBigPreview
						accept={".svg,.jpeg,.jpg,.png,.gif,.mp4,.mov"}
						file={bodySlice[
							selectedComponent.item.choiceLabelIndex
						]?.components[0]?.background_image.replace(/"/g, "")}
						file_type={
							bodySlice[selectedComponent.item.choiceLabelIndex]?.components[0]?.background_type
						}
						handleSetFile={(image) => handleSetFile(image)}
						removeFile={(e) => {
							e.stopPropagation();
							removeBgFile(selectedComponent.item.choiceLabelIndex);
						}}
					/>
				</div>
			)}
			<div className="flex flex-nowrap gap-2 overflow-auto pb-4 hide-scrollbar">
				{bodySlice[selectedComponent.item.choiceLabelIndex]?.faq?.map((item, index) => (
					<Fragment key={index}>
						<Button
							key={index}
							onClick={(e) => setSelectLabel(index)}
							className={`text-[14px] flex gap-1 border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] ${
								selectLabel == index ? "bg-[#082691] text-white" : "bg-white text-[#082691]"
							}`}
						>
							FAQ{index + 1}
						</Button>
					</Fragment>
				))}
			</div>
			{bodySlice[selectedComponent.item.choiceLabelIndex]?.faq?.length > 0 ? (
				<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight ">
					<div className="p-2 ">
						<h2 className="mb-2 ">FAQ Title</h2>
						<Input
							onChange={(e) => handleTitle(e.target.value)}
							value={
								bodySlice[selectedComponent.item.choiceLabelIndex]?.faq[selectLabel]
									?.question == undefined
									? ""
									: bodySlice[selectedComponent.item.choiceLabelIndex]?.faq[selectLabel]
											?.question
							}
							placeholder="Question/title"
							className="w-[100%]  border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
						/>
					</div>
					<div className="p-2">
						<h2 className="mb-2 ">FAQ Content</h2>
						<textarea
							onChange={(e) => handleContent(e.target.value)}
							value={
								bodySlice[selectedComponent.item.choiceLabelIndex]?.faq[selectLabel]
									?.answer == undefined
									? ""
									: bodySlice[selectedComponent.item.choiceLabelIndex]?.faq[selectLabel]
											?.answer
							}
							placeholder="Answer/content"
							className="w-[100%]  border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
						/>
					</div>
				</div>
			) : (
				""
			)}

			<div className="flex gap-2">
				{selectLabel != 0 && (
					<Button
						onClick={handleDeleteContent}
						className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#F11010] text-[#F11010] bg-white hover:bg-[#F11010] hover:text-white"
					>
						Delete Label
					</Button>
				)}
				<Button
					onClick={addContent}
					className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white"
				>
					Add New Label
				</Button>
			</div>
		</div>
	);
};

export default FaqInputSection;
