import Button from "@/components/Elements/Button";

const MenuBlogSection = ({ selectComponent, setSelectComponent }) => {
	return (
		<div className="grid grid-cols-4 gap-1 mt-4 ">
			<Button
				onClick={(e) => setSelectComponent("blogLabel")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "blogLabel" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Label
			</Button>
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

export default MenuBlogSection;
