import { useCallback, useState, useRef } from "react";
import { MAX_FILE_SIZE } from "@/utils/constants/Constraints";
import Toast from "@/components/Elements/Toast/Toast";
import { splitFileName } from "@/utils/helpers/cropperHelpers";

export const useImageUpload = (handleSetFile) => {
	const [imageFile, setImageFile] = useState(null); // image file object
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const inputRef = useRef(null);
	const readFile = useCallback((file) => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.addEventListener("load", () => resolve(reader.result), false);
			reader.readAsDataURL(file);
		});
	}, []);

	const onFileChange = async (e) => {
		if (!e.target.files[0]) return;
		if (e.target.files[0].size > MAX_FILE_SIZE) {
			Toast({ type: "file-size-too-big" });
			return;
		}
		const file = e.target.files[0];
		const [_, ext] = splitFileName(file.name);
		if (ext === "mp4") {
			const image = { file: file, url: URL.createObjectURL(file) };
			handleSetFile(image);
			setIsEditorOpen(false);
			return;
		}
		if (file) {
			setImageFile(file);
			setIsEditorOpen(true);
		}
		inputRef.current.value = "";
	};

	return {
		readFile,
		onFileChange,
		isEditorOpen,
		imageFile,
		inputRef,
		setIsEditorOpen,
	};
};
