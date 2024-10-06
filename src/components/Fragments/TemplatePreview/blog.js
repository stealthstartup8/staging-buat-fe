import { useTemplate } from "@/utils/hooks/useTemplate";
import { fetchAllData } from "@store/blog";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlogPreview = ({ website_id, user_token }) => {
	const { blogTemplate, handleOnDrag } = useTemplate();
	const blog_data = useSelector((state) => state.blogSlice.blog_data);

	return (
		<div className="mt-4 text-[14px]">
			<span className="text-[12px]">
				<b>Note : </b> This will apply to entire detail page.
			</span>
			<hr className="mt-1"></hr>
			<span className="text-[12px]">
				<b>Note : </b> Select by drag and drop.
			</span>
			{blogTemplate.map((data, index) => (
				<div className="mt-4" key={index}>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_KEY}/template/template-image/${data.image}`}
						width={280}
						height={20}
						alt={data.name_template ? data.name_template : "Blog"}
						className={`rounded-md ${
							blog_data.length > 0 ? "" : "opacity-50 cursor-not-allowed"
						}`}
						id={data.id}
						draggable={blog_data.length > 0 ? true : false}
						onDragStart={handleOnDrag}
					/>
				</div>
			))}
		</div>
	);
};

export default BlogPreview;
