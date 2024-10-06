import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addNavbar, deleteNavbar } from "@store/navbar";
import Modal from "@/components/Elements/Modal";
import { useState } from "react";
import Button from "@/components/Elements/Button";
import axios from "axios";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { addLogoAndBgColor } from "@store/menu/logoSlice";
import { changeButtonStyle } from "@store/menu/buttonSlice";
const MenuSectionPreview = ({ navbar_id, setSelectMenu, selectMenu, templateNavbar, user_token }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const navbarSlice = useSelector((state) => state.persistedReducer.navbarSlice);
	const logoSlice = useSelector((state) => state.persistedReducer.navigationLogoSlice);
	const buttonStyle = useSelector((state) => state.persistedReducer.navigationButtonSlice);

	console.log("navbarSlice", navbarSlice);

	const { setSelectComponent, setSelectManagement, setSelectSection } = useStyleManagement();

	const handleDeleteNavbar = async (e) => {
		e.preventDefault();
		if (navbarSlice.item.id != null) {
			const deleteNavbar = await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY + `/navbar-component/` + navbar_id.id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}

		// clears the selected component (menu on the right)
		setSelectComponent("clear");
		// clears the selected management (menu on the right)
		setSelectManagement(-1);
		// clears the selected section (menu on the left)
		setSelectSection("");

		dispatch(deleteNavbar({}));
		setSelectMenu("");
	};

	return (
		<>
			<Modal open={open} size="sm">
				<Modal.Header className="text-md">Are you sure you want to delete this menu?</Modal.Header>
				<Modal.Footer>
					<div className="flex gap-1 mt-[-25px]">
						<Button
							onClick={(e) => setOpen(false)}
							className="mt-4 w-20 text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#F11010] text-[#F11010] bg-white hover:bg-[#F11010] hover:text-white"
						>
							No
						</Button>
						<Button
							onClick={(e) => {
								handleDeleteNavbar(e);
								setOpen(false);
							}}
							className="mt-4 w-20 text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white"
						>
							Yes
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			<div className="mt-4 text-[14px]">
				<span>
					<b>Note : </b> Select to use Menu
				</span>
				{templateNavbar.map((item, index) => (
					<div
						key={index}
						className={`rounded-md mt-4 relative flex ${
							item.id == navbarSlice.item.id_template
								? "border border-2 border-dashed border-[#082691]"
								: ""
						}`}
					>
						{item.id == navbarSlice.item.id_template ? (
							<div
								onClick={(e) => {
									setOpen(true);
								}}
								className="select-none z-10 cursor-pointer absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] bg-[#082691] py-1 px-2 rounded-md text-white"
							>
								Selected
							</div>
						) : (
							""
						)}
						<div className={`${item.id == navbarSlice.item.id_template ? "blur-[2px]" : ""}`}>
							<Image
								src={`${process.env.NEXT_PUBLIC_API_KEY}/template/template-image/${item.image}`}
								width={10000}
								height={20}
								alt="arrow-down"
								className="cursor-pointer"
								id={item.id}
								onClick={(e) => {
									setSelectMenu(e.target.id);
									setSelectManagement("menus");
									dispatch(
										addNavbar({
											id: navbar_id?.id == null ? null : navbar_id?.id,
											id_website: 1,
											id_template: e.target.id,
										})
									);

									dispatch(
										addLogoAndBgColor({
											logo_image: logoSlice.item.logo_image || "",
											background_color: logoSlice.item.background_color || "#1A1A1A",
										})
									);

									dispatch(
										changeButtonStyle({
											button_color: buttonStyle.item.button_color || "#1A1A1A",
											stroke_button_color:
												buttonStyle.item.stroke_button_color || "#1A1A1A",
										})
									);
								}}
								draggable="false"
							/>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default MenuSectionPreview;
