import Button from "@/components/Elements/Button";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";

const MenuCommerceSection = ({ selectComponent, setSelectComponent }) => {
	const { setFontComponent } = useStyleManagement();

	return (
		<div className="grid grid-cols-3 gap-1 mt-4">
			<Button
				onClick={(e) => setSelectComponent("commerce-category")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "commerce-category"
						? "text-white bg-[#082691] "
						: "text-[#082691] bg-white "
				}`}
			>
				Category
			</Button>
			<Button
				onClick={(e) => setSelectComponent("commerce-card")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "commerce-card"
						? "text-white bg-[#082691] "
						: "text-[#082691] bg-white "
				}`}
			>
				Card
			</Button>
			{/* <Button
				onClick={(e) => setSelectComponent("commerce-shop-modal")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "commerce-shop-modal"
						? "text-white bg-[#082691] "
						: "text-[#082691] bg-white "
				}`}
			>
				Shop Modal
			</Button> */}
			{/* <Button
				onClick={(e) => setSelectComponent("button")}
				className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
					selectComponent == "button" ? "text-white bg-[#082691] " : "text-[#082691] bg-white "
				}`}
			>
				Button
			</Button> */}
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

export default MenuCommerceSection;
