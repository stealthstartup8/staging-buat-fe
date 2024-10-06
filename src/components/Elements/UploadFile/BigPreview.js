import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import ImageEditor from "../Editor/ImageEditor";
import { useImageUpload } from "@/utils/hooks/useImageUpload";

const UploadFileBigPreview = ({
	accept,
	file,
	handleSetFile,
	file_type,
	form = false,
	description,
	removeFile,
}) => {
	const { onFileChange, inputRef, imageFile, isEditorOpen, setIsEditorOpen } =
		useImageUpload(handleSetFile);
	const handleClick = (e) => {
		e.preventDefault();
		document.getElementById("thumbnails").click();
	};
	const { selectComponent } = useStyleManagement();

	return (
		<>
			{imageFile && (
				<ImageEditor
					image={imageFile}
					onDoneEditting={(croppedImage) => {
						handleSetFile(croppedImage);
						setIsEditorOpen(false);
					}}
					isOpen={isEditorOpen}
				/>
			)}

			<div>
				<div
					onClick={handleClick}
					className="w-100  border-[#C8CDD0] border-dashed border-2  rounded-md p-1 h-[120px] flex justify-center items-center cursor-pointer relative"
				>
					{selectComponent != "logo" && (
						<XCircleIcon
							onClick={removeFile}
							className="h-6 w-6 mx-auto absolute top-0 right-0 mt-2 mr-2 text-[#333] text-opacity-50 hover:text-[#F24B4B]"
						/>
					)}
					{form === true ? (
						<>
							{file ? (
								<>
									<img src={file} className="w-[100%] h-[100%] object-cover"></img>
								</>
							) : (
								<div className="flex gap-2 justify-center items-center w-full  text-[#243E87]">
									<div className="p-1 border rounded-full border-black">
										<CloudArrowUpIcon className="h-6 w-6 " />
									</div>
									<b className="text-[20px] ">{description}</b>
								</div>
							)}
						</>
					) : (
						<>
							{file ? (
								<>
									{file_type == "video" ? (
										<video
											src={file}
											autoPlay
											loop
											muted
											className="w-[100%] h-[100%] object-cover rounded-md"
										></video>
									) : (
										<img
											src={file}
											className="w-[100%] h-[100%] object-cover rounded-md"
										></img>
									)}
								</>
							) : (
								<div className="text-center w-100 text-[#243E87] text-[14px]">
									<b>Click to browse</b>
									<br></br>PNG, GIF, MP4 (auto play)
								</div>
							)}
						</>
					)}
				</div>
				<input
					type="file"
					className="choose-image-style"
					accept={accept}
					id="thumbnails"
					name="thumbnails"
					onChange={onFileChange}
					ref={inputRef}
				/>
			</div>
		</>
	);
};

export default UploadFileBigPreview;
