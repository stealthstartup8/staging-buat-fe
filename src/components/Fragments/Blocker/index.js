import Link from "next/link";

export const Blocker = ({ url }) => {
	return (
		<div className="fixed inset-0 bg-[#FAFAFA] z-50" id="mobile-notification">
			<div className="flex items-center h-[100vh] justify-center px-4">
				<div>
					<div className="mb-8">
						<p>
							<b>Enhance your web page experience!</b>
						</p>
						<span>For optimal performance, access our site on desktop mode or PC & laptop.</span>
					</div>
					<Link
						href={url}
						className="mt- px-12 py-2 bg-[#082691] text-white hover:bg-[#1e43c7] border-2 hover:border-[#1e43c7] border-[#082691] rounded-[24px]"
					>
						Back
					</Link>
				</div>
			</div>
		</div>
	);
};
