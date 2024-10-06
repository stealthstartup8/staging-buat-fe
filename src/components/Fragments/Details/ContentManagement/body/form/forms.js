import { useEffect, useState } from "react";
import { useTemplate } from "@/utils/hooks/useTemplate";
import { useBody } from "@/utils/hooks/useBody";
import { sectionComponentBg, selectForm } from "@store/body/bodySlice";
import { useDispatch } from "react-redux";
import UploadFileBigPreview from "@/components/Elements/UploadFile/BigPreview";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const FormManagementSection = ({ user_token, sectionComponentHero, website_id }) => {
	const dispatch = useDispatch();
	const { body_slice } = useTemplate();
	const { select_section } = useBody();
	const [listCategory, setListCategory] = useState([]);

	useEffect(() => {
		getCategory();
	}, []);

	function handleSetThumbnail({ file, url }, index) {
		dispatch(
			sectionComponentBg({
				index: index,
				background_image: url,
				background_file: file,
				background_type: "images",
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

	const getCategory = async () => {
		try {
			const res = await axios.get(
				process.env.NEXT_PUBLIC_API_KEY + `/category-form/get-by-web/${website_id}`,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
			setListCategory(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="overflow-y-scroll overflow-x-hidden  content-scrollbar mt-4 pr-1">
			<h2 className="mb-2">
				<b>Form</b>
			</h2>
			<div className=" text-sm ">
				<Link
					href={"/form"}
					target="_blank"
					className="flex items-center justify-center mb-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white"
				>
					<PencilSquareIcon className="w-5 h-5 mr-2" />
					Add/edit Form
				</Link>
			</div>
			<div className="text-sm bg-[#F5F5F5] rounded-md p-2">
				<div className="p-2">
					<h2 className="mb-1 ">Form Title/Category</h2>
					<select
						onChange={(e) => {
							dispatch(
								selectForm({
									index: select_section.item.choiceLabelIndex,
									id_category: e.target.value,
								})
							);
						}}
						className="w-[100%] py-2 focus:outline-none border border-2 rounded-md mt-2"
					>
						<option value="">Select Category</option>
						{listCategory.map((item, index) => (
							<option
								key={index}
								selected={
									item.id ==
									body_slice.item?.[select_section.item.choiceLabelIndex]?.form_detail
										?.id_category
										? true
										: false
								}
								value={item.id}
							>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<div className="p-2 pb-0">
					<h2 className="">Thumbnail Image (optional)</h2>
					<div className="mt-4">
						<UploadFileBigPreview
							accept={".svg,.jpeg,.jpg,.png,.gif,.mp4"}
							file={
								body_slice.item[select_section.item.choiceLabelIndex]?.components?.[0]
									?.background_image == undefined
									? ""
									: body_slice.item[
											select_section.item.choiceLabelIndex
										]?.components?.[0]?.background_image.replace(/^"|"$/g, "")
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
			</div>
		</div>
	);
};

export default FormManagementSection;
