import { useDispatch } from "react-redux";
import { switchingDownBody, switchingUpBody } from "@store/body/bodySlice";
import { switchingDownButton, switchingUpButton } from "@store/body/buttonSlice";
import { switchingDown, switchingUp } from "@store/sections";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useTemplate } from "@/utils/hooks/useTemplate";
import { switchingDownFont, switchingUpFont } from "@store/body/fontSlice";
import { ChevronUpIcon, ChevronDownIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { switchingDownLabel, switchingUpLabel } from "@store/body/labelSlice";

const SortingButton = ({ item, setOpen, index, pages }) => {
	const { setSelectManagement, selectManagement } = useStyleManagement();

	const { section_slice } = useTemplate();
	const dispatch = useDispatch();

	return (
		<div
			className={`${
				selectManagement == item.order_index + 1 ? "block" : "hidden"
			} flex justify-center relative`}
		>
			<div
				className={`${
					pages == "blog-and-product" && index == 0 ? "hidden" : "block"
				} gap-1 bg-black rounded-[50px] z-10 text-white p-1 m-1 left-[-75px] absolute`}
			>
				<div
					onClick={(e) => {
						setSelectManagement(selectManagement - 1);
						dispatch(
							switchingUp({
								idComponent: section_slice.item[index].order_index,
							})
						);
						dispatch(
							switchingUpFont({
								index: index,
							})
						);
						dispatch(
							switchingUpBody({
								index: index,
							})
						);
						dispatch(
							switchingUpButton({
								index: index,
							})
						);
						dispatch(
							switchingUpLabel({
								index: index,
							})
						);
					}}
					className={`${
						pages == "blog-and-product" && index < 2 ? "hidden" : "block"
					} p-[1px] bg-gray-600 w-12 h-12 rounded-[100%] cursor-pointer border-2 border border-white mb-2`}
				>
					<ChevronUpIcon className="h-10 w-10 pt-[2px] pl-[2px]" />
				</div>
				<div
					onClick={(e) => {
						setSelectManagement(selectManagement + 1);
						dispatch(
							switchingDown({
								idComponent: section_slice.item[index].order_index,
							})
						);
						dispatch(
							switchingDownFont({
								index: index,
							})
						);
						dispatch(
							switchingDownBody({
								index: index,
							})
						);
						dispatch(
							switchingDownButton({
								index: index,
							})
						);
						dispatch(
							switchingDownLabel({
								index: index,
							})
						);
					}}
					className="p-[1px] bg-[#333] w-12 h-12 rounded-[100%] cursor-pointer border-2 border border-white mb-2"
				>
					<ChevronDownIcon className="h-10 w-10 pt-[3px] pl-[2px]" />
				</div>
				<div className="p-[1px] bg-[#c21d30] rounded-[100%] cursor-pointer" onClick={setOpen}>
					<XCircleIcon className="h-12 w-12" />
				</div>
			</div>
		</div>
	);
};

export default SortingButton;
