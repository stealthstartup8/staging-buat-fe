import React from "react";
import tinycolor from "tinycolor2";
import { useState, useEffect } from "react";
import { CustomPicker } from "react-color";
import { EyeDropperIcon, XMarkIcon } from "@heroicons/react/24/outline";
let { Alpha, Hue, Saturation, EditableInput } = require("react-color/lib/components/common");
import { handleSetColorOptions } from "@store/style-management";
import { useSelector, useDispatch } from "react-redux";
// props:
// rgbaCode --> color in rgba format 'rgba(r,g,b,a)' (string)
// onChange --> on change function (passes color in rgba format 'rgba(r,g,b,a)' (string))
// onClose --> on close modal function (trigger onclose without passing any argument)

// Important note!
// the react-color documentation said to wrap the color picker with CustomColorPicker when exporting
// but the reason is so that the onchange function return an object with each color format as its attributes
// We decided to not use it because I need the rgba string format to be passed.
// this increases maintainability because dev dont need to parse the argument everywhere this component is used.

const ColorPicker = ({ rgbaCode, onChange, onClose }) => {
	const dispatch = useDispatch();
	const colorOptions = useSelector((state) => state.persistedReducer.styleManagementSlice.colorOptions);
	const [colorState, setColorState] = useState({
		hsl: {
			h: 0,
			s: 0,
			l: 0,
		},
		hsv: {
			h: 0,
			s: 0,
			v: 0,
		},
		rgb: { r: 0, g: 0, b: 0, a: 1 },
		hex: "",
	});
	useEffect(() => {
		const color = tinycolor(rgbaCode);
		setColorState({
			hsv: color.toHsv(),
			hsl: color.toHsl(),
			rgb: color.toRgb(),
			hex: color.toHex(),
		});
	}, [rgbaCode]);

	const handleSaturationChange = (hsv) => {
		onChange(tinycolor(hsv).toRgbString().replaceAll(" ", ""));
	};
	const handleHueChange = (hsl) => {
		setColorState({
			...colorState,
			hsl: hsl,
		});
	};
	const handleAlphaChange = (hsl) => {
		onChange(
			tinycolor({
				...colorState.rgb,
				a: hsl.a,
			})
				.toRgbString()
				.replaceAll(" ", "")
		);
	};
	const handleChangeRGB = (key, value) => {
		onChange(
			tinycolor({ ...colorState.rgb, [key]: value })
				.toRgbString()
				.replaceAll(" ", "")
		);
	};
	const handleEyeChange = (result) => {
		// call setalpha twice because somehow cannot set the alpha to 1.0 on the first call
		onChange(tinycolor(result.sRGBHex).setAlpha(0.5).setAlpha(1.0).toRgbString().replaceAll(" ", ""));
	};
	return (
		<div
			style={{
				boxShadow:
					"rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
				display: "flex",
				flexDirection: "column",
				width: 205,
				borderRadius: 5,
			}}
			className="bg-white"
		>
			<div className="w-full min-h-8 flex justify-between items-center pl-2 pr-1 ">
				<p className="text-sm font-bold text-gray-500">Color Picker</p>
				<button
					className="text-gray-500 hover:text-black cursor-pointer"
					onClick={() => {
						const newOptions = [
							tinycolor(colorState.rgb).toRgbString().replaceAll(" ", ""),
						].concat(colorOptions);
						newOptions.pop();
						dispatch(handleSetColorOptions(newOptions));
						onClose();
					}}
				>
					<XMarkIcon className="h-5 w-5 " />
				</button>
			</div>
			<div
				style={{
					width: "100%",
					paddingBottom: "75%",
					position: "relative",
					overflow: "hidden",
				}}
			>
				<Saturation
					hsl={colorState.hsl}
					hsv={colorState.hsv}
					pointer={CustomPointer}
					onChange={handleSaturationChange}
				/>
			</div>
			<div className="p-2 space-y-2">
				<div className="flex gap-1 ">
					<Button onChange={handleEyeChange} />
					<div className="w-full flex flex-col justify-between">
						<div className="min-h-3 relative ">
							<Hue
								hsl={colorState.hsl}
								pointer={CustomSlider}
								onChange={handleHueChange}
								direction={"horizontal"}
							/>
						</div>
						<div className="min-h-3 relative ">
							<Alpha {...colorState} pointer={CustomSlider} onChange={handleAlphaChange} />
						</div>
					</div>
				</div>
				<div className="  grid grid-cols-5 gap-y-2">
					<span className="my-auto text-gray-500 text-sm ">HEX</span>
					<div className="flex justify-between col-span-4 gap-2 ">
						<div className="border w-full border-gray-300 p-1 flex gap-1">
							<span>#</span>
							<EditableInput
								style={{
									input: {
										border: "none",
										width: "100%",
										outline: "none",
									},
									label: {
										fontSize: "12px",
										color: "#999",
									},
								}}
								value={colorState.hex.toUpperCase()}
								onChange={(color) => {
									onChange(tinycolor(color).toRgbString().replaceAll(" ", ""));
								}}
							/>
						</div>
					</div>
				</div>
				<div className="  grid grid-cols-5 gap-y-2">
					<span className="my-auto text-gray-500 text-sm">RGB</span>
					<div className="flex col-span-4">
						<input
							style={{
								border: "none",
								outline: "none",
							}}
							value={colorState.rgb.r}
							onChange={(e) => handleChangeRGB("r", e.target.value)}
							className="w-full text-sm border border-gray-300 p-1 text-center"
						/>
						<input
							style={{
								border: "none",
								outline: "none",
							}}
							value={colorState.rgb.g}
							onChange={(e) => handleChangeRGB("g", e.target.value)}
							className="w-full text-sm border border-gray-300 p-1 text-center"
						/>
						<input
							style={{
								border: "none",
								outline: "none",
							}}
							value={colorState.rgb.b}
							onChange={(e) => handleChangeRGB("b", e.target.value)}
							className="w-full text-sm border border-gray-300 p-1 text-center"
						/>
					</div>
				</div>
				<div className="flex gap-2">
					<div className="flex flex-wrap w-full gap-1">
						{colorOptions.map((color, index) => (
							<div
								onClick={() => {
									onChange(color);
								}}
								key={index}
								style={{
									minWidth: 23,
									minHeight: 23,
									cursor: "pointer",
									boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
									backgroundColor: color,
								}}
							/>
						))}
					</div>
					<div className="flex  items-center  border border-gray-300 p-1">
						<input
							style={{
								input: {
									border: "none",
								},
								label: {
									fontSize: "12px",
									color: "#999",
								},
							}}
							value={parseInt(colorState.rgb.a * 100)} // show the percentage value
							onChange={(e) =>
								handleAlphaChange({
									...colorState.hsl,
									a: e.target.value / 100, // pass the decimal value
								})
							}
							className="w-6 text-sm outline-none text-right"
						/>
						<span>%</span>
					</div>
				</div>
			</div>
		</div>
	);
};
// const Button = ({onClick}) => {
const Button = ({ onChange }) => {
	const [color, setColor] = useState("rgba(158,158,158,1)");
	window.addEventListener("click", function (e) {
		if (document?.getElementById("btn-eye-dropper")?.contains(e.target)) {
			setColor("rgba(0,0,0,1)");
		} else {
			setColor("rgba(158,158,158,1)");
		}
	});
	const handleClick = () => {
		setColor("rgba(0,0,0,1)");
		if (!window.EyeDropper) {
			resultElement.textContent = "Your browser does not support the EyeDropper API";
			return;
		}

		const eyeDropper = new EyeDropper();
		eyeDropper
			.open()
			.then((result) => {
				onChange(result);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				setColor("rgba(158,158,158,1)");
			});
	};
	return (
		<button
			id="btn-eye-dropper"
			onClick={handleClick}
			className="h-full p-1 rounded-md"
			style={{
				backgroundColor: color == "rgba(0,0,0,1)" ? "rgba(240,240,240,1)" : "rgba(255,255,255,1)",
			}}
		>
			<EyeDropperIcon
				style={{
					color: color,
				}}
				className="h-5 w-5 text-gray-500 "
			/>
		</button>
	);
};
const CustomSlider = () => (
	<div
		style={{
			marginTop: "2px",
			boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
		}}
		className="bg-white rounded-full w-2 h-2  active:-translate-x-[4px] active:-translate-y-[2px] active:w-3 active:h-3 active:bg-transparent active:border-2 active:border-white"
	/>
);

const CustomPointer = () => {
	return (
		<div
			style={{
				transform: "translate(-9px, -1px)",
				backgroundColor: "transparent",
				boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)",
			}}
			className="w-3 h-3 border-2 rounded-full"
		/>
	);
};

export default ColorPicker;
