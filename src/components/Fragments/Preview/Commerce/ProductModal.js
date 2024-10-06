import Image from "next/image";
import { XMarkIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useFontSize } from "@/utils/constants/FontSize";
import { Fragment } from "react";
import { Button } from "@/components/Elements/InnerTemplate";
import { ICON_STORAGE_DIR } from "@/utils/constants/Storage";
import Portal from "@/components/Portals/Portal";
const StoreLink = ({
	name,
	background,
	bold,
	fontSize,
	fontType,
	icon,
	idShape,
	italic,
	showIcon,
	strokeColor,
	textColor,
	textDecoration,
	url,
}) => {
	return (
		<Button
			classNameButton="w-full h-12 items-center flex justify-between px-8 rounded-full"
			button_slices={{
				button_color: background,
				text_color: textColor,
				stroke_color: strokeColor,
				name: name,
				icon: icon,
				show_icon: icon != "" ? true : false,
				button_shape: String(idShape),
				link: url,
			}}
			// font_slices={font_slices}
			// onClickInnerComponent={onClickInnerComponent}
			editable={false}
		/>
		// <a
		// 	href={url}
		// 	target="_blank"
		// 	className="w-full h-12 items-center flex justify-between px-4 rounded-full "
		// 	style={{
		// 		backgroundColor: background,
		// 		stroke: strokeColor,
		// 		textDecoration: textDecoration,
		// 		italic: italic,
		// 		fontWeight: bold ? "bold" : "normal",
		// 		fontType: fontType,
		// 		fontSize: getButtonFontSize(fontSize),
		// 	}}
		// >
		// 	<p
		// 		style={{
		// 			color: textColor,
		// 		}}
		// 	>
		// 		{name}
		// 	</p>
		// 	{/* sementara !showicon karena gaada toggle buat ngubah status nya, jadi default nya show icon */}
		// 	{icon != "" && (
		// 		<div className="w-8 h-8 ">
		// 			<Image
		// 				src={icon}
		// 				alt=""
		// 				width={0}
		// 				height={0}
		// 				sizes="100vw"
		// 				style={{
		// 					width: "100%",
		// 					height: "100%",
		// 					objectFit: "cover",
		// 					objectPosition: "center",
		// 				}}
		// 			/>
		// 		</div>
		// 	)}
		// </a>
	);
};

const ProductModal = ({
	isOpen,
	editable,
	title,
	description,
	thumbnail_image,
	background,
	onClose,
	buttonItem,
	bucketAccess,
	textColor,
}) => {
	const content = (
		<div
			style={{
				position: !editable && "fixed",
			}}
			className="top-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-[9999] "
			onClick={onClose}
		>
			<div
				style={{
					backgroundColor: background,
				}}
				className="flex flex-col gap-4 justify-center items-center relative rounded-2xl p-2  aspect-[4/3] w-80 z-10"
				onClick={(e) => e.stopPropagation()}
			>
				<div className=" w-full text-center">
					<div className="flex w-full justify-end">
						<button
							onClick={onClose}
							className="p-1 active:scale-90 bg-blue-gray-300 bg-opacity-0 hover:bg-opacity-70 rounded-full transition-opacity duration-1000 "
						>
							<XMarkIcon className="text-black w-5 h-5" />
						</button>
					</div>
					<h1
						className="font-bold"
						style={{
							color: textColor,
						}}
					>
						{title}
					</h1>
				</div>
				<div className="aspect-square h-56">
					{thumbnail_image ? (
						<Image
							src={thumbnail_image}
							alt=""
							width={0}
							height={0}
							sizes="100vw"
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								objectPosition: "center",
							}}
						/>
					) : (
						<div className="bg-[#DBDBDB] w-full h-full"></div>
					)}
				</div>
				<div className="text-white space-y-2 w-full">
					{buttonItem.map((item, index) => (
						<Fragment key={index}>
							<StoreLink
								{...{
									...item,
									icon:
										item.icon == ""
											? ""
											: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${bucketAccess}/${ICON_STORAGE_DIR}/${item.icon}`,
								}}
							/>
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);

	return editable && isOpen ? (
		<div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">{content}</div>
	) : (
		<Portal wrapperID="productModal" isOpen={isOpen}>
			{content}
		</Portal>
	);
};

export default ProductModal;
