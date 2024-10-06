import {
	ArrowPathRoundedSquareIcon,
	HomeIcon,
	PencilSquareIcon,
	SparklesIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import PagesDeletePopup from "./ActionPopup/delete";
import PagesEditPopup from "./ActionPopup/edit";
import PagesResetPopup from "./ActionPopup/reset";
import { usePagesCard } from "@/utils/hooks/usePagesCard";
import { useSelector } from "react-redux";
import SnapshotPageByUrl from "@/components/Elements/SnapshotPageByUrl";

const PagesCard = ({ children }) => {
	const new_user = useSelector((state) => state?.persistedReducer?.websiteSlices?.new_user);
	return (
		<>
			{new_user == true ? (
				<div className="bg-white z-40 p-4 rounded-lg relative">
					<div className="chat-bubble">Click here to start designing your website.</div>
					{children}
				</div>
			) : (
				<div>{children}</div>
			)}
		</>
	);
};

const Header = (props) => {
	const { name_page, path_name, page_id, user_token, access_domain } = props;
	const { handleDeletePage, handleUpdatePage, handleResetPage } = usePagesCard();

	const [openDelete, setOpenDelete] = useState(false);
	const [namePage, setNamePage] = useState("");
	const [openEditPage, setOpenEditPage] = useState(false);
	const [openReset, setOpenReset] = useState(false);
	const [newNamePage, setNewNamePage] = useState("");
	const [loading, setLoading] = useState(false);

	return (
		<>
			<PagesDeletePopup
				open={openDelete}
				namePage={namePage}
				name_page={name_page}
				setNamePage={setNamePage}
				setOpen={setOpenDelete}
				deletePage={(e) => handleDeletePage(page_id, user_token, setLoading)}
				loading={loading}
			/>

			<PagesEditPopup
				open={openEditPage}
				newNamePage={newNamePage}
				setNewNamePage={setNewNamePage}
				setOpen={setOpenEditPage}
				updatPage={(e) => handleUpdatePage(page_id, newNamePage, user_token, setLoading)}
				loading={loading}
			/>

			<PagesResetPopup
				open={openReset}
				namePage={namePage}
				name_page={name_page}
				setNamePage={setNamePage}
				setOpen={setOpenReset}
				resetPage={(e) => handleResetPage(page_id, user_token, setLoading)}
				loading={loading}
			/>

			<div className="mb-2">
				<div className="flex justify-between mb-[-10px]">
					<div className="flex mb-2">
						{name_page == "Landing Page" && <HomeIcon className="h-5 w-5 mr-2" />}
						<h1 className="font-semibold mt-[-2px] line-clamp-1	">{name_page}</h1>
					</div>
					<div className="flex gap-1">
						{name_page != "Landing Page" ? (
							<>
								<PencilSquareIcon
									onClick={(e) => setOpenEditPage(true)}
									className="h-6 w-6 mt-1 hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
								/>
								<XCircleIcon
									onClick={(e) => setOpenDelete(true)}
									className="h-6 w-6 mt-1 text-[#FF0000] hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
								/>
							</>
						) : (
							<ArrowPathRoundedSquareIcon
								onClick={(e) => setOpenReset(true)}
								className="h-6 w-6 mt-1 hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
							/>
						)}
					</div>
				</div>
				<span className="text-[13px] text-[#adacac] line-clamp-1">
					{access_domain?.[1]?.name == undefined ? (
						<>
							{access_domain[0]?.type == "sub-domain" && path_name == "/"
								? `${access_domain[0]?.name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}`
								: `${access_domain[0]?.name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}${path_name}`}
						</>
					) : (
						<>
							{access_domain[1]?.type == "domain" && path_name == "/"
								? `${access_domain[1]?.name}`
								: `${access_domain[1]?.name}${path_name}`}
						</>
					)}
				</span>
			</div>
		</>
	);
};

const Images = ({ slug, access_domain, path_name, statusPublished }) => {
	return (
		<div
			// href={`/pages-detail/${slug}`}
			className="w-[100%] hover:scale-105 transition duration-300 ease-in-out cursor-pointer border-2  border-gray-400 rounded-md "
			onClick={(e) => {
				localStorage.setItem("first-render", "true");
				window.location.href = `/pages-detail/${slug}`;
			}}
		>
			{statusPublished == true ? (
				<div className="aspect-[18/9] flex items-center justify-center">
					<SnapshotPageByUrl
						src={`https://${access_domain[0].name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}${path_name}`}
					/>
				</div>
			) : (
				<div className="aspect-[18/9] bg-gray-300 flex items-center justify-center">
					<SparklesIcon className="h-6 w-6 m-auto text-gray-600 -translate-y-1" />
				</div>
			)}
		</div>
	);
};

const Footer = () => {
	return <div className="mt-2 text-center text-[14px] text-[#adacac]">Click to Edit</div>;
};

PagesCard.Header = Header;
PagesCard.Images = Images;
PagesCard.Footer = Footer;

export default PagesCard;
