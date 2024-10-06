import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTemplate } from "@store/blog-and-product/templateBlogSlice";
import { addSection, moveDown } from "@store/sections";
import { addBody, moveDownBody } from "@store/body/bodySlice";
import { addHeroButton, moveDownButton } from "@store/body/buttonSlice";
import { addSectionFontStyle, moveDownFont } from "@store/body/fontSlice";
import { useRouter } from "next/router";
import { ARR_SELECTED_TEMPLATE_PREVIEW } from "@/utils/constants";
import { handleSectionComponentHero } from "@store/style-management";
import { addLabel, moveDownLabel } from "@store/body/labelSlice";

export const useTemplate = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [dropindex, setDropIndex] = useState(null);
	const [dropIndexSelected, setDropIndexSelected] = useState(null);

	const store = useSelector((state) => state.blogRootReducer.templateBlogSlice);
	const body_store = useSelector((state) => state.persistedReducer);

	const section_slice = body_store.sectionSlices;
	const bodySlice = body_store.bodySlice;
	const button_slice = body_store.buttonHeroSlice;
	const font_slice = body_store.fontSlices;
	const label_slice = body_store.labelSlice;

	const blogTemplate = store.templateList.filter((item) => item.idCategory === 6).map((item) => item);

	useEffect(() => {
		dispatch(getTemplate());
	}, []);

	const handleOnDrag = (e) => {
		e.dataTransfer.setData("section_id", e.target.id);
	};

	const handleOnDrop = (e, page_id) => {
		e.preventDefault();
		dispatch(handleSectionComponentHero(0));
		const template_id = e.dataTransfer.getData("section_id");
		let category_id = 0;
		for (let i = 0; i < store.templateList.length; i++) {
			if (store.templateList[i].id == template_id) {
				category_id = store.templateList[i].idCategory;
			}
		}

		if (section_slice.item[dropindex]?.order_index == dropindex) {
			for (let i = section_slice.item.length; i >= dropindex; i--) {
				dispatch(
					moveDown({
						index: i,
					})
				);
				dispatch(
					moveDownBody({
						index: i,
					})
				);
				dispatch(
					moveDownFont({
						index: i,
					})
				);
				dispatch(
					moveDownButton({
						index: i,
					})
				);
				dispatch(
					moveDownLabel({
						index: i,
					})
				);
			}
		}

		dispatch(
			addSection({
				id: null,
				id_page: page_id == undefined ? 9919 : page_id,
				id_template: parseInt(template_id),
				order_index: dropindex == 0 && section_slice.item.length == 0 ? 0 : dropindex,
				id_category: category_id,
				background_color: ARR_SELECTED_TEMPLATE_PREVIEW.includes(parseInt(template_id))
					? "rgb(255,255,255,1)"
					: "rgb(33,33,33,1)",
				background_image: "",
				background_file: "",
				background_type: "",
			})
		);

		dispatch(
			addBody({
				id_component: dropindex == 0 && section_slice.item.length == 0 ? 0 : dropindex,
				id_category: parseInt(category_id),
				data: "first data",
				id_template: parseInt(template_id),
			})
		);

		dispatch(
			addHeroButton({
				id: null,
				order_index: dropindex == 0 && section_slice.item.length == 0 ? 0 : dropindex,
				name: "Button",
				link: "",
				text_color: "rgba(255,255,255,1)",
				button_shape: "2",
				show_icon: false,
				icon: "",
				icon_file: "",
				button_color: "rgba(0,0,0,1)",
				stroke_color: "rgba(255,255,255,1)",
			})
		);

		dispatch(
			addLabel({
				id: null,
				text_color: "rgba(0,0,0,1)",
				shape: "1",
				show_icon: false,
				icon: "",
				icon_file: "",
				background_color: "rgba(255,255,255,0)",
				stroke_color: "rgba(0,0,0,1)",
				order_index: dropindex == 0 && section_slice.item.length == 0 ? 0 : dropindex,
			})
		);

		dispatch(
			addSectionFontStyle({
				content: "initial",
				order_index: dropindex == 0 && section_slice.item.length == 0 ? 0 : dropindex,
				category: parseInt(category_id),
				template: parseInt(template_id),
			})
		);

		setDropIndexSelected(null);
	};

	const handleOnDragOver = (e, index) => {
		e.preventDefault();
		setDropIndexSelected(index);
		setDropIndex(index);
	};

	return {
		blogTemplate: blogTemplate,
		section_slice: section_slice,
		body_slice: bodySlice,
		button_slice: button_slice,
		label_slice: label_slice,
		font_slice: font_slice,
		handleOnDrag,
		handleOnDragOver,
		handleOnDrop,
		dropIndexSelected: dropIndexSelected,
		setDropIndexSelected,
	};
};
