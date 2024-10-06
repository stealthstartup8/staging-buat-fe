import Button from "@/components/Elements/Button";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";

const MenuLogoSection = ({ selectComponent, setSelectComponent }) => {
	const { setFontComponent } = useStyleManagement();

	return (
		<div className="grid grid-cols-3 gap-1 mt-4">
			<Button
				onClick={(e) => setSelectComponent("logo")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "logo" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Logo
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

export default MenuLogoSection;
