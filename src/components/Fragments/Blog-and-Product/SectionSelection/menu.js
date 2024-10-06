import Button from "@/components/Elements/Button";
import { useBlogMenu } from "@/utils/hooks/blog-and-product/useBlogMenu";

const MenuSectionSelection = () => {
	const { selectedSectionSelection, setSectionSelection } = useBlogMenu();

	return (
		<div className="grid grid-cols-2 gap-1 mt-4">
			<Button
				onClick={(e) => setSectionSelection("blog")}
				className={`text-[14px] border border-1 rounded-md py-2 border-[#082691]  ${
					selectedSectionSelection == "blog" ? "bg-[#082691] text-white" : "bg-white text-[#082691]"
				}`}
			>
				Blog Detail
			</Button>
			<Button
				onClick={(e) => setSectionSelection("product")}
				className={`text-[14px] border border-1 rounded-md py-2 border-[#082691]  ${
					selectedSectionSelection == "product"
						? "bg-[#082691] text-white"
						: "bg-white text-[#082691]"
				}`}
			>
				Product Detail
			</Button>
		</div>
	);
};

export default MenuSectionSelection;
