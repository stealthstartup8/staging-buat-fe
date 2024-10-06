import Button from "@/components/Elements/Button";
import Toast from "@/components/Elements/Toast/Toast";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const OperationButton = ({ saveLoading, id, saveData, user_token, website_detail }) => {
	const router = useRouter();

	const handleLaunchWebsite = async (e) => {
		e.preventDefault();
		NProgress.start();
		const publishPromise = axios.post(
			process.env.NEXT_PUBLIC_API_KEY + `/publish-website`,
			{
				idWebsite: website_detail.id,
			},
			{
				headers: {
					Authorization: `Bearer ${user_token}`,
				},
			}
		);

		Toast({
			type: "promise",
			promise: publishPromise,
			message: {
				pending: "Launching website...",
				success: "Website publish successfully!",
				error: "Failed to launch website. Please try again.",
			},
		});

		publishPromise.finally(() => {
			NProgress.done(); // Ensure NProgress is finished
		});
	};

	const handleSaveData = async (e) => {
		e.preventDefault();

		const promise = saveData();
		Toast({
			type: "promise",
			promise,
			message: {
				pending: "Saving data...",
				success: "Data saved successfully!",
				error: "Failed to save data. Please try again.",
			},
		});
		NProgress.start(); // You may want to start NProgress here, depending on your requirements
		promise.finally(() => {
			NProgress.done(); // Ensure NProgress is finished
		});
	};

	return (
		<>
			<div className="flex justify-between fixed top-0 right-0 z-40 mt-3 mr-4">
				<div className="flex gap-2">
					{router.pathname !== "/pages-detail/blog-and-product/[id]" && (
						<a
							disabled={saveLoading}
							href={`/preview-website/${id}`}
							target="_blank"
							rel="noopener noreferrer"
							style={{ pointerEvents: saveLoading ? "none" : "auto" }}
							className="px-4 text-[14px] rounded-md py-2 text-[#082691] bg-[#ffffff]"
						>
							Preview
						</a>
					)}
					<Button
						disabled={saveLoading}
						onClick={handleSaveData}
						className="px-4 text-[14px] rounded-md py-2 text-[#082691] bg-[#ffffff]"
					>
						Save
					</Button>
					<Button
						disabled={saveLoading}
						onClick={handleLaunchWebsite}
						className="px-4 text-[14px] rounded-md py-2 text-[#ffffff] bg-[#082691]"
					>
						<RocketLaunchIcon className="w-5 h-5 inline-block pb-[2px] mr-1" />
						Publish Website
					</Button>
				</div>
			</div>
		</>
	);
};

export default OperationButton;
