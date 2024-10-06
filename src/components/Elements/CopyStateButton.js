import Button from "./Button";
import { useSelector } from "react-redux";
import LZUTF8 from "lzutf8";
const CopyStateButton = () => {
	const menuState = {
		navbarSlice: useSelector((state) => state.persistedReducer.navbarSlice),
		navigationMenuSlice: useSelector((state) => state.persistedReducer.navigationMenuSlice),
		navigationLogoSlice: useSelector((state) => state.persistedReducer.navigationLogoSlice),
		navigationFontSlice: useSelector((state) => state.persistedReducer.navigationFontSlice),
		navigationButtonSlice: useSelector((state) => state.persistedReducer.navigationButtonSlice),
	};

	const footerState = {
		footerSlice: useSelector((state) => state.persistedReducer.footerSlice),
		footerCompany: useSelector((state) => state.persistedReducer.footerCompany),
		navigationFooterSlice: useSelector((state) => state.persistedReducer.navigationFooterSlice),
		informationFooterSlice: useSelector((state) => state.persistedReducer.informationFooterSlice),
		socialFooterSlice: useSelector((state) => state.persistedReducer.socialFooterSlice),
		footerFontSlice: useSelector((state) => state.persistedReducer.footerFontSlice),
	};

	const sectionState = {
		bodySlice: useSelector((state) => state.persistedReducer.bodySlice),
		sectionSlices: useSelector((state) => state.persistedReducer.sectionSlices),
		buttonHeroSlice: useSelector((state) => state.persistedReducer.buttonHeroSlice),
		fontSlices: useSelector((state) => state.persistedReducer.fontSlices),
		labelSlice: useSelector((state) => state.persistedReducer.labelSlice),
		styleManagementSlice: useSelector((state) => state.persistedReducer.styleManagementSlice),
	};
	// const addChangeChoice = useSelector((state) => state.persistedReducer.addChangeChoice);
	// const websiteSlices = useSelector((state) => state.persistedReducer.websiteSlices);
	// const colorPickerSlice = useSelector((state) => state.persistedReducer.colorPickerSlice);

	const handleCopyState = () => {
		const encodedMenu = LZUTF8.encodeBase64(LZUTF8.compress(JSON.stringify(menuState)));
		console.log("menu");
		console.log(encodedMenu);
		console.log(JSON.parse(LZUTF8.decompress(LZUTF8.decodeBase64(encodedMenu))));

		const encodedSection = LZUTF8.encodeBase64(LZUTF8.compress(JSON.stringify(sectionState)));
		console.log("section");
		console.log(encodedSection);
		console.log(JSON.parse(LZUTF8.decompress(LZUTF8.decodeBase64(encodedSection))));

		const encodedFooter = LZUTF8.encodeBase64(LZUTF8.compress(JSON.stringify(footerState)));
		console.log("footer");
		console.log(encodedFooter);
		console.log(JSON.parse(LZUTF8.decompress(LZUTF8.decodeBase64(encodedFooter))));
	};
	return <Button onClick={handleCopyState}>Copy State</Button>;
};

export default CopyStateButton;
