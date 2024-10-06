import { useMediaQuery } from "react-responsive";

export const useFontSize = () => {
	const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

	const getHeadlineFontSize = (size) => {
		switch (size) {
			case "lg":
				return isTabletOrDesktop ? "4.5rem" : "3.3.375rem";
			case "md":
				return isTabletOrDesktop ? "3.5rem" : "2.375rem";
			case "sm":
				return isTabletOrDesktop ? "2rem" : "0.875rem";
			default:
				return isTabletOrDesktop ? "3.5rem" : "2.375rem";
		}
	};

	const getSmallerHeadlineFontSize = (size) => {
		switch (size) {
			case "lg":
				return "24px";
			case "md":
				return "18px";
			case "sm":
				return "14px";
			default:
				return "18px";
		}
	};

	const getLabelFontSize = (size) => {
		switch (size) {
			case "lg":
				return "24px";
			case "md":
				return "18px";
			case "sm":
				return "14px";
			default:
				return "18px";
		}
	};

	const getFooterHeadlineFontSize = (size) => {
		switch (size) {
			case "lg":
				return "32px";
			case "md":
				return "28px";
			case "sm":
				return "24px";
			default:
				return "24px";
		}
	};

	const getFooterTaglineFontSize = (size) => {
		switch (size) {
			case "lg":
				return "24px";
			case "md":
				return "20px";
			case "sm":
				return "16px";
			default:
				return "16px";
		}
	};

	const getTaglineFontSize = (size) => {
		switch (size) {
			case "lg":
				return "1.125rem";
			case "md":
				return "1rem";
			case "sm":
				return "0.875rem";
			default:
				return "1rem";
		}
	};

	const getButtonFontSize = (size) => {
		switch (size) {
			case "lg":
				return "1.125rem";
			case "md":
				return "1rem";
			case "sm":
				return "0.875rem";
			default:
				return "1rem";
		}
	};

	const getLargerButtonFontSize = (size) => {
		switch (size) {
			case "lg":
				return isTabletOrDesktop ? "2.25rem" : "1.6875rem";
			case "md":
				return isTabletOrDesktop ? "1.75rem" : "1.1875rem";
			case "sm":
				return isTabletOrDesktop ? "1rem" : "0.4375rem";
			default:
				return isTabletOrDesktop ? "1.75rem" : "1.1875rem";
		}
	};

	const getNavbarFontSize = (size) => {
		switch (size) {
			case "lg":
				return "1.125rem";
			case "md":
				return "1rem";
			case "sm":
				return "0.875rem";
			default:
				return "1rem";
		}
	};

	return {
		getHeadlineFontSize,
		getSmallerHeadlineFontSize,
		getLabelFontSize,
		getNavbarFontSize,
		getTaglineFontSize,
		getButtonFontSize,
		getLargerButtonFontSize,
		getFooterHeadlineFontSize,
		getFooterTaglineFontSize,
	};
};
