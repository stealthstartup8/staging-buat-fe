"use client";

import { useState, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";

function createWrapperAndAppendToBody(wrapperID) {
	if (!document) return null;
	const wrapperElement = document.createElement("div");
	wrapperElement.setAttribute("id", wrapperID);
	document.body.appendChild(wrapperElement);
	return wrapperElement;
}

function Portal({ children, wrapperID, isOpen }) {
	const [wrapperElement, setWrapperElement] = useState(null);

	// Use useEffect to handle disabling/enabling scroll when the modal is open/closed
	useEffect(() => {
		if (isOpen) {
			// Disable scrolling
			document.documentElement.style.overflow = "hidden";
		} else {
			// Enable scrolling
			document.documentElement.style.overflow = "";
		}

		// Clean up the effect
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [isOpen]);

	// Use useLayoutEffect to ensure DOM operations are done before painting
	useLayoutEffect(() => {
		let element = document.getElementById(wrapperID);
		let systemCreated = false;

		// If element is not found with wrapperID or wrapperID is not provided,
		// create and append to body
		if (!element) {
			systemCreated = true;
			element = createWrapperAndAppendToBody(wrapperID);
		}
		setWrapperElement(element);

		return () => {
			// Delete the programmatically created element
			if (systemCreated && element?.parentNode) {
				element.parentNode.removeChild(element);
			}
		};
	}, [wrapperID]);

	// Return null on the very first render until the wrapper element is set
	if (!wrapperElement) return null;

	return isOpen ? createPortal(children, wrapperElement) : null;
}

export default Portal;
