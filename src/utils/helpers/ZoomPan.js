import { useControls } from "react-zoom-pan-pinch";
import {
	MagnifyingGlassPlusIcon,
	MagnifyingGlassMinusIcon,
	ArrowsPointingInIcon,
	DevicePhoneMobileIcon,
	ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const ZoomPan = ({ setShowMobileView, showMobileView }) => {
	const { zoomIn, zoomOut, setTransform } = useControls();
	const router = useRouter();

	return (
		<div className="flex items-center p-2 text-black gap-3 w-80 h-32">
			<button
				className="hover:bg-gray-200 flex flex-col items-center justify-center rounded-md py-1 px-2 aspect-square bg-white border border-gray-600 hover:bg-gray-600 transition"
				onClick={() => router.reload()}
			>
				<ArrowPathRoundedSquareIcon className="w-5 h-5" />
				<p className="text-[10px]">Refresh</p>
			</button>
			<button
				className="hover:bg-gray-200 rounded-md p-3 aspect-square bg-white border border-gray-600 hover:bg-gray-600 transition"
				onClick={() => zoomIn()}
			>
				<MagnifyingGlassPlusIcon className="w-6 h-6" />
			</button>
			<button
				className="hover:bg-gray-200 rounded-md p-3 aspect-square bg-white border border-gray-600 hover:bg-gray-600 transition"
				onClick={() => zoomOut()}
			>
				<MagnifyingGlassMinusIcon className="w-6 h-6" />
			</button>
			<button
				className="hover:bg-gray-200 rounded-md p-3 aspect-square bg-white border border-gray-600 hover:bg-gray-600 transition"
				onClick={() => {
					setTransform(0, 0, 0.6);
				}}
			>
				<ArrowsPointingInIcon className="w-6 h-6" />
			</button>
			<button
				className="hover:bg-gray-200 rounded-md p-3 aspect-square bg-white border border-gray-600 hover:bg-gray-600 transition"
				onClick={() => setShowMobileView(!showMobileView)}
			>
				<DevicePhoneMobileIcon className="w-6 h-6" />
			</button>
		</div>
	);
};

export default ZoomPan;
