import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
	ClassicEditor,
	Essentials,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation,
	TableColumnResize,
} from "ckeditor5";
import axios from "axios";
import ImageEditor from "./ImageEditor";
import "ckeditor5/ckeditor5.css";
import { useImageUpload } from "@/utils/hooks/useImageUpload";

// custom adapter for image upload
class SimpleUploadAdapter {
	constructor(loader, url, token, openImageEditor) {
		this.loader = loader;
		this.url = url;
		this.token = token;
		this.openImageEditor = openImageEditor;
	}

	upload() {
		return this.loader.file.then(
			(file) =>
				new Promise((resolve, reject) => {
					// Open the image editor
					this.openImageEditor(file)
						.then(async (editedFile) => {
							const formData = new FormData();
							formData.append("image", editedFile);
							const response = await axios
								.post(this.url, formData, {
									headers: {
										"Content-Type": "multipart/form-data",
									},
								})
								.then((response) => {
									resolve({
										default: response.data.data,
									});
								})
								.catch((error) => {
									reject(error);
								});
						})
						.catch((error) => {
							reject(error);
						});
				})
		);
	}

	abort() {}
}

// More complex version with more plugins
const RichTextEditor1 = ({ onChange, value, website, token }) => {
	const [currentFile, setCurrentFile] = useState(null);
	const [resolveUpload, setResolveUpload] = useState(null);
	const { isEditorOpen, setIsEditorOpen } = useImageUpload();
	const builtinPlugins = [
		Essentials,
		Autoformat,
		Bold,
		Italic,
		BlockQuote,
		Heading,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		Link,
		List,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		PictureEditing,
		Table,
		TableToolbar,
		TextTransformation,
		TableColumnResize,
	];
	const openImageEditor = (file) => {
		return new Promise((resolve, reject) => {
			setCurrentFile(file);
			setResolveUpload(() => resolve);
			setIsEditorOpen(true);
		});
	};

	const handleImageEditDone = ({ file }) => {
		if (resolveUpload) {
			resolveUpload(file);
			setIsEditorOpen(false);
			setCurrentFile(null);
			setResolveUpload(null);
		}
	};

	const toolbar = [
		"undo",
		"redo",
		"heading",
		"paragraph",
		"bold",
		"italic",
		"blockQuote",
		"uploadImage",
		"link",
		"mediaEmbed",
		"insertTable",
		"tableColumn",
		"tableRow",
		"mergeTableCells",
		"fontFamily",
		"fontSize",
		"fontColor",
		"fontBackgroundColor",
		"highlight",
		"underline",
		"strikethrough",
		"subscript",
		"superscript",
		"alignment",
		"numberedList",
		"bulletedList",
		"indent",
		"outdent",
		"pageBreak",
		"removeFormat",
		"specialCharacters",
		"horizontalLine",
		"sourceEditing",
		"code",
		"codeBlock",
	];

	const customEditorConfig = {
		toolbar,
		plugins: builtinPlugins,
		heading: {
			options: [
				{ model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
				{
					model: "heading1",
					view: {
						name: "h1",
						classes: ["font-bold", "text-7xl"],
					},
					title: "Heading 1",
					class: "ck-heading_heading1",
					converterPriority: "high",
				},
				{
					model: "heading2",
					view: {
						name: "h2",
						classes: ["font-bold", "text-6xl"],
					},
					title: "Heading 2",
					class: "ck-heading_heading2",
					converterPriority: "high",
				},
				{
					model: "heading3",
					view: {
						name: "h3",
						classes: ["font-bold", "text-5xl"],
					},
					title: "Heading 3",
					class: "ck-heading_heading3",
					converterPriority: "high",
				},
				{
					model: "heading4",
					view: {
						name: "h4",
						classes: ["font-bold", "text-4xl"],
					},
					title: "Heading 4",
					class: "ck-heading_heading4",
					converterPriority: "high",
				},
				{
					model: "heading5",
					view: {
						name: "h5",
						classes: ["font-bold", "text-3xl"],
					},
					title: "Heading 5",
					class: "ck-heading_heading5",
					converterPriority: "high",
				},
				{
					model: "heading6",
					view: {
						name: "h6",
						classes: ["font-bold", "text-2xl"],
					},
					title: "Heading 6",
					class: "ck-heading_heading6",
					converterPriority: "high",
				},
			],
		},
		table: {
			contentToolbar: [
				"tableColumn",
				"tableRow",
				"mergeTableCells",
				"tableCellProperties",
				"tableProperties",
			],
		},
	};

	return (
		<>
			<CKEditor
				editor={ClassicEditor}
				config={customEditorConfig}
				data={value}
				onChange={(event, editor) => {
					const data = editor.getData();
					onChange(data);
				}}
				onReady={(editor) => {
					editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
						return new SimpleUploadAdapter(
							loader,
							`${process.env.NEXT_PUBLIC_API_KEY}/rich-upload/image-rich/${website.id}`,
							token,
							openImageEditor
						);
					};
				}}
			/>
			{currentFile && (
				<ImageEditor image={currentFile} onDoneEditting={handleImageEditDone} isOpen={isEditorOpen} />
			)}
		</>
	);
};

export default RichTextEditor1;
