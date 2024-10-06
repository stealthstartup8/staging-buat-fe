import { useDispatch, useSelector } from "react-redux";
import { useColorPicker } from "@/utils/hooks/useColorPicker";
import ColorPickerInput from "@/components/Elements/ColorPicker/ColorPickerInput";
import { changeCardColor, changeCardStroke, changeCardTextColor } from "@store/body/bodySlice";
const CommerceCardManagementSection = ({
	selectComponent,
	setSelectComponent,
	user_token,
	website_id,
	section,
}) => {
	const dispatch = useDispatch();
	const bodySlice = useSelector((state) => state.persistedReducer.bodySlice);
	const selectedComponent = useSelector((state) => state.persistedReducer.addChangeChoice);
	const {
		colorPickerRef,
		commerceCardColorPicker,
		setShowCommerceCardColorColorPicker,
		setShowCommerceCardTextColorColorPicker,
		setShowCommerceCardStrokeColorPicker,
	} = useColorPicker();

	const showCommerceCardColorColorPicker = commerceCardColorPicker.color;
	const showCommerceCardStrokeColorPicker = commerceCardColorPicker.stroke;
	const showCommerceCardTextColorPicker = commerceCardColorPicker.textColor;

	const handleChangeCommerceCardColor = (color) => {
		dispatch(
			changeCardColor({
				index: selectedComponent?.item.choiceLabelIndex,
				color: color,
			})
		);
	};
	const handleChangeCommerceCardStroke = (color) => {
		dispatch(
			changeCardStroke({
				index: selectedComponent?.item.choiceLabelIndex,
				stroke: color,
			})
		);
	};
	const handleChangeCommerceTextColor = (color) => {
		dispatch(
			changeCardTextColor({
				index: selectedComponent?.item.choiceLabelIndex,
				textColor: color,
			})
		);
	};

	return (
		<div className="mt-4 bg-[#F5F5F5] rounded-md p-2 space-y-2">
			<ColorPickerInput
				title="Product Card Color"
				ref={colorPickerRef}
				color={bodySlice.item[selectedComponent?.item.choiceLabelIndex]?.card_detail?.color}
				showColorPicker={showCommerceCardColorColorPicker}
				setShowColorPicker={setShowCommerceCardColorColorPicker}
				handleColorChange={handleChangeCommerceCardColor}
			/>
			<ColorPickerInput
				title="Product Card Stroke"
				ref={colorPickerRef}
				color={bodySlice.item[selectedComponent?.item.choiceLabelIndex]?.card_detail?.stroke}
				showColorPicker={showCommerceCardStrokeColorPicker}
				setShowColorPicker={setShowCommerceCardStrokeColorPicker}
				handleColorChange={handleChangeCommerceCardStroke}
			/>
			<ColorPickerInput
				title="Product Text Color"
				ref={colorPickerRef}
				color={bodySlice.item[selectedComponent?.item.choiceLabelIndex]?.card_detail?.textColor}
				showColorPicker={showCommerceCardTextColorPicker}
				setShowColorPicker={setShowCommerceCardTextColorColorPicker}
				handleColorChange={handleChangeCommerceTextColor}
			/>
		</div>
	);
};

export default CommerceCardManagementSection;
