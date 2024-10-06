// import { useEffect, useState, useRef } from "react";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const quillModules = {
// 	toolbar: {
// 		container: [
// 			[{ header: [1, 2, 3, false] }],
// 			["bold", "italic", "underline", "strike", "blockquote"],
// 			[{ list: "ordered" }, { list: "bullet" }],
// 			["link", "image", "video"],
// 			[{ align: [] }],
// 			[{ color: [] }],
// 			["code-block"],
// 			["clean"],
// 		],
// 	},
// 	blotFormatter: {},
// };

// const quillFormats = [
// 	"header",
// 	"bold",
// 	"italic",
// 	"underline",
// 	"strike",
// 	"blockquote",
// 	"list",
// 	"bullet",
// 	"indent",
// 	"link",
// 	"image",
// 	"video",
// 	"color",
// 	"align",
// 	"code-block",
// 	"clean",
// 	"blotFormatter",
// ];

// export default function QuillField(props) {
// 	const { className, value, name, placeholder, onChange, website, token } = props;
// 	const [enableEditor, setEnableEditor] = useState(false);
// 	const quillRef = useRef(null);

// 	useEffect(() => {
// 		const loadQuill = async () => {
// 			const Quill = (await import("quill")).default;
// 			const BlotFormatter = (await import("quill-blot-formatter")).default;
// 			Quill.register("modules/blotFormatter", BlotFormatter);
// 			setEnableEditor(true);
// 		};

// 		loadQuill();
// 	}, []);

// 	const imageHandler = async () => {
// 		const input = document.createElement("input");
// 		input.setAttribute("type", "file");
// 		input.setAttribute("accept", "image/*");
// 		input.click();

// 		input.onchange = async () => {
// 			const file = input.files[0];
// 			if (!file) return;

// 			const formData = new FormData();
// 			formData.append("image", file);
// 			console.log("Uploading image...");

// 			try {
// 				const response = await axios.post(
// 					`${process.env.NEXT_PUBLIC_API_KEY}/blog/image-rich/${website.id}`,
// 					formData,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 							"Content-Type": "multipart/form-data",
// 						},
// 					}
// 				);
// 				const url = response.data.data;
// 				console.log("url", url);

// 				const quill = quillRef.current?.getEditor
// 					? quillRef.current.getEditor()
// 					: quillRef.current?.editor;

// 				if (!quill) return;

// 				const range = quill.getSelection();
// 				if (range) {
// 					console.log("Inserting image...");
// 					quill.insertEmbed(range.index, "image", url);
// 				}
// 			} catch (error) {
// 				console.error("Error uploading image:", error);
// 			}
// 		};
// 	};

// 	return (
// 		enableEditor && (
// 			<ReactQuill
// 				ref={quillRef}
// 				value={value}
// 				className={className}
// 				onChange={onChange}
// 				placeholder={placeholder}
// 				modules={{
// 					...quillModules,
// 					toolbar: {
// 						...quillModules.toolbar,
// 						handlers: {
// 							image: imageHandler,
// 						},
// 					},
// 				}}
// 				formats={quillFormats}
// 			/>
// 		)
// 	);
// }
