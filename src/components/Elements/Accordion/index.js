import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useState } from "react";
import { PlusIcon, MinusIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const AccordionTemp = ({ question, children, styleQ, styleA, className, mtbody, type }) => {
	const [showDetail, setShowDetail] = useState(false);
	const { setSelectComponent, setFontComponent } = useStyleManagement();

	return (
		<div>
			<hr className="my-2"></hr>
			<div
				className="flex justify-between cursor-pointer"
				onClick={(e) => {
					e.stopPropagation();
					setSelectComponent("faq-font");
					setFontComponent("label");
					setShowDetail(!showDetail);
				}}
			>
				<h1 className={className} style={styleQ}>
					{question}
				</h1>
				{type === "type1" ? (
					showDetail == false ? (
						<PlusIcon className="w-6 h-6 my-auto text-[#333] text-opacity-50 hover:text-[#243E87]"></PlusIcon>
					) : (
						<MinusIcon className="w-6 h-6 my-auto text-[#333] text-opacity-50 hover:text-[#243E87]"></MinusIcon>
					)
				) : showDetail == false ? (
					<div className="p-1 border rounded-full border-[#333] hover:border-[#243E87]">
						<ChevronDownIcon className="w-6 h-6 my-auto text-[#333] text-opacity-50 hover:text-[#243E87]"></ChevronDownIcon>
					</div>
				) : (
					<div className="p-1 border rounded-full border-[#333] hover:border-[#243E87]">
						<ChevronUpIcon className="w-6 h-6 my-auto text-[#333] text-opacity-50 hover:text-[#243E87]"></ChevronUpIcon>
					</div>
				)}
			</div>
			<div style={styleA} className={`${mtbody} ${showDetail == false ? "hidden" : ""}`}>
				{children}
			</div>
			<hr className="my-2"></hr>
		</div>
	);
};

export default AccordionTemp;
