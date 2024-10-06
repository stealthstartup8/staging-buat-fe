import Button from "@/components/Elements/Button";
import Link from "next/link";
import { useRouter } from "next/router";

function Error({ statusCode }) {
	const router = useRouter();
	return (
		<div className="w-[100vw] h-[100vh] ">
			<div className="px-4 lg:px-0 w-[100vw] h-[100vh] flex justify-center items-center">
				<div className="text-center flex flex-col gap-2">
					<h1 className="text-[86px] font-bold -mb-6">{statusCode}</h1>
					<h4 className="text-[24px]">{statusCode == 404 && "Page Not Found"}</h4>
					<span className="text-gray-400">
						Oops! The page you are looking for does not exist. It might have been moved or
						deleted.
					</span>
					<p className="font-bold text-gray-600">Here are some helpful actions:</p>
					<div className="flex gap-2">
						<Link
							href={"/"}
							className="flex-1 px-3 py-2 text-white rounded-md mb-4 bg-[#082691] hover:bg-[#1e43c7]"
						>
							Back
						</Link>
						<Button
							onClick={() => router.reload()}
							className="flex-1 px-3 py-2 border-2 border-gray-200 hover:bg-gray-200 rounded-md mb-4"
						>
							Refresh
						</Button>
					</div>
					<span className="text-gray-400">
						If you believe this is an error, please contact our support team. Thank you for your
						understanding!
					</span>
				</div>
			</div>
		</div>
	);
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
