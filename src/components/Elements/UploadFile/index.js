import React from "react";
import ImageEditor from "../Editor/ImageEditor";
import { useImageUpload } from "@/utils/hooks/useImageUpload";

const UploadFile = ({ icon, placeHolder = "Click to browse", handleChangeIcon, className }) => {
	const { onFileChange, inputRef, imageFile, isEditorOpen, setIsEditorOpen } =
		useImageUpload(handleChangeIcon);
	const handleClick = (e) => {
		e.preventDefault();
		document.getElementById("file").click();
	};
	return (
		<>
			{imageFile && (
				<ImageEditor
					image={imageFile}
					onDoneEditting={(croppedImage) => {
						handleChangeIcon(croppedImage);
						setIsEditorOpen(false);
					}}
					isOpen={imageFile && isEditorOpen}
				/>
			)}

			<div className="Upload size-12">
				<div
					htmlFor="file"
					className={`cursor-pointer grid place-content-center my-2 size-12 bg-white text-[12px] border border-1 ${className}  border-[#000000] text-center rounded-md border-dashed`}
					onClick={handleClick}
				>
					{icon ? (
						<img src={icon} className="size-12" draggable="false" />
					) : (
						<p className="text-[9px] font-bold text-[#243E87]">{placeHolder}</p>
					)}
				</div>
				<input
					type="file"
					className="choose-image-style"
					accept="image/*"
					id="file"
					onChange={onFileChange}
					ref={inputRef}
				/>
			</div>
		</>
	);
};

export default UploadFile;
