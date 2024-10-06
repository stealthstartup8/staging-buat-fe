import { XCircleIcon } from "@heroicons/react/24/outline";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import ImageEditor from "../Editor/ImageEditor";
import { useImageUpload } from "@/utils/hooks/useImageUpload";

const UploadFileBigPreviewWithDesc = ({ accept, image, handleSetFile, description, removeFile }) => {
	const { onFileChange, inputRef, imageFile, isEditorOpen, setIsEditorOpen } =
		useImageUpload(handleSetFile);

	return (
		<>
			{imageFile && (
				<ImageEditor
					image={imageFile}
					onDoneEditting={(croppedImage) => {
						handleSetFile(croppedImage);
						setIsEditorOpen(false);
					}}
					isOpen={imageFile && isEditorOpen}
				/>
			)}

			<div className="Upload w-[100%] h-[100%]">
				<div
					htmlFor="product-image"
					className={`relative flex items-center cursor-pointer w-[100%] h-[345px] text-[12px] border border-1 border-[#000000] justify-center text-center rounded-md border-dashed`}
					onClick={(e) => {
						e.preventDefault();
						document.getElementById(`product-image`).click();
					}}
				>
					<XCircleIcon
						onClick={removeFile}
						className="z-10 absolute top-2 right-2 w-[28px] h-[28px] text-gray-500 hover:text-[#F24B4B]"
					/>
					{image ? (
						<img src={image} className="w-[100%] max-h-[100%]" draggable="false" />
					) : (
						<div className="flex items-center justify-center h-[100%]">
							<p className="text-[24px] font-bold text-[#243E87]">
								Click to browse
								<span className="font-light">
									<br /> PNG, JPG, JPEG, GIF <br />
									(Main Image)
								</span>
							</p>
						</div>
					)}
				</div>
				<p className="text-center text-[#5B5E67] font-bold mt-2">{description}</p>
				<input
					type="file"
					className="choose-image-style hidden"
					accept={accept}
					id="product-image"
					onChange={onFileChange}
					ref={inputRef}
				/>
			</div>
		</>
	);
};

export default UploadFileBigPreviewWithDesc;
