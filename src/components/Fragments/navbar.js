import { Button } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronLeftIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const Navbar = () => {
	const path = usePathname();
	const router = useRouter();
	const { id } = router.query;

	return (
		<div className="fixed bg-[#001562] w-[100vw] text-white z-30">
			<div className="pl-4">
				<div className="flex justify-between py-4">
					<Link
						href={
							path == "/blog/create" ||
							path == `/blog/detail/${id}` ||
							path == `/pages-detail/blog-and-product/${id}`
								? "/posts"
								: path == "/job-vacancy/create" || path == `/job-vacancy/detail/${id}`
									? "/job-vacancy"
									: path == "/e-commerce/create" || path == `/e-commerce/detail/${id}`
										? "/e-commerce"
										: path == "/pricing/create" || path == `/pricing/detail/${id}`
											? "/pricing"
											: "/"
						}
						className="py-[4px] flex gap-2 font-bold"
					>
						<ChevronLeftIcon className="h-5 w-5 mt-[1px]" />{" "}
						{path == "/blog/create" ||
						path == `/blog/detail/${id}` ||
						path == `/pages-detail/blog-and-product/${id}`
							? "New Blog"
							: path == "/job-vacancy/create" || path == `/job-vacancy/detail/${id}`
								? "Add Job Vacancy"
								: "Pages Detail"}
					</Link>
					{/* {path == "/pages-detail/blog-and-product" ||
          path == `/pages-detail/${id}` ? (
            <div className="mr-4"></div>
          ) : (
            ""
          )} */}
					{path == "/new-blog" && (
						<div className="grid justify-items-stretch">
							<div className="justify-self-end">
								<div className="flex text-[14px] align-middle">
									<GlobeAltIcon className="h-7 w-7 mt-1.5 mr-2 text-[#4777FF]" />
									<div>
										<div className="flex gap-6">
											<p className="mb-[-5px]">Varnion.com</p>
											<ChevronDownIcon className="h-4 w-4" />
										</div>
										<p>Website ID: 938204</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
