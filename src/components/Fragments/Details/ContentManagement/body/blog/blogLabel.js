import Button from "@/components/Elements/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { cn } from "@/utils/helpers/ClassName";
import LabelCoreSection from "../labelCore";
import { Fragment } from "react";
import { add_blog_component, blog_component, delete_blog_component } from "@store/body/bodySlice";
const BlogLabel = ({ sectionComponentHero, setSelectedSection, user_token, website_id, id_section }) => {
	const dispatch = useDispatch();
	const [selectedLabel, setSelectedLabel] = useState("");
	const [selectedTitle, setSelectedTitle] = useState("");

	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);
	const bodySlice = useSelector((state) => state.persistedReducer.bodySlice);
	const blog_data = useSelector((state) => state.blogSlice.blog_data);
	const label_data = useSelector((state) => state.blogSlice.label_data);

	function sendData(index) {
		setSelectedSection(index);
	}

	const deleteBlogSelected = () => {
		if (
			bodySlice.item[selectedComponent.item.choiceLabelIndex].blog_detail[sectionComponentHero].id !=
			null
		) {
			const deleteBlog = axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					`/section-blog/` +
					bodySlice.item[selectedComponent.item.choiceLabelIndex].blog_detail[sectionComponentHero]
						.id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}
		dispatch(
			delete_blog_component({
				index: selectedComponent.item.choiceLabelIndex,
				indexBlog: sectionComponentHero,
			})
		);
	};
	const onChangeBlogComponents = (id_label, value) => {
		dispatch(
			blog_component({
				index: selectedComponent.item.choiceLabelIndex,
				indexBlog: sectionComponentHero,
				id_label: id_label,
				id_blog: value,
			})
		);
	};

	return (
		<div className="mt-4 overflow-y-auto content-scrollbar pr-1">
			<h2 className="mb-2">
				<b>Content Label</b>
			</h2>
			<div className="flex flex-nowrap gap-2 overflow-auto pb-4">
				{bodySlice.item[selectedComponent.item.choiceLabelIndex]?.blog_detail?.map((item, index) => (
					<Fragment key={index}>
						<Button
							onClick={(e) => sendData(index)}
							className={`${
								index == sectionComponentHero
									? "bg-[#082691] text-white"
									: "text-[#082691] bg-white"
							} text-[14px] flex gap-1 border border-1 rounded-md px-2 py-2 border-[#082691]`}
						>
							Label&nbsp;{index + 1}
						</Button>
					</Fragment>
				))}
			</div>
			<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
				<div className="p-2">
					<h2 className="mb-2 ">Blog Label</h2>
					<select
						name="cars"
						id="button"
						className="w-[100%] p-2 focus:outline-none"
						defaultValue={selectedLabel}
						onChange={(e) => {
							setSelectedLabel(e.target.value);
							onChangeBlogComponents(e.target.value, "");
						}}
					>
						<option value="" selected>
							Select Label
						</option>
						{label_data?.length > 0 &&
							label_data.map((item, index) => (
								<option
									value={item.id}
									selected={
										selectedLabel !== "" &&
										bodySlice.item[selectedComponent.item.choiceLabelIndex]?.blog_detail[
											sectionComponentHero
										]?.id_label === item.id
									}
									key={index}
								>
									{item.name}
								</option>
							))}
					</select>
				</div>
				<div className={cn("p-2", selectedLabel === "" ? "opacity-50" : "")}>
					<h2 className="mb-2 ">Blog Title</h2>
					<select
						name="cars"
						id="button"
						className="w-[100%] p-2 focus:outline-none"
						defaultValue={selectedTitle}
						disabled={selectedLabel === ""}
						onChange={(e) => {
							onChangeBlogComponents(selectedLabel, e.target.value);
							setSelectedTitle(e.target.value);
						}}
					>
						<option value="" selected>
							Show All
						</option>
						{selectedLabel != "" && (
							<>
								{blog_data
									.filter((blog) => {
										return blog.labels.some((label) => label.labelId == selectedLabel);
									})
									?.map((item, index) => (
										<option
											value={item.id}
											selected={
												bodySlice.item[selectedComponent.item.choiceLabelIndex]
													?.blog_detail[sectionComponentHero]?.id_blog === item.id
											}
											key={index}
										>
											{item.title}
										</option>
									))}
							</>
						)}
					</select>
				</div>
				{selectedComponent.item.choiceIdTemplate != 6010 &&
					selectedComponent.item.choiceIdTemplate != 6011 &&
					selectedComponent.item.choiceIdTemplate != 6012 && <LabelCoreSection />}
			</div>
			<div className="flex gap-2">
				{sectionComponentHero != 0 && (
					<Button
						onClick={(e) => {
							deleteBlogSelected();
							sendData(0);
						}}
						className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#F11010] text-[#F11010] bg-white hover:bg-[#F11010] hover:text-white"
					>
						Delete Section
					</Button>
				)}
				<Button
					onClick={(e) => {
						dispatch(
							add_blog_component({
								index: selectedComponent.item.choiceLabelIndex,
								indexBlog: sectionComponentHero,
								id_label: blog_data
									.find((item) => item.id == selectedTitle)
									?.blog_label?.filter((labelItem) =>
										labelItem.label_tags.name.includes(selectedLabel)
									)[0].label_tags.id,
								id_blog: selectedTitle,
							})
						);
						setSelectedSection(
							bodySlice.item[selectedComponent.item.choiceLabelIndex].blog_detail.length
						);
					}}
					className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white"
				>
					Add Section
				</Button>
			</div>
		</div>
	);
};

export default BlogLabel;
