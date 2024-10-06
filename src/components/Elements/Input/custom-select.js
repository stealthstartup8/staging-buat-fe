import { OBJ_SHAPES } from "@/utils/constants/Shapes";
import React, { useState } from "react";
import { cn } from "@/utils/helpers/ClassName";
const CustomSelect = ({ initialSelect, handleSelectedOption, className, expand = "bottom" }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(OBJ_SHAPES[initialSelect]);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option) => {
		setSelectedOption(OBJ_SHAPES[option]);
		handleSelectedOption(option);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				onClick={toggleDropdown}
				className={`bg-white rounded-md shadow-sm px-4 py-2 w-full text-left focus:outline-none focus:ring-0 focus:ring-indigo-500 ${className}`}
			>
				{selectedOption ? selectedOption : "Select Shape"}
			</button>
			{isOpen && (
				<div
					className={cn(
						"absolute z-10  w-full bg-white rounded-md shadow-lg p-2 ",
						expand == "top"
							? "bottom-full mb-1 flex flex-col-reverse"
							: "top-0 mt-1 flex flex-col"
					)}
				>
					{Object.entries(OBJ_SHAPES).map(([key, ShapeComponent]) => (
						<button
							key={key}
							onClick={() => handleOptionClick(key)}
							className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b-2 border-gray-200"
						>
							<ShapeComponent />
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
