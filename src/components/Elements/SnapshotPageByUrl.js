import { useState, useEffect } from "react";
import axios from "axios";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function SnapshotPageByUrl({ src }) {
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(true);

	const generateScreenshot = async () => {
		try {
			const response = await fetch(`https://capura-web.vercel.app/sc?url=${src}`, {
				next: { revalidate: 10 },
			});
			const data = await response.blob();
			const url = URL.createObjectURL(data);
			setImageUrl(url);
		} catch (error) {
			console.error("Error generating screenshot:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		generateScreenshot();
	}, []);

	return (
		<div className="size-full">
			{loading ? (
				<div className="size-full bg-gray-300 animate-pulse grid place-content-center">
					<PhotoIcon className="size-6 text-gray-600" />
				</div>
			) : (
				imageUrl && (
					<img
						src={imageUrl}
						alt="Website Screenshot"
						className="size-full object-cover object-top"
					/>
				)
			)}
		</div>
	);
}
