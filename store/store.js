"use client";
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import defaultStorage from "./storage";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";
import sectionSlices from "./sections";
import addChangeChoice from "./selectSection";
import buttonHeroSlice from "./body/buttonSlice";
import fontSlices from "./body/fontSlice";
import labelSlice from "./body/labelSlice";
import navigationMenuSlice from "./menu/navigationSlice";
import navigationLogoSlice from "./menu/logoSlice";
import navigationFontSlice from "./menu/fontSlice";
import navigationButtonSlice from "./menu/buttonSlice";
import footerCompany from "./footer/companySlice";
import navigationFooterSlice from "./footer/navigationSlice";
import informationFooterSlice from "./footer/informationSlice";
import socialFooterSlice from "./footer/socialSlice";
import footerFontSlice from "./footer/fontSlice";
import bodySlice from "./body/bodySlice";
import navbarSlice from "./navbar";
import footerSlice from "./footer";
import blogRootReducer from "./blog-and-product/rootReducer";
import styleManagement from "./style-management";
import colorPickerSlice from "./body/colorPickerSlice";
import formSlice from "./forms";
import eCommerceSlice from "./e-commerce";
import pricingSlice from "./pricing";
import jobVacancySlice from "./job-vacancy";
import blogSlice from "./blog";
import websiteSlices from "./website";
import googleFontSlice from "./googlefont";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";
import { PERSIST, PURGE, REHYDRATE, REGISTER, FLUSH, PAUSE } from "redux-persist/lib/constants";

const persistConfig = {
	key: "root",
	// storage: globalThis.indexedDB
	// 	? createIdbStorage({ name: "varnionCMS", storeName: "varnion-IDB" })
	// 	: defaultStorage,
	storage: defaultStorage,
	serialize: true,
};

// how you access slices inside the combined reducer:
// const bodySlice = useSelector((state) => state.persistedReducer.bodySlice);
// because the persistedreducer is not spreaded inside the configureStore
const reducers = combineReducers({
	navbarSlice: navbarSlice,
	bodySlice: bodySlice,
	sectionSlices: sectionSlices,
	footerSlice: footerSlice,
	addChangeChoice: addChangeChoice,
	buttonHeroSlice: buttonHeroSlice,
	fontSlices: fontSlices,
	labelSlice: labelSlice,
	navigationMenuSlice: navigationMenuSlice,
	navigationLogoSlice: navigationLogoSlice,
	navigationFontSlice: navigationFontSlice,
	navigationButtonSlice: navigationButtonSlice,
	footerCompany: footerCompany,
	navigationFooterSlice: navigationFooterSlice,
	informationFooterSlice: informationFooterSlice,
	socialFooterSlice: socialFooterSlice,
	footerFontSlice: footerFontSlice,
	styleManagementSlice: styleManagement,
	websiteSlices: websiteSlices,
	colorPickerSlice: colorPickerSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: {
		blogRootReducer,
		persistedReducer,
		colorPickerSlice: colorPickerSlice,
		formSlice: formSlice,
		eCommerceSlice: eCommerceSlice,
		pricingSlice: pricingSlice,
		jobVacancySlice: jobVacancySlice,
		blogSlice: blogSlice,
		googleFontSlice: googleFontSlice,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).prepend(
			createStateSyncMiddleware({
				predicate: (action) => {
					const blacklist = [PERSIST, PURGE, REHYDRATE, REGISTER, FLUSH, PAUSE];
					if (typeof action !== "function") {
						if (Array.isArray(blacklist)) {
							return blacklist.indexOf(action.type) < 0;
						}
					}
					return false;
				},
				channel: "root",
			})
		),
});

initMessageListener(store);
