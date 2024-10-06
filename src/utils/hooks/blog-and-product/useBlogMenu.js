import { useDispatch, useSelector } from "react-redux";
import { handleMenuManagement, handleSectionSelection } from "@store/blog-and-product/menuSlice";

export const useBlogMenu = () => {
	const dispatch = useDispatch();

	const store = useSelector((state) => state.blogRootReducer.menuSlice);

	const setSelectedManagement = (value) => {
		dispatch(handleMenuManagement(value));
	};

	const setSectionSelection = (value) => {
		dispatch(handleSectionSelection(value));
	};

	return {
		selectedManagement: store.menuManagement.selectedMenu,
		setSelectedManagement,
		selectedSectionSelection: store.sectionSelection.selectedSection,
		setSectionSelection,
	};
};
