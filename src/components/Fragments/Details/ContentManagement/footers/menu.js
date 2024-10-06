import Button from "@/components/Elements/Button";

const MenuFootersSection = ({ selectComponent, setSelectComponent }) => {
	return (
		<div className="flex gap-1 overflow-y-auto content-scrollbar mt-4 pr-1  w-[100%] flex-wrap">
			<Button
				onClick={(e) => setSelectComponent("company")}
				className={`text-[10px] px-2 border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "company" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Background
			</Button>
			<Button
				onClick={(e) => setSelectComponent("footer-navigation")}
				className={`text-[10px] px-2 border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "footer-navigation"
						? "text-white bg-[#082691] "
						: "text-[#082691] bg-white "
				}`}
			>
				Navigation
			</Button>
			<Button
				onClick={(e) => setSelectComponent("footer-social")}
				className={`text-[10px] px-2 border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "footer-social"
						? "text-white bg-[#082691] "
						: "text-[#082691] bg-white "
				}`}
			>
				Social
			</Button>
			<Button
				onClick={(e) => setSelectComponent("footer-information")}
				className={`text-[10px] px-2 border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "footer-information"
						? "text-white bg-[#082691] "
						: "text-[#082691] bg-white "
				}`}
			>
				Info
			</Button>
			<Button
				onClick={(e) => setSelectComponent("footer-font")}
				className={`text-[10px] px-2 border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "footer-font" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Font
			</Button>
		</div>
	);
};

export default MenuFootersSection;
