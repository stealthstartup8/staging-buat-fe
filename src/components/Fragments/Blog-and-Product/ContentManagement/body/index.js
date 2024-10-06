import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import BackgroundSection from "./background";
import Button from "@/components/Elements/Button";
import BodySectionMenu from "./menu";
import FontSection from "@/components/Fragments/Details/ContentManagement/body/font";

const BlogFeatures = () => {
	const { selectComponent } = useStyleManagement();

	return (
		<div>
			<BodySectionMenu />
			{selectComponent === "blog-background" && <BackgroundSection />}
			{selectComponent === "blog-font" && <FontSection selectSection={"blog-details"} />}
		</div>
	);
};

export default BlogFeatures;
