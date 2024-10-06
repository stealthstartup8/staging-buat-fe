import { useDispatch, useSelector } from "react-redux";
import {
	handleFontComponent,
	handleSectionComponentHero,
	handleSectionId,
	handleSelectComponent,
	handleSelectIndexComponent,
	handleSelectManagement,
	handleSelectSection,
} from "@store/style-management";
import { addChangeChoice } from "@store/selectSection";

export const useStyleManagement = () => {
	const dispatch = useDispatch();

	const bodySlice = useSelector((state) => state.persistedReducer.bodySlice);
	const sectionSelect = useSelector((state) => state.persistedReducer.sectionSlices);
	const navbarSlice = useSelector((state) => state.persistedReducer.navbarSlice);
	const footerSlice = useSelector((state) => state.persistedReducer.footerSlice);
	const style_management = useSelector((state) => state.persistedReducer.styleManagementSlice);

	const setSelectComponent = (value) => {
		dispatch(handleSelectComponent(value));
	};

	const setSelectSection = (value) => {
		dispatch(handleSelectSection(value));
	};

	const setSelectManagement = (value) => {
		dispatch(handleSelectManagement(value));
	};

	const setStateOnDeleteSection = () => {
		// call this function BEFORE deleting the section from the body slice
		// why? because even if you call this function after the deletion function, the state wont update immediately (mainly the body slice because its used a lot in this function)
		// so, to avoid logic error, we decide to make this function to be called before the deletion function
		const navbar_exist = navbarSlice.item.data == "available";
		const footer_exist = footerSlice.item.data == "available";

		// newIndex is the index of the next selected section after deletion
		const newIndex =
			style_management.selectManagement === bodySlice.item.length && bodySlice.item.length !== 1 // if its the last body section with more than 1 body section left, then select the previous element
				? style_management.selectManagement - 1
				: bodySlice.item.length !== 1 // if its not, but there is still more than 1 body section left, then dont change the index
					? style_management.selectManagement
					: navbar_exist // if theres 1 body section left, and navbar exist, then select navbar
						? "menus"
						: footer_exist // if theres 1 body section left, and navbar doesnt exist, but footer exist, then select footer
							? "footers" // if nothing exists (empty canvas), then clear the management menu
							: -1;

		dispatch(handleSelectManagement(newIndex));

		if (newIndex !== -1 && newIndex !== "menus" && newIndex !== "footers") {
			if (
				bodySlice.item?.[sectionSelect.item[newIndex].order_index]?.components.length - 1 <
				style_management.sectionComponentHero
			) {
				dispatch(handleSectionComponentHero(0));
			}
			dispatch(
				addChangeChoice({
					choiceIdPages: parseInt(sectionSelect.item[newIndex].id_page),
					choiceIdCategory: sectionSelect.item[newIndex].id_category,
					choiceIdTemplate: sectionSelect.item[newIndex].id_template,
					choiceIdComponent: sectionSelect.item[newIndex].order_index,
					choiceLabelIndex: sectionSelect.item[newIndex].order_index,
				})
			);
		}

		// this will clear the component selection
		dispatch(handleSelectComponent("clear"));

		// this will select the section based on the category of the new selected section
		// needed bodyIndex because newIndex take into account the navbar
		let id_category;
		if (newIndex === -1) {
			id_category = -1;
		} else if (newIndex === "menus") {
			id_category = 1;
		} else if (newIndex === "footers") {
			id_category = 2;
		} else {
			// remember that the section is not yet deleted from bodyslice
			const bodyIndex =
				style_management.selectManagement === bodySlice.item.length ? newIndex - 1 : newIndex;
			id_category = bodySlice.item[bodyIndex]?.id_category;
		}
		if (id_category === -1) {
			// case where canvas is empty
			dispatch(handleSelectSection(""));
		} else if (id_category === 1) {
			// this is navbar
			dispatch(handleSelectSection("menus"));
		} else if (id_category === 2) {
			dispatch(handleSelectSection("footers"));
		} else if (id_category === 3) {
			dispatch(handleSelectSection("hero"));
		} else if (id_category === 4) {
			dispatch(handleSelectSection("faq's"));
		} else if (id_category === 5) {
			dispatch(handleSelectSection("cta"));
		} else if (id_category === 6) {
			dispatch(handleSelectSection("blog"));
		} else if (id_category === 7) {
			dispatch(handleSelectSection("blogDetails"));
		} else if (id_category === 9) {
			dispatch(handleSelectSection("form"));
		} else if (id_category === 10) {
			dispatch(handleSelectSection("logo"));
		} else if (id_category === 11) {
			dispatch(handleSelectSection("career"));
		} else if (id_category === 12) {
			dispatch(handleSelectSection("pricing"));
		} else if (id_category === 13) {
			dispatch(handleSelectSection("commerce"));
		}

		// if its the last body section to delete, the new index must be any of those 3.
		// hence the sectionid would be the first element of the sectionselect's item
		const sectionId =
			newIndex === -1 || newIndex === "menus" || newIndex === "footers"
				? null
				: // just like bodyslice's item, sectionselect's item starts with the index 0, hence the condition below
					style_management.selectManagement === bodySlice.item.length
					? sectionSelect.item[newIndex - 1].id
					: sectionSelect.item[newIndex].id;
		dispatch(handleSectionId(sectionId));
	};

	const setSectionId = (value) => {
		dispatch(handleSectionId(value));
	};

	const setSectionComponentHero = (value) => {
		dispatch(handleSectionComponentHero(value));
	};

	const setFontComponent = (value) => {
		dispatch(handleFontComponent(value));
	};

	const setIndexComponent = (value) => {
		dispatch(handleSelectIndexComponent(value));
	};

	const setSectionSelected = (index) => {
		dispatch(handleSelectManagement(sectionSelect.item[index].order_index + 1));

		if (
			bodySlice.item?.[sectionSelect.item[index].order_index]?.components.length - 1 <
			style_management.sectionComponentHero
		) {
			dispatch(handleSectionComponentHero(0));
		}

		dispatch(handleSectionId(sectionSelect.item[index].id));

		dispatch(
			addChangeChoice({
				choiceIdPages: parseInt(sectionSelect.item[index].id_page),
				choiceIdCategory: sectionSelect.item[index].id_category,
				choiceIdTemplate: sectionSelect.item[index].id_template,
				choiceIdComponent: sectionSelect.item[index].order_index + 1,
				choiceLabelIndex: sectionSelect.item[index].order_index,
			})
		);
	};

	const setCategorySelected = (id_category, from) => {
		if (id_category == 3) {
			if (from == "section") {
				setSelectComponent("label");
			}
			setSelectSection("hero");
		} else if (id_category == 4) {
			if (from == "section") {
				setSelectComponent("faq");
			}
			setSelectSection("faq's");
		} else if (id_category == 5) {
			if (from == "section") {
				setSelectComponent("background");
			}
			setSelectSection("cta");
		} else if (id_category == 6) {
			if (from == "section") {
				setSelectComponent("blogLabel");
			}
			setSelectSection("blog");
		} else if (id_category == 7) {
			if (from == "section") {
				setSelectComponent("background");
			}
			setSelectSection("blogDetails");
		} else if (id_category == 9) {
			if (from == "section") {
				setSelectComponent("forms");
			}
			setSelectSection("form");
		} else if (id_category == 10) {
			if (from == "section") {
				setSelectComponent("logo");
			}
			setSelectSection("logo");
		} else if (id_category == 11) {
			if (from == "section") {
				setSelectComponent("careerLabel");
			}
			setSelectSection("career");
		} else if (id_category == 12) {
			if (from == "section") {
				setSelectComponent("pricing");
			}
			setSelectSection("pricing");
		} else if (id_category == 13) {
			if (from == "section") {
				setSelectComponent("commerce-category");
			}
			setSelectSection("commerce");
		}
	};

	const onClickSection = (e, index, id_category) => {
		e.preventDefault();
		setCategorySelected(id_category, "section");
		setSectionSelected(index);
	};

	const onClickNavbarComponent = (value) => {
		setSelectManagement("menus");
		setSelectSection("menus");
		setSelectComponent(value);
	};

	const onClickInnerComponent = (e, sectionValue, componentValue, fontValue, section) => {
		e.preventDefault();

		setSelectManagement(sectionValue);
		setSelectComponent(componentValue);

		setCategorySelected(section.id_category, "component");

		if (section != undefined) {
			setSectionSelected(section.order_index);
		}

		if (componentValue === "font" || componentValue === "faq-font") {
			setFontComponent(fontValue);
		}
	};

	return {
		onClickSection,
		selectSection: style_management.selectSection,
		selectComponent: style_management.selectComponent,
		sectionComponentHero: style_management.sectionComponentHero,
		selectManagement: style_management.selectManagement,
		sectionId: style_management.sectionId,
		fontComponent: style_management.fontComponent,
		indexComponent: style_management.selectIndexComponent,
		setSelectComponent,
		setSelectSection,
		setSelectManagement,
		setStateOnDeleteSection,
		setSectionId,
		setSectionComponentHero,
		setFontComponent,
		setIndexComponent,
		onClickNavbarComponent,
		onClickInnerComponent,
	};
};
