import { createQueryString } from "@/utils/helpers/CreateQuery";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export const CardPagination = ({ pagination_data }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createQuery = createQueryString(searchParams);

	return (
		<div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-700">
						Showing <span className="font-medium">{pagination_data?.pageSize}</span> of{" "}
						<span className="font-medium">{pagination_data?.totalItems}</span> results
					</p>
				</div>
				<div>
					<nav
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination"
					>
						<Link
							href={pathname + "?" + createQuery("page", pagination_data?.currentPage - 1 || 1)}
							className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
								pagination_data?.currentPage == 1 ? "pointer-events-none" : ""
							}`}
						>
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</Link>
						{Array.from({ length: pagination_data?.totalPages }).map((_, index) => {
							const pageNumber = index + 1;
							const isCurrentPage = pagination_data?.currentPage === pageNumber;
							const isWithinRange = Math.abs(pageNumber - pagination_data?.currentPage) <= 2;

							if (!isWithinRange) return null;

							return (
								<Link
									key={index}
									href={pathname + "?" + createQuery("page", pageNumber)}
									className={`${
										isCurrentPage ? "bg-indigo-600 text-white" : "bg-white text-black"
									} ring-1 ring-inset ring-gray-300 relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
								>
									{pageNumber}
								</Link>
							);
						})}
						<Link
							aria-disabled={pagination_data?.currentPage == pagination_data?.totalPages}
							href={pathname + "?" + createQuery("page", pagination_data?.currentPage + 1)}
							className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
								pagination_data?.currentPage == pagination_data?.totalPages
									? "pointer-events-none"
									: ""
							}`}
						>
							<span className="sr-only">Next</span>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</Link>
					</nav>
				</div>
			</div>
		</div>
	);
};
