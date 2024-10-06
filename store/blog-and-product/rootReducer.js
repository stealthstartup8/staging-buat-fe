import { combineReducers } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import styleSlice from "./styleSlice";
import templateBlogSlice from "./templateBlogSlice";

const blogRootReducer = combineReducers({
	menuSlice,
	styleSlice,
	templateBlogSlice,
});

export default blogRootReducer;
