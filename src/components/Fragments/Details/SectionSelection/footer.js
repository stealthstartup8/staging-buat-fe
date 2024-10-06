import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addFooter, deleteFooter } from "@store/footer";
import Modal from "@/components/Elements/Modal";
import { useState } from "react";
import Button from "@/components/Elements/Button";
import axios from "axios";
import { deleteSocial } from "@store/footer/socialSlice";
import { deleteAllNav } from "@store/footer/navigationSlice";
import { deleteInformationFooter, deleteSubInformation } from "@store/footer/informationSlice";
import { getFooterThunk } from "@/utils/fetch/getFooterThunk";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
const FooterSection = ({ setSelectFooter, selectFooter, templateFooter, footer_components, user_token }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const footerSlice = useSelector((state) => state.persistedReducer.footerSlice);
	const socialSlice = useSelector((state) => state.persistedReducer.socialFooterSlice);
	const navigationFooterSlice = useSelector((state) => state.persistedReducer.navigationFooterSlice);
	const informationFooterSlice = useSelector((state) => state.persistedReducer.informationFooterSlice);
	const { setSelectComponent, setSelectManagement, setSelectSection } = useStyleManagement();
	const handleDeleteFooter = async (e) => {
		e.preventDefault();

		if (footerSlice.item.id != null) {
			try {
				const deleteFooter = await axios.delete(
					process.env.NEXT_PUBLIC_API_KEY + `/footer-component/` + footer_components.id,
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);
			} catch (err) {
				console.error(err);
			}
		}
		// clears the selected component (menu on the right)
		setSelectComponent("clear");
		// clears the selected management (menu on the right)
		setSelectManagement(-1);
		// clears the selected section (menu on the left)
		setSelectSection("");

		setSelectFooter("");
		// for (let i = 0; i < socialSlice.item.length; i++) {
		// 	dispatch(deleteSocial(i));
		// }
		dispatch(deleteAllNav());
		dispatch(deleteInformationFooter({}));
		dispatch(deleteFooter({}));
	};

	return (
		<>
			<Modal open={open} size="sm">
				<Modal.Header className="text-md">Are you sure you want to delete this footer?</Modal.Header>
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
								handleDeleteFooter(e);
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
					<b>Note : </b> Select to use Footer
				</span>
				{templateFooter.map((item, index) => (
					<div
						key={index}
						className={`rounded-md mt-4 relative flex ${
							footerSlice.item.id_template == item.id
								? "border border-2 border-dashed border-[#082691]"
								: ""
						}`}
					>
						{footerSlice.item.id_template == item.id ? (
							<div
								onClick={(e) => {
									setOpen(true);
								}}
								className="select-none z-10 cursor-pointer absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] bg-[#082691] py-3 px-6 rounded-md text-white"
							>
								Selected
							</div>
						) : (
							""
						)}
						<div className={`${footerSlice.item.id_template == item.id ? "blur-[2px]" : ""}`}>
							<Image
								src={`${process.env.NEXT_PUBLIC_API_KEY}/template/template-image/${item.image}`}
								width={10000}
								height={20}
								alt="arrow-down"
								className="cursor-pointer rounded-md"
								id={item.id}
								onClick={(e) => {
									setSelectFooter(item.id);
									dispatch(
										addFooter({
											id: footerSlice.item.id == null ? null : footerSlice.item.id,
											id_website: 1,
											id_template: item.id,
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

export default FooterSection;
