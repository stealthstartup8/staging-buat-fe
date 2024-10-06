import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
const BlogSection = ({ handleOnDrag, templateBlog, websiteid, user_token }) => {
	const blog_data = useSelector((state) => state.blogSlice.blog_data);

	return (
		<div className="mt-4 text-[14px]">
			<p>
				<b>Note : </b> Select by drag and drop.
			</p>
			<br />

			<Link
				href="/blog/create"
				target="_blank"
				className="text-center block w-full px-6 py-2 bg-[#ffffff] hover:bg-[#082691] border-2 hover:border-[#082691] border-[#082691] text-[#082691] hover:text-[#ffffff] rounded-md mb-4 "
			>
				Make your blog Post
			</Link>

			<>
				{templateBlog.map((data, index) => {
					return (
						<div className="mt-4" key={index}>
							<Image
								src={`${process.env.NEXT_PUBLIC_API_KEY}/template/template-image/${data.image}`}
								width={10000}
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
					);
				})}
			</>
			{/* ) : (
        <span className="block text-center mt-4 text-[#c21d30] border border-1 border-dashed border-[#c21d30] py-1 px-3">
          Publish your blog first!
        </span>
      )} */}
		</div>
	);
};

export default BlogSection;
