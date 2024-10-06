import Button from "@/components/Elements/Button";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";

const BodySectionMenu = () => {
	const { setFontComponent, selectComponent, setSelectComponent } = useStyleManagement();

	return (
		<div className="mt-4 mb-4">
			<div className="grid grid-cols-2 gap-1 mt-4 mb-4">
				<Button
					onClick={(e) => setSelectComponent("blog-background")}
					className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
						selectComponent == "blog-background"
							? "text-white bg-[#082691] "
							: "text-[#082691] bg-white "
					}`}
				>
					Background
				</Button>
				<Button
					onClick={(e) => {
						setFontComponent("label");
						setSelectComponent("blog-font");
					}}
					className={`text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
						selectComponent == "blog-font"
							? "text-white bg-[#082691] "
							: "text-[#082691] bg-white "
					}`}
				>
					Font
				</Button>
			</div>
		</div>
	);
};

export default BodySectionMenu;
