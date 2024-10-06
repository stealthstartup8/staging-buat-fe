import Button from "@/components/Elements/Button";

const MenuFAQSection = ({ selectComponent, setSelectComponent }) => {
	return (
		<div className="grid grid-flow-row-dense grid-cols-4 mt-4 gap-1">
			<Button
				onClick={(e) => setSelectComponent("faq")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "faq" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				FAQ
			</Button>
			<Button
				onClick={(e) => setSelectComponent("faq-button")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "faq-button" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Button
			</Button>
			<Button
				onClick={(e) => setSelectComponent("faq-background")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "faq-background"
						? "text-white bg-[#082691] "
						: "text-[#082691] bg-white "
				}`}
			>
				Background
			</Button>
			<Button
				onClick={(e) => setSelectComponent("faq-font")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "faq-font" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Font
			</Button>
		</div>
	);
};

export default MenuFAQSection;
