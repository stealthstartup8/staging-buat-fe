import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import { useDispatch, useSelector } from "react-redux";
import {
	addSocialMedia,
	deleteSocial,
	socialIcon,
	socialLink,
	socialName,
	socialType,
} from "@store/footer/socialSlice";
import { Fragment, useState } from "react";
import UploadFile from "@/components/Elements/UploadFile";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";

const SocialFooterSection = ({ user_token }) => {
	const dispatch = useDispatch();
	const social_footer = useSelector((state) => state.persistedReducer.socialFooterSlice);

	const [selected, setSelected] = useState(0);
	const [icon, setIcon] = useState();

	const handleAddSocial = () => {
		dispatch(
			addSocialMedia({
				social_type: "",
				social_name: "",
				social_link: "",
				icon: "",
				icon_file: "",
			})
		);
		setSelected(social_footer.item.length);
	};

	const handleSocialType = (value, index) => {
		dispatch(
			socialType({
				social_type: value,
				index: index,
			})
		);
	};

	const handleSocialName = (value, index) => {
		dispatch(
			socialName({
				social_name: value,
				index: index,
			})
		);
	};

	const handleSocialLink = (value, index) => {
		dispatch(
			socialLink({
				social_link: value,
				index: index,
			})
		);
	};

	function handleChangeIcon({ file, url }) {
		setIcon(url);
		dispatch(
			socialIcon({
				index: selected,
				icon: url,
				icon_file: file,
			})
		);
	}

	const handleRemoveIcon = () => {
		setIcon("");
		dispatch(
			socialIcon({
				index: selected,
				icon: "",
			})
		);
	};

	const handleDeleteSocial = () => {
		if (social_footer.item[selected].id != null) {
			const deleteSocial = axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					"/social-media-component/" +
					social_footer.item[selected].id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}
		dispatch(deleteSocial(selected));
		setSelected(selected == 0 ? 0 : selected - 1);
	};

	return (
		<div className="overflow-y-auto overflow-x-hidden content-scrollbar mt-4 pr-1 ">
			<h2 className="mb-2">
				<b>Content Label</b>
			</h2>
			<div className="flex flex-nowrap gap-2 overflow-auto pb-4">
				{social_footer.item.map((item, index) => (
					<Fragment key={index}>
						<Button
							onClick={() => setSelected(index)}
							className={`text-[14px] flex gap-1 border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] ${
								selected == index ? "bg-[#082691] text-white" : ""
							}`}
						>
							{index + 1}
						</Button>
					</Fragment>
				))}
			</div>
			{social_footer.item.length > 0 ? (
				<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
					<div className="p-2">
						<h2 className="mb-2 ">Social Type</h2>
						<Input
							onChange={(e) => handleSocialType(e.target.value, selected)}
							value={social_footer?.item[selected]?.social_type}
							placeholder="Input Social Media Type"
							className="w-[100%] border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
						/>
					</div>
					<div className="p-2">
						<h2 className="mb-2 ">Media Social Name</h2>
						<Input
							onChange={(e) => handleSocialName(e.target.value, selected)}
							value={social_footer?.item[selected]?.social_name}
							placeholder="Input Social Media Name"
							className="w-[100%] border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
						/>
					</div>
					<div className="p-2">
						<h2 className="mb-2">Add Link (add https:// or http://)</h2>
						<Input
							onChange={(e) => handleSocialLink(e.target.value, selected)}
							value={social_footer?.item[selected]?.social_link}
							placeholder="https://"
							className="w-[100%] border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
						/>
					</div>

					<div className="p-2">
						<h2 className="">Social Media Icon</h2>
						<div className="flex justify-between items-center">
							<div className="pl-1">
								<UploadFile
									accept={".svg,.jpeg,.jpg,.png,.gif"}
									icon={social_footer?.item[selected]?.icon}
									handleChangeIcon={handleChangeIcon}
								/>
							</div>
							<div
								onClick={handleRemoveIcon}
								className="text-[#F11010] cursor-pointer hover:text-[#b50707]"
							>
								<TrashIcon className="h-5 w-5 mt-[1px] text-[#FF0000] cursor-pointer hover:text-[#BA1818]" />
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}

			<Button
				onClick={handleAddSocial}
				className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white"
			>
				Add Social Media
			</Button>
			{social_footer.item.length > 0 && (
				<Button
					onClick={handleDeleteSocial}
					className="mt-2 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#F11010] text-[#F11010] bg-white hover:bg-[#F11010] hover:text-white"
				>
					Delete Social Media
				</Button>
			)}
		</div>
	);
};

export default SocialFooterSection;
