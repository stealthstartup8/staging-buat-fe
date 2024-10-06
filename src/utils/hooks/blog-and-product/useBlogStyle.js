import { useDispatch, useSelector } from "react-redux";
import { handleBackButtonText, handleBackgroundColor } from "@store/blog-and-product/styleSlice";

export const useBlogStyle = () => {
	const dispatch = useDispatch();

	const store = useSelector((state) => state.blogRootReducer.styleSlice);

	const setBackgroundColor = (value) => {
		dispatch(handleBackgroundColor(value));
	};

	const setBackButtonText = (value) => {
		dispatch(handleBackButtonText(value));
	};

	return {
		backgroundColor: store.backgroundStyle.backgroundColor,
		setBackgroundColor,
		backButtonText: store.backButton.text,
		setBackButtonText,
	};
};
