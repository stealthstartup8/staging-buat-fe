import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	handleButtonColorPicker,
	handleLabelColorPicker,
	handleBackgroundColorPicker,
	handleFontColorPicker,
	resetColorPickers,
	handleCategoryColorPicker,
	handleCommerceCardColorPicker,
	handleCommerceModalColorPicker,
} from "@store/body/colorPickerSlice";

// This hook is used to handle the color picker for the body component
// Use functions from this hook instead of straight from the slice
export const useColorPicker = () => {
	const dispatch = useDispatch();
	const colorPickerSlice = useSelector((state) => state.colorPickerSlice);
	const colorPickerRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
				dispatch(resetColorPickers());
			}
		};
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		// Cleanup the event listener on component unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dispatch]);

	const setShowTextColorPicker = (value) => {
		dispatch(handleButtonColorPicker({ type: "text" }));
	};
	const setShowButtonColorPicker = (value) => {
		dispatch(handleButtonColorPicker({ type: "button" }));
	};
	const setShowStrokeColorPicker = (value) => {
		dispatch(handleButtonColorPicker({ type: "stroke" }));
	};

	const setShowLabelTextColorPicker = (value) => {
		dispatch(handleLabelColorPicker({ type: "text" }));
	};
	const setShowLabelButtonColorPicker = (value) => {
		dispatch(handleLabelColorPicker({ type: "button" }));
	};
	const setShowLabelStrokeColorPicker = (value) => {
		dispatch(handleLabelColorPicker({ type: "stroke" }));
	};

	const setShowBackgroundColorPicker = (value) => {
		dispatch(handleBackgroundColorPicker(value));
	};
	const setShowLabelColorPicker = (value) => {
		dispatch(handleFontColorPicker({ type: "label" }));
	};
	const setShowHeadlineColorPicker = (value) => {
		dispatch(handleFontColorPicker({ type: "headline" }));
	};
	const setShowTaglineColorPicker = (value) => {
		dispatch(handleFontColorPicker({ type: "tagline" }));
	};
	const setShowECommerceColorPicker = (value) => {
		dispatch(handleButtonColorPicker({ type: value }));
	};
	const setShowCategoryColorColorPicker = (value) => {
		dispatch(handleCategoryColorPicker({ type: "color" }));
	};
	const setShowCategoryStrokeColorPicker = (value) => {
		dispatch(handleCategoryColorPicker({ type: "stroke" }));
	};
	const setShowCommerceCardColorColorPicker = (value) => {
		dispatch(handleCommerceCardColorPicker({ type: "color" }));
	};
	const setShowCommerceCardTextColorColorPicker = (value) => {
		dispatch(handleCommerceCardColorPicker({ type: "textColor" }));
	};
	const setShowCommerceCardStrokeColorPicker = (value) => {
		dispatch(handleCommerceCardColorPicker({ type: "stroke" }));
	};
	const setShowCommerceModalColorPicker = (value) => {
		dispatch(handleCommerceModalColorPicker({ type: "color" }));
	};
	return {
		colorPickerRef,
		setShowTextColorPicker,
		setShowButtonColorPicker,
		setShowStrokeColorPicker,
		setShowLabelTextColorPicker,
		setShowLabelButtonColorPicker,
		setShowLabelStrokeColorPicker,
		setShowBackgroundColorPicker,
		setShowLabelColorPicker,
		setShowHeadlineColorPicker,
		setShowTaglineColorPicker,
		setShowECommerceColorPicker,
		setShowCategoryColorColorPicker,
		setShowCategoryStrokeColorPicker,
		setShowCommerceCardColorColorPicker,
		setShowCommerceCardTextColorColorPicker,
		setShowCommerceCardStrokeColorPicker,
		setShowCommerceModalColorPicker,
		labelColorPicker: colorPickerSlice.labelColorPicker,
		buttonColorPicker: colorPickerSlice.buttonColorPicker,
		backgroundColorPicker: colorPickerSlice.backgroundColorPicker,
		fontColorPicker: colorPickerSlice.fontColorPicker,
		categoryColorPicker: colorPickerSlice.categoryColorPicker,
		commerceCardColorPicker: colorPickerSlice.commerceCardColorPicker,
		commerceModalColorPicker: colorPickerSlice.commerceModalColorPicker,
	};
};
