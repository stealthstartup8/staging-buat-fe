import Button from "@/components/Elements/Button";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";

const MenuFormSection = ({ selectComponent, setSelectComponent }) => {
	const { setFontComponent } = useStyleManagement();

	return (
		<div className="grid grid-flow-row-dense grid-cols-4 mt-4 gap-1">
			<Button
				onClick={(e) => setSelectComponent("forms")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "forms" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Forms
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
					setFontComponent("label");
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

export default MenuFormSection;
