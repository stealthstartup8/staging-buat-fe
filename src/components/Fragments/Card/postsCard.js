import Button from "@/components/Elements/Button";
import {
	CalendarDaysIcon,
	EyeIcon,
	LinkIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/Elements/Modal";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import { useDispatch } from "react-redux";
import { deleteDataById, fetchAllData } from "@store/blog";
import Toast from "@/components/Elements/Toast/Toast";
import { BLOG_STORAGE_DIR } from "@/utils/constants/Storage";

const PostsCard = ({ children }) => {
	return <div className="border border-1 color-[#F0F0F0] p-2 rounded-md h-fit">{children}</div>;
};

const Images = ({ thumbnail, website }) => {
	return (
		<div>
			<img src={thumbnail} alt="post" className="w-[100%] h-[92px] object-cover rounded-sm mb-4" />
		</div>
	);
};

const Header = ({ labels }) => {
	return (
		<>
			<div className="flex flex-wrap gap-1">
				{labels?.map((item, index) => {
					return (
						<label key={index} className="border border-1 px-2 py-1 rounded-md text-[14px]">
							{item.label_tags.name}
						</label>
					);
				})}
			</div>
		</>
	);
};

const Body = ({ title, content }) => {
	const sanitizedContent = sanitizeHTML(content);

	return (
		<div className="mx-1 ">
			<h1 className="font-bold mt-3  break-words">{title}</h1>
			<p
				className="text-[12px] mt-2 min-h-[36px] line-clamp-3"
				dangerouslySetInnerHTML={{
					__html: sanitizedContent,
				}}
			></p>
		</div>
	);
};

const Footer = ({ date_publish, view, id, user_token, domain, slug }) => {
	function formatDateTime(date_publish) {
		const date = new Date(date_publish);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${day}-${month}-${year} ${hours}:${minutes}`;
	}
	const formattedDateTime = formatDateTime(date_publish);
	const [openDelete, setOpenDelete] = useState(false);
	const dispatch = useDispatch();
	const handleDelete = async () => {
		dispatch(deleteDataById({ id: id, token: user_token }));
		window.location.href = "/posts";
		setOpenDelete(false);
	};

	const copyToClipboard = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			Toast({ message: "Copied to clipboard", type: "success" });
		} catch (error) {
			Toast({ message: "Failed to copy to clipboard", type: "error" });
		}
	};

	return (
		<>
			<Modal open={openDelete} size="xs">
				<Modal.Header>
					<div className="relative w-[100%] h-[100%] mb-2">
						<div>
							<div className="absolute left-0">
								<p>Delete Blog</p>
							</div>
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<hr className="mb-2" />
					<p className="text-sm text-black leading-5 mb-6 mt-4">
						Are you sure you want to delete the entire about blog created?
					</p>
					<div className="flex gap-2 w-full mt-2">
						<Button
							onClick={(e) => {
								setOpenDelete(false);
							}}
							className="w-full px-3 py-2 border border-1 border-[#333] text-[#333] hover:bg-[#333] hover:text-white rounded-md mb-2 mt-2"
						>
							Back
						</Button>
						<Button
							onClick={handleDelete}
							className={`w-full px-3 py-2 text-white bg-[#F24B4B] hover:bg-[#FF0000] rounded-md mb-2 mt-2`}
						>
							Delete
						</Button>
					</div>
				</Modal.Body>
			</Modal>

			<div className="mt-4">
				<div className="flex justify-between items-center border-b-[1px] pb-2">
					<div className="flex gap-1">
						<CalendarDaysIcon className="h-5 w-5" />
						<span className="text-[14px]">
							{formattedDateTime == "NaN-NaN-NaN NaN:NaN" ? "-" : formattedDateTime}
						</span>
					</div>
					<Link
						href={`${
							domain[1] == undefined
								? "https://" +
									domain[0].name +
									`.${process.env.NEXT_PUBLIC_DOMAIN_URL}/blog-detail/?id=` +
									id
								: "https://" + domain[1].name + "/blog-detail/?id=" + id
						}`}
						target="_blank"
						className="flex gap-1"
					>
						<EyeIcon className="h-5 w-5" />
						<span className="text-[14px]">{view}</span>
					</Link>
				</div>
				<div className="flex flex-wrap justify-between mt-1 items-center">
					<Button
						onClick={() =>
							copyToClipboard(
								domain[1] == undefined
									? "https://" +
											domain[0].name +
											`.${process.env.NEXT_PUBLIC_DOMAIN_URL}/blog-detail/?slug=` +
											slug
									: "https://" + domain[1].name + "/blog-detail/?slug=" + slug
							)
						}
						className="flex gap-1 mt-2"
					>
						<LinkIcon className="h-5 w-5 text-bold" />
						<span className="text-[14px]">Copy</span>
					</Button>
					<Link href={"/blog/detail/" + slug} className="flex gap-1 mt-2">
						<PencilSquareIcon className="h-5 w-5" />
						<span className="text-[14px]">Edit</span>
					</Link>
					<Button onClick={() => setOpenDelete(true)} className="flex gap-1 mt-2">
						<TrashIcon className="h-5 w-5 text-bold" />
						<span className="text-[14px]">Delete</span>
					</Button>
				</div>
			</div>
		</>
	);
};

PostsCard.Images = Images;
PostsCard.Header = Header;
PostsCard.Body = Body;
PostsCard.Footer = Footer;

export default PostsCard;
