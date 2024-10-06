import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CustomSelect from "@/components/Elements/Input/custom-select";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import { changeButtonShape, changeToButton } from "@store/menu/navigationSlice";
import { changeButtonColor, changeStrokeButtonColor } from "@store/menu/buttonSlice";
import { changeStrokeColor } from "@store/body/buttonSlice";
const ButtonNavbarSection = () => {
	const { colorPickerRef, setShowButtonColorPicker, setShowStrokeColorPicker, buttonColorPicker } =
		useColorPicker();
	const showButtonColorPicker = buttonColorPicker.button;
	const showStrokeColorPicker = buttonColorPicker.stroke;

	const navigationMenuSlice = useSelector((state) => state.persistedReducer.navigationMenuSlice);
	const navigationButtonSlice = useSelector((state) => state.persistedReducer.navigationButtonSlice);
	const buttonShape = navigationMenuSlice?.item
		?.filter((item) => item.isButton)
		.map((item) => item.id_shape);

	const buttonName = navigationMenuSlice?.item
		?.filter((item) => item.isButton)
		.map((item) => item.navigation_name);

	const [strokeButton, setStrokeButton] = useState(
		navigationButtonSlice.item.stroke_button_color == "" ||
			navigationButtonSlice.item.stroke_button_color == "transparent"
			? "transparent"
			: "color"
	);
	const [buttonColor, setButtonColor] = useState(
		navigationButtonSlice.item.button_color === "" ||
			navigationButtonSlice.item.button_color === "transparent"
			? "transparent"
			: "color"
	);

	const dispatch = useDispatch();

	const handleChangeToButton = (target, value) => {
		dispatch(
			changeToButton({
				target: target,
				isButton: value,
			})
		);
	};

	const handleChangeButtonColor = (value) => {
		dispatch(
			changeButtonColor({
				button_color: value,
			})
		);
	};

	const handleChangeStrokeButtonColor = (value) => {
		dispatch(
			changeStrokeButtonColor({
				stroke_button_color: value,
			})
		);
	};

	const handleTransparentButton = () => {
		dispatch(
			changeButtonColor({
				button_color: "transparent",
			})
		);
	};

	const handleTransparentStrokeButton = () => {
		dispatch(
			changeStrokeButtonColor({
				stroke_button_color: "transparent",
			})
		);
	};

	const handleSelectedOption = (target, value) => {
		dispatch(
			changeButtonShape({
				target: buttonName[0],
				id_shape: target,
			})
		);
	};

	return (
		<div className="overflow-y-auto content-scrollbar mt-4 pr-1 ">
			<h2 className="mb-2">
				<b>Button</b>
			</h2>
			<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
				<div className="p-2">
					<h2 className=" mb-2">Call to Action</h2>
					<select
						name="cars"
						id="type"
						className="w-[100%] p-2 focus:outline-none"
						onChange={(e) => handleChangeToButton(e.target.value, true)}
					>
						<option value="" selected>
							Select
						</option>
						{navigationMenuSlice.item.map((item, index) => (
							<option
								key={index}
								value={item.navigation_name}
								selected={item.isButton == true && true}
							>
								{item.navigation_name}
							</option>
						))}
					</select>
				</div>
				<div className="p-2">
					<h2 className="mb-2 ">Button Shape</h2>
					<CustomSelect
						initialSelect={parseInt(buttonShape[0])}
						handleSelectedOption={handleSelectedOption}
					/>
				</div>

				<div className="p-2">
					<h2 className="">Button Color</h2>
					<label>
						<input
							type="radio"
							value="option1"
							className="mr-2"
							checked={buttonColor == "transparent"}
							onChange={(e) => {
								setButtonColor("transparent");
								handleTransparentButton();
							}}
						/>
						Transparent
					</label>
					<br />
					<label>
						<input
							type="radio"
							value="option1"
							className="mr-2"
							checked={buttonColor == "color"}
							onChange={(e) => {
								setButtonColor("color");
								handleChangeButtonColor({ rgb: { r: 0, g: 0, b: 0, a: 1 } });
							}}
						/>
						Add Color
					</label>
					{buttonColor == "color" ? (
						<ColorPickerInput
							title=""
							ref={colorPickerRef}
							color={navigationButtonSlice.item.button_color}
							showColorPicker={showButtonColorPicker}
							setShowColorPicker={setShowButtonColorPicker}
							handleColorChange={handleChangeButtonColor}
						/>
					) : (
						""
					)}
				</div>
				<div className="p-2">
					<h2 className="">Stroke Button Color</h2>
					<label>
						<input
							type="radio"
							value="option1"
							className="mr-2"
							checked={strokeButton == "transparent"}
							onChange={(e) => {
								setStrokeButton("transparent");
								handleTransparentStrokeButton();
							}}
						/>
						Transparent
					</label>
					<br />
					<label>
						<input
							type="radio"
							value="option2"
							className="mr-2"
							checked={strokeButton == "color"}
							onChange={(e) => {
								setStrokeButton("color");
								handleChangeStrokeButtonColor({
									rgb: { r: 0, g: 0, b: 0, a: 1 },
								});
							}}
						/>
						Add Color
					</label>
					{strokeButton == "color" ? (
						<ColorPickerInput
							title=""
							ref={colorPickerRef}
							color={navigationButtonSlice.item.stroke_button_color}
							showColorPicker={showStrokeColorPicker}
							setShowColorPicker={setShowStrokeColorPicker}
							handleColorChange={handleChangeStrokeButtonColor}
						/>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default ButtonNavbarSection;
