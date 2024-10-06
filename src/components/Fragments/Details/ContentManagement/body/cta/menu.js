import Button from "@/components/Elements/Button";

const MenuCTASection = ({ selectComponent, setSelectComponent }) => {
	return (
		<div className="grid grid-cols-3 gap-1  overflow-y-auto content-scrollbar mt-4 pr-1">
			<Button
				onClick={(e) => setSelectComponent("button")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "button" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Button
			</Button>
			<Button
				onClick={(e) => setSelectComponent("background")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "background" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Background
			</Button>
			<Button
				onClick={(e) => setSelectComponent("font")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "font" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Font
			</Button>
		</div>
	);
};

export default MenuCTASection;
