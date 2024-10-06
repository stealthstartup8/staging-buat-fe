import Input from "@/components/Elements/Input";
import Label from "@/components/Elements/Input/label";
import dynamic from "next/dynamic";

const RichTextEditor1 = dynamic(() => import("@/components/Elements/Editor/RichTextEditor1"), {
	ssr: false,
});

const FormContentOne = ({ children }) => {
	return (
		<>
			<div className="w-full lg:w-8/12 lg:mr-2">{children}</div>
		</>
	);
};

const contentLeft = ({ title, setTitle, content, handleContent, website, token }) => {


	return (
		<>
			<div className="w-full px-4 lg:px-7 py-8 bg-white ">
				<div className="mb-6">
					<Label>Title</Label>
					<Input
						className="min-w-full border rounded-[2px] p-2"
						placeholder={"Input your title..."}
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</div>
				<RichTextEditor1
					value={content}
					onChange={handleContent}
					website={website}
					token={token}
				/>
			</div>
		</>
	);
};

FormContentOne.contentLeft = contentLeft;

export default FormContentOne;
