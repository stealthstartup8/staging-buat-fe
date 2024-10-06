import { useEffect } from "react";

// HorizontalScrollWrapper is a component that will allow the user to scroll the children horizontally when the user scrolls down
const HorizontalScrollWrapper = ({ children }) => {
	useEffect(() => {
		const horizontalScrollElements = [...document.querySelectorAll(".horizontal-scroll-element")];

		// every section has its own width and container height, hence the for loop
		for (let i = 0; i < horizontalScrollElements.length; i++) {
			// sectionWidth will determine how many pixels the user can scroll horizontally
			const sectionWidth =
				horizontalScrollElements[i].getElementsByClassName("horizontal-scroll-item")[0].offsetWidth;

			// the horizontal-scroll-container height will determine how many pixels the user can scroll without moving vertically
			// need to add the window height in order to prevent the user from scrolling vertically
			horizontalScrollElements[i].parentElement.style.height = `${
				window.innerHeight + sectionWidth - window.innerWidth
			}px`;
		}

		function transform(section) {
			// offsetTop is the distance between the section and the top of the page
			const offsetTop = section.parentElement.offsetTop;
			const sectionWidth = section.getElementsByClassName("horizontal-scroll-item")[0].offsetWidth;
			// scrollSection is the element that will be moved horizontally
			const scrollSection = section.querySelector(".horizontal-scroll-section");

			// amount represents the amount of pixels the user has scrolled down
			let amount = window.scrollY - offsetTop;
			amount = amount < 0 ? 0 : amount; // if the user havent reached the section yet, the horizontal scroll would be 0
			if (amount < sectionWidth - window.innerWidth) {
				scrollSection.style.transform = `translate3d(-${amount}px,0,0)`; // move the section horizontally based on the scroll amount
			}
		}
		// add event listener to the window to listen for scroll event
		window?.addEventListener("scroll", () => {
			for (let i = 0; i < horizontalScrollElements.length; i++) {
				transform(horizontalScrollElements[i]); // loop through all the horizontal scroll elements and apply the transform function
			}
		});
	}, []);
	return (
		<div className="horizontal-scroll-container">
			<div className="horizontal-scroll-element overflow-hidden sticky top-0 h-screen ">
				<div className="horizontal-scroll-section will-change-transform flex justify-between items-center ">
					<div className="horizontal-scroll-item flex flex-shrink-0 h-screen ">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default HorizontalScrollWrapper;
