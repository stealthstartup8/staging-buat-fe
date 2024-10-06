import ColorPicker from "@/components/Elements/ColorPicker/ColorPicker";
import { RGBAtoString } from "@/utils/helpers/RGBAParse";
import { useState } from "react";
import tinycolor from "tinycolor2";
const Page = () => {
	const onChange = (color) => {
		setStatebang(RGBAtoString(color.rgb));
	};
	const [statebang, setStatebang] = useState("rgba(238, 130, 238,0.5)");
	return <ColorPicker onChange={onChange} rgbaCode={statebang} />;
};

export default Page;
