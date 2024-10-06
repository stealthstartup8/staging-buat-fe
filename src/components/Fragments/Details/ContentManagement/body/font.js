import Button from "@/components/Elements/Button";
import { useEffect } from "react";
import { Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import { getGoogleFont } from "@store/googlefont";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import { changeTextColor } from "@store/body/labelSlice";
import {
	fontStyle,
	fontSize,
	boldText,
	italicText,
	textDecoration,
	alignText,
	textColor,
} from "@store/body/fontSlice";
const FontSection = ({ selectSection }) => {
	const fontList = [
		{
			id: 1,
			name: "inherit",
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

	const {
		colorPickerRef,
		fontColorPicker,
		labelColorPicker,
		setShowLabelColorPicker,
		setShowHeadlineColorPicker,
		setShowTaglineColorPicker,
		setShowLabelTextColorPicker,
	} = useColorPicker();

	const showTextColorPicker = labelColorPicker.text;
	const showLabelColorPicker = fontColorPicker.label;
	const showHeadlineColorPicker = fontColorPicker.headline;
	const showTaglineColorPicker = fontColorPicker.tagline;
	const { setFontComponent, fontComponent } = useStyleManagement();

	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);
	const fontSlices = useSelector((state) => state.persistedReducer.fontSlices);
	const labelSlice = useSelector((state) => state.persistedReducer.labelSlice);

	const dispatch = useDispatch();

	const handleChangeTextColor = (color) => {
		dispatch(
			changeTextColor({
				index: selectedComponent.item.choiceLabelIndex,
				text_color: color,
			})
		);
	};

	const handleFontStyle = (index, value, component) => {
		dispatch(
			fontStyle({
				index: index,
				font_style: value,
				component: component,
			})
		);
	};

	const handleFontSize = (index, value, component) => {
		dispatch(
			fontSize({
				index: index,
				font_size: value,
				component: component,
			})
		);
	};

	const handleBold = (index, value, component) => {
		dispatch(
			boldText({
				index: index,
				bold: value,
				component: component,
			})
		);
	};

	const handleItalic = (index, value, component) => {
		dispatch(
			italicText({
				index: index,
				italic: value,
				component: component,
			})
		);
	};

	const handleTextDecoration = (index, value, component) => {
		dispatch(
			textDecoration({
				index: index,
				text_decoration: value,
				component: component,
			})
		);
	};

	const handleAlign = (index, value, component) => {
		dispatch(
			alignText({
				index: index,
				align: value,
				component: component,
			})
		);
	};

	const handleChangeLabelColor = (color) => {
		dispatch(
			textColor({
				index: selectedComponent.item.choiceLabelIndex,
				color: color,
				component: fontComponent,
			})
		);
	};

	useEffect(() => {
		dispatch(
			getGoogleFont({
				token: "AIzaSyDKhkg3QLMj2muhMJL4YEt4HTvZh6036BA",
			})
		);
	}, []);

	const googleFont = useSelector((state) => state.googleFontSlice);

	return (
		<div className="font-section overflow-y-auto content-scrollbar mt-4 pr-1">
			<div>
				<h2 className="text-16 ">
					<b>Font</b>
				</h2>
				<div className={`flex flex-wrap gap-1 mt-2`}>
					{selectSection == "cta" ||
						selectSection == "logo" ||
						(selectSection == "form" ? (
							""
						) : (
							<Button
								onClick={(e) => {
									setFontComponent("label");
								}}
								className={`flex-auto text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
									fontComponent == "label"
										? "text-white bg-[#082691] "
										: "text-[#082691] bg-white "
								}`}
							>
								Label
							</Button>
						))}
					<Button
						onClick={(e) => setFontComponent("headline")}
						className={`flex-auto text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
							fontComponent == "headline"
								? "text-white bg-[#082691] "
								: "text-[#082691] bg-white "
						}`}
					>
						{/* only for commerce headline field used as a discount */}
						{selectSection == "commerce" ? "Discount" : "Headline"}
					</Button>
					{selectSection == "blog-details" ? (
						""
					) : (
						<Button
							onClick={(e) => setFontComponent("tagline")}
							className={`flex-auto text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
								fontComponent == "tagline"
									? "text-white bg-[#082691] "
									: "text-[#082691] bg-white "
							}`}
						>
							{/* only for commerce tagline field used as a price */}
							{selectSection == "commerce" ? "Price" : "Tagline"}
						</Button>
					)}
					{selectSection == "logo" ||
					selectSection == "blog-details" ||
					selectSection == "commerce" ? (
						""
					) : (
						<Button
							onClick={(e) => setFontComponent("button")}
							className={`flex-auto text-[10px] border border-1 rounded-md py-2 border-[#082691] ${
								fontComponent == "button"
									? "text-white bg-[#082691] "
									: "text-[#082691] bg-white "
							}`}
						>
							Button
						</Button>
					)}
				</div>
				<div className="bg-[#F5F5F5] rounded-md p-2 mt-4 text-sm leading-tight">
					<div className="pt-2">
						<h2 className="mb-2 ">Font Type</h2>
						<select
							name="cars"
							id="type"
							className="w-[100%] p-2 focus:outline-none"
							onChange={(e) =>
								handleFontStyle(
									selectedComponent.item.choiceLabelIndex,
									e.target.value,
									fontComponent
								)
							}
						>
							{fontList.map((item, index) => (
								<option
									value={item.name}
									selected={
										fontSlices.item?.[selectedComponent.item.choiceLabelIndex]
											? fontSlices.item?.[selectedComponent.item.choiceLabelIndex][
													fontComponent
											  ]?.font_style == item.name && true
											: false
									}
									key={index}
								>
									{item.name == "inherit"
										? "Default"
										: item.name.charAt(0).toUpperCase() + item.name.slice(1)}
								</option>
							))}
						</select>
					</div>
					{selectSection == "blog-details" ? (
						""
					) : (
						<div className="pt-2">
							{selectSection == "commerce" ? (
								""
							) : (
								<>
									<h2 className="mb-2 ">Font Size</h2>
									<select
										name="cars"
										id="size"
										className="w-[100%] p-2 focus:outline-none"
										onChange={(e) =>
											handleFontSize(
												selectedComponent.item.choiceLabelIndex,
												e.target.value,
												fontComponent
											)
										}
									>
										<option value="" selected>
											Default
										</option>
										<option value="sm">Small</option>
										<option value="md">Medium</option>
										<option value="lg">Large</option>
									</select>
								</>
							)}
							<div
								className={`mt-4 mb-4 grid ${
									fontComponent == "button"
										? "grid-cols-4"
										: selectSection == "commerce"
										? "grid-cols-2"
										: "grid-cols-7"
								} gap-1 mt-2`}
							>
								<Button
									onClick={(e) =>
										handleBold(
											selectedComponent.item.choiceLabelIndex,
											true,
											fontComponent
										)
									}
									className={` border border-1 rounded-md py-1 ${
										fontComponent == "label"
											? fontSlices.item?.[selectedComponent.item.choiceLabelIndex]
													?.label.bold == true
												? "bg-[#082691] text-white"
												: "bg-white text-[#082691]"
											: fontComponent == "headline"
											? fontSlices.item?.[selectedComponent.item.choiceLabelIndex]
													?.headline.bold == true
												? "bg-[#082691] text-white"
												: "bg-white text-[#082691]"
											: fontComponent == "tagline"
											? fontSlices?.item?.[selectedComponent.item.choiceLabelIndex]
													?.tagline.bold == true
												? "bg-[#082691] text-white"
												: "bg-white text-[#082691]"
											: fontComponent == "button"
											? fontSlices?.item?.[selectedComponent.item.choiceLabelIndex]
													?.button.bold == true
												? "bg-[#082691] text-white"
												: "bg-white text-[#082691]"
											: ""
									}`}
								>
									<b>B</b>
								</Button>
								<Button
									onClick={(e) =>
										handleItalic(
											selectedComponent.item.choiceLabelIndex,
											true,
											fontComponent
										)
									}
									className={` border border-1 rounded-md py-1 ${
										fontComponent == "label"
											? fontSlices.item?.[selectedComponent.item.choiceLabelIndex]
													?.label?.italic == true
												? "bg-[#082691] text-white"
												: "bg-white text-[#082691]"
											: fontComponent == "headline"
											? fontSlices.item?.[selectedComponent.item.choiceLabelIndex]
													?.headline?.italic == true
												? "bg-[#082691] text-white"
												: "bg-white text-[#082691]"
											: fontComponent == "tagline"
											? fontSlices?.item?.[selectedComponent.item.choiceLabelIndex]
													?.tagline.italic == true
												? "bg-[#082691] text-white"
												: "bg-white text-[#082691]"
											: fontComponent == "button"
											? fontSlices?.item?.[selectedComponent.item.choiceLabelIndex]
													?.button.italic == true
												? "bg-[#082691] text-white"
												: "bg-white text-[#082691]"
											: ""
									}`}
								>
									<i>I</i>
								</Button>
								{selectSection == "commerce" ? (
									""
								) : (
									<>
										<Button
											onClick={(e) =>
												handleTextDecoration(
													selectedComponent.item.choiceLabelIndex,
													"underline",
													fontComponent
												)
											}
											className={`underline  border border-1 rounded-md py-1 ${
												fontComponent == "label"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.label.text_decoration == "underline"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "headline"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.headline?.text_decoration == "underline"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "tagline"
													? fontSlices?.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.tagline.text_decoration == "underline"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "button"
													? fontSlices?.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.button.text_decoration == "underline"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: ""
											}`}
										>
											U
										</Button>
										<Button
											onClick={(e) =>
												handleTextDecoration(
													selectedComponent.item.choiceLabelIndex,
													"line-through",
													fontComponent
												)
											}
											className={` border border-1 rounded-md py-1 ${
												fontComponent == "label"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.label.text_decoration == "line-through"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "headline"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.headline?.text_decoration == "line-through"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "tagline"
													? fontSlices?.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.tagline.text_decoration == "line-through"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "button"
													? fontSlices?.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.button.text_decoration == "line-through"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: ""
											}`}
										>
											<s>S</s>
										</Button>
									</>
								)}
								{fontComponent == "button" || selectSection == "commerce" ? (
									""
								) : (
									<>
										<Button
											onClick={(e) =>
												handleAlign(
													selectedComponent.item.choiceLabelIndex,
													"left",
													fontComponent
												)
											}
											className={` border border-1 rounded-md py-1 ${
												fontComponent == "label"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.label?.align == "left"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "headline"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.headline?.align == "left"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "tagline"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.tagline?.align == "left"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: ""
											}`}
										>
											<Bars3BottomLeftIcon className="h-5 w-5 ml-1" />
										</Button>
										<Button
											onClick={(e) =>
												handleAlign(
													selectedComponent.item.choiceLabelIndex,
													"center",
													fontComponent
												)
											}
											className={` border border-1 rounded-md py-1 ${
												fontComponent == "label"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.label?.align == "center"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "headline"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.headline?.align == "center"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "tagline"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.tagline?.align == "center"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: ""
											}`}
										>
											<Bars3Icon className="h-5 w-5 ml-1" />
										</Button>
										<Button
											onClick={(e) =>
												handleAlign(
													selectedComponent.item.choiceLabelIndex,
													"right",
													fontComponent
												)
											}
											className={` border border-1 rounded-md py-1 ${
												fontComponent == "label"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.label?.align == "right"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "headline"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.headline?.align == "right"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: fontComponent == "tagline"
													? fontSlices.item?.[
															selectedComponent.item.choiceLabelIndex
													  ]?.tagline?.align == "right"
														? "bg-[#082691] text-white"
														: "bg-white text-[#082691]"
													: ""
											}`}
										>
											<Bars3BottomRightIcon className="h-5 w-5 ml-1" />
										</Button>
									</>
								)}
							</div>
						</div>
					)}
					{fontComponent == "button" ? (
						""
					) : fontComponent == "label" ? (
						<>
							{selectSection == "hero" ||
							selectSection == "blog" ||
							selectSection == "commerce" ? (
								<ColorPickerInput
									title="Label Text Color"
									ref={colorPickerRef}
									showColorPicker={showTextColorPicker}
									setShowColorPicker={setShowLabelTextColorPicker}
									color={
										labelSlice.item[selectedComponent.item.choiceLabelIndex]?.text_color
									}
									handleColorChange={handleChangeTextColor}
								/>
							) : (
								<ColorPickerInput
									title="Font Color"
									ref={colorPickerRef}
									color={
										fontSlices.item?.[selectedComponent.item.choiceLabelIndex]?.label
											.color
									}
									showColorPicker={showLabelColorPicker}
									setShowColorPicker={setShowLabelColorPicker}
									handleColorChange={handleChangeLabelColor}
								/>
							)}
						</>
					) : fontComponent == "headline" ? (
						<ColorPickerInput
							title="Font Color"
							ref={colorPickerRef}
							color={fontSlices.item?.[selectedComponent.item.choiceLabelIndex]?.headline.color}
							showColorPicker={showHeadlineColorPicker}
							setShowColorPicker={setShowHeadlineColorPicker}
							handleColorChange={handleChangeLabelColor}
						/>
					) : fontComponent == "tagline" ? (
						<ColorPickerInput
							title="Font Color"
							ref={colorPickerRef}
							color={fontSlices.item?.[selectedComponent.item.choiceLabelIndex]?.tagline.color}
							showColorPicker={showTaglineColorPicker}
							setShowColorPicker={setShowTaglineColorPicker}
							handleColorChange={handleChangeLabelColor}
						/>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default FontSection;
