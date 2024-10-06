import Button from "@/components/Elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import { boldText, fontSize, fontStyle, italicText, textColor, textDecoration } from "@store/menu/fontSlice";
const FontNavbarSection = () => {
	const { colorPickerRef, setShowTextColorPicker, buttonColorPicker } = useColorPicker();
	const showTextColorPicker = buttonColorPicker.text;

	const fontList = [
		{
			id: 1,
			name: "",
		},
		{
			id: 2,
			name: "inter",
		},
		{
			id: 3,
			name: "montserrat",
		},
		{
			id: 4,
			name: "open sans",
		},
		{
			id: 5,
			name: "raleway",
		},
		{
			id: 6,
			name: "merriweather",
		},
		{
			id: 7,
			name: "lato",
		},
		{
			id: 8,
			name: "oswald",
		},
	];

	const dispatch = useDispatch();
	const navbarFont = useSelector((state) => state.persistedReducer.navigationFontSlice.item);

	const handleFontStyle = (value) => {
		dispatch(
			fontStyle({
				font_style: value,
			})
		);
	};

	const handleFontSize = (value) => {
		dispatch(
			fontSize({
				font_size: value,
			})
		);
	};

	const handleBold = (value) => {
		dispatch(
			boldText({
				bold: value,
			})
		);
	};

	const handleItalic = (value) => {
		dispatch(
			italicText({
				italic: value,
			})
		);
	};

	const handleTextDecoration = (value) => {
		dispatch(
			textDecoration({
				text_decoration: value,
			})
		);
	};

	const handleTextColor = (value) => {
		dispatch(
			textColor({
				color: value,
			})
		);
	};

	return (
		<div className="font-section">
			<div>
				<h2 className="text-16 mt-4">
					<b>Font</b>
				</h2>
				<div className="bg-[#F5F5F5] rounded-md p-2 mt-4 text-sm leading-tight">
					<div className="pt-2">
						<h2 className="mb-2 ">Font Type</h2>
						<select
							name="cars"
							id="type"
							className="w-[100%] p-2 focus:outline-none"
							onChange={(e) => handleFontStyle(e.target.value)}
						>
							{fontList.map((font, index) => (
								<option
									key={index}
									value={font.name}
									selected={navbarFont.font_style == font.name && true}
								>
									{font.name == ""
										? "Default"
										: font.name.charAt(0).toUpperCase() + font.name.slice(1)}
								</option>
							))}
						</select>
					</div>
					<div className="pt-2">
						<h2 className="mb-2 ">Font Size</h2>
						<select
							name="cars"
							id="size"
							className="w-[100%] p-2 focus:outline-none"
							onChange={(e) => handleFontSize(e.target.value)}
						>
							<option value="sm">Small</option>
							<option value="md">Medium</option>
							<option value="lg">Large</option>
						</select>
						<div className={`px-2 mt-4 mb-4 grid grid-cols-4 gap-1 mt-2`}>
							<Button
								onClick={(e) => handleBold(true)}
								className={` border border-1 rounded-md py-1 ${
									navbarFont.bold ? "bg-[#082691] text-white" : "bg-white text-[#082691]"
								}`}
							>
								<b>B</b>
							</Button>
							<Button
								onClick={(e) => handleItalic(true)}
								className={` border border-1 rounded-md py-1 ${
									navbarFont.italic ? "bg-[#082691] text-white" : "bg-white text-[#082691]"
								}`}
							>
								<i>I</i>
							</Button>
							<Button
								onClick={(e) => handleTextDecoration("underline")}
								className={`underline  border border-1 rounded-md py-1 ${
									navbarFont.text_decoration == "underline"
										? "bg-[#082691] text-white"
										: "bg-white text-[#082691]"
								}`}
							>
								U
							</Button>
							<Button
								onClick={(e) => handleTextDecoration("line-through")}
								className={` border border-1 rounded-md py-1 ${
									navbarFont.text_decoration == "line-through"
										? "bg-[#082691] text-white"
										: "bg-white text-[#082691]"
								}`}
							>
								<s>S</s>
							</Button>
						</div>
						<hr className="border-[#C8CDD0]"></hr>
					</div>
					<ColorPickerInput
						title="Text Color"
						ref={colorPickerRef}
						color={navbarFont.color}
						showColorPicker={showTextColorPicker}
						setShowColorPicker={setShowTextColorPicker}
						handleColorChange={handleTextColor}
					/>
				</div>
			</div>
		</div>
	);
};

export default FontNavbarSection;
