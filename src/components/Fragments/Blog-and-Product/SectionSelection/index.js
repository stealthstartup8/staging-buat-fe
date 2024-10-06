import BlogPreview from "../../TemplatePreview/blog";
import MenuSectionSelection from "./menu";
import { useBlogMenu } from "@/utils/hooks/blog-and-product/useBlogMenu";

const BlogSectionSelection = ({ website_id, user_token }) => {
	const { selectedSectionSelection } = useBlogMenu();

	return (
		<div className="col-span-1 rounded-md h-[100vh] overflow-auto lg:block hidden">
			<div className="bg-white p-6 min-h-[100vh] pt-[100px]">
				<h1 className="text-lg font-bold">Detail Page</h1>
				{/* <MenuSectionSelection /> */}
				{selectedSectionSelection === "blog" && (
					<BlogPreview website_id={website_id} user_token={user_token} />
				)}
			</div>
		</div>
	);
};

export default BlogSectionSelection;
