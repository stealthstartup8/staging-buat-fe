import Button from "@/components/Elements/Button";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";

const MenuPricingSection = ({ selectComponent, setSelectComponent }) => {
	const { setFontComponent } = useStyleManagement();

	return (
		<div className="grid grid-cols-4 gap-1 mt-4">
			<Button
				onClick={() => setSelectComponent("pricing-package")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "pricing-package"
						? "text-white bg-[#082691] "
						: "text-[#082691] bg-white "
				}`}
			>
				Category
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
				onClick={(e) => {
					setFontComponent("headline");
					setSelectComponent("font");
				}}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "font" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Font
			</Button>
		</div>
	);
};

export default MenuPricingSection;
