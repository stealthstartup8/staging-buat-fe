import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
	ClassicEditor,
	Essentials,
	Autoformat,
	Bold,
	Italic,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing,
	Link,
	List,
	MediaEmbed,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation,
	Underline,
	Strikethrough,
	Paragraph,
	Alignment,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

// Simpler version with less plugins
const RichTextEditor2 = ({ onChange, value }) => {
	const builtinPlugins = [
		Essentials,
		Paragraph,
		Autoformat,
		Bold,
		Italic,
		Underline,
		Strikethrough,
		Alignment,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Link,
		List,
		MediaEmbed,
		PasteFromOffice,
		PictureEditing,
		Table,
		TableToolbar,
		TextTransformation,
	];

	const toolbar = [
		"bold",
		"italic",
		"highlight",
		"underline",
		"strikethrough",
		"subscript",
		"superscript",
		"numberedList",
		"bulletedList",
		"alignment",
		"pageBreak",
		"removeFormat",
		"specialCharacters",
		"horizontalLine",
		"sourceEditing",
	];

	const customEditorConfig = {
		toolbar,
		plugins: builtinPlugins,
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
			/>
		</>
	);
};

export default RichTextEditor2;
