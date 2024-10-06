import Button from "@/components/Elements/Button";

const MenuNavbarSection = ({ selectComponent, setSelectComponent }) => {
	return (
		<div className="flex flex-wrap gap-1 mt-4">
			<Button
				onClick={(e) => setSelectComponent("navbar-navigation")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] flex-auto ${
					selectComponent == "navbar-navigation"
						? "text-white bg-[#082691] "
						: "text-[#082691] bg-white "
				}`}
			>
				Button
			</Button>
			<Button
				onClick={(e) => setSelectComponent("navbar-logo")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] flex-auto ${
					selectComponent == "navbar-logo" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Logo & Color
			</Button>
			<Button
				onClick={(e) => setSelectComponent("navbar-button")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] flex-auto ${
					selectComponent == "navbar-button"
						? "text-white bg-[#082691] "
						: "text-[#082691] bg-white "
				}`}
			>
				CTA
			</Button>
			<Button
				onClick={(e) => setSelectComponent("navbar-font")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] flex-auto ${
					selectComponent == "navbar-font" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Font
			</Button>
		</div>
	);
};

export default MenuNavbarSection;
